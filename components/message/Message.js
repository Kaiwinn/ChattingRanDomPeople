import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import Autolink from 'react-native-autolink';
import Image1 from './Image1';
import {useSelector} from 'react-redux';

const Message = props => {
  const {item, onPressDetail} = props;
  const THEME = useSelector(state => state.theme.color);
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  return (
    <View>
      {item.isSelected && (
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 13,
            marginVertical: 3,
          }}>
          14:25
        </Text>
      )}
      {item.isImage == false ? (
        <TouchableWithoutFeedback onPress={onPressDetail}>
          <View
            style={{
              backgroundColor: colors[THEME].backgroundMessage,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 11,
              paddingVertical: 8,
              borderRadius: 20,
              alignSelf: item.isSender == false ? 'flex-start' : 'flex-end',
              marginStart: item.isSender == false ? 10 : 0,
              marginEnd: item.isSender == false ? 0 : 5,
              marginTop: 5,
              maxWidth: screenWidth * 0.7,
            }}>
            <Autolink
              selectable={true}
              style={{
                fontSize: 15,
                color: colors[THEME].textMessage,
              }}
              text={item.message}
            />
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <Image1 />
      )}

      {item.isSelected && (
        <Text
          style={{
            fontSize: 13,
            marginHorizontal: 11,
            marginVertical: 3,
            alignSelf: item.isSender == false ? 'flex-start' : 'flex-end',
          }}>
          <Text style={{fontWeight: '500'}}>Đã xem</Text> 14:55
        </Text>
      )}
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({});
