import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '@store/app/store';

const _selectState = (state: RootState) => state.auth;

const getUserAllDetails = createSelector(_selectState, fstate => fstate.user);
const getToken = createSelector(_selectState, fstate => fstate.token);

export default {getUserAllDetails, getToken};
