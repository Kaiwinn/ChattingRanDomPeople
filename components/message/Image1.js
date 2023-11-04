import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {images} from '../../constants';

const Image1 = () => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const [widthImage, setWidthImage] = useState(0);
  const [heightImage, setHeightImage] = useState(0);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Image.getSize('https://i.imgur.com/1WpDytW.jpg', (width, height) => {
      setWidthImage(width);
      setHeightImage(height);
      setLoaded(true);
    });
  }, []);
  return (
    <View>
      {loaded && (
        <View>
          <Image
            source={{uri: 'https://i.imgur.com/1WpDytW.jpg'}}
            style={{
              alignSelf: 'flex-end',
              borderRadius: 5,
              height: heightImage * (screenWidth / (widthImage * 2)),
              width: widthImage * (screenWidth / (widthImage * 2)),
              alignSelf: 'flex-end',
              justifyContent: 'flex-end',
              marginHorizontal: 5,
              marginVertical: 3,
            }}
          />
        </View>
      )}
    </View>
  );
};

export default Image1;

const styles = StyleSheet.create({});
