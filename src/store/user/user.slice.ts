import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserState, UserType} from './user.types';

const initialState: UserState = {
  userType: 'client',
  userInfo: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserType: (state, action: PayloadAction<UserType>) => {
      state.userType = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<string>) => {
      state.userInfo = {token: action.payload};
    },
  },
});

export const {setUserType, setUserInfo} = userSlice.actions;
export default userSlice.reducer;
