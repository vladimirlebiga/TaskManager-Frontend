import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskRequest, TaskStatus, TaskUpdate } from '@/types/task'; 
import { getTasks, deleteTask, createTask, updateTask, getById } from '@/services/api';

interface DeleteTask {
  id: number;
  status: string;
}

export type ColumnKey = "TODO" | "IN_PROGRESS" | "DONE";


export const fetchTasks = createAsyncThunk<TaskPayload, TaskStatus>(
  'tasks/fetchTasks',
  async (status:TaskStatus) => {
    const response = await getTasks(status);
    return {tasks:response, status};
  }
);

export const fetchDeleteTask = createAsyncThunk<DeleteTask, DeleteTask>(
'tasks/fetchDeleteTask',
  async (data: DeleteTask) => {
   await deleteTask(data.id);
    return data; 
  }
);

export const fetchCreateTask = createAsyncThunk<Task, TaskRequest>(
  'tasks/fetchCreateTask',
  async (task: TaskRequest) => {
    const response = await createTask(task);
    return response;
  }
);

export const fetchById = createAsyncThunk<Task, number>(
  'tasks/fetchById',
  async (id: number) => {
    const response = await getById(id);
    return response
  }
)


export const fetchUpdateTask = createAsyncThunk<Task, { id: number, task: TaskUpdate }>(
  'tasks/fetchUpdateTask',
  async ({ id, task }) => {
    const response = await updateTask(id, task);
    return response;
  }
)


interface TaskPayload {
  status: string;
  tasks: Task[];
}

interface TasksState {
  TODO: {
    tasks: Record<number, Task>;
    tasksID: number[];
  },
  IN_PROGRESS: {
    tasks: Record<number, Task>;
    tasksID: number[];
  }
  DONE: {
    tasks: Record<number, Task>;
    tasksID: number[];
  }
  id: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  TODO: {
    tasks: {},
    tasksID: [],
  },
  IN_PROGRESS: {
    tasks: {},
    tasksID: [],
  },
  DONE: {
    tasks: {},
    tasksID: [],

  },
  id: null,
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<TaskPayload>) => {
        state.loading = false;

        const statusKey = action.payload.status as ColumnKey;
       if (!state[statusKey]) return; // Prevent errors if status is invalid

       state[statusKey].tasksID = action.payload.tasks.map(({ id }) => id);
       state[statusKey].tasks = action.payload.tasks.reduce<Record<number, Task>>((acc, cur) => {
         acc[cur.id] = cur;
         return acc;
       }, {});
        })
      .addCase(fetchTasks.rejected, (state, action) => {
        // state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      .addCase(fetchDeleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeleteTask.fulfilled, (state, action: PayloadAction<DeleteTask>) => {
        state.loading = false;
      
        const statusKey = action.payload.status as ColumnKey;
        if (!state[statusKey]) return;
      
        state[statusKey].tasksID = state[statusKey].tasksID.filter(
          (id: number) => id !== action.payload.id
        );
      
        const newState = { ...state[statusKey].tasks };
        delete newState[action.payload.id];
        state[statusKey].tasks = newState;
      })
      .addCase(fetchDeleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete task';
      })
      .addCase(fetchById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchById.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        state.id = action.payload.id;

        const statusKey = action.payload.status as ColumnKey; // Ensure the correct status
        if (!state[statusKey]) return; // Prevent invalid status errors

        state[statusKey].tasks[action.payload.id] = action.payload; // Add/Update task in the appropriate status
        // if (!state[statusKey].tasksID.includes(action.payload.id)) {
        //   state[statusKey].tasksID.push(action.payload.id); // Add task ID if it's not already in the list
        // }
      })
      .addCase(fetchById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch task';
      })
      .addCase(fetchUpdateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpdateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;

        const statusKey = action.payload.status as ColumnKey ; // Ensure the correct status
        console.log(statusKey, 1111)

        if (!state[statusKey]) return; // Prevent invalid status errors
        console.log(statusKey, 2222)
        
        state.TODO.tasksID = state.TODO.tasksID.filter(item => item !== action.payload.id);
        state.IN_PROGRESS.tasksID = state.IN_PROGRESS.tasksID.filter(item => item !== action.payload.id);
        state.DONE.tasksID = state.DONE.tasksID.filter(item => item !== action.payload.id);  
        
        const toDo = {...state.TODO.tasks};
        const inProgress = {...state.IN_PROGRESS.tasks};
        const done = {...state.DONE.tasks};

        delete toDo[action.payload.id];
        delete inProgress[action.payload.id];
        delete done[action.payload.id];

        state.TODO.tasks = toDo;
        state.IN_PROGRESS.tasks = inProgress; 
        state.DONE.tasks = done;

        state[statusKey].tasksID.push(action.payload.id); // Add task ID if it's not already in the list
        state[statusKey].tasks[action.payload.id] = action.payload; // Update task in the appropriate status
      })
      .addCase(fetchUpdateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update task';
      })
  },
});


export default tasksSlice.reducer;
