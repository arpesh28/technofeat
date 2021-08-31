import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('screen');

export default StyleSheet.create({
  buttoncontainer: {
    paddingHorizontal: 20,
    backgroundColor: '#6C63FF',
    paddingVertical: 16,
    borderRadius: 50,
  },
  btntext: {
    fontSize: 22,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
  },
});
