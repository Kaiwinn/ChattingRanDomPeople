import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colors, images} from '../constants';

const Setting = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const [options, setOptions] = useState([
    {
      id: 1,
      name: 'Cá nhân',
    },
    {
      id: 2,
      name: 'Giao diện',
    },
    {
      id: 3,
      name: 'Ngôn ngữ',
    },
    {
      id: 4,
      name: 'Confession',
    },
    {
      id: 5,
      name: 'Trợ giúp',
    },
    {
      id: 6,
      name: 'Thông tin',
    },
  ]);
  return (
    <View
      style={{
        height: screenHeight,
        width: screenWidth,
        backgroundColor: colors.light.background,
      }}>
      <View
        style={{
          height: screenHeight * 0.086,
          backgroundColor: colors.light.background,
          shadowColor: colors.light.shadowColor,
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
              tintColor: colors.light.infoColor,
            }}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.light.textColorTitle,
            marginStart: 5,
            flex: 1,
          }}>
          Cài đặt
        </Text>
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            height: screenHeight * 0.3,
            alignItems: 'center',
          }}>
          <View>
            <Image
              source={images.user}
              style={{
                marginTop: 10,
                marginBottom: 10,
                height: 120,
                width: 120,
                opacity: 0.7,
              }}></Image>
            <Image
              source={images.edit}
              style={{
                position: 'absolute',
                right: 1,
                bottom: 17,
                height: 17,
                width: 17,
              }}></Image>
          </View>

          <Text
            style={{
              fontSize: 19,
              fontWeight: 'bold',
              color: colors.light.name,
            }}>
            Nguyễn Đức Chiến
          </Text>
          <View
            style={{
              height: screenHeight * 0.05,
              width: screenWidth,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Image
              source={images.dollar}
              style={{
                height: 20,
                width: 20,
                marginEnd: 5,
              }}></Image>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                marginHorizontal: 5,
                color: colors.light.name,
                fontStyle: 'italic',
                opacity: 0.7,
              }}>
              123 $
            </Text>
          </View>
        </View>
        <View
          style={{
            height: screenHeight * 0.58,
          }}>
          {options.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                onPress={() => {
                  item.id == 2 ? navigate('Interface') : '';
                }}>
                <View
                  style={{
                    height: screenHeight * 0.08,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={
                      item.id == 1
                        ? images.individual
                        : item.id == 2
                        ? images.moon
                        : item.id == 3
                        ? images.translate
                        : item.id == 4
                        ? images.mail
                        : item.id == 5
                        ? images.help
                        : item.id == 6
                        ? images.info
                        : images.default
                    }
                    style={{
                      height: screenHeight * 0.038,
                      width: screenHeight * 0.038,
                      marginHorizontal: 15,
                      tintColor: colors.light.iconSettings,
                    }}
                  />
                  <Text
                    style={{
                      flex: 1,
                      color: colors.light.iconSettings,
                      fontSize: 16,
                      fontWeight: '400',
                    }}>
                    {item.name}
                  </Text>
                  <Image
                    source={images.right}
                    style={{
                      height: screenHeight * 0.03,
                      width: screenHeight * 0.03,
                      marginHorizontal: 10,
                      tintColor: colors.light.textMessage,
                    }}
                  />
                </View>
                <View
                  style={{
                    marginStart: screenHeight * 0.05 + 23,
                    height: 0.3,
                    backgroundColor: '#111',
                    opacity: 0.2,
                  }}></View>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity onPress={() => {}}>
            <View
              style={{
                marginTop: 20,
                height: screenHeight * 0.07,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  marginVertical: 10,
                  color: '#ff006e',
                  fontSize: 17,
                  fontWeight: '400',
                  marginHorizontal: 58,
                }}>
                Đăng xuất
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Modal transparent visible={false}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000000aa',
          }}>
          <View
            style={{
              height: screenHeight * 0.73,
              width: screenWidth * 0.8,
              backgroundColor: '#e8e8e8',
              borderRadius: 10,
            }}>
            <View
              style={{
                height: screenHeight * 0.07,
                width: screenWidth * 0.8,
                backgroundColor: '#47021c',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                shadowColor: 'black',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: '#e8e8e8',
                  marginTop: 5,
                }}>
                Select Theme Color
              </Text>
            </View>
            <View
              style={{
                marginTop: 15,
                height: screenHeight * 0.09,
                width: screenWidth * 0.8,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: screenHeight * 0.08,
                  width: screenHeight * 0.08,
                  backgroundColor: '#ffffff',
                  borderRadius: screenHeight * 0.04,
                }}></View>
              <View
                style={{
                  height: screenHeight * 0.08,
                  width: screenHeight * 0.08,
                  backgroundColor: '#212121',
                  borderRadius: screenHeight * 0.04,
                }}></View>
              <View
                style={{
                  height: screenHeight * 0.08,
                  width: screenHeight * 0.08,
                  backgroundColor: '#f7a5f1',
                  borderRadius: screenHeight * 0.04,
                }}></View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({});
