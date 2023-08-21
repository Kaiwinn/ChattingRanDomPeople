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
import React, {useEffect, useState} from 'react';
import {images} from '../constants';
import {LoginManager, AccessToken, Profile} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {firebase} from '../firebase/firebase';

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
    LoginManager.logInWithPermissions(['public_profile']).then(require => {
      if (require.isCancelled) {
        console.log('Login cancelled');
      } else {
        Profile.getCurrentProfile().then(currentProfile => {
          if (currentProfile) {
            console.log('Login success with name: ' + currentProfile.name);
            navigate('ChatRandom');
          } else {
            console.log('Login success with no profile');
          }
        });

        AccessToken.getCurrentAccessToken().then(data => {
          console.log(data.accessToken.toString());
        });
      }
    });
  };

  const handleLoginGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: CLI_ID_GOOGLE,
    });
  });

  const actionCodeSettings = {
    url: 'https://chattingrandompeople.firebaseapp.com/emailSignInSuccess',
    handleCodeInApp: true,
  };

  const registerUser = async email => {
    try {
      await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings);
      alert('Chúng tôi đã gửi một liên kết đăng nhập đến email của bạn.');
    } catch (error) {
      console.error('Lỗi khi gửi liên kết đăng nhập:', error);
      alert('Có lỗi xảy ra khi gửi liên kết đăng nhập.');
    }
  };

  return (
    <SafeAreaView>
      <View
        style={{
          height: screenHeight,
          width: screenWidth,
          backgroundColor: '#1877d3',
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
              tintColor: '#ffffff',
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
            marginTop: 15,
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
              marginTop: 16,
            }}>
            <TouchableWithoutFeedback onPress={handleLoginFacebook}>
              <View
                style={{
                  height: screenHeight * 0.069,
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
                    height: screenHeight * 0.041,
                    width: screenHeight * 0.041,
                    marginStart: 20,
                    tintColor: '#ffffff',
                  }}
                />
                <Text
                  style={{
                    marginStart: 16,
                    color: '#ffffff',
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  Đăng nhập bằng Facebook
                </Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={handleLoginGoogle}>
              <View
                style={{
                  marginTop: 15,
                  height: screenHeight * 0.069,
                  backgroundColor: '#d6fcfc',
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
                  source={images.google}
                  style={{
                    height: screenHeight * 0.041,
                    width: screenHeight * 0.041,
                    marginStart: 20,
                  }}
                />
                <Text
                  style={{
                    marginStart: 16,
                    color: '#1e1e1e',
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  Đăng nhập bằng Google
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
                <Image
                  source={images.mail}
                  style={{
                    height: screenHeight * 0.041,
                    width: screenHeight * 0.041,
                    marginStart: 20,
                    tintColor: '#1e1e1e',
                  }}
                />
                <Text
                  style={{
                    marginStart: 16,
                    color: '#1e1e1e',
                    fontSize: 15,
                    fontWeight: 'bold',
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
                value="cn764011@gmail.com"
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
              <TouchableWithoutFeedback onPress={() => registerUser(email)}>
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
            marginTop: 50,
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
