import React, { useCallback } from 'react';
import { useTaskStore } from '@/stores/taskStore';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';
import type { TodoItemProps } from '@/types';

const TodoItem: React.FC<TodoItemProps> = ({ task }) => {
  const { toggleTask, deleteTask } = useTaskStore();

  const handleToggle = useCallback(() => toggleTask(task.id), [task.id, toggleTask]);
  const handleDelete = useCallback(() => deleteTask(task.id), [task.id, deleteTask]);

  return (
    <div className="flex items-center border-b border-slate-700 p-4 group">
      <Checkbox
        id={`task-${task.id}`}
        checked={task.completed}
        onCheckedChange={handleToggle}
        className="h-6 w-6"
      />
      <label
        htmlFor={`task-${task.id}`}                                                                                                                                             
        className={`flex-grow mx-4 text-lg transition-colors ${task.completed ? 'line-through text-slate-500' : 'text-slate-300'}`}
      >
        {task.text}
      </label>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        className="text-slate-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TodoItem;
