import { useState } from 'react';

const EMPTY_FORM = { name: '', description: '', deadline: '', priority: 'normal' };

function TaskForm({ initialTask, onClose, onSave }) {
  const [form, setForm] = useState(initialTask ? { ...initialTask } : EMPTY_FORM);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Task name is required.';
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onSave({ ...form, name: form.name.trim(), description: form.description.trim() });
  }

  return (
    <form className="modal__form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="task-name">Task Name *</label>
        <input
          id="task-name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Write unit tests"
          autoFocus
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="task-description">Description</label>
        <textarea
          id="task-description"
          name="description"
          rows={3}
          value={form.description}
          onChange={handleChange}
          placeholder="Optional details..."
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="task-deadline">Deadline</label>
          <input
            id="task-deadline"
            name="deadline"
            type="date"
            value={form.deadline}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-priority">Priority</label>
          <select
            id="task-priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="modal__footer">
        <button type="button" className="btn btn--secondary" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn btn--primary">
          {initialTask ? 'Save Changes' : 'Add Task'}
        </button>
      </div>
    </form>
  );
}

export default function TaskModal({ isOpen, onClose, onSave, initialTask }) {
  if (!isOpen) return null;

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal__header">
          <h2 id="modal-title">{initialTask ? 'Edit Task' : 'New Task'}</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>
        <TaskForm
          key={initialTask?.id ?? 'new'}
          initialTask={initialTask}
          onClose={onClose}
          onSave={onSave}
        />
      </div>
    </div>
  );
}
