'use client';

import React from 'react';
import TaskList from "@/components/taskList/TaskList";
import { getTasks } from "@/services/api";
import { Task } from "@/types/task";
import { useEffect, useState } from "react";


const HomePage: React.FC = () => {
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
        <TaskList tasks={tasks}  />
      </div>
    );
};

export default HomePage;




