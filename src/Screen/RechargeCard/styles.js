import React from 'react';
import {StyleSheet} from 'react-native';
import {PX} from '../pixel';
const styles = StyleSheet.create({
  main2: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header1: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '12%',
  },
  back: {
    width: PX(12.34),
    height: PX(21),
  },
  headerText2: {
    fontSize: PX(20),
    color: '#000',
    fontFamily: 'Montserrat-Bold',
  },
  box: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',
  },
  InputLine: {
    width: PX(165),
    // height:PX(2),
    borderBottomWidth: PX(2),
    borderColor: '#c4c4c4',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: PX(5),
    flexDirection:'row'
  },
  visible: {
    fontSize: PX(15),
    paddingTop: '10%',
    paddingLeft: '5%',
    color: '#000',
    fontFamily: 'Montserrat-Bold',
  },
  visible1: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: '2%',
  },
  visible2: {
    width: '85%',
    resizeMode: 'contain',
    height: PX(178.72),
  },
  visible3: {
    color: '#F55800',
    fontSize: PX(15),
    paddingLeft: '6%',
    paddingTop: '5%',
    fontFamily: 'Montserrat-Bold',
  },
  visible4: {
    paddingTop: '40%',
    // paddingBottom: '17%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  visible5: {
    width: PX(350),
    height: PX(52),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F55800',
    borderRadius: PX(60),
  },
  visible6: {
    fontSize: PX(18),
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
  },
  gift1: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: PX(20),
  },
  from3: {
    width: '98%',
    alignItems: 'center',
  },
  email: {
    paddingTop: '10%',
    width: '90%',
  },
  text: {
    fontSize: PX(12),
    color: '#ABA5A5',
    fontFamily: 'Montserrat-Regular',
  },
  email1: {
    flexDirection: 'row',
    paddingTop: '5%',
    width: '100%',
    borderColor: '#C4C4C4',
    borderBottomWidth: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: PX(10),
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon1: {
    width: PX(18),
    height: PX(18),
    marginRight: PX(10),
    resizeMode: 'contain',
  },
  icon2: {
    width: '100%',
    height: PX(40),
    fontSize: PX(15.41),
    fontFamily: 'Montserrat-Regular',
    color: '#2D2D2D',
  },
  icon3: {
    width: PX(16.5),
    height: PX(12),
    tintColor: '#000',
    marginRight: PX(10),
    resizeMode: 'contain',
  },
  text2: {
    fontSize: PX(13),
    color: '#ABA5A5',
    fontFamily: 'Montserrat-Regular',
  },
  from: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    paddingTop: '10%',
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
  btn1: {
    paddingTop: PX(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn2: {
    width: PX(350),
    height: PX(52),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F55800',
    borderRadius: PX(60),
  },
  btnText: {
    fontSize: PX(18),
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
  },
});
export default styles;
