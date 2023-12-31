import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Paper, Modal, Box } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

import axios from 'axios';

import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const ContainerStyled = styled(Container)({
  marginTop: theme.spacing(4),
});

const PaperStyled = styled(Paper)({
  padding: theme.spacing(3),
});

const FormStyled = styled('form')({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
});

const TaskListStyled = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: theme.spacing(2, 0),
});

const TaskItemStyled = styled('li')({
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  border: '1px solid #ccc',
  borderRadius: '4px',
  marginBottom: theme.spacing(2),
});

const ButtonContainerStyled = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(1),
});

function App() {

  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const [editTask, setEditTask] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedTaskName, setEditedTaskName] = useState('');
  const [editedTaskDescription, setEditedTaskDescription] = useState('');

  useEffect(() => {

    const fetchTasks = async () => {

      try {

        const response = await axios.get('https://18.230.70.46:8000/api/tasks/');

        const fetchedTasks = response.data;

        if (fetchedTasks && fetchedTasks.length > 0) {
          setTasks(fetchedTasks)
        }
  
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    };

    fetchTasks();

  }, []);


  const handleAddTask = async (event) => {
    event.preventDefault();

    if (!taskName || !taskDescription) {
      alert('Por favor, preencha o nome e a descrição da tarefa.');
      return;
    }

    try {

      const response = await axios.post('https://18.230.70.46:8000/api/tasks/', { 

        name: taskName, 
        description: taskDescription, 
        status: false 
      });

      setTasks([...tasks, response.data]);
      setTaskName('');
      setTaskDescription('');

    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  const handleTaskStatusChange = async (taskId, isCompleted) => {

    try {

      const taskToUpdate = tasks.find((task) => task.id === taskId);

      await axios.put(`https://18.230.70.46:8000/api/tasks/${taskId}`, {
        name: taskToUpdate.name,
        description: taskToUpdate.description,
        status: isCompleted
      });

      setTasks((prevTasks) => 
      prevTasks.map((task) =>
      task.id === taskId ? { ...task, status: isCompleted }
      : task ))

    } catch (error) {

      console.error('Erro ao atualizar o status da tarefa:', error);
    }
  };

  const handleEditTask = async (task) => {

    setEditTask(task);
    setEditedTaskName(task.name);
    setEditedTaskDescription(task.description);
    setEditModalOpen(true);

  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  }

  const handleEditModalSave = async () => {

    try {

      await axios.put(`https://18.230.70.46:8000/api/tasks/${editTask.id}`, {
        name: editedTaskName,
        description: editedTaskDescription,
        status: editTask.completed
      });

      setTasks((prevTasks) => 
      prevTasks.map((task) =>
      task.id === editTask.id
      ? {...task, name: editedTaskName, description: editedTaskDescription }
      : task ))

    } catch (error) {

      console.log('Erro ao atualizar tarefa: ', error);
    }

    setEditModalOpen(false);
  }

  const handleDeleteTask = async (index) => {
    const updatedTasks = tasks.filter((task) => task.id !== index);
  
    setTasks(updatedTasks);

    try {

      await axios.delete(`https://18.230.70.46:8000/api/tasks/${index}`)

    } catch (error) {
      console.log('Erro ao deletar tarefa: ', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
    <ContainerStyled maxWidth='md'>

      <PaperStyled>

        <Typography variant='h4' gutterBottom>
          Controle de tarefas
        </Typography>

        <FormStyled onSubmit={handleAddTask}>

          <TextField
          label='Nome da tarefa'
          variant='outlined'
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          />

          <TextField
          label='Descrição da tarefa'
          variant='outlined'
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          />

          <Button type='submit' variant='contained' color='primary'>
            Adicionar
          </Button>

        </FormStyled>

        <TaskListStyled>

      {tasks.map((task) => (
        <TaskItemStyled key={task.id}>
          <Typography variant="body1" align="center">
            <strong>{task.name}</strong>
          </Typography>
          {task.description && (
            <Typography variant="body2" align="center">
              {task.description}
            </Typography>
          )}
          <ButtonContainerStyled>

            {!task.status? (

              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleTaskStatusChange(task.id, true)}
              >
                Concluir
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleTaskStatusChange(task.id, false)}
              >
                Reabrir
              </Button>
            )}

            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleEditTask(task)}
            >
              Editar
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDeleteTask(task.id)}>
              Excluir
              </Button>
            </ButtonContainerStyled>

          </TaskItemStyled>
        ))}
        <Modal open={editModalOpen} onClose={handleEditModalClose}>

          <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}>

          <Typography variant="h6">Editar Tarefa</Typography>

          <form>
            <TextField
              label="Nome da Tarefa"
              value={editedTaskName}
              onChange={(e) => setEditedTaskName(e.target.value)}
              fullWidth
              margin="normal"
            />

            <Box sx={{ mb: 2 }} />

            <TextField
              label="Descrição da Tarefa"
              value={editedTaskDescription}
              onChange={(e) => setEditedTaskDescription(e.target.value)}
              multiline
              rows={1}
              fullWidth
              margin="normal"/>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>

              <Button variant="contained" color="primary" onClick={handleEditModalSave}>
                Salvar
              </Button>
              <Button variant="outlined" color="primary" onClick={handleEditModalClose}>
                Cancelar
              </Button>
              </Box>
              
            </form>
          </Box>
        </Modal>
        </TaskListStyled>
        </PaperStyled>
        </ContainerStyled>
        </ThemeProvider>
  );
}

export default App;
