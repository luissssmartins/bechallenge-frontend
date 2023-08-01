import React, { useState } from 'react';
import axios from 'axios';

const TaskList = ({tasks, onEditTask, onDeleteTask }) => {
  
  const [localTasks, setLocalTasks] = useState(tasks)

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

  const handleComplete = async (taskId, isCompleted) => {

    try {

      const task = localTasks.find((task) => task.id === taskId);

      if (!task) {
        console.error('Tarefa não encontrada ao tentar atualizar o status:', taskId);
        return;
      }

      const updatedTask = { ...localTasks[task], name: task.name, description: task.description, status: isCompleted };

      const response = await axios.put(`http://localhost:8000/api/tasks/${taskId}`, updatedTask);

      const updatedTasks = [...localTasks]

      updatedTasks[task] = response.data

      setLocalTasks(updatedTasks)

    } catch (error) {
      console.error('Erro ao atualizar o status da tarefa: ', error);
    }
  };

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

      {localTasks.map((task) => (

        <li key={task.id}>

          <div>
            <strong>{task.name}</strong>
          </div>

          {task.description && (

            <div>
              
             <textarea
               rows="3"
               readOnly
               value={task.description}
               style={{ width: '100%', resize: 'none', backgroundColor: '#f9f9f9'}}
             />

            </div>
          )}

          <div>

            {!task.completed ? (
              <button className="complete" onClick={() => handleComplete(task.id, true)}>Concluir</button>
            ) : (
              <button className="reopen" onClick={() => handleComplete(task.id, false)}>Reabrir</button>
            )}

          </div>

          <button className="edit" onClick={() => handleEdit(task)}>Editar</button>
          <button className="delete" onClick={() => handleDelete(task)}>Excluir</button>

        </li>
        
      ))}

    </ul>
  );
};

export default TaskList;
