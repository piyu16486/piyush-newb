import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '@store/app/store';

const _selectState = (state: RootState) => state.user;

const getUserType = createSelector(_selectState, fstate => fstate.userType);

const getUserInfo = createSelector(_selectState, fstate => fstate.userInfo);

export default {getUserType, getUserInfo};
