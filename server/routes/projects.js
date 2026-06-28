import express from 'express';
import { queryAll, queryOne, runQuery, saveDB } from '../db.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const projects = queryAll('SELECT * FROM projects ORDER BY sort_order ASC, id ASC');
    res.json({ success: true, data: projects });
  } catch (err) {
    console.error('Get projects error:', err);
    res.status(500).json({ success: false, error: 'Failed to get projects' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const project = queryOne('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (err) {
    console.error('Get project error:', err);
    res.status(500).json({ success: false, error: 'Failed to get project' });
  }
});

router.post('/', authMiddleware, (req, res) => {
  try {
    const { title, route_index, description, config, sort_order } = req.body;
    if (!title || !route_index) {
      return res.status(400).json({ success: false, error: 'Title and route are required' });
    }

    let orderValue = sort_order;
    if (orderValue === undefined || orderValue === null) {
      const maxRow = queryOne('SELECT MAX(sort_order) AS maxOrder FROM projects');
      const maxOrder = maxRow && maxRow.maxOrder != null ? maxRow.maxOrder : 0;
      orderValue = maxOrder + 1;
    }

    const result = runQuery(
      'INSERT INTO projects (title, route_index, description, config, sort_order) VALUES (?, ?, ?, ?, ?)',
      [title, route_index, description || '', config || '{}', orderValue]
    );

    res.json({ success: true, data: { id: result.lastInsertRowid, sort_order: orderValue } });
  } catch (err) {
    console.error('Create project error:', err);
    res.status(500).json({ success: false, error: 'Failed to create project' });
  }
});

router.put('/:id', authMiddleware, (req, res) => {
  try {
    const { title, route_index, description, config, sort_order } = req.body;
    const updates = [];
    const params = [];

    if (title !== undefined) { updates.push('title = ?'); params.push(title); }
    if (route_index !== undefined) { updates.push('route_index = ?'); params.push(route_index); }
    if (description !== undefined) { updates.push('description = ?'); params.push(description); }
    if (config !== undefined) { updates.push('config = ?'); params.push(config); }
    if (sort_order !== undefined) { updates.push('sort_order = ?'); params.push(sort_order); }

    updates.push('updated_at = datetime("now")');
    params.push(req.params.id);

    runQuery(`UPDATE projects SET ${updates.join(', ')} WHERE id = ?`, params);
    saveDB();

    res.json({ success: true });
  } catch (err) {
    console.error('Update project error:', err);
    res.status(500).json({ success: false, error: 'Failed to update project' });
  }
});

router.delete('/:id', authMiddleware, (req, res) => {
  try {
    runQuery('DELETE FROM projects WHERE id = ?', [req.params.id]);
    saveDB();
    res.json({ success: true });
  } catch (err) {
    console.error('Delete project error:', err);
    res.status(500).json({ success: false, error: 'Failed to delete project' });
  }
});

router.post('/reorder', authMiddleware, (req, res) => {
  try {
    const { orders } = req.body;
    if (!Array.isArray(orders)) {
      return res.status(400).json({ success: false, error: 'orders must be an array of {id, sort_order}' });
    }
    for (const item of orders) {
      if (item.id != null && item.sort_order != null) {
        runQuery('UPDATE projects SET sort_order = ? WHERE id = ?', [item.sort_order, item.id]);
      }
    }
    saveDB();
    res.json({ success: true });
  } catch (err) {
    console.error('Reorder projects error:', err);
    res.status(500).json({ success: false, error: 'Failed to reorder projects' });
  }
});

export default router;