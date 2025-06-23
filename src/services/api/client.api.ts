import {tryCatch} from '@utils/TryCatch';
import {AxiosResponse} from 'axios';
import {Api} from '.';
import Endpoints from '@constants/ApiEndPoints';
// Types
import {
  IBasicDetailsPayload,
  IBankListResponse,
  IBasicDetailsResponse,
  IClientFirmPayload,
  IclientFirmResponse,
  IClientInfoSuccessResponse,
  ILeadProgressResponse,
  IRemarkReportResponse,
  ITaskHistoryResponse,
  IvendorPayload,
  IVendorResponse,
  IVisitPayload,
  IvisitResponse,
  IKycCheckedResponse,
  ISoftSanctionResponse,
  IsoftSanctionBankProductResponse,
  IFilterPayload,
  IFilterResponse,
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
const getLeadDesProgress = async (leadID: string) => {
  const {data, error} = await tryCatch<AxiosResponse<ILeadProgressResponse>>(
    Api.get(Endpoints.apiInfoLeadProgress(leadID)),
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

const saveBasicDetailForm = async (body: IBasicDetailsPayload) => {
  const {data, error} = await tryCatch<AxiosResponse<IBasicDetailsResponse>>(
    Api.post(Endpoints.apiSaveBasicDetails, body),
  );
  return {data: data?.data ?? null, error};
};

const saveClientFirmForm = async (
  clientId: string,
  body: IClientFirmPayload,
) => {
  const {data, error} = await tryCatch<AxiosResponse<IclientFirmResponse>>(
    Api.post(Endpoints.apiSaveClientFirmDetails(clientId), body),
  );
  return {data: data?.data ?? null, error};
};

const saveVendorForm = async (clientId: string, body: IvendorPayload) => {
  const {data, error} = await tryCatch<AxiosResponse<IVendorResponse>>(
    Api.post(Endpoints.apiSaveVendorDetails(clientId), body),
  );
  return {data: data?.data ?? null, error};
};

const saveVisitForm = async (clientId: string, body: IVisitPayload) => {
  const {data, error} = await tryCatch<AxiosResponse<IvisitResponse>>(
    Api.post(Endpoints.apiSaveVisitDetails(clientId), body),
  );
  return {data: data?.data ?? null, error};
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

const uploadPanDocument = async (formData: FormData) => {
  const {data, error} = await tryCatch<AxiosResponse<any>>(
    Api.post(Endpoints.apiKycPanUpload, formData, {
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

const uploadAadharDocument = async (formData: FormData) => {
  const {data, error} = await tryCatch<AxiosResponse<any>>(
    Api.post(Endpoints.apiKycAadharUpload, formData, {
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

const uploadResidenceDocument = async (formData: FormData) => {
  const {data, error} = await tryCatch<AxiosResponse<any>>(
    Api.post(Endpoints.apiKycResidenceDetail, formData, {
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

const uploadUdhyamDocument = async (FormData: FormData) => {
  const {data, error} = await tryCatch<AxiosResponse<any>>(
    Api.post(Endpoints.apiUdhyamCertificate, FormData, {
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

const uploadGstDocument = async (FormData: FormData) => {
  const {data, error} = await tryCatch<AxiosResponse<any>>(
    Api.post(Endpoints.apiGstDocument, FormData, {
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

const uploadGoDownDocument = async (formData: FormData) => {
  const {data, error} = await tryCatch<AxiosResponse<any>>(
    Api.post(Endpoints.apiGodownDetails, formData, {
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

const uploadShareholdingDocument = async (formData: FormData) => {
  const {data, error} = await tryCatch<AxiosResponse<any>>(
    Api.post(Endpoints.apiShareholding, formData, {
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

const uploadCompanyPanDocument = async (formData: FormData) => {
  const {data, error} = await tryCatch<AxiosResponse<any>>(
    Api.post(Endpoints.apiCompanyPanDetails, formData, {
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

const uploadCopmanyInfoDocument = async (formData: FormData) => {
  const {data, error} = await tryCatch<AxiosResponse<any>>(
    Api.post(Endpoints.apiCompanyInformation, formData, {
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

const getBankList = async () => {
  const {data, error} = await tryCatch<AxiosResponse<IBankListResponse>>(
    Api.get(Endpoints.apiBankList),
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

const getKycChecked = async (clientID: string) => {
  const {data, error} = await tryCatch<AxiosResponse<IKycCheckedResponse>>(
    Api.get(Endpoints.apiGetKycChecked(clientID)),
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

const getSoftSanction = async () => {
  const {data, error} = await tryCatch<AxiosResponse<ISoftSanctionResponse>>(
    Api.get(Endpoints.apiGetSoftSanction),
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

const getSoftSanctionProductBank = async () => {
  const {data, error} = await tryCatch<
    AxiosResponse<IsoftSanctionBankProductResponse>
  >(Api.get(Endpoints.apiGetSoftSanctionBankProduct));
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

const FilterBox = async (payload: IFilterPayload) => {
  const {data, error} = await tryCatch<AxiosResponse<IFilterResponse>>(
    Api.post(Endpoints.apiFilterBox, payload),
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
  getLeadDesProgress,
  getTaskHistory,
  saveBasicDetailForm,
  saveClientFirmForm,
  saveVendorForm,
  saveVisitForm,
  uploadKycDocument,
  uploadPanDocument,
  uploadAadharDocument,
  uploadResidenceDocument,
  uploadUdhyamDocument,
  uploadGstDocument,
  uploadGoDownDocument,
  uploadShareholdingDocument,
  uploadCompanyPanDocument,
  uploadCopmanyInfoDocument,
  getBankList,
  getKycChecked,
  getSoftSanction,
  getSoftSanctionProductBank,
  FilterBox,
};
