import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '@store/app/store';

const _selectState = (state: RootState) => state.client;

const getClientList = createSelector(_selectState, _state => _state.clientList);
const getClientFormData = createSelector(
  _selectState,
  _state => _state.clientFormData,
);

export default {getClientList, getClientFormData};
