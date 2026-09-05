const API_BASE = '/api/tasks';

export const fetchTasks = async () => {
  const response = await fetch(API_BASE);
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to fetch tasks' }));
    throw new Error(error.message || 'Failed to fetch tasks');
  }
  return response.json();
};

export const createTask = async (title) => {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, completed: false }),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to create task' }));
    throw new Error(error.message || 'Failed to create task');
  }
  return response.json();
};

export const updateTask = async (id, data) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to update task' }));
    throw new Error(error.message || 'Failed to update task');
  }
  return response.json();
};

export const deleteTask = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to delete task' }));
    throw new Error(error.message || 'Failed to delete task');
  }
  return response.json();
};
