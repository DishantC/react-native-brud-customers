import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PX} from '../pixel';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: PX(148),
    height: PX(80),
  },
  logo1: {
    height: PX(120),
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: PX(25),
  },
  main3: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: PX(150),
  },
  btn: {
    width: PX(350),
    height: PX(52),
    backgroundColor: '#F55800',
    borderRadius: PX(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: PX(18),
    fontFamily: 'Montserrat-SemiBold',
  },
  main: {
    width: '93%',
    marginTop:PX(25),
    alignSelf:"center"
  },
  header: {
    fontSize: PX(21),
    fontFamily: 'Montserrat-SemiBold',
    color: '#000',
  },
  heder1: {
    fontSize: PX(14),
    color: '#F55800',
    paddingTop: PX(15),
    fontFamily: 'Montserrat-Regular',
  },
  line: {
    width: PX(310),
    height: PX(2),
    backgroundColor: '#C4C4C4',
  },
  main2: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  email: {
    paddingTop: PX(10),
    width: '100%',
  },
  text: {
    fontSize: PX(12),
    color: '#2D2D2D',
    fontFamily: 'Montserrat-Medium',
    width:'93%',
    alignSelf:'center'
  },
  email1: {
    paddingTop: PX(15),
    width: '100%',
    borderBottomWidth: 3,
    borderColor: '#E5E5E5',
  },
  email2: {
    paddingTop: PX(2),
  },
  textInputStyle: {
    width: '100%',
    height: PX(40),
    color: '#2D2D2D',
    fontSize: PX(15),
    fontFamily: 'Montserrat-Medium',
  },
  textInputView: {
    width: '93%',
    height: PX(45),
    marginTop: PX(10),
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf:'center'
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
    color: '#2D2D2D',
    paddingBottom: PX(6),
    marginLeft: PX(10),
    borderBottomColor: '#C4C4C4',
    borderBottomWidth: 1,
  },
  Images:{
    width: PX(10),
    height: PX(10),
    resizeMode:'contain',
    marginLeft:PX(10)
  }
});

export default styles;
