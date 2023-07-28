import React, { useState } from 'react';
import TaskForm from './components/task/form/TaskForm';
import TaskList from './components/task/list/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (taskName) => {
    setTasks([...tasks, taskName]);
  };

  const handleEdit = (index) => {
    const updatedTask = prompt('Editar tarefa:', tasks[index]);
    if (updatedTask !== null && updatedTask.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[index] = updatedTask;
      setTasks(updatedTasks);
    }
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} handleEdit={handleEdit} handleDelete={handleDelete} />
    </div>
  );
}

export default App;
