import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '@store/app/store';

const _selectState = (state: RootState) => state.client;

const getClientList = createSelector(_selectState, _state => _state.clientList);
const getClientFormData = createSelector(
  _selectState,
  _state => _state.clientFormData,
);
const getRemarkReport = createSelector(
  _selectState,
  _state => _state.reportList,
);
const getLeadProgress = createSelector(_selectState, _state => _state.leadList);

const getTaskHistory = createSelector(
  _selectState,
  _state => _state.TaskHistoryList,
);

export default {
  getClientList,
  getClientFormData,
  getRemarkReport,
  getLeadProgress,
  getTaskHistory,
};
