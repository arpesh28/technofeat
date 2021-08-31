import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('screen');

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  accentbg: {
    backgroundColor: '#6C63FF',
  },
  centerScreen: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height / 1.2,
    width: width,
  },
  verticalCenter: {
    justifyContent: 'center',
  },
  mediumTxt: {
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 28,
  },
  mediumTxt2: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 28,
    textAlign: 'left',
    color: '#261f99',
  },

  answer: {
       backgroundColor:'#dbd9ff',
       padding: 20,
    borderRadius: 90,
    justifyContent:'center',
    alignItems:'center',
    marginTop: 25,
    borderWidth:0.8, 
    borderColor:'#6C63FF'
  },

  //  margin & padding
  mt50: {
    marginTop: 50,
  },
  ml30: {marginLeft: 30},
  mt20: {marginTop: 20},
  mt10: {marginTop: 10},

  width80: {
    width: width / 1.2,
  },
  width40: {
    width: width / 1.5,
  },
  textCenter: {
    textAlign: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  iconStyleSmall: {
    width: 30,
    height: 30,
  },
  iconStyleSmall2: {
    width: 20,
    height: 20,
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
  },
  justifySpaceAround: {
    justifyContent: 'space-around',
  },
  btnContainer: {
    width: width,
  },
  customImagebtn: {
    backgroundColor: 'white',
    elevation: 1,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  logoSplash: {
    width: 140,
    height: 140,
  },
  profileImage: {
    width: width - 50,
    height: width - 50,
    borderRadius: 999,
  },
  profileImageContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: height / 2,
  },
  largeTxt: {
    fontSize: 35,
    fontWeight: '800',
    width: width - 100,
  },
  largeTxt2: {
    fontSize: 40,
    fontWeight: '800',
    width: width - 100,
    lineHeight: 55,
    letterSpacing: 0.9,
    marginLeft: 30,
  },
  largeTxt22: {
    fontSize: 40,
    fontWeight:'800',
    color: '#6C63FF',
  },
  largeTxt3: {
    fontSize: 30,
    fontWeight: '800',
    width: width - 50,
    lineHeight: 55,
    letterSpacing: 0.9,
    marginLeft: 30,
    textAlign: 'center',
  },
  horizontalCenter: {
    alignItems: 'center',
  },
  clickabletext: {
    color: '#969696',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  clickabletext2: {
    fontSize: 18,
    fontWeight: '700',
    color: '#605f70',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  illustration1: {
    width: width - 20,
    height: height / 4,
  },
  illustration2: {
    width: width - 20,
    height: height / 2,
  },
  bellIcon: {
    borderRadius: 50,
    backgroundColor: '#6C63FF',
    padding: 25,
    elevation: 10,
    position: 'absolute',
    right: 30,
    bottom: 30,
  },
  operatorIcon: {
    borderRadius: 999,
    backgroundColor: '#6C63FF',
    padding: 20,
    // elevation: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  operatorContainers: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  messagebox: {
    width: width - 50,
    height: height / 5,
    backgroundColor: '#dbd9ff',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 15,
    borderBottomRightRadius: 0,
    padding: 20,
  },
});
