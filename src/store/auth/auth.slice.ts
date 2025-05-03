import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthState, PayloadWithCallback, SignUpPayload} from './auth.types';

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signupRequest: (
      state,
      action: PayloadAction<PayloadWithCallback<SignUpPayload>>,
    ) => {},
  },
});

export const {signupRequest} = authSlice.actions;
export default authSlice.reducer;
