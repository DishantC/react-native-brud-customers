import React from 'react'
import { StyleSheet} from 'react-native'
import { PX } from "../pixel";
const styles=StyleSheet.create({
main2:{
    flex:1,
    alignItems:'center',
    backgroundColor:'#fff'
},
  header1:{
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
headerText2:{
    fontSize:PX(20),
    fontFamily:'Montserrat-SemiBold',color:'#000'
},
textBox:{fontSize:PX(13),fontFamily:'Montserrat-Regular'},
textBox1:{
            fontSize:PX(15),
            paddingBottom:PX(5),
            width:'100%',fontFamily:'Montserrat-Regular'
        },

mainView:{
    width:'100%',
    justifyContent:'center',
    alignItems:'center'
},
deal1:{paddingTop:'5%',justifyContent:'center',alignItems:'center'},

deal:{
    width:PX(355),
    height:PX(196),
}
})
    export default styles