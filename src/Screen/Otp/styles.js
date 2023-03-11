// import React from 'react'
// import { StyleSheet} from 'react-native'
// import { PX } from "../pixel";
// const styles=StyleSheet.create({
//     logo:{
//         width:PX(148),
//         height:PX(80),
//     },
//     logo1:{
//         height:'20%',
//         justifyContent:'center',
//         alignItems:'center'
//     },
//     main3:{
//         width:'100%',
//         justifyContent:'space-between',
//         alignItems:'center',
//         paddingTop:'50%'
//     },
// btn:{
//     width:'100%',
//     height:PX(52),
//     backgroundColor:'#F55800',
//     borderRadius:PX(60),
//     justifyContent:'center',
//     alignItems:'center'
// },
// btnText:{
//     color:'#fff',
//     fontSize:PX(18),fontFamily:'Montserrat-Bold'
// },
// main:{
//     flex:1,
//     alignItems:'center',
//     backgroundColor:'#fff'
// },
// heder:{
//     height:'10%',
//     width:'90%',
// },
// heder1:{
//     fontSize:PX(21),
//     fontFamily:'Montserrat-Bold',color:'#000'
// },
// heder2:{
//     fontSize:PX(14),
//     color:'#F55800',
//     paddingTop:PX(10),fontFamily:'Montserrat-Regular'
// },
// main1:{paddingTop:PX(35)},
// text:{fontSize:PX(13),color:'#2D2D2D',fontFamily:'Montserrat-Regular'},
// text1:{
//         flexDirection:'row',
//         paddingTop:PX(10),
//         justifyContent:'space-between',
//         alignItems:'center',
//         // paddingHorizontal:PX(5)
//     },
// input:{
//     justifyContent:'center',
//     alignItems:'center',
//     paddingTop:PX(10)
// },
// textBox:{
//     fontSize:PX(21),
//     color:'#F55800',
//     borderColor:'#F55800',
//     fontFamily:'Montserrat-Regular'
// },
// line:{
//     width:PX(60),
//     height:PX(2),
   
// },
// btn1:{
//     justifyContent:'center',
//     alignItems:'center',
//     paddingTop:PX(10)
// },
// btn2:{
//     fontSize:PX(15),
//     color:'#F55800',fontFamily:'Montserrat-Bold'
// }
// })
//     export default styles


import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import { PX } from "../pixel";
// import {Fonts} from '../../utils';

const {height, width} = Dimensions.get('window');

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
    paddingTop: PX(120),
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
    fontFamily: 'Montserrat-Bold',
  },
  ResetText: {
    color: '#F55800',
    fontSize: PX(16),
    fontFamily: 'Montserrat-Bold',
  },
  main: {
    width: '90%',
  },
  header: {
    fontSize: PX(21),
    fontFamily:'Montserrat-Bold',
    color: '#000',
  },
  heder1: {
    fontSize: PX(14),
    color: '#F55800',
    paddingTop: PX(15),
    fontFamily:'Montserrat-Regular',
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
    fontFamily: 'Montserrat-Bold',
  },
  email1: {
    width: '100%',
  },
  email2: {
    paddingTop: PX(2),
  },
  textInputStyle: {
    width: '100%',
    height: PX(40),
    color: '#000',
    fontSize: PX(15),
    fontFamily:'Montserrat-Bold',
  },
  optTextView: {
    width: '10%',
    height: (width * 0.95 - 20) / 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: PX(5),
    marginVertical: PX(20),
    borderBottomColor: '#848484',
    borderBottomWidth: PX(2),
    // marginRight: 5
  },
  cell: {
    fontFamily:'Montserrat-Bold',
    fontSize: PX(20),
    color: '#000',
  },
});

export default styles;
