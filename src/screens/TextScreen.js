import React, {useState, useContext} from 'react';
import {Text, View, ActivityIndicator, ScrollView, ToastAndroid, KeyboardAvoidingView} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

//  Local File
import {AuthContext} from '../AuthProvider';

//  StyleSheet
import styles from './styles/CommonStyles';

//  Components
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
 
const TextScreen = ({navigation}) => {
  const [message, setMessage] = useState('');
  const [displayText, setDisplayText] = useState('');
  const {user} = useContext(AuthContext);
  const [loader, setLoader] = useState(false);

   firestore()
    .collection('userBio')
    .where('userId', '==', user && user.uid)
    .orderBy('timestamp', 'desc')
    .onSnapshot(
      documentSnapshot => {
        setDisplayText(
          documentSnapshot && documentSnapshot.docs[0] && documentSnapshot.docs[0]._data&& documentSnapshot.docs[0]._data.message,
        );
      },
      err => {
        console.log('err', err);
      },
    );
  const postBioData = () => {
    setLoader(true);
    try {
      console.log('message:', message);
      if(message!=='') {
 firestore()
        .collection('userBio')
        .add({
          userId: user && user.uid,
          message,
          timestamp: firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          console.log('Message Added!');
          setLoader(false);
        })
        .catch(err => {
          console.log('Error:', err);
          setLoader(false);
        });
      } else {
          setLoader(false);

ToastAndroid.showWithGravity(
        'Please type something about yourself',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      }
     
    } catch (err) {
      console.log(err);
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
      
      contentContainerStyle={[styles.horizontalCenter, styles.mainContainer]}>
      <View style={[styles.messagebox]}>
        <Text
          style={[styles.mediumTxt2]}
          numberOfLines={4}
          ellipsizeMode="tail">
          {displayText
            ? displayText
            : 'Type your biodata below and click save to send to the server.'}
        </Text>
      </View>
     
      <View
        style={[
          styles.verticalCenter,
          styles.horizontalCenter,
          {position: 'absolute', bottom: 30, alignSelf: 'center'},
        ]}>
        <View style={[styles.mt20, styles.width80]}>
          <InputField
            value={message}
            setValue={setMessage}
            placeholder="About yourself"
          keyboardType="default"

          />
        </View>
        <View style={[styles.width80, styles.mt20]}>
          <CustomButton
            name="Save"
            onPress={() => {

              postBioData();
            }}
          />
        </View>
      </View>
    </ScrollView>
 
    </View>
     );
};

export default TextScreen;
