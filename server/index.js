import 'dotenv/config';
import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { initDB } from './db.js';
import { initProjects } from './init-projects.js';
import articlesRoutes from './routes/articles.js';
import notesRoutes from './routes/notes.js';
import projectsRoutes from './routes/projects.js';
import uploadRoutes from './routes/upload.js';
import adminRoutes from './routes/admin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/lx-api/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/lx-api/articles', articlesRoutes);
app.use('/lx-api/notes', notesRoutes);
app.use('/lx-api/projects', projectsRoutes);
app.use('/lx-api/upload', uploadRoutes);
app.use('/lx-api/admin', adminRoutes);

app.get('/lx-api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

if (fs.existsSync(path.join(__dirname, '../dist'))) {
  app.use(express.static(path.join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    if (req.path.startsWith('/lx-api/')) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

initDB().then(async () => {
  console.log('Database initialized successfully');
  await initProjects();
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});
