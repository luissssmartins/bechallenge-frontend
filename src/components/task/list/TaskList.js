import React from 'react';

import './style/style.css';

const TaskList = ({ tasks, handleEdit, handleDelete }) => {
  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          {task}
          <button class="editar" onClick={() => handleEdit(index)}>Editar</button>
          <button class="excluir" onClick={() => handleDelete(index)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
