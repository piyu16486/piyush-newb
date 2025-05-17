import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ClientState, IClientInfoResponseDatum} from './client.types';

const initialState: ClientState = {
  clientLoader: false,
  clientList: [],
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    // Set Client Loader
    setClientLoader: (state, action: PayloadAction<boolean>) => {
      state.clientLoader = action.payload;
    },
    // Get Client from api
    getClients: state => {
      state.clientLoader = true;
    },
    setClientList: (
      state,
      action: PayloadAction<Array<IClientInfoResponseDatum>>,
    ) => {
      state.clientLoader = false;
      state.clientList = action.payload;
    },
  },
});

export const {getClients, setClientLoader, setClientList} = clientSlice.actions;
export default clientSlice.reducer;
