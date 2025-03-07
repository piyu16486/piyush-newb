import React from 'react';
import {Provider} from 'react-redux';
import {MainNavigator} from './src/navigation';
import {store} from '@store/app/store';

function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}

export default App;
