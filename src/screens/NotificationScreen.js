import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import PushNotification from 'react-native-push-notification';

//  StyleSheet
import styles from './styles/CommonStyles';

//  image
import i4 from '../images/i4.png';
import bell from '../images/bell.png';

const NotificationScreen = ({navigation}) => {
  PushNotification.configure({
    onRegister: function (token) {
    },
    onNotification: function (notification) {
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    onAction: function (notification) {
    },
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
  PushNotification.createChannel(
    {
      channelId: 'technofeat', // (required)
      channelName: 'My channel', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
  const localPushNotification = () => {
    try {
      PushNotification.localNotification({
        channelId: 'technofeat',
        autoCancel: 'yes',
        title: 'Techno Feat Notification', // (optional)
        message: 'You have successfully sent the notification to your device.', // (required)
        vibrate: true,
        vibration: 800,
        playSound: true,
        soundName: 'default',
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={[styles.centerScreen, styles.mainContainer]}>
      <View>
        <Text style={[styles.largeTxt2]}>Click on the bell button!</Text>
        <Image
          source={i4}
          style={[styles.illustration2]}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          localPushNotification();
        }}
        style={[styles.bellIcon]}>
        <Image
          source={bell}
          style={[styles.iconStyleSmall]}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default NotificationScreen;
