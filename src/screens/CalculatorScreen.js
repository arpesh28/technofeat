import React,{useState} from 'react';
import {Text, View,  ToastAndroid,ActivityIndicator} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

//  StyleSheet
import styles from './styles/CommonStyles';

import {validateCal} from '../validations';

//  Images

//  Components
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
 
//  Firebase 
import functions from '@react-native-firebase/functions';

const CalculatorScreen = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [answercal, setAnswer] = useState('');
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([
    {
      value: 'plus',
      label: 'Plus',
     
    },
    {
      value: 'minus',
      label: 'Minus',
  
    },
    {
      value: 'multiply',
      label: 'Multiply',
    
    },
  ]);

  const calculate = () => {
    var msg = validateCal(num1, num2, value);
    if (msg == true) {
    setLoader(true)
       functions()
      .httpsCallable('calculate')({num1:parseInt(num1), num2: parseInt(num2),operation: value})
      .then(response => {
        console.log('response:', response)
        setAnswer(response&&response.data)
        setLoader(false);
      }).catch((err)=>{console.log('err', err)})
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
    <View style={[styles.mainContainer, styles.centerScreen]}>
      {loader && (
        <View
          style={{
            position: 'absolute',
            alignSelf: 'center',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.2)',
            zIndex:22
          }}>
          <ActivityIndicator size="large" color="#6C63FF" />
        </View>
      )}
      <View style={[styles.width40]}>
        <InputField
          value={num1}
          setValue={setNum1}
          placeholder="First Number"
          keyboardType="number-pad"
        />
        
        <View style={[styles.mt20]}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder={'Select an Operation'}
            showArrowIcon={false}
            style={{
              alignSelf: 'center',
              // borderRadius: 999,
              justifyContent: 'center',
              borderWidth: 0.5,
              borderColor: '#ccccdb',
              zIndex:2
            }}
          />
        </View>

        <InputField
          value={num2}
          setValue={setNum2}
          placeholder="Second Number"
          keyboardType="number-pad"
        />
      </View>
      <View style={[styles.width80, styles.mt20]}>
        <CustomButton name="Calculate" onPress={calculate} />
      </View>
      {answercal!==''&&<View style={[styles.answer]}>
          <Text style={[styles.largeTxt22,styles.textCenter]}>{answercal}</Text>
      </View>}
    </View>
  );
};

export default CalculatorScreen;
