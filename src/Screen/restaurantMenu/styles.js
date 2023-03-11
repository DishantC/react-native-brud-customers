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
    height: '10%',
    // paddingHorizontal:'10%'
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  back: {
    width: PX(12.34),
    height: PX(21),
  },
  cart: {
    width: PX(24),
    height: PX(24),
    resizeMode: 'contain',
  },
  headerText2: {
    fontSize: PX(18),
    fontFamily: 'Montserrat-SemiBold',
    color: '#2D2D2D',
  },
  textBox: {fontSize: PX(13)},
  textBox1: {
    fontSize: PX(15),
    paddingBottom: PX(5),
    width: '100%',
    fontFamily: 'Montserrat-Regular',
  },

  mainView: {
    width: '100%',
    // justifyContent:'space-between',
    // alignItems:'center'
  },
  deal1: {justifyContent: 'center', alignItems: 'center'},

  redeem: {
    width: PX(368),
    height: PX(172),
    paddingHorizontal: '10%',
  },
  Image: {
    // flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    // width:'95%',
    paddingRight: '5%',
    paddingHorizontal: PX(13),
  },
  Image1: {
    // flexDirection:'row',
    // justifyContent: 'center',
    alignItems: 'center',
    // width:'95%',
    // paddingRight:'5%',
    paddingRight: PX(13),
    paddingTop: PX(8),
  },
  Image2: {
    // flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    // width:'95%',
    paddingRight: '5%',
    paddingHorizontal: PX(13),
  },
  search: {
    flexDirection: 'row',
    // justifyContent:'center',
    alignContent: 'center',
    paddingHorizontal: '2%',
    width: '90%',
    height: PX(52),
    borderRadius: PX(10),
    backgroundColor: '#FAFAFA',
    // paddingRight:'60%',
    // paddingTop:'5%',
    marginLeft: '5%',
    marginTop: PX(18),
  },
  category: {
    width: '100%',
    //   height:PX(102),
  },
  box: {
    flexDirection: 'row',
    //   justifyContent:'space-between',
    //   alignItems:'center',
    //   paddingHorizontal:PX(12),
    paddingVertical: PX(15),
    //   paddingTop:'10%'
  },
  btn: {
    width: PX(80),
    height: PX(25),
    backgroundColor: '#F55800',
    borderRadius: PX(30),
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal:'15%'
  },
  main: {
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: PX(125),
    height: PX(101.74),
    borderRadius: PX(10),
  },
  view: {
    width: '55%',
    // backgroundColor:'red'
  },
  name: {
    fontSize: PX(16),
    paddingTop: '2%',
    color: '#000',
    fontFamily: 'Montserrat-Medium',
    width: '98%',
  },
  view1: {
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '2%',
  },
  dec: {
    fontSize: PX(12),
    textAlign: 'left',
    color: '#848484',
    fontFamily: 'Montserrat-Regular',
    width: '98%',
    marginVertical: PX(5),
  },
  box1: {
    flexDirection: 'row',
    paddingTop: '5%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  many: {
    // width:'39%'
  },
  textMany: {
    fontSize: PX(14),
    color: '#000',
    fontFamily: 'Montserrat-Medium',
  },
  btnText: {
    color: '#fff',
    fontSize: PX(15),
    fontFamily: 'Montserrat-Bold',
  },
  back1: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: PX(9),
    height: PX(9),
    borderRadius: PX(6),
    backgroundColor: '#F55800',
  },
  banner: {
    width: '94%',
    height: PX(172),
    // alignSelf: 'center',
    marginLeft: '5%',
    // justifyContent:'center',
    // paddingLeft:'10%'
  },
  img1: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: PX(10),
  },
  img2: {
    width: PX(17.2),
    height: PX(17.2),
  },
  category1: {
    paddingTop: '5%',
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  item: {
    width: '95%',
    paddingTop: '5%',
  },
  main1: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    maxHeight: '83%',
    borderTopRightRadius: PX(25),
    borderTopLeftRadius: PX(25),
    bottom: 0,
    position: 'absolute',
  },
  backImg: {
    width: '100%',
    height: PX(300),
    borderTopRightRadius: PX(25),
    borderTopLeftRadius: PX(25),
  },
  mainView1: {
    width: '95%',
    backgroundColor: '#ffffff',
    paddingBottom: PX(100),
    // alignItems:'center'
  },
  header: {
    fontSize: PX(19),
    paddingTop: PX(10),
    color: '#000',
    fontFamily: 'Montserrat-Medium',
  },
  header3: {
    fontSize: PX(12),
    paddingTop: PX(10),
    color: '#848484',
    fontFamily: 'Montserrat-Regular',
  },
  headerMain: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: PX(10),
  },
  btnMain: {
    flexDirection: 'row',
    width: '97%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9F9F9',
    marginTop: PX(20),
    marginLeft: PX(8),
    paddingTop: PX(10),
  },
  btn1: {
    width: PX(100),
    height: PX(52),
    borderRadius: PX(50),
    borderColor: '#F55800',
    paddingHorizontal: '5%',
    backgroundColor: '#FFF4EE',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: PX(2),
  },
  btn1Text: {
    fontSize: PX(24),
    color: '#F55800',
    fontFamily: 'Montserrat-Regular',
  },
  btn1Text2: {
    fontSize: PX(24),
    fontFamily: 'Montserrat-Regular',
    color: '#000',
  },
  btn2: {
    width: PX(238),
    height: PX(52),
    borderRadius: PX(50),
    backgroundColor: '#F55800',
    flexDirection: 'row',
    marginLeft: '2%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  add: {fontSize: PX(15), color: '#ffff', fontFamily: 'Montserrat-Bold'},
  total: {fontSize: PX(10), color: '#fff', fontFamily: 'Montserrat-Bold'},
  emptyListStyle: {
    padding: PX(20),
    fontSize: 18,
    textAlign: 'center',
  },
});
export default styles;
