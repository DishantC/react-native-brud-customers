import React from 'react'
import { StyleSheet} from 'react-native'
import { PX } from "../pixel";
const styles=StyleSheet.create({
  wrapper: {},
main:{
    flex:1,
    backgroundColor:'#ffffff'
},
header:{
    flexDirection:'row',
    width:'85%',
    paddingLeft:PX(22.23),
    height:'10%',
    alignItems:'center',
},
image:{
    width:PX(14.9),
    height:PX(22.35)
},
text:{
    fontSize:PX(14),
    color:'#F55800',fontFamily:'Montserrat-Medium'
},
box:{
    width:'95%',
    paddingLeft:PX(10)
},
text1:{
    fontSize:PX(11),color:'#000',fontFamily:'Montserrat-Regular'
},
image1:{
   
    width:PX(35),
    height:PX(23)
},

cross:{
    width:PX(42),
    height:PX(42)
},
cross1:{
  flexDirection:'row',
    width:'100%',
    // justifyContent:''
    height:'20%',
    justifyContent:'space-between',
    // alignContent:'flex-end'
    alignItems:'center',
    paddingHorizontal:PX(20)

},
logo:{
  width:PX(120),
  height:PX(65),
  resizeMode:'contain'
},
centeredView: {
    
    // justifyContent: "ce
    alignItems: "center",
    
  },
  modalView: {
    backgroundColor: '#F55800',
    width:'100%',
    height:'100%'
  },
  profile:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    height:'5%',
    width:'85%',
    paddingHorizontal:PX(20)
  },
  clint:{
    width:PX(45),
    height:PX(45),
    resizeMode:'contain'
  },
  clint1:{
    width:PX(50),
    height:PX(50),
    borderRadius:PX(50)
    // resizeMode:'contain'
  },
  name:{
    fontSize:PX(18),
    color:'#fff',fontFamily:'Montserrat-Medium',
    marginLeft:PX(15)
  },
  box1:{
    width:'100%',
    alignItems:'center',
    flexDirection:'row',
    paddingRight:PX(15),
  },
  edit:{
    width:PX(18),
    height:PX(19.5),
    resizeMode:'contain'
  },
  menu:{
    width:'60%',
    height:'25%',
    justifyContent:'space-between',
    paddingHorizontal:PX(25),
    paddingTop:PX(45)
  },
  menuImage:{
    width:PX(23),
    height:PX(22),
    resizeMode:'contain'
  },
  payment:{
    width:PX(25),
    height:PX(14.44),
    resizeMode:'contain',
    tintColor:'#fff'
  },
  about:{
    width:PX(25),
    height:PX(22),
    resizeMode:'contain'
  },
  order:{
    width:PX(25),
    height:PX(20),
    resizeMode:'contain'
  },
  policy:{
    width:PX(25),
    height:PX(22),
    resizeMode:'contain'
  },
  logout:{
    width:PX(25),
    height:PX(22),
    resizeMode:'contain'
  },
  text2:{
    fontSize:PX(18),
    color:'#fff',
    paddingLeft:PX(15),fontFamily:'Montserrat-Regular',
    textAlign:'center'
  },
  text10:{
    fontSize:PX(18),
    color:'#fff',
    paddingLeft:PX(18),fontFamily:'Montserrat-Medium',
    textAlign:'center'
  },
  Image:{
    justifyContent:'center',
    alignItems:'center',
    // width:'100%',
    // paddingRight:'5%'
    paddingHorizontal:PX(12),
    height:PX(260),
    width:PX(260),
    alignSelf:'center'
    // marginTop:PX(20)
  },
  Image2:{
    justifyContent:'center',
    alignItems:'center',
    // width:'100%',
    // paddingRight:'5%'
    height:PX(260),
    width:PX(260),
    alignSelf:'center',
    paddingHorizontal:PX(10)
    // marginTop:PX(20)
  },
  Image1:{
    justifyContent:'center',
    alignItems:'center',
    // width:'100%',
    // paddingRight:'10%',
    paddingHorizontal:PX(18)
  },
 
  cafes:{
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    paddingHorizontal:(20)
  },
  view:{
    color:'#F55800',
    fontSize:PX(15),fontFamily:'Montserrat-Medium'
  },
  rate:{
   paddingLeft:'10%',
    paddingTop:PX(10),
    flexDirection:'row'
  },
  rate1:{
    flexDirection:'row',
    
    width:PX(57),
    height:PX(27),
    backgroundColor:'#fff',
    // paddingLeft:PX(15),
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:'6%',
    borderRadius:PX(7),
  },
  box2:{
    position:'absolute',
    bottom:10,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center'
  },
  cafe1:{paddingTop:PX(10),paddingLeft:PX(10)},
  text3:{fontSize:PX(13),fontFamily:'Montserrat-SemiBold',color:'#000'},
  time:{paddingLeft:PX(6)},
  timeText:{fontSize:PX(10),color:'#000',fontFamily:'Montserrat-Regular'},
  map:{flexDirection:'row',marginRight:PX(5)},
  mapImage:{width:PX(8),height:PX(12),paddingTop:PX(10)},
  footer:{
    backgroundColor:'#fff',
    borderRadius:PX(15),
    width:PX(220),
    height:PX(52),
  },
  back:{ width: PX(240), height: PX(280), borderRadius:PX(7)},
  src:{width:PX(12),height:PX(12)},
  footer1:{flexDirection:'row',alignItems:'center',justifyContent:'center'},
  km:{fontSize:PX(12),paddingLeft:PX(5),color:'#F55800',fontFamily:'Montserrat-Medium'},
  redeem:{
    width:PX(356),
    height:PX(150),
},
deal:{
  width:PX(360),
  height:PX(196),
  paddingHorizontal:PX(20),

},
deal1:{justifyContent:'center',alignItems:'center',marginRight:PX(20),paddingVertical:PX(20)},
})
    export default styles