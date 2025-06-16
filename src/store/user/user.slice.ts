import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserState} from './user.types';

const initialState: UserState = {
  countryCode: '',
  email: '',
  firstName: '',
  lastName: '',
  mobileNumber: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<string>) => {},
  },
});

export const {setUserInfo} = userSlice.actions;
export default userSlice.reducer;
