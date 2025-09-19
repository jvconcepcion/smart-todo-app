import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme, useTodo } from '@/hooks';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import TodoItem from '@/components/TodoItem';

const TodoApp: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const {
    inputRef,
    newTask,
    filter,
    filteredTasks,
    activeTaskCount,
    setNewTask,
    setFilter,
    handleAddTask,
    clearCompleted
  } = useTodo();

  return (
    <main className="w-full max-w-2xl">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
          Smart ToDo
        </h1>
        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <Sun /> : <Moon />}
        </Button>
      </header>

      <form onSubmit={handleAddTask} className="mb-6">
        <Input ref={inputRef} value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Add a new todo..." className="py-6 px-5 text-lg" />
      </form>

      <Card>
        <CardContent className="p-0">
          {filteredTasks.length > 0 ? filteredTasks.map(task => <TodoItem key={task.id} task={task} />) : <p className="p-5 text-slate-500">No todos found...</p>}
        </CardContent>
        <div className="flex justify-between items-center p-5 text-slate-500 text-sm">
          <span>{activeTaskCount} items left</span>
          <div className="hidden sm:flex space-x-2">
            <Button variant="ghost" onClick={() => setFilter('all')} className={filter === 'all' ? 'text-cyan-500' : ''}>All</Button>
            <Button variant="ghost" onClick={() => setFilter('active')} className={filter === 'active' ? 'text-cyan-500' : ''}>Active</Button>
            <Button variant="ghost" onClick={() => setFilter('completed')} className={filter === 'completed' ? 'text-cyan-500' : ''}>Completed</Button>
          </div>
          <Button variant="ghost" onClick={clearCompleted}>Clear Completed</Button>
        </div>
      </Card>

      <Card className="sm:hidden mt-6 p-4">
        <div className="flex justify-center space-x-6">
          <Button variant="ghost" onClick={() => setFilter('all')} className={filter === 'all' ? 'text-cyan-500' : ''}>All</Button>
          <Button variant="ghost" onClick={() => setFilter('active')} className={filter === 'active' ? 'text-cyan-500' : ''}>Active</Button>
          <Button variant="ghost" onClick={() => setFilter('completed')} className={filter === 'completed' ? 'text-cyan-500' : ''}>Completed</Button>
        </div>
      </Card>
    </main>
  );
}

export default TodoApp;