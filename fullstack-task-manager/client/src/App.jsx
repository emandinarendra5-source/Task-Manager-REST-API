import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { fetchTasks, createTask, updateTask, deleteTask } from './services/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreateTask = async (title) => {
    const newTask = await createTask(title);
    setTasks(prev => [...prev, newTask]);
  };

  const handleToggleComplete = async (id, completed) => {
    const updated = await updateTask(id, { completed: !completed });
    setTasks(prev => prev.map(t => t._id === id ? updated : t));
  };

  const handleUpdateTask = async (id, title) => {
    const updated = await updateTask(id, { title });
    setTasks(prev => prev.map(t => t._id === id ? updated : t));
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    setTasks(prev => prev.filter(t => t._id !== id));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
        <p className="subtitle">Organize your work efficiently</p>
      </header>

      <main className="app-main">
        <section className="task-form-section">
          <TaskForm onAdd={handleCreateTask} />
        </section>

        <section className="tasks-section">
          <div className="tasks-header">
            <h2>Tasks</h2>
            <span className="task-count">{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}</span>
          </div>

          {loading && (
            <div className="state-message loading">
              <div className="spinner"></div>
              <p>Loading tasks...</p>
            </div>
          )}

          {error && (
            <div className="state-message error">
              <p><strong>Error:</strong> {error}</p>
              <button onClick={loadTasks} className="retry-btn">Retry</button>
            </div>
          )}

          {!loading && !error && (
            <TaskList
              tasks={tasks}
              onToggle={handleToggleComplete}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
            />
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>Task Manager REST API Demo</p>
      </footer>
    </div>
  );
}

export default App;
