import express from 'express';
import { queryAll, queryOne, runQuery, saveDB } from '../db.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const { tag, search } = req.query;
    let sql = 'SELECT * FROM articles WHERE 1=1';
    const params = [];

    if (search) {
      sql += ' AND (title LIKE ? OR excerpt LIKE ? OR content LIKE ?)';
      const searchParam = `%${search}%`;
      params.push(searchParam, searchParam, searchParam);
    }

    sql += ' ORDER BY id DESC';

    let articles = queryAll(sql, params);

    articles = articles.map(a => ({
      ...a,
      tags: JSON.parse(a.tags || '[]')
    }));

    if (tag && tag !== '全部') {
      articles = articles.filter(a => a.tags.includes(tag));
    }

    res.json({ success: true, data: articles });
  } catch (err) {
    console.error('Get articles error:', err);
    res.status(500).json({ success: false, error: 'Failed to get articles' });
  }
});

router.get('/tags', (req, res) => {
  try {
    const articles = queryAll('SELECT tags FROM articles');
    const counts = {};
    let total = 0;

    articles.forEach(a => {
      const tags = JSON.parse(a.tags || '[]');
      tags.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1;
        total++;
      });
    });

    const tags = [{ name: '全部', count: articles.length }];
    Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .forEach(([name, count]) => {
        tags.push({ name, count });
      });

    res.json({ success: true, data: tags });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to get tags' });
  }
});

router.get('/search', (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.json({ success: true, data: [] });
    }
    const searchParam = `%${q}%`;
    const articles = queryAll(
      'SELECT * FROM articles WHERE title LIKE ? OR excerpt LIKE ? OR content LIKE ? ORDER BY id DESC',
      [searchParam, searchParam, searchParam]
    );

    const formattedArticles = articles.map(a => ({
      ...a,
      tags: JSON.parse(a.tags || '[]')
    }));

    res.json({ success: true, data: formattedArticles });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Search failed' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const article = queryOne('SELECT * FROM articles WHERE id = ?', [req.params.id]);

    if (!article) {
      return res.status(404).json({ success: false, error: 'Article not found' });
    }

    article.tags = JSON.parse(article.tags || '[]');
    res.json({ success: true, data: article });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to get article' });
  }
});

router.post('/', authMiddleware, (req, res) => {
  try {
    const { title, excerpt, tags, readTime, date, cover, content } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, error: 'Title is required' });
    }

    const result = runQuery(
      'INSERT INTO articles (title, excerpt, tags, readTime, date, cover, content) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, excerpt || '', JSON.stringify(tags || []), readTime || '', date || new Date().toISOString().split('T')[0], cover || '', content || '']
    );

    res.json({ success: true, data: { id: result.lastInsertRowid } });
  } catch (err) {
    console.error('Create article error:', err);
    res.status(500).json({ success: false, error: 'Failed to create article' });
  }
});

router.put('/:id', authMiddleware, (req, res) => {
  try {
    const { title, excerpt, tags, readTime, date, cover, content } = req.body;

    const updates = [];
    const params = [];

    if (title !== undefined) { updates.push('title = ?'); params.push(title); }
    if (excerpt !== undefined) { updates.push('excerpt = ?'); params.push(excerpt); }
    if (tags !== undefined) { updates.push('tags = ?'); params.push(JSON.stringify(tags)); }
    if (readTime !== undefined) { updates.push('readTime = ?'); params.push(readTime); }
    if (date !== undefined) { updates.push('date = ?'); params.push(date); }
    if (cover !== undefined) { updates.push('cover = ?'); params.push(cover); }
    if (content !== undefined) { updates.push('content = ?'); params.push(content); }

    updates.push('updated_at = datetime("now")');
    params.push(req.params.id);

    runQuery(`UPDATE articles SET ${updates.join(', ')} WHERE id = ?`, params);
    saveDB();

    res.json({ success: true });
  } catch (err) {
    console.error('Update article error:', err);
    res.status(500).json({ success: false, error: 'Failed to update article' });
  }
});

router.delete('/:id', authMiddleware, (req, res) => {
  try {
    runQuery('DELETE FROM articles WHERE id = ?', [req.params.id]);
    saveDB();
    res.json({ success: true });
  } catch (err) {
    console.error('Delete article error:', err);
    res.status(500).json({ success: false, error: 'Failed to delete article' });
  }
});

export default router;
