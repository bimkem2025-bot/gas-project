const test = require('node:test');
const assert = require('node:assert/strict');
const {
  createTask,
  toggleTask,
  updateTask,
  removeTask,
  filterTasks
} = require('../src/taskUtils');

test('createTask trims text and creates default task', () => {
  const task = createTask('  Belajar Apps Script  ');

  assert.equal(task.text, 'Belajar Apps Script');
  assert.equal(task.done, false);
  assert.ok(task.id);
  assert.ok(task.createdAt);
});

test('createTask throws when empty', () => {
  assert.throws(() => createTask('  '), /Task cannot be empty/);
});

test('toggleTask flips done state', () => {
  const tasks = [{ id: '1', text: 'A', done: false }];
  const updated = toggleTask(tasks, '1');

  assert.equal(updated[0].done, true);
});

test('updateTask updates text', () => {
  const tasks = [{ id: '1', text: 'A', done: false }];
  const updated = updateTask(tasks, '1', 'B');

  assert.equal(updated[0].text, 'B');
});

test('removeTask removes matching id', () => {
  const tasks = [{ id: '1', text: 'A' }, { id: '2', text: 'B' }];
  const updated = removeTask(tasks, '1');

  assert.deepEqual(updated, [{ id: '2', text: 'B' }]);
});

test('filterTasks handles all modes', () => {
  const tasks = [
    { id: '1', done: false },
    { id: '2', done: true }
  ];

  assert.equal(filterTasks(tasks, 'all').length, 2);
  assert.equal(filterTasks(tasks, 'active').length, 1);
  assert.equal(filterTasks(tasks, 'done').length, 1);
});
