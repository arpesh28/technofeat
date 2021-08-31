import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

//  Styles
import styles from './styles/CustomButton';

const CustomButton = ({disable, onPress, name}) => {
  return (
    <TouchableOpacity
      disabled={disable}
      style={[styles.buttoncontainer]}
      onPress={onPress}>
      <Text style={[styles.btntext]}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
