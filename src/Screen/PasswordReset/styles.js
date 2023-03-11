import React from 'react'
import { StyleSheet} from 'react-native'
import { PX } from "../pixel";
const styles=StyleSheet.create({
    Image:{
        width:PX(200),
        height:PX(200),
        marginTop:PX(40)  
    },
    main3:{
        width:'100%',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:40,
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
text1:{
    fontSize:PX(15),
    color:'#000',fontFamily:'Montserrat-Regular'
},
main:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#ffffff',
    
    
},
image:{
    paddingTop:PX(25),
    justifyContent:'center',
    alignItems:'center'
},
text:{
    fontSize:PX(15),
    color:'#2D2D2D'
},
})
    export default styles