import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

export const selectTasksState = (state: RootState) => state.tasks;
export const tasksToDoSelector = createSelector([selectTasksState], (tasksState) => tasksState.TODO.tasks);
export const tasksToDoIDSelector = createSelector([selectTasksState], (tasksState) => tasksState.TODO.tasksID);

export const tasksInProgressSelector = createSelector([selectTasksState], (tasksState) => tasksState.IN_PROGRESS.tasks);
export const tasksInProgressIDSelector = createSelector([selectTasksState], (tasksState) => tasksState.IN_PROGRESS.tasksID);

export const tasksDoneSelector = createSelector([selectTasksState], (tasksState) => tasksState.DONE.tasks);
export const tasksDoneIDSelector = createSelector([selectTasksState], (tasksState) => tasksState.DONE.tasksID);

export const loadingSelector = createSelector([selectTasksState], (tasksState) => tasksState.loading);
export const errorSelector = createSelector([selectTasksState], (tasksState) => tasksState.error);