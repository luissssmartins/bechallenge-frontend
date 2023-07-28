import React, { useEffect, useState } from 'react';
import axios from 'axios';

import TaskForm from './components/task/form/TaskForm';
import TaskList from './components/task/list/TaskList';

import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/tasks/');

      setTasks(response.data)

    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  }

  const addTask = (taskName) => {
    setTasks([...tasks, taskName]);
  };

  const handleEdit = (index, newTask) => {
    const updatedTasks = tasks.map((tasks) =>
      tasks.id === index? { ...tasks, name: newTask } : tasks
    );

    setTasks(updatedTasks);
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((tasks) => tasks.id !== index);

    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Controle de tarefas</h1>

      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} handleEdit={handleEdit} handleDelete={handleDelete} />

    </div>
  );
}

export default App;
