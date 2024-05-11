import { useState } from "react";
import {
  Button,
  TextField,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Box,
  Container,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import backgroundImage from "../../assets/background.jpg";
import { FooterComponents } from "../Footer/Footer.components";

export function TodoComponent() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleToggleTask = (index) => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      newTasks[index].completed = !newTasks[index].completed;
      return newTasks;
    });
  };

  const handleDeleteTask = (index) => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      newTasks.splice(index, 1);
      return newTasks;
    });
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setEditedTaskText(tasks[index].text);
  };

  const handleSaveEditedTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].text = editedTaskText;
    setTasks(newTasks);
    setEditIndex(null);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const remainingTasks = tasks.filter((task) => !task.completed).length;

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Box
          p={4}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "8px",
            textAlign: "center",
            position: "relative",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Lista de Tareas
          </Typography>
          <TextField
            label="Agregar Tarea"
            variant="outlined"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyDown}
            fullWidth
            autoFocus
          />
          <Button variant="contained" onClick={handleAddTask} sx={{ mt: 2 }}>
            Agregar
          </Button>
          <Paper sx={{ mt: 4 }}>
            <List>
              {tasks.map((task, index) => (
                <ListItem key={index} divider>
                  <Checkbox
                    checked={task.completed}
                    onChange={() => handleToggleTask(index)}
                  />
                  {editIndex === index ? (
                    <>
                      <TextField
                        variant="outlined"
                        value={editedTaskText}
                        onChange={(e) => setEditedTaskText(e.target.value)}
                        fullWidth
                      />
                      <Button
                        variant="contained"
                        onClick={() => handleSaveEditedTask(index)}
                        sx={{ ml: 2 }}
                      >
                        Guardar
                      </Button>
                    </>
                  ) : (
                    <>
                      <ListItemText
                        primary={
                          <Typography
                            sx={{
                              textDecoration: task.completed
                                ? "line-through"
                                : "none",
                            }}
                          >
                            {task.text}
                          </Typography>
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleEditTask(index)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDeleteTask(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </>
                  )}
                </ListItem>
              ))}
            </List>
            <Box p={2}>
              <Typography variant="body2" color="textSecondary">
                {completedTasks}{" "}
                {completedTasks === 1
                  ? "tarea completada"
                  : "tareas completadas"}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {remainingTasks}{" "}
                {remainingTasks === 1 ? "tarea pendiente" : "tareas pendientes"}
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
      <FooterComponents remainingTasks={remainingTasks} />
    </Box>
  );
}
