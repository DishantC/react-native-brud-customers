import React from 'react';
import {StyleSheet} from 'react-native';
import {PX} from '../pixel';
const styles = StyleSheet.create({
  Image: {
    justifyContent: 'center',
    alignItems: 'center',
    // width:'100%',
    // paddingRight:'5%'
    paddingHorizontal: PX(12),
    paddingVertical: PX(20),
  },
  main2: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  email: {
    paddingTop: PX(25),
    width: '90%',
  },
  text: {
    fontSize: PX(12),
    fontFamily: 'Montserrat-Regular',
  },
  email1: {
    paddingTop: PX(15),
    width: '100%',
    borderBottomWidth: 1,
  },
  email2: {
    paddingTop: PX(2),
  },
  header1: {
    width: '90%',
    flexDirection: 'row',
    // justifyContent:'space-between',
    alignItems: 'center',
    height: '10%',
  },
  back: {
    width: PX(12.34),
    height: PX(21),
  },
  headerText2: {
    fontSize: PX(18),
    fontFamily: 'Montserrat-Bold',
    color: '#051821',
  },
  textBox: {fontSize: PX(13), fontFamily: 'Montserrat-Regular'},
  textBox1: {
    fontSize: PX(15),
    paddingBottom: PX(5),
    width: '100%',
    fontFamily: 'Montserrat-Regular',
  },
  category: {
    width: '100%',
    // justifyContent:'center',
    // alignItems:'center'
    //   height:PX(102),
  },
  box: {
    flexDirection: 'row',
    //   justifyContent:'space-between',
    //   alignItems:'center',
    //   paddingHorizontal:PX(12),
    paddingVertical: PX(10),
    //   paddingTop:'10%'
  },
  btn: {
    width: PX(28),
    height: PX(28),
    backgroundColor: '#F0F0F0',
    //   borderRadius:PX(30),
    borderTopLeftRadius: PX(14),
    borderBottomLeftRadius: PX(14),
    justifyContent: 'center',
    alignItems: 'center',

    //   paddingHorizontal:'15%'
  },
  btn1: {
    width: PX(28),
    height: PX(28),
    backgroundColor: '#F0F0F0',
    //   borderRadius:PX(30),
    borderTopRightRadius: PX(14),
    borderBottomRightRadius: PX(14),
    justifyContent: 'center',
    alignItems: 'center',

    //   paddingHorizontal:'15%'
  },
  main: {
    width: '20%',
    // justifyContent:'center',
    // alignItems:'center'
  },
  img: {
    width: PX(83),
    height: PX(68),
    borderRadius: PX(10),
  },
  img10: {
    width: PX(20),
    height: PX(20),
    resizeMode: 'contain',
  },
  view: {
    paddingRight: '25%',
  },
  name: {
    fontSize: PX(16),
    paddingTop: '2%',
    color: '#000',
    fontFamily: 'Montserrat-Medium',
  },
  view1: {
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '2%',
  },
  dec: {
    fontSize: PX(12),
    textAlign: 'justify',
    color: '#848484',
    fontFamily: 'Montserrat-Regular',
  },
  box1: {
    flexDirection: 'row',
    paddingTop: '5%',
  },
  box2: {
    flexDirection: 'row',
    // justifyContent:'space-between'
  },
  many: {
    width: '52%',
  },
  textMany: {
    fontSize: PX(14),
    color: '#000',
    fontFamily: 'Montserrat-Medium',
  },
  btnText: {
    color: '#000',
    fontSize: PX(15),
    fontFamily: 'Montserrat-Medium',
    // fontWeight:'bold'
  },
  back1: {
    // position:'absolute',
    top: 0,
    right: 0,
    width: PX(9),
    height: PX(9),
    borderRadius: PX(6),
    backgroundColor: '#F55800',
  },
  banner: {
    width: PX(368),
    height: PX(172),
  },
  img1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img2: {
    width: PX(17.2),
    height: PX(17.2),
  },
  category1: {
    paddingTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    // height:'100%',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  payments: {
    width: '100%',
    height: PX(52),
    backgroundColor: '#F5F4F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: PX(20),
  },
});
export default styles;
