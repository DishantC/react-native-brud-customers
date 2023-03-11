import React from 'react'
import { StyleSheet} from 'react-native'
import { PX } from "../pixel";
const styles=StyleSheet.create({
    Image:{
        justifyContent:'center',
        alignItems:'center',
        // width:'100%',
        // paddingRight:'5%'
        paddingHorizontal:PX(12),
        paddingVertical:PX(20)
      },
main2:{
    flex:1,
    alignItems:'center',
    backgroundColor:'#fff'
},email: {
    paddingTop: PX(25),
    width:'90%'
  },
  text: {
    fontSize: PX(12)
  },
  email1: {
    paddingTop: PX(15),
    width:'100%',
    borderBottomWidth:1
  },
  email2: {
    paddingTop: PX(2)
  },
  header1:{
    width:'90%',
    flexDirection:'row',
    // justifyContent:'space-between',
    alignItems:'center',
    height:'12%'
},
header2:{
  width:'80%',
  flexDirection:'row',
  // justifyContent:'space-between',
  alignItems:'center',
  height:'15%'
},
back:{
    width:PX(12.34),
    height:PX(21)
},
back1:{
  tintColor:'#fff',
  width:PX(12.34),
  height:PX(21),
  
},
headerText3:{
    fontSize:PX(18),
    fontFamily:'Montserrat-Bold',
    color:'#fff'
},
headerText2:{
  fontSize:PX(18),
  fontFamily:'Montserrat-Bold',color:'#000'
},
textBox:{fontSize:PX(13)},
textBox1:{
            fontSize:PX(15),
            paddingBottom:PX(5),
            width:'100%'
        },

})
    export default styles