import React, { useState } from 'react';
import axios from 'axios';

import './style/style.css';

const TaskForm = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('')

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (taskName.trim() === '') {
      alert('Por favor, insira o nome da tarefa!')
      return;
    }

    try {

      const response = await axios.post('http://127.0.0.1:8000/api/tasks/', {
        name: taskName,
        description: taskDescription,
      });

      onAddTask(response.data)

      setTaskName('')

    } catch (error) {
      console.error('Erro ao adicionar tarefa: ', error)
    }
    
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
