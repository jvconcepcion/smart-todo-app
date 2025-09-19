import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  addTask: (text: string) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  clearCompleted: () => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (text) => set((state) => ({
        tasks: [...state.tasks, { id: Date.now(), text, completed: false }]
      })),
      toggleTask: (id) => set((state) => ({
        tasks: state.tasks.map(task =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      })),
      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(task => task.id !== id)
      })),
      clearCompleted: () => set((state) => ({
        tasks: state.tasks.filter(task => !task.completed)
      })),
    }),
    {
      name: 'smart-todo-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);