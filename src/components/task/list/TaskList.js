import React from 'react';
import axios from 'axios';
import './style/style.css';

const TaskList = ({ tasks, onEditTask, onDeleteTask }) => {

  const handleEdit = async (task) => {

    const newName = prompt('Editar nome da tarefa: ', task.name);

    if (newName !== null) {

      try {

        await axios.put(`http://127.0.0.1:8000/api/tasks/${task.id}`, {
          name: newName,
        });
        
        onEditTask(tasks.id, newName)

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

        await axios.delete(`http://127.0.0.1:8000/api/tasks/${tasks.id}`);

        onDeleteTask(task.id);


      } catch (error) {
        
        console.error('Erro ao excluir tarefa: ', error);
      }
    }
  }

  return (
    <ul>

      {tasks.map((task) => (

        <li key={task.id}>

          {task.name}

          <button className="editar" onClick={() => handleEdit(task)}>Editar</button>
          <button className="excluir" onClick={() => handleDelete(task)}>Excluir</button>
        </li>
        
      ))}

    </ul>
  );
};

export default TaskList;
