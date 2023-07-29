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

  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  }

  const handleEditTask = (index, newName) => {
    
    const updatedTasks = tasks.map((task) =>
      task.id === index? { ...task, name: newName } : task
    );

    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((task) => task.id !== index);

    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Controle de tarefas</h1>

      <TaskForm addTask={handleAddTask} />
      <TaskList tasks={tasks} handleEdit={handleEditTask} handleDelete={handleDeleteTask} />

    </div>
  );
}

export default App;
