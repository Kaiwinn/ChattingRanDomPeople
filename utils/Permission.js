import {PermissionsAndroid, Platform} from 'react-native';

export const hasAndroidPermission = async () => {
  const getPermission = async permission => {
    return (
      (await PermissionsAndroid.check(permission)) ||
      (await PermissionsAndroid.request(permission)) ===
        PermissionsAndroid.RESULTS.GRANTED
    );
  };

  if (Platform.Version >= 33) {
    const imagePermission = await getPermission(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
    );
    const videoPermission = await getPermission(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
    );
    return imagePermission && videoPermission;
  } else {
    return await getPermission(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
  }
};
