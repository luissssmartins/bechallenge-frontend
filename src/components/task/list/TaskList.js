import React from 'react';
import axios from 'axios';
import './style/style.css';

const TaskList = ({ tasks }) => {

  const handleEdit = async (tasks) => {

    const newTask = prompt('Editar nome da tarefa: ', tasks.name);

    if (newTask !== null) {

      try {

        await axios.put(`/api/tasks/${tasks.id}`, {
          name: newTask
        });
        
        handleEdit(tasks.id, newTask)

      } catch (error) {
        console.error('Erro ao editar tarefa: ', error);
      }
    }
  }

  const handleDelete = async (tasks) => {

    const confirmation = window.confirm(
      `Tem certeza de que deseja excluir esta tarefa?`
    );

    if (confirmation) {

      try {

        await axios.delete(`http://127.0.0.1:8000/api/tasks/${tasks.id}`);

        handleDelete(tasks);


      } catch (error) {
        
        console.error('Erro ao excluir tarefa: ', error);
      }
    }
  }

  return (
    <ul>
      {tasks.map((tasks) => (
        <li key={tasks.id}>
          {tasks}
          <button className="editar" onClick={() => handleEdit(tasks)}>Editar</button>
          <button className="excluir" onClick={() => handleDelete(tasks)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
