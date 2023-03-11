import React from 'react'
import { StyleSheet} from 'react-native'
import { PX } from "../pixel";
const styles=StyleSheet.create({
round:{
        width:PX(150),
        height:PX(150),
        borderRadius:PX(100),
        borderColor:'#000',
        borderWidth:PX(5)   
    },
main3:{
        width:'100%',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:PX(45)
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
text:{
    fontSize:PX(26),
    color:'#F55800',
    fontFamily:'Montserrat-Regular',
    marginTop:PX(10),
    
},
main:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#fff'
},
heder:{
    paddingTop:PX(25),
    justifyContent:'center',
    alignItems:'center',
},
heder1:{
    fontSize:PX(15),
    color:'#2D2D2D',fontFamily:'Montserrat-Medium'
},
})
    export default styles