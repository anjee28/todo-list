import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProject, getTasks, createTask, updateTask, deleteTask } from '../services/storage';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';

const PRIORITY_ORDER = { high: 0, normal: 1, low: 2 };

function sortTasks(tasks) {
  return [...tasks].sort((a, b) => {
    const pd = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
    if (pd !== 0) return pd;
    if (!a.deadline) return 1;
    if (!b.deadline) return -1;
    return new Date(a.deadline) - new Date(b.deadline);
  });
}

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = getProject(id);

  const [tasks, setTasks] = useState(() => sortTasks(getTasks(id)));
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  if (!project) {
    return (
      <div className="page">
        <div className="empty-state">
          <p>Project not found.</p>
          <button className="btn btn--primary" onClick={() => navigate('/')}>Back to Projects</button>
        </div>
      </div>
    );
  }

  function openAddModal() {
    setEditingTask(null);
    setModalOpen(true);
  }

  function openEditModal(task) {
    setEditingTask(task);
    setModalOpen(true);
  }

  function handleSave(formData) {
    if (editingTask) {
      updateTask({ ...editingTask, ...formData });
    } else {
      createTask({ ...formData, projectId: id });
    }
    setTasks(sortTasks(getTasks(id)));
    setModalOpen(false);
    setEditingTask(null);
  }

  function handleDelete(taskId) {
    deleteTask(taskId);
    setTasks(sortTasks(getTasks(id)));
  }

  return (
    <div className="page">
      <header className="page-header">
        <div className="page-header__left">
          <button className="btn-back" onClick={() => navigate('/')} aria-label="Back to projects">
            ← Projects
          </button>
          <h1>{project.name}</h1>
        </div>
        <button className="btn btn--primary" onClick={openAddModal}>
          + Add Task
        </button>
      </header>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks yet.</p>
          <p>Add your first task to get started!</p>
        </div>
      ) : (
        <div className="tasks-list">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <TaskModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingTask(null); }}
        onSave={handleSave}
        initialTask={editingTask}
      />
    </div>
  );
}
