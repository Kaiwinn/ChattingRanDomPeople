import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {images} from '../constants';
import {useNavigation} from '@react-navigation/native';

const Header = props => {
  const {color, onPressRP} = props;
  const navigation = useNavigation();
  const {navigate, goBack} = navigation;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  return (
    <View
      style={{
        height: screenHeight * 0.083,
        backgroundColor: color.background,
        shadowColor: color.shadowColor,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 1,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={() => navigate('Setting')}>
        <Image
          source={images.talk}
          style={{
            height: screenHeight * 0.029,
            width: screenHeight * 0.029,
            marginHorizontal: 15,
            marginVertical: 15,
          }}
        />
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            color: color.textColorTitle,
            marginStart: 5,
          }}>
          Chat với người lạ
        </Text>
      </View>

      <TouchableOpacity>
        <Image
          source={images.upload}
          style={{
            height: screenHeight * 0.036,
            width: screenHeight * 0.036,
            marginVertical: 5,
            marginEnd: 5,
            tintColor: color.infoColor,
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigate('Information')}>
        <Image
          source={images.information}
          style={{
            height: screenHeight * 0.036,
            width: screenHeight * 0.036,
            marginHorizontal: 8,
            marginVertical: 5,
            tintColor: color.infoColor,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressRP}>
        <Image
          source={images.dots}
          style={{
            height: screenHeight * 0.04,
            width: screenHeight * 0.04,
            marginEnd: 8,
            marginVertical: 5,
            tintColor: color.infoColor,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
