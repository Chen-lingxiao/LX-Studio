import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_DIR = path.join(__dirname, '../data');
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}
const DB_PATH = path.join(DB_DIR, 'data.db');

let db = null;
let SQL = null;

async function initDB() {
  try {
    SQL = await initSqlJs();
    
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH);
      db = new SQL.Database(data);
    } else {
      db = new SQL.Database();
    }

    db.run(`
      CREATE TABLE IF NOT EXISTS articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        excerpt TEXT,
        category TEXT DEFAULT '技术',
        tags TEXT DEFAULT '[]',
        readTime TEXT,
        date TEXT,
        cover TEXT,
        content TEXT DEFAULT '',
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        category TEXT DEFAULT '学习',
        content TEXT DEFAULT '',
        date TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        route_index TEXT NOT NULL,
        description TEXT,
        config TEXT DEFAULT '{}',
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      )
    `);

    // 迁移：检查并添加 config 列（如果不存在）
    try {
      const columns = db.prepare("PRAGMA table_info(projects)");
      const columnNames = [];
      while (columns.step()) {
        columnNames.push(columns.getAsObject().name);
      }
      columns.free();
      
      if (!columnNames.includes('config')) {
        db.run('ALTER TABLE projects ADD COLUMN config TEXT DEFAULT \'{} \'');
        console.log('Added config column to projects table');
      }

      if (!columnNames.includes('sort_order')) {
        db.run('ALTER TABLE projects ADD COLUMN sort_order INTEGER DEFAULT 0');
        console.log('Added sort_order column to projects table');
        const rows = queryAll('SELECT id FROM projects ORDER BY id ASC');
        rows.forEach((row, index) => {
          db.run('UPDATE projects SET sort_order = ? WHERE id = ?', [index + 1, row.id]);
        });
        saveDB();
        console.log('Backfilled sort_order for existing projects');
      } else {
        // Ensure any rows with sort_order = 0 get a valid value
        const zeroRows = queryAll('SELECT id FROM projects WHERE sort_order IS NULL OR sort_order = 0 ORDER BY id ASC');
        if (zeroRows.length > 0) {
          const maxRow = queryAll('SELECT COALESCE(MAX(sort_order), 0) AS maxOrder FROM projects');
          const maxOrder = maxRow[0] && maxRow[0].maxOrder ? Number(maxRow[0].maxOrder) : 0;
          zeroRows.forEach((row, index) => {
            db.run('UPDATE projects SET sort_order = ? WHERE id = ?', [maxOrder + index + 1, row.id]);
          });
          saveDB();
          console.log('Backfilled sort_order for rows with zero values');
        }
      }
    } catch (e) {
      // 忽略错误（列可能已存在）
    }

    db.run(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now'))
      )
    `);

    const adminCheck = db.prepare('SELECT COUNT(*) FROM admin_users');
    adminCheck.step();
    const adminRow = adminCheck.getAsObject();
    adminCheck.free();
    const countKey = Object.keys(adminRow)[0];
    const adminCount = adminRow ? Number(adminRow[countKey]) : 0;
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (adminCount === 0) {
      if (!adminUsername || !adminPassword) {
        throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD environment variables are required to create admin user');
      }
      const hashedPassword = bcrypt.hashSync(adminPassword, 10);
      const insertResult = db.run('INSERT INTO admin_users (username, password) VALUES (?, ?)', [adminUsername, hashedPassword]);
      console.log('Insert result:', insertResult);
      console.log(`Admin user created: ${adminUsername}`);
    } else if (adminUsername && adminPassword) {
      const hashedPassword = bcrypt.hashSync(adminPassword, 10);
      const updateResult = db.run('UPDATE admin_users SET username = ?, password = ? WHERE id = 1', [adminUsername, hashedPassword]);
      console.log(`Admin user updated: ${adminUsername}`);
    }

    saveDB();
    console.log('Database saved');
    return db;
  } catch (err) {
    console.error('Failed to initialize database:', err);
    throw err;
  }
}

function saveDB() {
  if (db) {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_PATH, buffer);
  }
}

function getDB() {
  if (!db) {
    throw new Error('Database not initialized. Call initDB() first.');
  }
  return db;
}

function queryAll(sql, params = []) {
  const database = getDB();
  const stmt = database.prepare(sql);
  if (params.length > 0) {
    stmt.bind(params);
  }
  const results = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();
  return results;
}

function queryOne(sql, params = []) {
  const results = queryAll(sql, params);
  return results.length > 0 ? results[0] : null;
}

function runQuery(sql, params = []) {
  const database = getDB();
  const sqlLower = sql.trim().toLowerCase();
  
  if (sqlLower.startsWith('insert')) {
    const stmt = database.prepare(sql);
    stmt.bind(params);
    stmt.step();
    stmt.free();
    
    const idStmt = database.prepare('SELECT last_insert_rowid()');
    idStmt.step();
    const idResult = idStmt.getAsObject();
    idStmt.free();
    const idKey = Object.keys(idResult)[0];
    const id = idResult[idKey];
    saveDB();
    return { lastInsertRowid: id };
  }
  
  database.run(sql, params);
  saveDB();
  
  if (sqlLower.startsWith('delete') || sqlLower.startsWith('update')) {
    const stmt = database.prepare('SELECT changes()');
    stmt.step();
    const result = stmt.getAsObject();
    stmt.free();
    const countKey = Object.keys(result)[0];
    return { changes: result[countKey] };
  }
  return {};
}

function getCategories(table) {
  const rows = queryAll(`SELECT DISTINCT category FROM ${table} WHERE category IS NOT NULL`);
  return rows.map(r => r.category);
}

export { initDB, getDB, queryAll, queryOne, runQuery, saveDB, getCategories };
