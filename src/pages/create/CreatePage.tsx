'use client';

import React from 'react';
import { useState } from "react";
import { TaskStatus } from '@/types/task';
import { Button } from '@/components/button/Button';
import { fetchCreateTask } from '@/store/slice/taskSliceReducer';
import { useAppDispatch } from '@/store/store';
import { useRouter } from 'next/navigation';

const CreatePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.TODO);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description) {
      await dispatch(fetchCreateTask({ title, description, status }));
      alert('Task created successfully!');
      setTitle('');
      setDescription('');
      setStatus(TaskStatus.TODO);
      router.push('/')
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div>
      <h2>Create New Task</h2>
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
        <Button id='createTask' />
      </form>
    </div>
  );
};  

export default CreatePage;