import React from 'react'
import { StyleSheet} from 'react-native'
import { PX } from "../pixel";
const styles=StyleSheet.create({
// main:{
//     flex:1,
//     backgroundColor:'#000',
//     justifyContent:'space-between',
//     alignItems:'center'
// },
// Image:{
//     flex:3,
//     justifyContent:'space-between',
//     alignItems:'center'
// },
// image1:{
//     alignSelf:'flex-start',
//     justifyContent:'space-between',
//     paddingRight:'86%'
// },
// tee:{
//     width:PX(90),
//     height:PX(90),
//     justifyContent:'center',
//     alignItems:'center',
//     resizeMode:'contain'
// },
// tee1:{
//     width:PX(80),
//     height:PX(80),
//     alignItems:'center',
//     justifyContent:'center',
//     borderRadius:PX(40),
//     backgroundColor:'#fff'
// },
// tee2:{
//     width:PX(100),
//     height:PX(65),
//     resizeMode:'contain'
// },
// Image1:{
//     alignSelf:'flex-end',
//     justifyContent:'space-between',
//     paddingRight:50
// },
// coffee:{
//     width:PX(143),
//     height:PX(143),
//     justifyContent:'center',
//     alignItems:'center',
//     resizeMode:'contain'
// },
// coffee1:{
//     width:PX(127.11),
//     height:PX(127.11),
//     alignItems:'center',
//     justifyContent:'center',
//     borderRadius:PX(100),
//     backgroundColor:'#fff'
// },
// coffee2:{
//     width:PX(102.21),
//     height:PX(102.21),
//     resizeMode:'contain'
// },
// Image2:{
//     alignSelf:'flex-start',
//     justifyContent:'space-between',
//     paddingLeft:90
// },
// cake:{
//     width:PX(110),
//     height:PX(110),
//     justifyContent:'center',
//     alignItems:'center',
//     resizeMode:'contain'
// },
// cake1:{
//     width:PX(97.78),
//     height:PX(97.78),
//     alignItems:'center',
//     justifyContent:'center',
//     borderRadius:PX(50),
//     backgroundColor:'#fff'
// },
// cake2:{
//     width:PX(78.57),
//     height:PX(78.57),
//     resizeMode:'contain'
// },
// main1:{
//     flex:3,
//     justifyContent:'space-around',
//     alignItems:'center',
//     paddingTop:35,
//     // paddingHorizontal:PX(10)
// },
// main2:{
//     width:'100%',
//     height:'35%',
//     justifyContent:'space-between',
//     // alignItems:'center'
// },
// logo:{
//     justifyContent:'center',
//     alignItems:'center'
// },
// logo1:{
//     width:PX(140),
//     height:PX(78.28)
// },
// text:{
//     justifyContent:'center',
//     width:'100%',
//     // alignItems:'center'
// },
// text1:{
//     color:'#fff',
//     fontSize:PX(17),fontFamily:'Montserrat-Regular',
//     textAlign:'center',
    
    

// },
// text2:{
//     color:'#fff',
//     fontSize:PX(17),fontFamily:'Montserrat-Regular',
//     textAlign:'center'
// },
// main3:{
//     width:'100%',
//     justifyContent:'space-between',
//     alignItems:'center',
//     paddingTop:40
// },
// btn:{
//     width:PX(340),
//     height:PX(52),
//     backgroundColor:'#F55800',
//     borderRadius:PX(60),
//     justifyContent:'center',
//     alignItems:'center'
// },
// btnText:{
//     color:'#fff',
//     fontSize:PX(18),
//     fontFamily:'Montserrat-Bold'
// },
// main4:{
//     flexDirection:'row',
//     paddingBottom:'20%'
// },
// text3:{
//     color:'#fff',
//     fontSize:PX(15),fontFamily:'Montserrat-Bold'
// },
// btnLogin:{
//     color:'#F55800',
//     fontSize:PX(15),fontFamily:'Montserrat-Regular'
// },
container: {
    flex: 1,
    backgroundColor: '#000',
  },
  firstView: {
    width: '100%',
    height: '45%',
    paddingTop: PX(20),
    paddingRight: PX(30),
  },
  firstImage: {width: PX(55), height: PX(70), resizeMode: 'contain'},
  secondImage: {width: PX(130), height: PX(140), resizeMode: 'contain'},
  thirdImage: {
    width: PX(100),
    height: PX(110),
    resizeMode: 'contain',
    marginLeft: PX(80),
    marginTop: PX(20),
  },
  secondView: {
    width: '100%',
    height: '45%',
    paddingHorizontal: PX(30),
    alignItems: 'center',
    justifyContent: 'center',
    top:PX(40)
  },
  logoImage: {width: PX(120), height: PX(110), resizeMode: 'contain'},
  ButtonView: {
    height: PX(100),
    width: '100%',
    justifyContent: 'flex-end',
  },
  desText: {
    textAlign: 'center',
    fontSize: PX(16),
    color: '#fff',
    letterSpacing: PX(0.7),
    fontFamily: 'Montserrat-Regular',
    lineHeight:PX(25)
  },
  buttonStyle: {
    width: '100%',
    backgroundColor: '#F55800',
    alignItems: 'center',
    justifyContent: 'center',
    height: PX(50),
    borderRadius: PX(25),
  },
  buttonText: {
    fontSize: PX(18),
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
  },
  loginText: {
    fontSize: PX(15),
    color: '#F55800',
    fontFamily: 'Montserrat-Bold',
  },
})

export default styles