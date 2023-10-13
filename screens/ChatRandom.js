import {
  Dimensions,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  Platform,
  PermissionsAndroid,
  ScrollView,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {colors, images} from '../constants';
import AnimatedHeart from '../components/animated/AnimatedHeart';
import SplashScreen from 'react-native-splash-screen';
import Autolink from 'react-native-autolink';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import Header from '../components/Header';
import BottomChat from '../components/BottomChat';

function getUniqueID() {
  return Math.floor(Math.random() * Date.now()).toString();
}

const ChatRandom = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [hearts, setHearts] = useState([]);

  const handleCompleteAnimation = useCallback(id => {
    setHearts(oldHearts => {
      return oldHearts.filter(heart => heart.id !== id);
    });
  }, []);

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const [showKeyboard, setShowKeyboard] = useState(false);
  useEffect(() => {
    SplashScreen.hide();
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      event => {
        const keyboardHeight = event.endCoordinates.height;

        setKeyboardHeight(keyboardHeight);
        setShowKeyboard(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setShowKeyboard(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const textWithPhoneAndLink =
    'Liên hệ qua số đt 1234567890 hoặc vào https://www.kai.com';

  const textWithPhoneAndLink2 =
    'Tôi đã gửi tin nhắn này cho bạn, mong bạn phản hồi';

  let activeColor = colors['light'];

  const [visibilityRP, setVisibilityRP] = useState(false);

  const [visibilityNickname, setVisibilityNickname] = useState(false);

  const [modalNickname, setModalNickname] = useState(false);

  const [startChat, setStartChat] = useState(true);

  const [showUploadImg, setShowUploadImg] = useState(false);

  async function hasAndroidPermission() {
    const getCheckPermissionPromise = () => {
      if (Platform.Version >= 33) {
        return Promise.all([
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          ),
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          ),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission,
        );
      } else {
        return PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      }
    };

    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }
    const getRequestPermissionPromise = () => {
      if (Platform.Version >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          statuses =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };

    return await getRequestPermissionPromise();
  }

  async function getPhotos() {
    try {
      const result = await CameraRoll.getPhotos({
        first: 30, // Lấy 20 ảnh đầu tiên
        assetType: 'Photos',
      });
      const photosArray = result.edges || [];
      setPhotos(photosArray);
    } catch (error) {
      console.error('Error loading photos:', error);
    }
  }

  _handleButtonPress = async () => {
    const hasPermission = await hasAndroidPermission();
    if (hasPermission) {
      await getPhotos();
    }
  };

  const [photos, setPhotos] = useState([]);

  const renderPhoto = ({item}) => (
    <View
      style={{
        margin: 1,
        flex: 1 / 3, // Chia mỗi phần thành 1/3 để hiển thị 3 cột
      }}>
      <Image
        style={{width: '100%', aspectRatio: 1}}
        // Thiết lập chiều rộng là 100% và tỷ lệ khung hình 1:1
        source={{
          uri: item.node.image.uri,
        }}
      />
    </View>
  );

  const [detailSend, setDetailSend] = useState(false);
  const [detailRecive, setDetailRecive] = useState(false);

  return (
    <View
      style={{
        height: screenHeight,
        width: screenWidth,
        backgroundColor: activeColor.background,
      }}>
      <Header
        color={activeColor}
        onPressRP={() => {
          setVisibilityRP(!visibilityRP);
        }}
      />

      <View
        style={{
          height:
            showKeyboard == true
              ? screenHeight * 0.83 - keyboardHeight
              : showUploadImg == true &&
                startChat == false &&
                showKeyboard == false
              ? screenHeight * 0.83 -
                screenHeight * 0.114 -
                screenHeight * 0.235
              : startChat == false
              ? screenHeight * 0.83
              : screenHeight * 0.83 - screenHeight * 0.114,
          justifyContent: 'flex-end',
          marginBottom: screenHeight * 0.002,
        }}>
        <View
          style={{
            backgroundColor: activeColor.backgroundMessage,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 11,
            paddingVertical: 8,
            borderRadius: 20,
            alignSelf: 'flex-start',
            marginStart: 10,
          }}>
          <Text
            selectable={true}
            style={{
              fontSize: 15,
              color: '#282828',
            }}>
            Hello
          </Text>
        </View>
        <View>
          {detailRecive && (
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 13,
                marginVertical: 3,
              }}>
              14:25
            </Text>
          )}

          <TouchableWithoutFeedback
            onPress={() => {
              setDetailRecive(!detailRecive);
            }}>
            <View
              style={{
                backgroundColor: activeColor.backgroundMessage,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 11,
                paddingVertical: 8,
                borderRadius: 20,
                alignSelf: 'flex-start',
                marginStart: 10,
                marginTop: 5,
                maxWidth: screenWidth * 0.7,
              }}>
              <Autolink
                selectable={true}
                style={{
                  fontSize: 15,
                  color: activeColor.textMessage,
                }}
                text={textWithPhoneAndLink}
              />
            </View>
          </TouchableWithoutFeedback>
          {detailRecive && (
            <Text
              style={{
                fontSize: 13,
                marginHorizontal: 11,
                marginVertical: 3,
              }}>
              <Text style={{fontWeight: '500'}}>Đã xem</Text> 14:55
            </Text>
          )}
        </View>
        <View>
          {detailSend == true && (
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 13,
                marginVertical: 3,
              }}>
              14:25
            </Text>
          )}
          <TouchableWithoutFeedback
            onPress={() => {
              setDetailSend(!detailSend);
            }}>
            <View
              style={{
                backgroundColor: activeColor.backgroundMessage,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 11,
                paddingVertical: 8,
                borderRadius: 20,
                alignSelf: 'flex-end',
                marginTop: 5,
                maxWidth: screenWidth * 0.7,
              }}>
              <Autolink
                selectable={true}
                style={{
                  fontSize: 15,
                  color: activeColor.textMessage,
                }}
                text={textWithPhoneAndLink2}
              />
            </View>
          </TouchableWithoutFeedback>

          {detailSend == true && (
            <Text
              style={{
                fontSize: 13,
                marginHorizontal: 11,
                alignSelf: 'flex-end',
                marginVertical: 3,
              }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '500',
                }}>
                Đã xem
              </Text>{' '}
              14:55
            </Text>
          )}
        </View>

        <View
          style={{
            width: screenWidth * 0.5,
            alignSelf: 'flex-end',
            marginHorizontal: 5,
          }}>
          <Image
            source={images.photo1}
            style={{
              height: screenHeight * 0.25,
              alignSelf: 'flex-end',
              justifyContent: 'flex-end',
              aspectRatio: 0.5,
            }}
          />
        </View>
      </View>
      {hearts.map(item => (
        <AnimatedHeart
          key={item.id}
          onCompleteAnimation={handleCompleteAnimation}
          id={item.id}
          delay={item.delay}
          size={item.size}
        />
      ))}

      {startChat == true ? (
        <View
          style={{
            height: screenHeight * 0.2,
            width: screenWidth,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              marginTop: 25,
              alignSelf: 'center',
              fontSize: 16,
              fontWeight: '400',
              color: activeColor.textColorTitle,
              marginStart: 5,
              opacity: 0.6,
            }}>
            Hãy bắt đầu một cuộc trò chuyện mới
          </Text>
          <TouchableOpacity
            onPress={() => {
              setStartChat(false);
            }}>
            <View
              style={{
                height: screenHeight * 0.06,
                width: screenWidth * 0.4,
                backgroundColor: '#cd3cea',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 15,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  textTransform: 'uppercase',
                  color: '#f4f4f4',
                  fontWeight: '500',
                }}>
                Bắt đầu chat
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <BottomChat
          marginBottom={showKeyboard == true ? keyboardHeight : 0}
          onPress1={() => {
            _handleButtonPress();
            setShowUploadImg(!showUploadImg);
            showKeyboard == true ? Keyboard.dismiss() : null;
          }}
          activeColor={activeColor}
          onPress2={() => {
            const numHeartsToAdd = 18; // Số lượng trái tim bạn muốn thêm
            const newHearts = Array.from({length: numHeartsToAdd}, () => ({
              id: getUniqueID(),
              delay: Math.random() * 3100, // Độ trễ ngẫu nhiên từ 0ms đến 2000ms
              size: (Math.floor(Math.random() * 10) + 1) * 2,
            }));
            setHearts([...hearts, ...newHearts]);
          }}
        />
      )}

      {visibilityNickname == true ? (
        <View
          style={{
            height: screenHeight,
            width: screenWidth,
            position: 'absolute',
            bottom: 0,
            top: 0,
          }}>
          <View
            style={{
              height: screenHeight * 0.083,
              backgroundColor: activeColor.background,
              shadowColor: activeColor.shadowColor,
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
                setVisibilityNickname(false);
              }}>
              <Image
                source={images.back}
                style={{
                  height: screenHeight * 0.029,
                  width: screenHeight * 0.029,
                  marginHorizontal: 10,
                  marginVertical: 15,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: activeColor.textColorTitle,
                marginStart: 5,
              }}>
              Chỉnh sửa biệt danh
            </Text>
          </View>
          <View
            style={{
              paddingTop: 10,
              height: screenHeight * 0.129,
              width: screenWidth,
              backgroundColor: activeColor.background,
            }}>
            <TouchableOpacity
              onPress={() => {
                setModalNickname(true);
              }}
              style={{
                flex: 1,
                justifyContent: 'center',
                marginVertical: 10,
                marginHorizontal: 25,
              }}>
              <View style={{}}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: activeColor.textColorTitle,
                  }}>
                  Đặt biệt danh
                </Text>

                <Text
                  style={{
                    fontSize: 13,
                  }}>
                  Người lạ
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                marginVertical: 10,
                marginHorizontal: 25,
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: activeColor.textColorTitle,
                  }}>
                  Đặt biệt danh
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                  }}>
                  Bạn
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View></View>
      )}

      <Modal transparent visible={modalNickname}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(1, 1, 1,0.5)',
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setModalNickname(false);
            }}>
            <View
              style={{
                flex: 1,
                width: screenWidth,
              }}></View>
          </TouchableWithoutFeedback>

          <View
            style={{
              flexDirection: 'row',
            }}>
            <TouchableWithoutFeedback
              onPress={() => {
                setModalNickname(false);
              }}>
              <View
                style={{
                  height: screenHeight * 0.28,
                  width: screenWidth * 0.05,
                }}></View>
            </TouchableWithoutFeedback>
            <View
              style={{
                height: screenHeight * 0.28,
                width: screenWidth * 0.9,
                borderRadius: 10,
                backgroundColor: '#efefef',
              }}>
              <Text
                style={{
                  fontSize: 17,
                  color: '#111',
                  fontWeight: 'bold',
                  marginVertical: 15,
                  marginHorizontal: 20,
                }}>
                Chỉnh sửa biệt danh
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#565656',
                  fontWeight: '400',
                  marginBottom: 5,
                  marginHorizontal: 20,
                }}>
                Người lạ sẽ chỉ thấy biệt dạnh này trong đoạn chat
              </Text>

              <TextInput
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  marginHorizontal: 20,
                }}
                placeholder="Người lạ"
                placeholderTextColor={activeColor.textInput}
              />
              <View
                style={{
                  marginHorizontal: 20,
                  height: 2,
                  width: screenWidth * 0.9 - 40,
                  backgroundColor: activeColor.textInput,
                  opacity: 0.5,
                }}></View>
              <View
                style={{
                  flex: 1,
                  marginBottom: 10,
                  marginHorizontal: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setModalNickname(false);
                  }}>
                  <Text
                    style={{
                      marginHorizontal: 5,
                      fontWeight: '700',
                      fontSize: 15,
                    }}>
                    Hủy
                  </Text>
                </TouchableOpacity>

                <View
                  style={{
                    flex: 1,
                  }}></View>
                <Text
                  style={{
                    marginHorizontal: 5,
                    fontWeight: '700',
                    fontSize: 15,
                  }}>
                  Đặt
                </Text>
              </View>
            </View>
            <TouchableWithoutFeedback
              onPress={() => {
                setModalNickname(false);
              }}>
              <View
                style={{
                  height: screenHeight * 0.28,
                  width: screenWidth * 0.05,
                }}></View>
            </TouchableWithoutFeedback>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              setModalNickname(false);
            }}>
            <View
              style={{
                flex: 1,
                width: screenWidth,
              }}></View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>

      {visibilityRP == true ? (
        <View
          style={{
            height: screenHeight,
            width: screenWidth,
            position: 'absolute',
            bottom: 0,
            top: 0,
            flexDirection: 'row',
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setVisibilityRP(false);
            }}>
            <View
              style={{
                flex: 1,
              }}></View>
          </TouchableWithoutFeedback>

          <View
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              marginTop: screenHeight * 0.086,
              width: screenWidth * 0.46,
              backgroundColor: '#fffcfe',
              alignSelf: 'flex-end',
              marginEnd: 15,
            }}>
            <Text
              style={{
                height: screenHeight * 0.049,
                textAlignVertical: 'center',
                fontSize: 16,
                fontWeight: '400',
                paddingHorizontal: 10,
                color: '#282828',
                marginVertical: 3,
              }}>
              Hình nền
            </Text>
            <TouchableOpacity
              onPress={() => {
                setVisibilityRP(false);
                setVisibilityNickname(true);
              }}>
              <Text
                style={{
                  height: screenHeight * 0.049,
                  textAlignVertical: 'center',
                  fontSize: 16,
                  fontWeight: '400',
                  paddingHorizontal: 10,
                  color: '#282828',
                  marginVertical: 3,
                }}>
                Biệt danh
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                height: screenHeight * 0.049,
                textAlignVertical: 'center',
                fontSize: 16,
                fontWeight: '400',
                paddingHorizontal: 10,
                color: '#282828',
                marginVertical: 3,
              }}>
              Xóa cuộc trò chuyện
            </Text>
            <Text
              style={{
                height: screenHeight * 0.049,
                textAlignVertical: 'center',
                paddingHorizontal: 10,
                fontSize: 16,
                fontWeight: '400',
                color: '#282828',
                marginVertical: 3,
              }}>
              Báo cáo vi phạm
            </Text>
          </View>
        </View>
      ) : (
        <View></View>
      )}

      <View
        style={{
          height: screenHeight * 0.37,
          width: screenWidth,
        }}>
        <FlatList
          data={photos}
          keyExtractor={item => item.node.image.uri}
          renderItem={renderPhoto}
          numColumns={3} // Số cột
        />
      </View>
    </View>
  );
};

export default ChatRandom;

const styles = StyleSheet.create({});
