import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '@store/app/store';

const _selectState = (state: RootState) => state.user;

const getUserType = createSelector(_selectState, fstate => fstate.userType);

export default {getUserType};
