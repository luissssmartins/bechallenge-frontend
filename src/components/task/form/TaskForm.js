import React, { useState } from 'react';
import axios from 'axios';

import './style/style.css';

const TaskForm = ({ addTask }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskName.trim() === '') return;
    axios.post('http://127.0.0.1:8000/api/tasks/', { name: taskName }).then((response) => {

      addTask(response.data);
      setTaskName('');

    }).catch((error) => {
        console.error('Erro ao adicionar a tarefa:', error);
    });


    addTask(taskName);
    setTaskName('');

  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Nome da tarefa"
      />

      <button className="enviar" type="submit">Adicionar</button>

    </form>
  );
};

export default TaskForm;
