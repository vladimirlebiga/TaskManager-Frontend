import React, { useState }  from 'react';
import { useAppSelector, useAppDispatch } from '@/store/store'; // Ensure you export a typed dispatch hook
import {
  tasksToDoIDSelector,
  tasksToDoSelector,
  tasksInProgressSelector,
  tasksInProgressIDSelector,
  tasksDoneSelector,
  tasksDoneIDSelector,
  loadingSelector,
} from '@/Selectors/tasksSelectors';
import { TaskCard } from './TaskCard';
import { Box, Skeleton } from '@mui/material';
import { fetchUpdateTask } from '@/store/slice/taskSliceReducer';
import { TaskStatus } from '@/types/task';


const TaskList: React.FC = () => {
  // Selectors for tasks state
  // const tasks = useAppSelector((state) => state.tasks);

  const tasksIdToDo = useAppSelector(tasksToDoIDSelector);
  const tasksToDo = useAppSelector(tasksToDoSelector);

  const tasksIdInProgress = useAppSelector(tasksInProgressIDSelector);
  const tasksInProgress = useAppSelector(tasksInProgressSelector);

  const tasksIdDone = useAppSelector(tasksDoneIDSelector);
  const tasksDone = useAppSelector(tasksDoneSelector);

  const isLoading = useAppSelector(loadingSelector);

  const dispatch = useAppDispatch();

  // Drag-and-drop state
  const [draggedTask, setDraggedTask] = useState<{ id: string; from: TaskStatus } | null>(null);

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    taskId: string,
    from: TaskStatus
  ) => {
    console.log(taskId, from)
    event.dataTransfer.setData("text/plain", taskId);
    event.dataTransfer.setData("from", from);
    setDraggedTask(() => ({ id: taskId, from }));
    console.log(draggedTask)
  };

    // onDragOver must call event.preventDefault() to allow dropping
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    };
  
  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    to: TaskStatus
  ) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text/plain");
    const from = event.dataTransfer.getData("from") as TaskStatus;
    if (from !== to && taskId) {
      dispatch(fetchUpdateTask({id: Number(taskId), task:{status: to}}))
    }
    setDraggedTask(null);
  };

  if (isLoading) {
    return (
      <Box>
        <Skeleton variant="rectangular" width={300} height={200} />
      </Box>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* TODO Column */}
      <div
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, TaskStatus.TODO)}
        className="p-2 border rounded"
      >
        {tasksIdToDo.map((id: number) => (
          <div
            key={id}
            draggable
            onDragStart={(e) => handleDragStart(e, id.toString(), TaskStatus.TODO)}
          >
            <TaskCard {...tasksToDo[id]} />
          </div>
        ))}
      </div>

      {/* IN_PROGRESS Column */}
      <div
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, TaskStatus.IN_PROGRESS)}
        className="p-2 border rounded"
      >
        {tasksIdInProgress.map((id: number) => (
          <div
            key={id}
            draggable
            onDragStart={(e) => handleDragStart(e, id.toString(), TaskStatus.IN_PROGRESS)}
          >
            <TaskCard {...tasksInProgress[id]} />
          </div>
        ))}
      </div>

      {/* DONE Column */}
      <div
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, TaskStatus.DONE)}
        className="p-2 border rounded"
      >
        {tasksIdDone.map((id: number) => (
          <div
            key={id}
            draggable
            onDragStart={(e) => handleDragStart(e, id.toString(), TaskStatus.DONE)}
          >
            <TaskCard {...tasksDone[id]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
