import React from 'react';
import axios from 'axios';
import './style/style.css';

const TaskList = ({ tasks, onEditTask, onCompleteTask, onDeleteTask }) => {

  const handleEdit = async (task) => {

    const newName = prompt('Editar nome da tarefa: ', task.name);

    if (newName !== null) {

      try {

        await axios.put(`http://127.0.0.1:8000/api/tasks/${task.id}`, {
          name: newName,
        });
        
        onEditTask(task.id, newName)

      } catch (error) {

        console.error('Erro ao editar tarefa: ', error);

      }
    }
  };

  const handleComplete = async (task, isCompleted) => {

    const confirmation = window.confirm(
      'Tem certeza de que deseja concluir esta tarefa?'
    );

    if (confirmation) {
      onCompleteTask(task, true);
    }
  }

  const handleDelete = async (task) => {

    const confirmation = window.confirm(
      `Tem certeza de que deseja excluir esta tarefa?`
    );

    if (confirmation) {

      try {

        await axios.delete(`http://127.0.0.1:8000/api/tasks/${task.id}`);

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

          <div>
            <strong>{task.name}</strong>
            {task.description && <p>{task.description}</p>}
          </div>

          <div>

            {task.completed ? (
              <button className="reabrir" onClick={() => handleComplete(task, false)}>Reabrir</button>
            ) : (
              <button className="finalizar" onClick={() => handleComplete(task, true)}>Concluir</button>
            )}

          </div>

          {task.name}

          <button className="editar" onClick={() => handleEdit(task)}>Editar</button>
          <button className="excluir" onClick={() => handleDelete(task)}>Excluir</button>

        </li>
        
      ))}

    </ul>
  );
};

export default TaskList;
