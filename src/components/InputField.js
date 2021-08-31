import React from 'react';
import {TouchableOpacity, View, Text, TextInput} from 'react-native';

//  Styles
import styles from './styles/InputField';

const InputField = ({
  value,
  setValue,
  placeholder,
  numberOfLines,
  secure,
  label,
  keyboardType,
}) => {
  return (
    <View style={[]}>
      <Text style={[styles.inputtext]}>{label}</Text>
      <TextInput
        style={[styles.inputStyle]}
        value={value}
        onChangeText={text => setValue(text)}
        placeholderTextColor="#bfbfbf"
        placeholder={placeholder}
        numberOfLines={numberOfLines ? numberOfLines : 1}
        secureTextEntry={secure}
        keyboardType={`${keyboardType}`}
      />
    </View>
  );
};

export default InputField;
