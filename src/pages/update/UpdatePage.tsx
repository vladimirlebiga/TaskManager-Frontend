'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { TaskStatus } from '@/types/task';
import { Button } from '@/components/button/Button';
import { fetchById, fetchUpdateTask } from '@/store/slice/taskSliceReducer';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { tasksDoneSelector, tasksInProgressSelector, tasksToDoSelector } from '@/Selectors/tasksSelectors';

const UpdatePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.TODO);
  
  const router = useRouter();
  const params = useParams();
  const id = params?.slug as string;


  const dispatch = useAppDispatch();
  // const task = useAppSelector((state) => state.tasks.tasks.tasks[Number(id)]);

  const taskToDo = useAppSelector(tasksToDoSelector)[Number(id)];
  const taskInProgress = useAppSelector(tasksInProgressSelector)[Number(id)];
  const taskDone = useAppSelector(tasksDoneSelector)[Number(id)];


  useEffect(() => {
    const fetchTask = async () => {
    await dispatch(fetchById(Number(id)));
    
    };
    fetchTask();
  }, [id]);

  useEffect(() => {
    if (taskToDo) {
      setTitle(taskToDo.title || '');
      setDescription(taskToDo.description || '');
      setStatus(taskToDo.status);
    } 
    if (taskInProgress) {
      setTitle(taskInProgress.title || '');
      setDescription(taskInProgress.description || '');
      setStatus(taskInProgress.status);
    }
    if (taskDone) {
      setTitle(taskDone.title || '');
      setDescription(taskDone.description || '');
      setStatus(taskDone.status);
    }
  }, [taskToDo, taskInProgress, taskDone]);




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description) {
      await dispatch(fetchUpdateTask({id: +id, task:{ title, description, status }}));
      alert('Task updated successfully!');
      setTitle('');
      setDescription('');
      setStatus(TaskStatus.TODO);
      router.push('/');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div>
      <h2>Update Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
          <option value={TaskStatus.TODO}>TODO</option>
          <option value={TaskStatus.IN_PROGRESS}>IN PROGRESS</option>
          <option value={TaskStatus.DONE}>DONE</option>
        </select>
        <Button id='edit' />
      </form>
    </div>
  );
};  

export default UpdatePage;