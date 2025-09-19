import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useTaskStore } from '@/stores/taskStore';

export default function useTodo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { tasks, addTask, clearCompleted } = useTaskStore();

  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');


  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    addTask(newTask);
    setNewTask('');
  };

  const filteredTasks = useMemo(() => {
    if (filter === 'active') return tasks.filter(task => !task.completed);
    if (filter === 'completed') return tasks.filter(task => task.completed);
    return tasks;
  }, [tasks, filter]);

  const activeTaskCount = useMemo(() => tasks.filter(task => !task.completed).length, [tasks]);

  return {
    // ref
    inputRef,

    // derived state
    newTask,
    filter,

    // state setters & handlers
    setFilter,
    setNewTask,
    handleAddTask,

    // zustand
    clearCompleted,

    // memoized value
    filteredTasks,
    activeTaskCount,
  }
}