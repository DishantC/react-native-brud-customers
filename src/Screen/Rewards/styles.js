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
    justifyContent:'space-between',
    alignItems:'center',
    height:'12%'
},
back:{
    width:PX(12.34),
    height:PX(21)
},
headerText2:{
    fontSize:PX(20),
    fontFamily:'Montserrat-Bold',color:'#000'
},
textBox:{fontSize:PX(13),fontFamily:'Montserrat-Regular'},
textBox1:{
            fontSize:PX(15),
            paddingBottom:PX(5),
            width:'100%',fontFamily:'Montserrat-Regular'
        },
Image:{
            justifyContent:'center',
            alignItems:'center',
            // width:'100%',
            // paddingRight:'5%'
            marginHorizontal:PX(15),
            height:PX(300),
            width:PX(240),
            alignSelf:'center',
          },
mainView:{
    width:'100%',
    height:'100%',
    // justifyContent:'center',
    // alignItems:'center'
},
deal1:{justifyContent:'center',alignItems:'center',marginRight:PX(20)},
redeem:{
    width:PX(356),
    height:PX(150),
},
deal:{
    width:PX(360),
    height:PX(196),
    paddingHorizontal:PX(20)
}
})
    export default styles