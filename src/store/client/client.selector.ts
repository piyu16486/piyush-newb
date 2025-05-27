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

const getBasicDetailLoading = createSelector(
  _selectState,
  state => state.clientLoader,
);

const getBasicDetailError = createSelector(
  _selectState,
  state => state.clientList,
);

const getClientId = createSelector(_selectState, state => state.clientId);

const getUploadKycLoading = createSelector(
  _selectState,
  state => state.loading,
);

const getUploadKycData = createSelector(_selectState, state => state.data);

const getUploadKycError = createSelector(_selectState, state => state.error);

export default {
  getClientList,
  getClientFormData,
  getRemarkReport,
  getLeadProgress,
  getTaskHistory,
  getBasicDetailLoading,
  getBasicDetailError,
  getClientId,
  getUploadKycLoading,
  getUploadKycData,
  getUploadKycError,
};
