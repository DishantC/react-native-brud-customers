import React from 'react'
import { StyleSheet} from 'react-native'
import { PX } from "../pixel";
const styles=StyleSheet.create({
    logo:{
        width:PX(148),
        height:PX(80),
    },
    logo1:{
        height:'20%',
        justifyContent:'center',
        alignItems:'center'
    },
    main3:{
        width:'100%',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:40
    },
btn:{
    width:PX(350),
    height:PX(52),
    backgroundColor:'#F55800',
    borderRadius:PX(60),
    justifyContent:'center',
    alignItems:'center'
},
btnText:{
    color:'#fff',
    fontSize:PX(18),fontFamily:'Montserrat-Bold'
},
main:{
    height:'10%',
    width:'90%'
},
header:{
    fontSize:PX(21),
    fontFamily:'Montserrat-Bold',color:'#000'
},
heder1:{
    fontSize:PX(14),
    color:'#F55800',
    paddingTop:PX(10),fontFamily:'Montserrat-Regular'
},
line:{
    width:PX(310),
    height:PX(2),
    backgroundColor:'#C4C4C4'
},
main2:{
    flex:1,
    alignItems:'center',
    backgroundColor:'#fff'
},email: {
    paddingTop: PX(40),
    width:'90%'
  },
  text: {
    fontSize: PX(12),color:'#2D2D2D',fontFamily:'Montserrat-Regular'
  },
  email1: {
    paddingTop: PX(15),
    width:'100%',
    borderBottomWidth:1
  },
  email2: {
    paddingTop: PX(2)
  },
})
    export default styles