import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('screen');

export default StyleSheet.create({
  inputStyle: {
    borderColor: '#ccccdb',
    borderWidth: 0.5,
    color: '#585863',
    borderRadius: 50,
    paddingLeft: 30,
    paddingVertical: 16,
    fontWeight: '600',
    backgroundColor: 'white',
    // 6C63FF
  },
  inputtext: {
    color: 'black',
    fontWeight: '700',
    marginLeft: 30,
    marginBottom: 8,
  },
});
