import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

export const Reducer = createSlice({
  name: 'color',
  initialState: {
    color: 'light',
  },
  reducers: {
    changeColor: (state, action) => {
      state.color = action.payload;
      AsyncStorage.setItem('selectedColor', action.payload)
        .then(() => {})
        .catch(error =>
          console.error('Error saving color to AsyncStorage:', error),
        );
    },
  },
});

export const {changeColor} = Reducer.actions;

export default Reducer.reducer;
