import {configureStore} from '@reduxjs/toolkit';
import Reducer from './Reducer';

const store = configureStore({
  reducer: {
    theme: Reducer,
  },
});

export default store;
