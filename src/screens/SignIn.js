import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {validateLogin} from '../validations';

//  StyleSheet
import styles from './styles/CommonStyles';

//  Images
import logo from '../images/logo.png';
import i2 from '../images/i2.png';

//  Components
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import {AuthContext} from '../AuthProvider';

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loader, setLoader] = useState(false);
  const [password, setPassword] = useState('');

  const {login} = useContext(AuthContext);

  const submit = async () => {
    setLoader(true);
    const msg = validateLogin({email, password});
    if (msg == true) {
      const response = await login(email, password);
      if(response.code == 'auth/user-not-found') {
                ToastAndroid.showWithGravity(
                  'User does not exist',
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER,
                );
               setLoader(false);
            }  else if (response.code === 'auth/wrong-password') {
                ToastAndroid.showWithGravity(
                  'Wrong Password',
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER,
                );
              setLoader(false);
            } 
            if(response&&response.user) {
              console.log('rrespo:', response.user)
              setLoader(false);
            }
    } else {
      ToastAndroid.showWithGravity(
        msg,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      setLoader(false);
    }
  };

  return (
    <View style={[styles.mainContainer]}>
      {loader && (
        <View
          style={{
            position: 'absolute',
            alignSelf: 'center',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.2)',
            zIndex: 222
          }}>
          <ActivityIndicator size="large" color="#6C63FF" />
        </View>
      )}
      <ScrollView
      // showsVerticalScrollIndicator={false}
      // scrollEnabled={true}
      contentContainerStyle={[styles.horizontalCenter]}>
      <Image source={i2} style={[styles.illustration1]} resizeMode="center" />
      <Text style={[styles.largeTxt, styles.textCenter]}>
        We are happy to see you again!
      </Text>
      {/* <Text style={[styles.largeTxt]}>Sign Up</Text> */}
      <View style={[styles.mt20, styles.width80]}>
        <View style={[styles.mt20]}>
          <InputField
            value={email}
            setValue={setEmail}
            placeholder="user@example.com"
            label="Email"
          keyboardType="default"
          />
        </View>
        <View style={[styles.mt20]}>
          <InputField
            value={password}
            setValue={setPassword}
            placeholder="Enter a password"
            secure={true}
            label="Password"
          keyboardType="default"
          />
        </View>
      </View>
      <View style={[styles.width80, styles.mt20]}>
        <CustomButton name="Sign In" onPress={submit} />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('SIGNUP')}
        style={[styles.width80, styles.mt50]}>
        <Text style={[styles.clickabletext]}>Don't have an account?</Text>
        <Text
          style={[styles.clickabletext, styles.clickabletext2, styles.mt10]}>
          Sign Up
        </Text>
      </TouchableOpacity>
      
    </ScrollView>
 
    </View>
     );
};

export default SignInScreen;
