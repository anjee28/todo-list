import { useState } from 'react';
import { getProjects, createProject, deleteProject } from '../services/storage';
import ProjectCard from '../components/ProjectCard';

export default function ProjectsPage() {
  const [projects, setProjects] = useState(() => getProjects());
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');
  const [adding, setAdding] = useState(false);

  function handleAdd(e) {
    e.preventDefault();
    const trimmed = newName.trim();
    if (!trimmed) {
      setError('Project name is required.');
      return;
    }
    createProject(trimmed);
    setProjects(getProjects());
    setNewName('');
    setAdding(false);
    setError('');
  }

  function handleDelete(id) {
    deleteProject(id);
    setProjects(getProjects());
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>My Projects</h1>
        {!adding && (
          <button className="btn btn--primary" onClick={() => setAdding(true)}>
            + New Project
          </button>
        )}
      </header>

      {adding && (
        <form className="new-project-form" onSubmit={handleAdd} noValidate>
          <div className="form-group">
            <input
              type="text"
              value={newName}
              onChange={(e) => { setNewName(e.target.value); setError(''); }}
              placeholder="Project name"
              autoFocus
            />
            {error && <span className="form-error">{error}</span>}
          </div>
          <div className="new-project-form__actions">
            <button type="submit" className="btn btn--primary">Create</button>
            <button type="button" className="btn btn--secondary" onClick={() => { setAdding(false); setError(''); setNewName(''); }}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {projects.length === 0 ? (
        <div className="empty-state">
          <p>No projects yet.</p>
          <p>Create one to get started!</p>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
