function createTask(text) {
  const trimmed = text.trim();
  if (!trimmed) {
    throw new Error('Task cannot be empty');
  }

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    text: trimmed,
    done: false,
    createdAt: new Date().toISOString()
  };
}

function toggleTask(tasks, id) {
  return tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task));
}

function updateTask(tasks, id, newText) {
  const trimmed = newText.trim();
  if (!trimmed) {
    throw new Error('Updated task cannot be empty');
  }

  return tasks.map((task) => (task.id === id ? { ...task, text: trimmed } : task));
}

function removeTask(tasks, id) {
  return tasks.filter((task) => task.id !== id);
}

function filterTasks(tasks, filter) {
  if (filter === 'active') {
    return tasks.filter((task) => !task.done);
  }

  if (filter === 'done') {
    return tasks.filter((task) => task.done);
  }

  return tasks;
}

module.exports = {
  createTask,
  toggleTask,
  updateTask,
  removeTask,
  filterTasks
};
