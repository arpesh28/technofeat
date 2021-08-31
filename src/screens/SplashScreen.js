import React, {useContext, useState, useEffect} from 'react';
import {Text, View, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../AuthProvider';

//  StyleSheet
import styles from './styles/CommonStyles';

// Images
import logo from '../images/logo.png';

const SplashScreen = ({navigation}) => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (!initializing) {
    setTimeout(() => {
      {
        user ? navigation.navigate('MAINAPP') : navigation.navigate('SIGNUP');
      }
    }, 2000);
  }
  if (initializing) return null;

  return (
    <View style={[styles.centerScreen, styles.mainContainer]}>
      <View>
        <Image
          source={logo}
          style={[styles.illustration2]}
          resizeMode="contain"
        />
      </View>
      <Text
        style={[
          styles.largeTxt,
          styles.mt50,
          styles.textCenter,
          {color: '#6C63FF'},
        ]}>
        Welcome to Techno Features
      </Text>
    </View>
  );
};

export default SplashScreen;
