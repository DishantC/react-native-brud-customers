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
    fontWeight: 'bold',
  },
  textBox: {fontSize: PX(13)},
  textBox1: {
    fontSize: PX(15),
    paddingBottom: PX(5),
    width: '100%',
  },

  mainView: {
    width: '100%',
    // justifyContent:'center',
    // alignItems:'center'
  },
  deal1: {paddingTop: '5%', justifyContent: 'center', alignItems: 'center'},

  redeem: {
    width: PX(356),
    height: PX(150),
  },
  Image: {
    // flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    // width:'95%',
    // paddingRight:'5%',
    // paddingHorizontal: PX(2),
  },
  main3: {
    width: '100%',
    alignItems: 'center',
    marginTop:PX(30)
    // position:'absolute',
    // bottom:PX(50)
  },
  btn: {
    width: '88%',
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
});
export default styles;
