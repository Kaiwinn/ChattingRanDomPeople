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
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {colors, images} from '../constants';
import AnimatedHeart from '../components/animated/AnimatedHeart';
import SplashScreen from 'react-native-splash-screen';
import Autolink from 'react-native-autolink';

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
        // Chiều cao của bàn phím là event.endCoordinates.height
        const keyboardHeight = event.endCoordinates.height;
        console.log('Keyboard is shown with height:', keyboardHeight);

        setKeyboardHeight(keyboardHeight);
        setShowKeyboard(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setShowKeyboard(false);
        console.log('Keyboard is hidden');
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const [chooseLeave, setChooseLeave] = useState(false);

  const textWithPhoneAndLink =
    'Liên hệ qua số đt 1234567890 hoặc vào https://www.kai.com';

  const textWithPhoneAndLink2 =
    'Tôi đã gửi tin nhắn này cho bạn, mong bạn phản hồi';

  let activeColor = colors['light'];

  const [visibilityRP, setVisibilityRP] = useState(false);

  const [visibilityNickname, setVisibilityNickname] = useState(false);

  const [modalNickname, setModalNickname] = useState(false);

  return (
    <View
      style={{
        height: screenHeight,
        width: screenWidth,
        backgroundColor: activeColor.background,
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
              color: activeColor.textColorTitle,
              marginStart: 5,
            }}>
            Chat với người lạ
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            setChooseLeave(true);
          }}>
          <Image
            source={images.upload}
            style={{
              height: screenHeight * 0.036,
              width: screenHeight * 0.036,
              marginVertical: 5,
              marginEnd: 5,
              tintColor: activeColor.infoColor,
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
              tintColor: activeColor.infoColor,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setVisibilityRP(!visibilityRP)}>
          <Image
            source={images.dots}
            style={{
              height: screenHeight * 0.04,
              width: screenHeight * 0.04,
              marginEnd: 8,
              marginVertical: 5,
              tintColor: activeColor.infoColor,
            }}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          height:
            showKeyboard == true
              ? screenHeight * 0.83 - keyboardHeight
              : chooseLeave == true
              ? screenHeight * 0.83 - screenHeight * 0.038
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
          {/* <Text
            style={{
              alignSelf: 'center',
              fontSize: 14,
            }}>
            14:25
          </Text> */}
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
          {/* <Text
            style={{
              fontSize: 14,
              marginHorizontal: 11,
            }}>
            <Text style={{fontWeight: '500'}}>Đã xem</Text> 14:55
          </Text> */}
        </View>
        <View>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 14,
            }}>
            14:25
          </Text>
          <View
            style={{
              backgroundColor: activeColor.backgroundMessage,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 11,
              paddingVertical: 8,
              borderRadius: 20,
              alignSelf: 'flex-end',
              marginEnd: 10,
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
          <Text
            style={{
              fontSize: 14,
              marginHorizontal: 11,
              alignSelf: 'flex-end',
            }}>
            <Text style={{fontWeight: '500'}}>Đã xem</Text> 14:55
          </Text>
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

      {/* <View
        style={{
          height: screenHeight * 0.086,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: showKeyboard == true ? keyboardHeight : 0,
        }}>
        <Image
          source={images.add_image}
          style={{
            height: screenHeight * 0.034,
            width: screenHeight * 0.034,
            marginHorizontal: 15,
            tintColor: activeColor.infoColor,
          }}
        />
        <TextInput
          style={{
            flex: 1,
            borderRadius: 25,
            borderWidth: 1,
            borderColor: activeColor.borderTextInput,
            paddingHorizontal: 20,
            backgroundColor: activeColor.backgroundInput,
            fontSize: 16,
            fontWeight: '400',
            marginBottom: 9,
            marginTop: 9,
          }}
          placeholder="Nhập tin nhắn..."
          placeholderTextColor={activeColor.textInput}
        />
        <TouchableOpacity
          onPress={() => {
            const numHeartsToAdd = 18; // Số lượng trái tim bạn muốn thêm
            const newHearts = Array.from({length: numHeartsToAdd}, () => ({
              id: getUniqueID(),
              delay: Math.random() * 3100, // Độ trễ ngẫu nhiên từ 0ms đến 2000ms
              size: (Math.floor(Math.random() * 10) + 1) * 2,
            }));
            setHearts([...hearts, ...newHearts]);
          }}>
          <Image
            source={images.heart}
            style={{
              height: screenHeight * 0.038,
              width: screenHeight * 0.038,
              marginHorizontal: 15,
              tintColor: activeColor.infoColor,
            }}
          />
        </TouchableOpacity>
        <Modal transparent visible={chooseLeave}>
          <TouchableWithoutFeedback
            onPress={() => {
              setChooseLeave(false);
            }}>
            <View
              style={{
                flex: 1,
              }}></View>
          </TouchableWithoutFeedback>

          <View
            style={{
              height: screenHeight * 0.086 + screenHeight * 0.038,
              backgroundColor: '#ffffff',
            }}>
            <View
              style={{
                flex: 1,
                borderBottomWidth: 0.2, // Độ dày của viền dưới
                borderBottomColor: '#a8a8a8',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={images.exit}
                style={{
                  height: screenHeight * 0.03,
                  width: screenHeight * 0.03,
                  marginHorizontal: 15,
                }}
              />
              <Text>Thoát khỏi cuộc trò chuyện ẩn danh</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={images.bookmark}
                style={{
                  height: screenHeight * 0.03,
                  width: screenHeight * 0.03,
                  marginHorizontal: 15,
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: '#7a7a7a',
                }}>
                Thêm vào yêu thích
              </Text>
            </View>
          </View>
        </Modal>
      </View> */}
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
        <View
          style={{
            height: 80,
            with: 100,
            backgroundColor: 'red',
          }}></View>
      </View>

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
    </View>
  );
};

export default ChatRandom;

const styles = StyleSheet.create({});
