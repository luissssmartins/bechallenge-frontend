import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim() === '') return;
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
      <button type="submit">Adicionar</button>

    </form>
  );
};

export default TaskForm;
