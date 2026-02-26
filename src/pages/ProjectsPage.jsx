import { useState, useEffect } from 'react';
import { getProjects, createProject, deleteProject } from '../services/storage';
import ProjectCard from '../components/ProjectCard';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    const trimmed = newName.trim();
    if (!trimmed) {
      setError('Project name is required.');
      return;
    }
    await createProject(trimmed);
    setProjects(await getProjects());
    setNewName('');
    setAdding(false);
    setError('');
  }

  async function handleDelete(id) {
    await deleteProject(id);
    setProjects(await getProjects());
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

      {loading ? (
        <div className="empty-state"><p>Loading...</p></div>
      ) : projects.length === 0 ? (
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
