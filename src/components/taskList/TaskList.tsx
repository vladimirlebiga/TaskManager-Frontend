import React from 'react';
import { Task } from '@/types/task';
import { Button } from '@/components/button/Button';
import { TaskStatus } from '@/types/task';
import { updateTask, deleteTask } from '@/services/api';

interface TaskListProps {
  tasks: Task[];
 
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <Button onClick={() => updateTask(task.id, TaskStatus.IN_PROGRESS)} id='inProgress'/>
          <Button onClick={() => updateTask(task.id, TaskStatus.DONE)} id='done'/>
          <Button onClick={() => updateTask(task.id, TaskStatus.TODO)} id='edit'/>
          <Button onClick={() => deleteTask(task.id)} id='delete'/>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
