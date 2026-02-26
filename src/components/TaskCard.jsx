const PRIORITY_LABELS = { low: 'Low', normal: 'Normal', high: 'High' };

export default function TaskCard({ task, onEdit, onDelete }) {
  function handleDelete() {
    if (confirm(`Delete task "${task.name}"?`)) {
      onDelete(task.id);
    }
  }

  const isOverdue = task.deadline && new Date(task.deadline) < new Date(new Date().toDateString());

  return (
    <div className={`task-card task-card--${task.priority}`}>
      <div className="task-card__header">
        <span className={`priority-badge priority-badge--${task.priority}`}>
          {PRIORITY_LABELS[task.priority] ?? task.priority}
        </span>
        <div className="task-card__actions">
          <button className="btn-icon" onClick={() => onEdit(task)} aria-label="Edit task">
            ✏️
          </button>
          <button className="btn-icon btn-icon--danger" onClick={handleDelete} aria-label="Delete task">
            🗑️
          </button>
        </div>
      </div>

      <h3 className="task-card__name">{task.name}</h3>

      {task.description && (
        <p className="task-card__description">{task.description}</p>
      )}

      {task.deadline && (
        <p className={`task-card__deadline${isOverdue ? ' task-card__deadline--overdue' : ''}`}>
          Due: {new Date(task.deadline + 'T00:00:00').toLocaleDateString()}
          {isOverdue && ' — Overdue'}
        </p>
      )}
    </div>
  );
}
