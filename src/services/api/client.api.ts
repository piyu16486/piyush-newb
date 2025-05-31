import {tryCatch} from '@utils/TryCatch';
import {AxiosResponse} from 'axios';
import {Api} from '.';
import Endpoints from '@constants/ApiEndPoints';
// Types
import {
  BasicDetailPayload,
  IbasicDetailResponse,
  IClientInfoSuccessResponse,
  ILeadProgressResponse,
  IRemarkReportResponse,
  ITaskHistoryResponse,
} from '@store/client';
import {CustomRequestConfig} from './api';

const getAllClients = async () => {
  const {data, error} = await tryCatch<
    AxiosResponse<IClientInfoSuccessResponse>
  >(Api.get(Endpoints.apiGetAllClients));
  if (error) {
    return {
      data: null,
      error: error,
    };
  }
  return {
    data: data.data,
    error: null,
  };
};

const getRemarkReport = async () => {
  const {data, error} = await tryCatch<AxiosResponse<IRemarkReportResponse>>(
    Api.get(Endpoints.apiGetReport),
  );
  if (error) {
    return {
      data: null,
      error: error,
    };
  }
  return {
    data: data.data,
    error: null,
  };
};

const getLeadProgress = async () => {
  const {data, error} = await tryCatch<AxiosResponse<ILeadProgressResponse>>(
    Api.get(Endpoints.apiGetLeadProgress),
  );
  if (error) {
    return {
      data: null,
      error: error,
    };
  }
  return {
    data: data.data,
    error: null,
  };
};

const getTaskHistory = async () => {
  const {data, error} = await tryCatch<AxiosResponse<ITaskHistoryResponse>>(
    Api.get(Endpoints.apiGetTaskHistory),
  );
  if (error) {
    return {
      data: null,
      error: error,
    };
  }
  return {
    data: data.data,
    error: null,
  };
};

const postBasicDetails = async (payload: BasicDetailPayload) => {
  const {data, error} = await tryCatch<AxiosResponse<IbasicDetailResponse>>(
    Api.post(Endpoints.apiBasicDetailPost, payload),
  );
  if (error) {
    return {
      data: null,
      error: error,
    };
  }
  return {
    data: data.data,
    error: null,
  };
};

const uploadKycDocument = async (formData: FormData) => {
  const {data, error} = await tryCatch<AxiosResponse<any>>(
    Api.post(Endpoints.apiKycProfilePic, formData, {
      isFormData: true,
    } as CustomRequestConfig),
  );
  if (error) {
    return {
      data: null,
      error: error,
    };
  }

  return {
    data: data.data,
    error: null,
  };
};

export default {
  getAllClients,
  getRemarkReport,
  getLeadProgress,
  getTaskHistory,
  postBasicDetails,
  uploadKycDocument,
};
