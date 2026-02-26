const { Router } = require('express');
const { tasks, generateId } = require('../store');

const router = Router();

// POST /api/tasks  { projectId, name, description, deadline, priority }
router.post('/', (req, res) => {
  const { projectId, name, description, deadline, priority } = req.body;
  if (!projectId || !name || !name.trim()) {
    return res.status(400).json({ error: 'projectId and name are required.' });
  }
  const task = {
    id: generateId(),
    projectId,
    name: name.trim(),
    description: description ?? '',
    deadline: deadline ?? '',
    priority: priority ?? 'normal',
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT /api/tasks/:id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Task not found.' });
  tasks[idx] = { ...tasks[idx], ...req.body, id };
  res.json(tasks[idx]);
});

// DELETE /api/tasks/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Task not found.' });
  tasks.splice(idx, 1);
  res.status(204).end();
});

module.exports = router;
