import styles from "./index.module.scss";
import { useToDoStore } from "../store/useToDoStore";
import AddNewTask from "../components/add_task/AddNewTask";
import ControlTask from "../components/control_task/ControlTask";
import { useState } from "react";
import { Pagination, Stack } from "@mui/material";

function App() {
  const tasks = useToDoStore((state) => state.tasks);
  const createTask = useToDoStore((state) => state.createTask);
  const updateTask = useToDoStore((state) => state.updateTask);
  const removeTask = useToDoStore((state) => state.removeTask);
  const completedTask = useToDoStore((state) => state.completedTask);
  const [page, setPage] = useState(1);
  const tasksPerPage = 9;

  const indexOfLastTask = page * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <div className={styles.todo}>
      <h1 className={styles.todoTitle}>To Do List</h1>
      <AddNewTask
        onAdd={(title) => {
          if (title) {
            createTask(title);
          }
        }}
      />
      {tasks.length === 0 && (
        <div className={styles.todoText}>
          <p>There is no tasks</p>
          <img
            src='/public/page-concept.png'
            alt='No tasks'
            className={styles.emptyImage}
          />
        </div>
      )}
      <div className={styles.taskList}>
        {currentTasks.map((task) => (
          <ControlTask
            key={task.id}
            id={task.id}
            title={task.title}
            isCompleted={task.isCompleted}
            onDone={completedTask}
            onEdit={updateTask}
            onRemove={removeTask}
          />
        ))}
      </div>
      {tasks.length > 0 && (
        <Stack spacing={2} className={styles.todoPagination}>
          <Pagination
            count={Math.ceil(tasks.length / tasksPerPage)}
            page={page}
            onChange={handleChangePage}
            color='secondary'
          />
        </Stack>
      )}
    </div>
  );
}

export default App;
