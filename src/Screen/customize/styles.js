import React from 'react'
import { StyleSheet} from 'react-native'
import { PX } from "../pixel";
const styles=StyleSheet.create({
    main1:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        backgroundColor:'#fff'
    },
    backImg:{
        width:'100%',
        height:'30%'
    },
    mainView1:{
        width:'95%',
        height:'75%',
        backgroundColor:'#ffffff'
        // justifyContent:'space-between',
        // alignItems:'center'
        
    },
    header:{
        fontSize:PX(16),
        paddingRight:'52%',
        paddingTop:PX(10),color:'#000',fontFamily:'Montserrat-Regular'
    },
    header1:{fontSize:PX(12),paddingTop:PX(10),paddingLeft:'5%',color:'#848484',fontFamily:'Montserrat-Regular'},
    headerMain1:{width:'100%',justifyContent:'space-between',alignItems:'center'},
    btnMain:{flexDirection:'row',paddingTop:'5%',width:'100%',},
    btn1:{width:PX(100),height:PX(52),borderRadius:PX(50),borderColor:'#F55800',paddingHorizontal:'5%',
    flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#fff',borderWidth:PX(2),},
    btn1Text:{fontSize:PX(24),color:'#F55800',fontFamily:'Montserrat-Regular'},
    btn1Text2:{fontSize:PX(24),fontFamily:'Montserrat-Regular'},
    btn2:{width:PX(238),height:PX(52),borderRadius:PX(50),backgroundColor:'#F55800',flexDirection:'row',marginLeft:'2%',
    justifyContent:'space-between',alignItems:'center',paddingHorizontal:'5%',},
    add:{fontSize:PX(15),color:'#ffff',fontFamily:'Montserrat-Bold'},
    total:{fontSize:PX(10),color:'#fff',fontFamily:'Montserrat-Bold'},
    

})
    export default styles