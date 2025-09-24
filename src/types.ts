// zustand types

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export interface TaskState {
  tasks: Task[];
  addTask: (text: string) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  clearCompleted: () => void;
}

// themecontext

export type Theme = 'dark' | 'light';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
};

// todo item props
export interface TodoItemProps {
  task: Task;
}

// test-utils

export interface AllTheProviderProps {
  children: React.ReactNode
}