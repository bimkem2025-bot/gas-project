const STORAGE_KEY = 'gas-project.tasks.v1';

const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const filterButtons = document.querySelectorAll('.filters button');
const healthStatus = document.getElementById('healthStatus');

let tasks = loadTasks();
let currentFilter = 'all';

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function applyFilter() {
  if (currentFilter === 'active') return tasks.filter((task) => !task.done);
  if (currentFilter === 'done') return tasks.filter((task) => task.done);
  return tasks;
}

function render() {
  const visibleTasks = applyFilter();
  taskList.innerHTML = '';

  visibleTasks.forEach((task) => {
    const item = document.createElement('li');
    item.className = `task-item ${task.done ? 'done' : ''}`;
    item.innerHTML = `
      <input type="checkbox" ${task.done ? 'checked' : ''} aria-label="toggle task" />
      <span class="task-text"></span>
      <button class="icon-btn edit" type="button">Edit</button>
      <button class="icon-btn delete" type="button">Hapus</button>
    `;

    item.querySelector('.task-text').textContent = task.text;

    item.querySelector('input').addEventListener('change', () => {
      task.done = !task.done;
      saveTasks();
      render();
    });

    item.querySelector('.edit').addEventListener('click', () => {
      const newText = prompt('Edit task:', task.text);
      if (newText === null) return;
      const trimmed = newText.trim();
      if (!trimmed) return alert('Task tidak boleh kosong.');
      task.text = trimmed;
      saveTasks();
      render();
    });

    item.querySelector('.delete').addEventListener('click', () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      render();
    });

    taskList.appendChild(item);
  });

  emptyState.style.display = visibleTasks.length ? 'none' : 'block';
}

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.unshift({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    text,
    done: false
  });

  taskInput.value = '';
  saveTasks();
  render();
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((b) => b.classList.remove('active'));
    button.classList.add('active');
    render();
  });
});

async function checkHealth() {
  try {
    const response = await fetch('/api/health');
    const data = await response.json();
    healthStatus.textContent = data.ok
      ? `Server aktif (${data.service}) - ${new Date(data.timestamp).toLocaleTimeString('id-ID')}`
      : 'Server tidak merespons';
  } catch {
    healthStatus.textContent = 'Gagal menghubungi endpoint /api/health';
  }
}

render();
checkHealth();
