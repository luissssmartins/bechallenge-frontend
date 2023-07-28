import React from 'react';

const TaskList = ({ tasks, handleEdit, handleDelete }) => {
  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          {task}
          <button onClick={() => handleEdit(index)}>Editar</button>
          <button onClick={() => handleDelete(index)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
