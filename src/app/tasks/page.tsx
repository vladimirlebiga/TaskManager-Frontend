'use client'

import React, { useState, useEffect } from 'react';
import { getTasks } from '@/services/api';
import TaskList from '@/components/TaskList';
import { Task } from '@/types/task';

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Your Tasks</h2>
      <TaskList tasks={tasks} onUpdate={() => {}} onDelete={() => {}} />
    </div>
  );
};

export default TasksPage;