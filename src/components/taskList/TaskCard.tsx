import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/button/Button';
import { TaskStatus } from '@/types/task';
import { fetchDeleteTask, fetchUpdateTask } from '@/store/slice/taskSliceReducer';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';


interface TaskCardProps {id:number, title: string, description: string, status: string};
export const TaskCard: React.FC<TaskCardProps> = ({id, title, description, status}) => {
const dispatch = useDispatch<AppDispatch>();


  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
    <h3>Title: {title}</h3>
    <p>Description: {description}</p>
    <p>Status: {status}</p>
    <Button isDisabled={status === 'TODO'} onClick={() => dispatch(fetchUpdateTask({id, task:{status: TaskStatus.TODO}}))} id='todo'/>
    <Button isDisabled={status === 'IN_PROGRESS'} onClick={() => dispatch(fetchUpdateTask({id, task:{status: TaskStatus.IN_PROGRESS} }))} id='inProgress'/>
    <Button isDisabled={status === 'DONE'} onClick={() => dispatch(fetchUpdateTask({id, task:{status: TaskStatus.DONE}}))} id='done'/>
    <Link href={`/tasks/update/${id}`} className='inline-block bg-yellow-500 text-white py-2 px-4 rounded hover:bg-blue-700'>Edit</Link>
    <Button onClick={() => dispatch(fetchDeleteTask({id, status}))} id='delete'/>
  </div>
  )
}
