import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PX} from '../pixel';

const styles = StyleSheet.create({
  map: {
    flex:1,
  },
  cafe1:{paddingLeft:PX(10)},
  text3:{fontSize:PX(13),fontFamily:'Montserrat-Bold',color:'#000'},
  rate:{
    paddingLeft:PX(10),
     paddingTop:PX(10),
     flexDirection:'row'
   },
   rate1:{
     flexDirection:'row',
     
     width:PX(45),
     height:PX(27),
     backgroundColor:'#F5F4F3',
     // paddingLeft:PX(15),
     justifyContent:'space-between',
     alignItems:'center',
     paddingHorizontal:'6%',
     borderRadius:PX(7),
   },
   rate2:{
    flexDirection:'row',
    
    width:PX(100),
    height:PX(27),
    backgroundColor:'#F5F4F3',
    // paddingLeft:PX(15),
    // justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:'6%',
    borderRadius:PX(7),
  },
   src:{width:PX(14),height:PX(14),resizeMode:"contain"},
   time:{width:'100%',paddingLeft:PX(10),paddingVertical:PX(8)},
   timeText:{fontSize:PX(12),color:'#000'},
})

export default styles