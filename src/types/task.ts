export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
  }

export interface Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    createdAt: string;
    updatedAt: string;
  }

  export interface TaskRequest {
    title: string;
    description: string;
    status: TaskStatus;
  }

  export interface TaskUpdate {
    title?: string;
    description?: string;
    status?: TaskStatus;
  }

  

  export type DeleteTask = Record<string, string>;


