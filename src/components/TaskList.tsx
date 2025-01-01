import React from 'react';
import { Task } from '@/types/task';

interface TaskListProps {
  tasks: Task[];
  onUpdate: (id: number, status: string) => void;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdate, onDelete }) => {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <button onClick={() => onUpdate(task.id, 'IN_PROGRESS')}>Mark In Progress</button>
          <button onClick={() => onUpdate(task.id, 'DONE')}>Mark Done</button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
