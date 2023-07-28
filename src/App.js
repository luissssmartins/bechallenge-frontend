import React, { useState } from 'react';
import axios from 'axios';

import TaskForm from './components/task/form/TaskForm';
import TaskList from './components/task/list/TaskList';

import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (taskName) => {
    setTasks([...tasks, taskName]);
  };

  const handleEdit = (index) => {
    const updatedTask = prompt('Editar tarefa:', tasks[index]);
    if (updatedTask !== null && updatedTask.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[index] = updatedTask;
      setTasks(updatedTasks);
    }
  };

  const handleDelete = (index) => {
    const taskId = tasks[index].id;

    axios.delete(`http://192.168.1.214:8000/api/tasks/${taskId}/`)
      .then(() => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.error('Erro ao excluir a tarefa:', error);
      });
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
