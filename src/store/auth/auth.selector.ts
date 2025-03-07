import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '@store/app/store';

const _selectState = (state: RootState) => state.auth;

const getUserAllDetails = createSelector(_selectState, fstate => fstate.user);

export default {getUserAllDetails};
