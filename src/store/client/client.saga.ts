import {call, put, select, takeLatest} from 'redux-saga/effects';
import {getClients, saveClientBasicDetails} from './client.slice';
import {ClientApis} from '@services/api';
import {
  clientActions,
  ClientFormType,
  clientSelector,
  IBasicDetailsResponse,
  IClientInfoSuccessResponse,
} from '.';
import {Result} from '@utils/TryCatch';
import moment from 'moment';

function* handleGetClient(): unknown {
  const {data, error}: Result<IClientInfoSuccessResponse> = yield call(
    ClientApis.getAllClients,
  );
  if (!error) {
    yield put(clientActions.setClientList(data.data));
  } else {
    yield put(clientActions.setClientList([]));
  }
}

function* saveBasicDetails(): unknown {
  const clientFormData: ClientFormType = yield select(
    clientSelector.getClientFormData,
  );
  const basicDetailForm = clientFormData.BasicDetails;
  const body = {
    source_of_lead: basicDetailForm.sourceOfLead,
    location: basicDetailForm.location,
    city: basicDetailForm.city,
    state: basicDetailForm.state,
    type_of_visit: basicDetailForm.typeOfVisit,
    visit: parseInt(basicDetailForm.visitNumber),
    date_of_visit: moment(basicDetailForm.dateOfVisit).format('YYYY-MM-DD'),
  };

  const {data, error}: Result<IBasicDetailsResponse> = yield call(
    ClientApis.saveBasicDetailForm,
    body,
  );

  if (!error) {
    yield put(clientActions.saveClientId(data.data));
  }
}

export default function* clientSaga() {
  yield takeLatest(getClients.type, handleGetClient);
  yield takeLatest(saveClientBasicDetails.type, saveBasicDetails);
}
