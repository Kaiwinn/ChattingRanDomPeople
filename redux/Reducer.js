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
    getColor: state => {
      AsyncStorage.getItem('selectedColor')
        .then(value => {
          if (value) {
            state.color = value;
          }
        })
        .catch(error =>
          console.error('Error getting color from AsyncStorage:', error),
        );
    },
  },
});

export const {changeColor, getColor} = Reducer.actions;

export default Reducer.reducer;
