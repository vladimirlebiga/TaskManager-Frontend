import { createSlice } from '@reduxjs/toolkit';
import { User } from '@/types/user';


interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    // Define synchronous reducers here if needed
  },
  extraReducers: (builder) => {
  
  },
});

export default sessionSlice.reducer;
