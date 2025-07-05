import React, { useState, useEffect, Suspense, lazy } from 'react';
import Login from './components/Login';
import TaskFilter from './components/TaskFilter';
import { saveTasks, loadTasks } from './utils/localStorage';
import './styles/App.css';

const TaskForm = lazy(() => import('./components/TaskForm'));
const TaskList = lazy(() => import('./components/TaskList'));

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (username) {
      const userTasks = loadTasks(username);
      setTasks(userTasks);
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      saveTasks(username, tasks);
    }
  }, [tasks, username]);

  const handleLogin = (name) => {
    setUsername(name);
    localStorage.setItem('username', name);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername('');
    setTasks([]);
  };

  const addTask = (task) => setTasks([...tasks, task]);

  const deleteTask = (id) => setTasks(tasks.filter(task => task.id !== id));

  const toggleTask = (id) => setTasks(
    tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task)
  );

  const editTask = (id, newTitle, newDescription, newPriority, newDueDate, newCategory) => {
    setTasks(tasks.map(task =>
      task.id === id ? {
        ...task,
        title: newTitle,
        description: newDescription,
        priority: newPriority,
        dueDate: newDueDate,
        category: newCategory
      } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter =
      filter === 'All' ||
      (filter === 'Completed' && task.completed) ||
      (filter === 'Pending' && !task.completed);
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const taskCounts = {
    all: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    pending: tasks.filter(task => !task.completed).length,
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      {username ? (
        <div>
          <header className="header">
            <h1>Personal Task Tracker</h1>
            <h2>Welcome, {username}!</h2>
            <button aria-label="Logout Button" onClick={handleLogout}>Logout</button>
            <button aria-label="Toggle Dark Mode" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </header>

          <label htmlFor="search" className="sr-only">Search Tasks</label>
          <input
            id="search"
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-box"
          />

          <Suspense fallback={<p>Loading Task Form...</p>}>
            <TaskForm onAddTask={addTask} />
          </Suspense>

          <TaskFilter
            currentFilter={filter}
            onChangeFilter={setFilter}
            taskCounts={taskCounts}
          />

          <Suspense fallback={<p>Loading Tasks...</p>}>
            <TaskList
              tasks={filteredTasks}
              onDeleteTask={deleteTask}
              onToggleTask={toggleTask}
              onEditTask={editTask}
            />
          </Suspense>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
