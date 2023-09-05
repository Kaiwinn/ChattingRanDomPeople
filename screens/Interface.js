import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {images} from '../constants';

const Interface = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const [options, setOptions] = useState([
    {
      id: 1,
      name: 'Tối',
    },
    {
      id: 2,
      name: 'Sáng',
    },
    {
      id: 3,
      name: 'Hồng',
    },
  ]);
  return (
    <View
      style={{
        height: screenHeight,
        width: screenWidth,
        backgroundColor: '#f2f2f2',
      }}>
      <View
        style={{
          height: screenHeight * 0.086,
          backgroundColor: '#f2f2f2',
          shadowColor: '#7c7c7c',
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
        <TouchableOpacity
          onPress={() => {
            goBack();
          }}>
          <Image
            source={images.back}
            style={{
              height: screenHeight * 0.032,
              width: screenHeight * 0.032,
              marginHorizontal: 15,
            }}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#0c0c0c',
            marginStart: 5,
            flex: 1,
          }}>
          Giao diện
        </Text>
      </View>

      <Text
        style={{
          color: '#111',
          fontSize: 16,
          fontWeight: '500',
          marginHorizontal: 18,
          marginTop: 10,
        }}>
        Dark mode
      </Text>

      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            height: screenHeight * 0.56,
            marginTop: 10,
          }}>
          {options.map((item, index) => (
            <View key={index}>
              <View
                style={{
                  height: screenHeight * 0.08,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    flex: 1,
                    color: '#2b2b2b',
                    fontSize: 16,
                    fontWeight: '400',
                    marginHorizontal: 18,
                  }}>
                  {item.name}
                </Text>
                {item.id == 1 ? (
                  ''
                ) : item.id == 2 ? (
                  <Image
                    source={images.check}
                    style={{
                      height: screenHeight * 0.025,
                      width: screenHeight * 0.025,
                      marginHorizontal: 15,
                      tintColor: '#a5a5a5',
                    }}
                  />
                ) : (
                  ''
                )}
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Interface;

const styles = StyleSheet.create({});
