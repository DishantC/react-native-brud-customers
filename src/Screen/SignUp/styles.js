import React from 'react'
import { StyleSheet} from 'react-native'
import { PX } from "../pixel";
const styles=StyleSheet.create({
    logo:{
        width:PX(148),
        height:PX(80),
    },
    main3:{
        width:'100%',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:'5%',
        paddingBottom:'5%'
    },
btn:{
    width:'92%',
    height:PX(52),
    
    borderRadius:PX(60),
    justifyContent:'center',
    alignItems:'center'
},
btnText:{
    color:'#fff',
    fontSize:PX(18),fontFamily:'Montserrat-Bold'
},
main:{
    flex:1,
    alignItems:'center',
    backgroundColor:'#fff',

},
Image:{
    height:'20%',
    justifyContent:'center',
    alignItems:'center'
},
header:{
    height:'10%',
    width:'90%'
},
headerText:{
    fontSize:PX(21),
    color:'#000',
    fontFamily:'Montserrat-SemiBold'
},
headerText1:{
    fontSize:PX(14),
    color:'#F55800',
    paddingTop:PX(10),
    fontFamily:'Montserrat-Regular'
},

footer:{
    justifyContent:'center',
    alignItems:'center',
    // paddingTop:PX(10)
    paddingBottom:'25%'
},
footerText:{fontSize:PX(15),fontFamily:'Montserrat-Regular',color:'#000'},
footerText1:{
    fontSize:PX(15),
    color:'#F55800',fontFamily:'Montserrat-Regular'
},
footer1:{
    position:'absolute',
    bottom:0
},
footer2:{
    flexDirection:'row',
    width:PX(450),
    height:PX(70),
    backgroundColor:'#000',
    justifyContent:'center',
    alignItems:'center'
},
textFooter:{
    fontSize:PX(15),
    color:'#fff',fontFamily:'Montserrat-SemiBold'
},
textFooter1:{
    color:'#F55800',
    fontSize:PX(15)
    ,fontFamily:'Montserrat-SemiBold'
},
textBox:{fontSize:PX(13)},
textBox1:{
            fontSize:PX(15),
            paddingBottom:PX(5),
            width:'100%'
        },

        from:{
            flexDirection:'row',
            justifyContent:'space-between',
            width:'90%'
        },
        from1:{
            // paddingTop:PX(20),
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            width:'90%'
        },
        text:{
            fontSize:PX(13),
            color:'#2D2D2D',
            fontFamily:'Montserrat-Regular'
        },
        text2:{
            fontSize:PX(13),
            color:'#2D2D2D',
            fontFamily:'Montserrat-Regular'
        },
        text1:{
            fontSize:PX(13),
            color:'#2D2D2D'
        },
        inputBox:{
            // paddingTop:PX(5),
            fontSize:PX(15),
            width:'100%',height:PX(40),
            color:'#2D2D2D',
            fontFamily:'Montserrat-Regular',
            paddingLeft:-1
        },
        line:{
            flexDirection:'row',
            paddingTop: PX(10),
            width:'100%',
            borderBottomWidth:2,
            borderColor:'#C4C4C4',
         
    },
    line1:{
        flexDirection:'row',
        paddingTop: PX(5),
        // width:'100%',
        borderBottomWidth:2,
        borderColor:'#C4C4C4',
     
},


    email: {
        paddingTop: PX(40),
        width:'90%'
      },
      text: {
        fontSize: PX(12)
      },
      email1: {
        paddingTop: PX(10),
        width:'100%',
            borderColor:'#C4C4C4',
            borderBottomWidth:2
      },
      email3: {
        paddingTop: PX(10),
        width:'100%',
            borderColor:'#C4C4C4',
            borderBottomWidth:2,
            flexDirection:'row',
            alignItems:'center'
      },
      email2: {
        paddingTop: PX(2)
      },
      line1: {
        width: PX(300), 
        height: PX(2), 
        backgroundColor: '#C4C4C4'
      },
      textInputView: {
        width: '90%',
        height: PX(45),
        marginTop: PX(10),
        alignItems: 'center',
        flexDirection: 'row',
      },
      imageView1: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 1,
        paddingBottom: PX(6),
        width: '25%',
        height: PX(45),
      },
      TextInputStyle1: {
        fontSize: PX(14),
        height: PX(45),
        fontFamily: 'Montserrat-Regular',
        width: '69%',
        color: '#2D2D2D',
        paddingBottom: PX(6),
        marginLeft: PX(10),
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 1,
      },
      Images:{
        width: PX(10),
        height: PX(10),
        resizeMode:'contain',
        marginLeft:PX(10)
      }
})
    export default styles