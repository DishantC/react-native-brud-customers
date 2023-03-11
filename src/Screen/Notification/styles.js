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
  headerText1: {
    fontSize: PX(15),
    color: '#2D2D2D',
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    width: '100%',
  },
  back: {
    width: PX(12.34),
    height: PX(21),
  },
  headerText2: {
    fontSize: PX(20),
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Montserrat-Regular',
  },
  textBox: {fontSize: PX(13), fontFamily: 'Montserrat-Regular'},
  textBox1: {
    fontSize: PX(15),
    paddingBottom: PX(5),
    width: '100%',
    fontFamily: 'Montserrat-Regular',
  },
  mainView: {
    width: '100%',
  },
  view: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: PX(25),
    borderBottomColor: '#F1F1F1',
    borderBottomWidth: 1.5,
    paddingBottom: PX(20),
  },
  view1: {
    paddingTop: '6%',
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: PX(45),
    height: PX(45),
    borderRadius: PX(30),
    backgroundColor: '#EBFFDA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile1: {
    width: PX(45),
    height: PX(45),
    borderRadius: PX(30),
    backgroundColor: '#DAFDFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  delivered1: {
    width: PX(45),
    height: PX(45),
    borderRadius: PX(30),
    backgroundColor: '#FFF5DA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lock1: {
    width: PX(45),
    height: PX(45),
    borderRadius: PX(30),
    backgroundColor: '#F5DAFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: PX(15),
    color: '#000',
    fontFamily: 'Montserrat-Regular',
  },
  textTime: {
    fontSize: PX(11),
    color: '#000',
    fontFamily: 'Montserrat-Regular',
  },
  imageIcon: {
    width: PX(19.84),
    resizeMode: 'contain',
    height: PX(12),
    tintColor: '#000',
  },
  delivered: {
    width: PX(19.84),
    resizeMode: 'contain',
    height: PX(13.5),
  },
  profile: {
    width: PX(18),
    resizeMode: 'contain',
    height: PX(18),
  },
  lock: {
    width: PX(19.84),
    resizeMode: 'contain',
    height: PX(18),
  },
  green: {
    width: PX(9.92),
    height: PX(9),
    borderRadius: PX(5),
    backgroundColor: '#67C117',
  },
  btn: {
    flexDirection: 'row',
    width: '95%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default styles;
