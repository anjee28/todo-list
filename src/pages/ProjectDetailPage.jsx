import { useState, useEffect } from 'react';
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

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    Promise.all([getProject(id), getTasks(id)])
      .then(([proj, taskList]) => {
        if (!proj) { setNotFound(true); return; }
        setProject(proj);
        setTasks(sortTasks(taskList));
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function refreshTasks() {
    const taskList = await getTasks(id);
    setTasks(sortTasks(taskList));
  }

  function openAddModal() {
    setEditingTask(null);
    setModalOpen(true);
  }

  function openEditModal(task) {
    setEditingTask(task);
    setModalOpen(true);
  }

  async function handleSave(formData) {
    if (editingTask) {
      await updateTask({ ...editingTask, ...formData });
    } else {
      await createTask({ ...formData, projectId: id });
    }
    await refreshTasks();
    setModalOpen(false);
    setEditingTask(null);
  }

  async function handleDelete(taskId) {
    await deleteTask(taskId);
    await refreshTasks();
  }

  if (loading) {
    return <div className="page"><div className="empty-state"><p>Loading...</p></div></div>;
  }

  if (notFound) {
    return (
      <div className="page">
        <div className="empty-state">
          <p>Project not found.</p>
          <button className="btn btn--primary" onClick={() => navigate('/')}>Back to Projects</button>
        </div>
      </div>
    );
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
