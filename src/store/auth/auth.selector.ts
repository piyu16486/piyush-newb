import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '@store/app/store';

const _selectState = (state: RootState) => state.auth;
const getUserType = createSelector(_selectState, _state => _state.userType);

// Signup
const getSignupError = createSelector(
  _selectState,
  _state => _state.signupError,
);

const getSignupSuccess = createSelector(
  _selectState,
  _state => _state.signupSuccess,
);

const getSignupLoader = createSelector(
  _selectState,
  _state => _state.signupLoader,
);

// OTP Verify
const getVerifyOtpError = createSelector(
  _selectState,
  _state => _state.verifyOtpError,
);

const getVerifyOtpSuccess = createSelector(
  _selectState,
  _state => _state.verifyOtpSuccess,
);

const getVerifyOtpLoader = createSelector(
  _selectState,
  _state => _state.verifyOtpLoader,
);

export default {
  getUserType,
  getSignupError,
  getSignupSuccess,
  getSignupLoader,
  getVerifyOtpError,
  getVerifyOtpSuccess,
  getVerifyOtpLoader,
};
