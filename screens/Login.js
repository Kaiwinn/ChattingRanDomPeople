import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  SafeAreaView,
  Platform,
  TextInput,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import React, {useEffect, useState} from 'react';
import {images} from '../constants';
import {LoginManager, AccessToken, Profile} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import axios from 'axios';

export const CLI_ID_GOOGLE =
  Platform.OS == 'ios'
    ? ''
    : '966244274464-0o900ug0jbv93l206uks27qnc3ht4ijh.apps.googleusercontent.com';

const Login = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [displayEmail, setDisplayEmail] = useState(false);
  const [email, setEmail] = useState('');

  const handleLoginFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
      ]);

      if (result.isCancelled) {
        console.log('Đăng nhập Facebook bị huỷ');
      } else {
        const data = await AccessToken.getCurrentAccessToken();

        if (data) {
          const {accessToken} = data;
          console.log('Access Token:', accessToken);

          // Sau khi có Access Token, bạn có thể gửi nó đến máy chủ của bạn để xác thực đăng nhập.

          // Sau khi xác thực thành công, bạn có thể chuyển hướng người dùng đến màn hình ChatRandom bằng hàm navigate.
          navigate('ChatRandom');
        }
      }
    } catch (error) {
      console.error('Lỗi khi đăng nhập Facebook:', error);
    }
  };
  const handleLoginEmail = async email => {
    try {
      const response = await fetch('https://test.vnchat.me/v2/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email}), // Thay email_cua_ban@gmail.com bằng email thực sự
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log('Kết quả đăng nhập:', data);
      } else {
        console.log('Đăng nhập không thành công. Mã lỗi:', response.status);
      }
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };

  useEffect(() => {
    SplashScreen.hide();

    GoogleSignin.configure({
      webClientId: CLI_ID_GOOGLE,
    });
  });

  const actionCodeSettings = {
    url: 'https://chattingrandompeople.firebaseapp.com/emailSignInSuccess',
    handleCodeInApp: true,
  };

  return (
    <SafeAreaView>
      <View
        style={{
          height: screenHeight,
          width: screenWidth,
          backgroundColor: '#f2a4cf',
        }}>
        <View
          style={{
            height: screenHeight * 0.33,
            alignItems: 'center',
          }}>
          <Image
            source={images.chat}
            style={{
              marginTop: 20,
              marginBottom: 20,
              height: 150,
              width: 150,
              // tintColor: '#ffffff',
            }}
          />
          <Text
            style={{
              fontFamily: 'Roboto',
              fontSize: 22,
              fontWeight: 'bold',
              fontStyle: 'italic',
              color: '#ffffff',
              marginTop: 10,
            }}>
            Chat với người lạ
          </Text>
        </View>
        <View
          style={{
            marginTop: 35,
            height: screenHeight * 0.13,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 30,
          }}>
          {displayEmail == false ? (
            <Text
              style={{
                fontSize: 13,
                textAlign: 'center',
                fontWeight: '400',
                color: 'white',
              }}>
              Bằng việc Đăng nhập vào ứng dụng, bạn đồng ý với{' '}
              <Text
                style={{
                  fontWeight: '500',
                  color: 'white',
                  textDecorationLine: 'underline',
                  fontSize: 13,
                }}>
                điều khoản dịch vụ{' '}
              </Text>{' '}
              của chúng tôi.
            </Text>
          ) : (
            <View></View>
          )}
        </View>
        {displayEmail == false ? (
          <View
            style={{
              height: screenHeight * 0.19,
              paddingHorizontal: 35,
              paddingVertical: 5,
              marginTop: 30,
            }}>
            <TouchableWithoutFeedback onPress={handleLoginFacebook}>
              <View
                style={{
                  height: screenHeight * 0.067,
                  backgroundColor: '#4068b5',
                  borderRadius: 5,
                  shadowColor: 'black',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={images.facebook}
                  style={{
                    height: screenHeight * 0.039,
                    width: screenHeight * 0.039,
                    marginStart: 20,
                    tintColor: '#ffffff',
                  }}
                />
                <Text
                  style={{
                    marginStart: 14,
                    color: '#ffffff',
                    fontSize: 14,
                    fontWeight: 'bold',
                    letterSpacing: 0.8,
                  }}>
                  Đăng nhập bằng Facebook
                </Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => {
                setDisplayEmail(true);
              }}>
              <View
                style={{
                  marginTop: 15,
                  height: screenHeight * 0.067,
                  backgroundColor: '#ededed',
                  borderRadius: 5,
                  shadowColor: 'black',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={images.mail}
                  style={{
                    height: screenHeight * 0.039,
                    width: screenHeight * 0.039,
                    marginStart: 20,
                    tintColor: '#1e1e1e',
                  }}
                />
                <Text
                  style={{
                    marginStart: 14,
                    color: '#1e1e1e',
                    fontSize: 14,
                    fontWeight: 'bold',
                    letterSpacing: 0.8,
                  }}>
                  Đăng nhập bằng Email
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        ) : (
          <View
            style={{
              height: screenHeight * 0.19,
              paddingHorizontal: 35,
              paddingVertical: 5,
              marginTop: 16,
            }}>
            <View
              style={{
                marginTop: 15,
                height: screenHeight * 0.069,
                backgroundColor: '#ededed',
                borderRadius: 5,
                shadowColor: 'black',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TextInput
                style={{
                  flex: 1,
                  borderColor: '#ccc',
                  paddingHorizontal: 20,
                  fontSize: 16,
                  fontWeight: '400',
                }}
                placeholder="abcxyz@gmail.com"
                placeholderTextColor="#727272"
                onChangeText={email => {
                  setEmail(email);
                }}
              />
            </View>
            <View
              style={{
                marginTop: 15,
                height: screenHeight * 0.069,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '400',
                  color: '#f4f4f4',
                  marginHorizontal: 15,
                  textDecorationLine: 'underline',
                }}>
                Quay Lại
              </Text>
              <TouchableWithoutFeedback
                onPress={() => {
                  handleLoginEmail(email);
                  navigate('OTPLoginWithEmail', {email: email});
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '400',
                    color: '#f4f4f4',
                    marginHorizontal: 15,
                    borderWidth: 1,
                    borderColor: '#f4f4f4',
                    padding: 10,
                    borderRadius: 5,
                  }}>
                  Tiếp Tục
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        )}

        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 13,
            marginTop: 60,
          }}>
          Mọi thông tin cá nhân được bảo vệ
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 13,
            textDecorationLine: 'underline',
          }}>
          Tìm hiểu thêm
        </Text>
        <Text
          style={{
            marginTop: 48,
            textAlign: 'center',
            color: 'white',
            fontSize: 18,
            fontWeight: '400',
          }}>
          © 2024 c.app
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
