import { useState } from 'react';

function TaskItem({ task, onToggle, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSave = async () => {
    const trimmed = editTitle.trim();
    if (!trimmed || isUpdating) return;
    if (trimmed === task.title) {
      setIsEditing(false);
      return;
    }

    setIsUpdating(true);
    try {
      await onUpdate(task._id, trimmed);
      setIsEditing(false);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await onDelete(task._id);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggle = async () => {
    await onToggle(task._id, task.completed);
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          className="task-checkbox"
          aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
        />

        {isEditing ? (
          <div className="task-edit">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') handleCancel();
              }}
              className="edit-input"
              autoFocus
            />
            <div className="edit-actions">
              <button
                onClick={handleSave}
                disabled={!editTitle.trim() || isUpdating}
                className="save-btn"
              >
                {isUpdating ? 'Saving...' : 'Save'}
              </button>
              <button onClick={handleCancel} className="cancel-btn" disabled={isUpdating}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="task-info">
            <span className="task-title">{task.title}</span>
            <span className="task-date">{formatDate(task.createdAt)}</span>
          </div>
        )}
      </div>

      {!isEditing && (
        <div className="task-actions">
          <button
            onClick={() => setIsEditing(true)}
            className="edit-btn"
            aria-label={`Edit task: ${task.title}`}
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="delete-btn"
            aria-label={`Delete task: ${task.title}`}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      )}
    </li>
  );
}

export default TaskItem;
