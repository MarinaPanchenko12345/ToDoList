import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { generateId } from "../helpers/helpers";

interface Task {
  id: string;
  title: string;
  createdAt: number;
  isCompleted: boolean;
}

interface ToDoStore {
  tasks: Task[];
  createTask: (title: string) => void;
  updateTask: (id: string, title: string) => void;
  removeTask: (id: string) => void;
  completedTask: (id: string) => void;
}

export const useToDoStore = create<ToDoStore>()(
  persist(
    devtools((set, get) => ({
      tasks: [],

      createTask: (title: string) => {
        const { tasks } = get();
        const newTask: Task = {
          id: generateId(),
          title,
          createdAt: Date.now(),
          isCompleted: false,
        };
        set({ tasks: [...tasks, newTask] }, false, "createTask");
      },

      updateTask: (id: string, title: string) => {
        const { tasks } = get();
        set(
          {
            tasks: tasks.map((task) =>
              task.id === id ? { ...task, title } : task
            ),
          },
          false,
          "updateTask"
        );
      },

      removeTask: (id: string) => {
        const { tasks } = get();
        set(
          {
            tasks: tasks.filter((task) => task.id !== id),
          },
          false,
          "removeTask"
        );
      },

      completedTask: (id: string) => {
        const { tasks } = get();
        set(
          {
            tasks: tasks.map((task) =>
              task.id === id
                ? { ...task, isCompleted: !task.isCompleted }
                : task
            ),
          },
          false,
          "toggleTaskCompleted"
        );
      },
    })),
    {
      name: "todo-storage",
    }
  )
);
