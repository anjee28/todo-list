const { Router } = require('express');
const { projects, tasks, generateId } = require('../store');

const router = Router();

// GET /api/projects
router.get('/', (req, res) => {
  res.json(projects);
});

// POST /api/projects  { name }
router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Project name is required.' });
  }
  const project = { id: generateId(), name: name.trim(), createdAt: new Date().toISOString() };
  projects.push(project);
  res.status(201).json(project);
});

// DELETE /api/projects/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Project not found.' });

  projects.splice(idx, 1);
  // cascade delete tasks
  const removed = tasks.filter((t) => t.projectId === id);
  removed.forEach(() => {
    const ti = tasks.findIndex((t) => t.projectId === id);
    if (ti !== -1) tasks.splice(ti, 1);
  });

  res.status(204).end();
});

// GET /api/projects/:id/tasks
router.get('/:id/tasks', (req, res) => {
  const { id } = req.params;
  const project = projects.find((p) => p.id === id);
  if (!project) return res.status(404).json({ error: 'Project not found.' });
  res.json(tasks.filter((t) => t.projectId === id));
});

module.exports = router;
