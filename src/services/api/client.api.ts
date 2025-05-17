import {tryCatch} from '@utils/TryCatch';
import {AxiosResponse} from 'axios';
import {Api} from '.';
import Endpoints from '@constants/ApiEndPoints';
// Types
import {IClientInfoSuccessResponse} from '@store/client';

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

export default {getAllClients};
