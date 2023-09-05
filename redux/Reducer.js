import * as Types from './Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStorageColors = async () => {
  const col = await AsyncStorage.getItem('Colors');
  const data = JSON.parse(col);
  return data;
};
export const setStorageColors = async colors => {
  return await AsyncStorage.setItem('Colors', JSON.stringify(colors));
};

export const changeColors = colors => {
  return colors;
};

function colorItems(state, action) {
  switch (action.type) {
    case Types.LOAD_COLOR:
      return {...action.payload};
    case Types.CHANGE_COLOR:
      const newColor = action.payload;

      getStorage()
        .then(data => {
          const newColor = changeColors(newColor);
          setStorageColors(newColor);
        })
        .catch(err => console.log('err Change Color ' + err.message));

      const newColorState = changeColors(newColor);

      return newColorState;
  }
  return state;
}

export default colorItems;
