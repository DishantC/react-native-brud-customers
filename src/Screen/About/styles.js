import React from 'react'
import { StyleSheet} from 'react-native'
import { PX } from "../pixel";
const styles=StyleSheet.create({
main:{
    flex:1,
    // justifyContent:'space-between',
    alignItems:'center'
},
header:{
    width:'90%',
    flexDirection:'row',
    // justifyContent:'space-between',
    alignItems:'center',
    height:'12%'
},
back:{
    width:PX(12.34),
    height:PX(21)
},
headerText:{
    
    fontSize:PX(18),
    fontFamily:'Montserrat-Bold',
    color:'#000'
},
header1:{
    height:'100%',
    width:'100%'

},
text:{
    fontSize:PX(15)
},
content:{
    // justifyContent:'center',
    // alignItems:'center',
    // paddingHorizontal:PX(25),
    width:'90%'
}
})
    export default styles