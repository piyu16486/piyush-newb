import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserState, UserType} from './user.types';

const initialState: UserState = {
  userType: 'client',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserType: (state, action: PayloadAction<UserType>) => {
      state.userType = action.payload;
    },
  },
});

export const {setUserType} = userSlice.actions;
export default userSlice.reducer;
