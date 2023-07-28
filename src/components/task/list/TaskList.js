import React from 'react';

import './style/style.css';

const TaskList = ({ tasks, handleEdit, handleDelete }) => {

  const handleEdit = async (tasks) => {

    const newTask = prompt('Editar nome da tarefa: ', tasks.name);

    if (newTask !== null) {

      try {

        await axios.put(`/api/tasks/${task.id}`, {
          name: newTask
        });
        
        handleEdit(task.id, newTask)

      } catch (error) {
        console.error('Erro ao editar tarefa: ', error);
      }
    }
  }

  const handleDelete = async (task) => {

    const confirmation = window.confirm(
      `Tem certeza de que deseja excluir esta tarefa?`
    );

    if (confirmation) {

      try {

        await axios.delete(`http://127.0.0.1:8000/api/tasks/${task.id}`);

        handleDelete(task);


      } catch (error) {
        
        console.error('Erro ao excluir tarefa: ', error);
      }
    }
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task}
          <button className="editar" onClick={() => handleEdit(task)}>Editar</button>
          <button className="excluir" onClick={() => handleDelete(task)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
