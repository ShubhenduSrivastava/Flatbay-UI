import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux';
import MultiStepForm from './src/MultiStepForm';

export default function App() {
  return (
    <Provider store={store}>
      <MultiStepForm />
    </Provider>
  );
}
