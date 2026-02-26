const PROJECTS_KEY = 'tdl_projects';
const TASKS_KEY = 'tdl_tasks';

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// Projects
export function getProjects() {
  try {
    return JSON.parse(localStorage.getItem(PROJECTS_KEY)) ?? [];
  } catch {
    return [];
  }
}

export function getProject(id) {
  return getProjects().find((p) => p.id === id) ?? null;
}

export function saveProject(project) {
  const projects = getProjects();
  const existing = projects.findIndex((p) => p.id === project.id);
  if (existing >= 0) {
    projects[existing] = project;
  } else {
    projects.push({ ...project, id: generateId(), createdAt: new Date().toISOString() });
  }
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  return projects;
}

export function createProject(name) {
  const project = { id: generateId(), name, createdAt: new Date().toISOString() };
  const projects = getProjects();
  projects.push(project);
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  return project;
}

export function deleteProject(id) {
  const projects = getProjects().filter((p) => p.id !== id);
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  const tasks = getTasks().filter((t) => t.projectId !== id);
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

// Tasks
export function getTasks(projectId = null) {
  try {
    const tasks = JSON.parse(localStorage.getItem(TASKS_KEY)) ?? [];
    return projectId ? tasks.filter((t) => t.projectId === projectId) : tasks;
  } catch {
    return [];
  }
}

export function createTask({ projectId, name, description, deadline, priority }) {
  const task = {
    id: generateId(),
    projectId,
    name,
    description,
    deadline,
    priority,
    createdAt: new Date().toISOString(),
  };
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  return task;
}

export function updateTask(updated) {
  const tasks = getTasks();
  const idx = tasks.findIndex((t) => t.id === updated.id);
  if (idx >= 0) {
    tasks[idx] = updated;
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }
  return tasks;
}

export function deleteTask(id) {
  const tasks = getTasks().filter((t) => t.id !== id);
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}
