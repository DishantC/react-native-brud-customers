import React from 'react';
import {StyleSheet} from 'react-native';
import {PX} from '../pixel';
const styles = StyleSheet.create({
  logo: {
    width: PX(148),
    height: PX(80),
  },
  main3: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '21%',
  },
  btn: {
    width: '93%',
    height: PX(52),
    backgroundColor: '#F55800',
    borderRadius: PX(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: PX(18),
    fontFamily: 'Montserrat-Bold',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  Image: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: '10%',
    width: '90%',
  },
  headerText: {
    fontSize: PX(21),
    fontWeight: 'bold',
  },
  headerText1: {
    fontSize: PX(14),
    color: '#F55800',
    paddingTop: PX(10),
  },

  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: PX(10),
  },
  footerText: {fontSize: PX(15)},
  footerText1: {
    fontSize: PX(15),
    color: '#F55800',
  },
  footer1: {
    position: 'absolute',
    bottom: 0,
  },
  footer2: {
    flexDirection: 'row',
    width: PX(450),
    height: PX(70),
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textFooter: {
    fontSize: PX(15),
    color: '#fff',
    fontWeight: 'bold',
  },
  textFooter1: {
    color: '#F55800',
    fontSize: PX(15),
    fontWeight: 'bold',
  },
  header1: {
    width: '90%',
    flexDirection: 'row',
    // justifyContent:'space-between',
    alignItems: 'center',
    height: '12%',
  },
  back: {
    width: PX(12.34),
    height: PX(21),
  },
  headerText2: {
    fontSize: PX(18),
    fontFamily: 'Montserrat-Bold',
    color: '#000',
  },
  textBox: {fontSize: PX(13), fontFamily: 'Montserrat-Regular'},
  textBox1: {
    fontSize: PX(15),
    paddingBottom: PX(5),
    width: '100%',
    fontFamily: 'Montserrat-Regular',
  },

  from: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '93%',
    paddingTop: '20%',
    alignSelf:"center"
  },
  from1: {
    paddingTop: PX(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  text2: {
    fontSize: PX(13),
    color: '#2D2D2D',
    fontFamily: 'Montserrat-Regular',
  },
  text3: {
    fontSize: PX(15),
    color: '#F55800',
    fontFamily: 'Montserrat-Bold',
  },
  text1: {
    fontSize: PX(13),
    color: '#2D2D2D',
    fontFamily: 'Montserrat-Regular',
  },
  inputBox: {
    // paddingTop:PX(5),
    fontSize: PX(15),
    width: '100%',
    height: PX(40),
    color: '#000',
    fontFamily: 'Montserrat-Regular',
  },
  line: {
    flexDirection: 'row',
    paddingTop: PX(10),
    width: '100%',
    borderBottomWidth: 2,
    borderColor: '#C4C4C4',
  },
  line1: {
    flexDirection: 'row',
    paddingTop: PX(5),
    // width:'100%',
    borderBottomWidth: 2,
    borderColor: '#C4C4C4',
  },

  email: {
    paddingTop: '10%',
    width: '93%',
    alignSelf:"center"
  },
  text: {
    fontSize: PX(12),
  },
  email1: {
    paddingTop: PX(10),
    width: '100%',
    borderColor: '#C4C4C4',
    borderBottomWidth: 2,
  },
  email2: {
    paddingTop: PX(2),
  },
  line1: {
    width: PX(300),
    height: PX(2),
    backgroundColor: '#C4C4C4',
  },
  textInputView: {
    width: '93%',
    height: PX(45),
    marginTop: PX(10),
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf:"center"
  },
  imageView1: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#C4C4C4',
    borderBottomWidth: 1,
    paddingBottom: PX(6),
    width: '25%',
    height: PX(45),
  },
  TextInputStyle1: {
    fontSize: PX(14),
    height: PX(45),
    fontFamily: 'Montserrat-Regular',
    width: '69%',
    color: '#000',
    paddingBottom: PX(6),
    marginLeft: PX(10),
    borderBottomColor: '#C4C4C4',
    borderBottomWidth: 1,
  },
  Images: {
    width: PX(10),
    height: PX(10),
    resizeMode: 'contain',
    marginLeft: PX(10),
  },
});
export default styles;
