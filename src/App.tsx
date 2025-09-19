import TodoApp from '@/components/TodoApp';
import { ThemeProvider } from '@/contexts/themeContext';

export default function App() {
  return (
    <ThemeProvider>
      <div className="bg-slate-900 min-h-screen font-sans flex justify-center items-start p-4 sm:p-8">
        <TodoApp />
      </div>
    </ThemeProvider>
  );
}

