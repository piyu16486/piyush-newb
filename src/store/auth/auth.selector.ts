import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '@store/app/store';

const _selectState = (state: RootState) => state.auth;
const getUserType = createSelector(_selectState, _state => _state.userType);

const getGlobalLoader = createSelector(
  _selectState,
  _state => _state.globalLoader,
);

// Signup
const getSignupError = createSelector(
  _selectState,
  _state => _state.signupError,
);

const getSignupSuccess = createSelector(
  _selectState,
  _state => _state.signupSuccess,
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

// Create New Password
const getCreatePasswordError = createSelector(
  _selectState,
  _state => _state.createPasswordError,
);

const getCreatePasswordSuccess = createSelector(
  _selectState,
  _state => _state.createPasswordSuccess,
);

export default {
  getUserType,
  getGlobalLoader,
  getSignupError,
  getSignupSuccess,
  getVerifyOtpError,
  getVerifyOtpSuccess,
  getCreatePasswordError,
  getCreatePasswordSuccess,
};
