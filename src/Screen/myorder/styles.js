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
    // backgroundColor:'#fff'
  },
  email: {
    paddingTop: PX(25),
    width: '90%',
  },
  text: {
    fontSize: PX(12),
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '8%',
    backgroundColor: '#fff',
    paddingHorizontal: PX(20),
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
  category: {
    width: '100%',
    // justifyContent:'center',
    // alignItems:'center'
    //   height:PX(102),
    paddingVertical: PX(10),
    alignSelf: 'center',
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
  },
  view: {
    paddingRight: '25%',
  },
  name: {
    fontSize: PX(16),
    paddingTop: '2%',
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
  },
  box1: {
    flexDirection: 'row',
    paddingTop: '5%',
  },
  many: {
    width: '48%',
  },
  textMany: {
    fontSize: PX(14),
  },
  btnText: {
    fontSize: PX(15),
    // fontWeight:'bold'
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
    paddingTop: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  payments: {
    width: '100%',
    height: PX(52),
    backgroundColor: '#F5F4F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    width: '100%',
    borderRadius: PX(20),
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: {
      width: PX(4),
      height: PX(40),
    },
    shadowOpacity: 0.5,
    shadowRadius: PX(10),
    elevation: 5,
    paddingVertical: PX(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: PX(10),
    width: '95%',
  },
  date: {
    fontSize: PX(12),
    paddingLeft: '5%',
    color: '#2D2D2D',
    fontFamily: 'Montserrat-Medium',
  },
  category2: {
    width: PX(330),
    height: PX(186),
    borderRadius: PX(20),
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: {
      width: PX(4),
      height: PX(40),
    },
    shadowOpacity: 0.5,
    shadowRadius: PX(10),

    elevation: 5,
  },
  header2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '5%',
    width: '95%',
  },
  date1: {
    fontSize: PX(12),
    paddingLeft: '5%',
    color: '#000',
    fontFamily: 'Montserrat-Regular',
  },
  number1: {
    fontSize: PX(12),
    color: '#F55800',
    fontFamily: 'Montserrat-Regular',
  },
  category3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '4%',
    width: '93%',
    paddingHorizontal: '5%',
  },
  box2: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  boxImg: {
    width: PX(50),
    height: PX(50),
  },
  boxView: {
    width: '86%',
    paddingLeft: '3%',
  },
  cafe: {fontSize: PX(15), color: '#2D2D2D', fontFamily: 'Montserrat-Medium'},
  category4: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: PX(5),
    width: '100%',
  },
  item1: {
    fontSize: PX(12),
    color: '#848484',
    paddingRight: '15%',
    fontFamily: 'Montserrat-Regular',
  },
  many1: {
    fontSize: PX(12),
    color: '#F55800',
    fontFamily: 'Montserrat-Bold',
  },
  text1: {
    width: '60%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: PX(5),
  },
  text2: {
    width: PX(5),
    height: PX(5),
    borderRadius: PX(3.5),
    backgroundColor: '#FFB800',
  },
  order3: {
    color: '#FFB800',
    fontSize: PX(13),
    fontFamily: 'Montserrat-Medium',
    marginLeft: PX(4),
  },
  text3: {
    width: '44%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: '2%',
  },
  text4: {
    width: PX(5),
    height: PX(5),
    borderRadius: PX(3.5),
    backgroundColor: '#00B112',
  },
  text5: {
    color: '#00B112',
    fontSize: PX(13),
    fontFamily: 'Montserrat-Medium',
    marginLeft: PX(4),
  },
  btnView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: PX(15),
    justifyContent: 'space-between',
    width: '95%',
  },
  check: {
    fontSize: PX(12),
    color: '#000',
    fontFamily: 'Montserrat-Regular',
  },
  btnView1: {
    width: PX(101),
    height: PX(32),
    borderRadius: PX(30),
    backgroundColor: '#F55800',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtn: {
    fontSize: PX(12),
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
  },
  header3: {
    width: '100%',
    // justifyContent: 'space-between',
    paddingTop: '10%',
    alignItems: 'flex-start',
    paddingBottom: '4%',
    marginLeft: PX(10),
  },
  headerText: {
    fontSize: PX(15),
    color: '#2D2D2D',
    fontFamily: 'Montserrat-Medium',
    width: '94%',
    alignSelf: 'center',
  },
  headerText1: {
    fontSize: PX(15),
    color: '#2D2D2D',
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    width: '100%',
  },
  header4: {
    width: '100%',
    // justifyContent: 'space-between',
    paddingTop: '8%',
    alignItems: 'flex-start',
    paddingBottom: '4%',
    marginLeft: PX(10),
  },
  box3: {
    width: '94%',
    minHeight: PX(80),
    backgroundColor: '#ffffff',
    borderRadius: PX(10),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: PX(30),

    //   position:'absolute'
    // ,top:0,bottom:0,left:0,right:0
  },
  text6: {
    flexDirection: 'row',
    width: '77%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: PX(30),
  },
  text7: {
    fontSize: PX(16),
    paddingLeft: '5%',
    color: '#000',
    fontFamily: 'Montserrat-Regular',
  },
  text8: {
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: PX(10),
    paddingTop: '10%',
  },
  fontSize: {
    fontSize: PX(16),
    color: '#000',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'right',
  },
});
export default styles;
