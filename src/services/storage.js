const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function api(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (res.status === 204) return null;
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? 'Request failed');
  return data;
}

// Projects
export function getProjects() {
  return api('/api/projects');
}

export function getProject(id) {
  return api('/api/projects').then((projects) => projects.find((p) => p.id === id) ?? null);
}

export function createProject(name) {
  return api('/api/projects', {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
}

export function deleteProject(id) {
  return api(`/api/projects/${id}`, { method: 'DELETE' });
}

// Tasks
export function getTasks(projectId) {
  return api(`/api/projects/${projectId}/tasks`);
}

export function createTask({ projectId, name, description, deadline, priority }) {
  return api('/api/tasks', {
    method: 'POST',
    body: JSON.stringify({ projectId, name, description, deadline, priority }),
  });
}

export function updateTask(updated) {
  return api(`/api/tasks/${updated.id}`, {
    method: 'PUT',
    body: JSON.stringify(updated),
  });
}

export function deleteTask(id) {
  return api(`/api/tasks/${id}`, { method: 'DELETE' });
}
