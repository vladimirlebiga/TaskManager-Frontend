'use client'; // Используем Client Component для работы с состоянием
import React, { useState } from 'react';
import { createTask } from '@/services/api';

const NewTaskPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    if (title && description) {
      await createTask({ title, description });
      alert('Task created successfully!');
      setTitle('');
      setDescription('');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div>
      <h2>Create New Task</h2>
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
      <button onClick={handleSubmit}>Create Task</button>
    </div>
  );
};

export default NewTaskPage;