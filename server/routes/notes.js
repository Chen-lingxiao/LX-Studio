import express from 'express';
import { queryAll, queryOne, runQuery, saveDB } from '../db.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const { category, search } = req.query;
    let sql = 'SELECT * FROM notes WHERE 1=1';
    const params = [];

    if (category && category !== '全部') {
      sql += ' AND category = ?';
      params.push(category);
    }

    if (search) {
      sql += ' AND (title LIKE ? OR content LIKE ?)';
      const searchParam = `%${search}%`;
      params.push(searchParam, searchParam);
    }

    sql += ' ORDER BY id DESC';

    const notes = queryAll(sql, params);
    res.json({ success: true, data: notes });
  } catch (err) {
    console.error('Get notes error:', err);
    res.status(500).json({ success: false, error: 'Failed to get notes' });
  }
});

router.get('/categories', (req, res) => {
  try {
    const notes = queryAll('SELECT category FROM notes');
    const counts = {};
    notes.forEach(n => {
      if (n.category) {
        counts[n.category] = (counts[n.category] || 0) + 1;
      }
    });

    const categories = [{ name: '全部', count: notes.length }];
    Object.entries(counts).forEach(([name, count]) => {
      categories.push({ name, count });
    });

    res.json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to get categories' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const note = queryOne('SELECT * FROM notes WHERE id = ?', [req.params.id]);

    if (!note) {
      return res.status(404).json({ success: false, error: 'Note not found' });
    }

    res.json({ success: true, data: note });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to get note' });
  }
});

router.post('/', authMiddleware, (req, res) => {
  try {
    const { title, category, content, date } = req.body;

    const result = runQuery(
      'INSERT INTO notes (title, category, content, date) VALUES (?, ?, ?, ?)',
      [title || '', category || '学习', content || '', date || new Date().toISOString().split('T')[0]]
    );

    res.json({ success: true, data: { id: result.lastInsertRowid } });
  } catch (err) {
    console.error('Create note error:', err);
    res.status(500).json({ success: false, error: 'Failed to create note' });
  }
});

router.put('/:id', authMiddleware, (req, res) => {
  try {
    const { title, category, content, date } = req.body;

    const updates = [];
    const params = [];

    if (title !== undefined) { updates.push('title = ?'); params.push(title); }
    if (category !== undefined) { updates.push('category = ?'); params.push(category); }
    if (content !== undefined) { updates.push('content = ?'); params.push(content); }
    if (date !== undefined) { updates.push('date = ?'); params.push(date); }

    updates.push('updated_at = datetime("now")');
    params.push(req.params.id);

    runQuery(`UPDATE notes SET ${updates.join(', ')} WHERE id = ?`, params);
    saveDB();

    res.json({ success: true });
  } catch (err) {
    console.error('Update note error:', err);
    res.status(500).json({ success: false, error: 'Failed to update note' });
  }
});

router.delete('/:id', authMiddleware, (req, res) => {
  try {
    runQuery('DELETE FROM notes WHERE id = ?', [req.params.id]);
    saveDB();
    res.json({ success: true });
  } catch (err) {
    console.error('Delete note error:', err);
    res.status(500).json({ success: false, error: 'Failed to delete note' });
  }
});

export default router;
