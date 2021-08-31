import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

//  Local File
import {AuthContext} from '../AuthProvider';

//  StyleSheet
import styles from './styles/CommonStyles';

//  Image
import userImage from '../images/man.png';
import cameraIcon from '../images/camera.png';
import galleryIcon from '../images/gallery.png';

const PhotoScreen = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const {user} = useContext(AuthContext);

  useEffect(() => {
  getImage();
  }, []);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then( image => {
          submitImage(image);
      })
      .catch(err => {console.log(err)
       ToastAndroid.showWithGravity(
        'Image selection failed. Please try again!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );

      });
  };

  const chooseFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then( image => {
          submitImage(image);
      })
      .catch(err => {
         ToastAndroid.showWithGravity(
        err,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
        console.log(err)});
  };

  const submitImage = async (image) => {
    try {
      const uploadUri = image&&image.path;
      setLoader(true);
      let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
      const extension = filename.split('.').pop();
      const name = filename.split('.').slice(0, -1).join('.');
      filename = name + Date.now() + '.' + extension;
      const storageRef = storage().ref(`photos/${filename}`);
      const putdata = await storageRef.putFile(uploadUri);
      const imageurl = await storageRef.getDownloadURL();
      firestore()
        .collection('profileImage')
        .add({
          userId: user && user.uid,
          imageurl,
          timestamp: firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          getImage();
        })
        .catch(err => {
          console.log('fire error:', err);
          setLoader(false);
        });
    } catch (err) {
       ToastAndroid.showWithGravity(
        'Image selection failed. Please try again!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      console.log('try catch',err);
      setLoader(false);
    }
  };
  const getImage = async () => {
    setLoader(true);
    try {
      firestore()
        .collection('profileImage')
        .where('userId', '==', user && user.uid)
        .orderBy('timestamp', 'desc')
        .get()
        .then(querySnapshot => {
          if (querySnapshot.docs.length != 0) {
            setImageUrl(querySnapshot.docs[0]._data.imageurl);
          }
          setLoader(false);
        })
        .catch(err => {
          console.log(err);
          setLoader(false);
        });
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
            zIndex:222
          }}>
          <ActivityIndicator size="large" color="#6C63FF" />
        </View>
      )}
      <Text style={[styles.largeTxt3, styles.horizontalCenter]}>
        Your Profile Image
      </Text>
      <View style={[styles.profileImageContainer]}>
        {imageUrl == null ? (
          <Image source={userImage} />
        ) : (
          <Image
            source={{
              uri: imageUrl,
            }}
            resizeMode="cover"
            style={[styles.profileImage]}
          />
        )}
      </View>

      <ActionButton buttonColor="#6C63FF">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Gallery"
          onPress={chooseFromGallery}>
          <Image source={galleryIcon} style={[styles.iconStyleSmall]} />
        </ActionButton.Item>

        <ActionButton.Item
          buttonColor="#1abc9c"
          title="Camera"
          onPress={takePhotoFromCamera}>
          <Image source={cameraIcon} style={[styles.iconStyleSmall]} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

export default PhotoScreen;
