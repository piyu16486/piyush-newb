import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '@store/app/store';

const _selectState = (state: RootState) => state.client;

const getClientList = createSelector(_selectState, _state => _state.clientList);
const getClientFormData = createSelector(
  _selectState,
  _state => _state.clientFormData,
);
const getClientFormId = createSelector(
  _selectState,
  _state => _state.clientFormId,
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

const getBankList = createSelector(_selectState, _state => _state.BankList);

const getkycChecked = createSelector(
  _selectState,
  _state => _state.kycCheckedList.map(value => value.document_type),
);

const getUplaodpanLoading = createSelector(
  _selectState,
  state => state.panLoading,
);

const getUplaodpanData = createSelector(_selectState, state => state.panData);
const getUplaodpanError = createSelector(_selectState, state => state.panError);

const getUploadAdharLoading = createSelector(
  _selectState,
  state => state.adharLoading,
);

const getUploadAdharData = createSelector(
  _selectState,
  state => state.adharData,
);

const getUploadAdharError = createSelector(
  _selectState,
  state => state.adharError,
);

const getUplaodResidenceLoading = createSelector(
  _selectState,
  state => state.residenceLoading,
);
const getUplaodResidenceData = createSelector(
  _selectState,
  state => state.residenceData,
);
const getUplaodResidenceError = createSelector(
  _selectState,
  state => state.residenceError,
);

const getUdhyamLoading = createSelector(
  _selectState,
  state => state.udhyamLoading,
);

const getUdhyamData = createSelector(_selectState, state => state.udhyamData);

const getUdhyamError = createSelector(_selectState, state => state.udhyamError);

const getGstLoading = createSelector(
  _selectState,
  state => state.gstDocLoading,
);

const getGstData = createSelector(_selectState, state => state.gstDocData);

const getGstError = createSelector(_selectState, state => state.gtsDocError);

const getGoDownLoading = createSelector(
  _selectState,
  state => state.goDownLoading,
);

const getGoDownData = createSelector(_selectState, state => state.goDownData);

const getGoDownError = createSelector(_selectState, state => state.goDownError);

const getCompanyPanLoading = createSelector(
  _selectState,
  state => state.CompanyPanLoading,
);

const getCompanyPanData = createSelector(
  _selectState,
  state => state.CompanyPanData,
);

const getCompanyPanError = createSelector(
  _selectState,
  state => state.CompanyPanError,
);

const getCompanyInfoLoading = createSelector(
  _selectState,
  state => state.CompanyInfoLoading,
);

const getCompanyInfoData = createSelector(
  _selectState,
  state => state.CompanyInfoData,
);

const getCompanyInfoError = createSelector(
  _selectState,
  state => state.CompanyInfoError,
);

const getSoftSanctionMethod = createSelector(
  _selectState,
  _state => _state.SoftSanctionData,
);

const getSoftSanctionBnkPro = createSelector(
  _selectState,
  _state => _state.SoftSanctionBNKPROData,
);

const getFilterbox = createSelector(
  _selectState,
  _state => _state.FilterboxData,
);

export default {
  getClientList,
  getClientFormData,
  getClientFormId,
  getRemarkReport,
  getLeadProgress,
  getTaskHistory,
  getBasicDetailLoading,
  getBasicDetailError,
  getClientId,
  getUploadKycLoading,
  getUploadKycData,
  getUploadKycError,
  getBankList,
  getkycChecked,
  getUplaodpanLoading,
  getUplaodpanData,
  getUplaodpanError,
  getUploadAdharLoading,
  getUploadAdharData,
  getUploadAdharError,
  getUplaodResidenceLoading,
  getUplaodResidenceData,
  getUplaodResidenceError,
  getUdhyamLoading,
  getUdhyamData,
  getUdhyamError,
  getGstLoading,
  getGstData,
  getGstError,
  getGoDownLoading,
  getGoDownData,
  getGoDownError,
  getCompanyPanLoading,
  getCompanyPanData,
  getCompanyPanError,
  getCompanyInfoLoading,
  getCompanyInfoData,
  getCompanyInfoError,
  getSoftSanctionMethod,
  getSoftSanctionBnkPro,
  getFilterbox,
};
