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
  KeyboardAvoidingView
} from 'react-native';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {validateLogin} from '../validations';

//  StyleSheet
import styles from './styles/CommonStyles';

//  Images
import logo from '../images/logo.png';
import i1 from '../images/i1.png';

//  Components
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import {AuthContext} from '../AuthProvider';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);

  const {register} = useContext(AuthContext);

  const submit = async () => {
    setLoader(true);
    const msg = validateLogin({email, password});
    if (msg == true) {
     const response = await register(email, password);
      if(response.code == 'auth/email-already-in-use') {
                ToastAndroid.showWithGravity(
                  'This email address is already in use!',
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER,
                );
            }  else if (response.code === 'auth/invalid-email') {
                ToastAndroid.showWithGravity(
                  'The email address is invalid',
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER,
                );
            } 
      setTimeout(() => {
        setLoader(false);
      }, 1000);
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
            zIndex:222
          }}>
          <ActivityIndicator size="large" color="#6C63FF" />
        </View>
      )}
       <ScrollView
      contentContainerStyle={[ styles.horizontalCenter]}>
      <Image source={i1} style={[styles.illustration1]} resizeMode="center" />
      <Text style={[styles.largeTxt, styles.textCenter]}>
        Welcome to Techno World!
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
        <CustomButton name="Sign Up" onPress={submit} />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('SIGNIN')}
        style={[styles.width80, styles.mt50]}>
        <Text style={[styles.clickabletext]}>Already have an account?</Text>
        <Text
          style={[styles.clickabletext, styles.clickabletext2, styles.mt10]}>
          Sign In
        </Text>
      </TouchableOpacity>
    
    </ScrollView>
  
    </View>
    );
};

export default SignUpScreen;
