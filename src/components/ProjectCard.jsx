import { useNavigate } from 'react-router-dom';

export default function ProjectCard({ project, onDelete }) {
  const navigate = useNavigate();

  function handleDelete(e) {
    e.stopPropagation();
    if (confirm(`Delete project "${project.name}"? All its tasks will be removed.`)) {
      onDelete(project.id);
    }
  }

  return (
    <div className="project-card" onClick={() => navigate(`/projects/${project.id}`)}>
      <div className="project-card__body">
        <h2 className="project-card__name">{project.name}</h2>
        <p className="project-card__date">
          Created {new Date(project.createdAt).toLocaleDateString()}
        </p>
      </div>
      <button
        className="project-card__delete"
        onClick={handleDelete}
        aria-label="Delete project"
        title="Delete project"
      >
        &times;
      </button>
    </div>
  );
}
