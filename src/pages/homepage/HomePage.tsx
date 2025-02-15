'use client';

import React, { useEffect }  from 'react';
import TaskList from '@/components/taskList/TaskList';
import { fetchTasks } from '@/store/slice/taskSliceReducer';
import { useAppDispatch } from '@/store/store';
import { TaskStatus } from '@/types/task';


const HomePage: React.FC = () => {
    // const [tasks, setTasks] = useState<Task[]>([]);
const dispatch = useAppDispatch();
    useEffect(() => {
      const fetchTasksInit = async () => {
        // const data = await getTasks();
        // setTasks(data);
        await dispatch(fetchTasks(TaskStatus.TODO))
        await dispatch(fetchTasks(TaskStatus.IN_PROGRESS))
        await dispatch(fetchTasks(TaskStatus.DONE))

      };
      fetchTasksInit();
    }, []);
  
    
    return (
      <div>
        <h2>Your Tasks</h2>
        <TaskList/>
      </div>
    );
};

export default HomePage;




