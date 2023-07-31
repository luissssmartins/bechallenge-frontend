import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('')

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (taskName.trim() === '' || taskDescription.trim() === '') {
      alert('Por favor, insira o nome e descrição da tarefa.')
      return;
    }

    try {

      const response = await axios.post('http://127.0.0.1:8000/api/tasks/', {
        name: taskName,
        description: taskDescription,
        status: false
      });

      onAddTask(response.data)

      setTaskName('')
      setTaskDescription('')

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
      
      <textarea
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Descrição da tarefa"
      />

      <button className="add" type="submit">Adicionar</button>

    </form>
  );
};

export default TaskForm;
