import React from 'react';
import {StyleSheet} from 'react-native';
import {PX} from '../pixel';
const styles = StyleSheet.create({
  logo: {
    width: PX(148),
    height: PX(80),
  },
  logo1: 
    { height: '20%', 
      justifyContent: 'center', 
      alignItems: 'center'
    },
  main3: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
  },
  btn: {
    width: '92%',
    height: PX(52),
    backgroundColor: '#F55800',
    borderRadius: PX(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
              color: '#fff', 
              fontSize: PX(18),
              fontFamily:'Montserrat-Bold'
            },
  main: {
          flex: 1, 
          alignItems: 'center',
          backgroundColor:'#fff'
        },
  heder: {
          fontSize: PX(14), 
          color: '#F55800', 
          paddingTop: PX(10),fontFamily:'Montserrat-Regular'
        },
  heder1: {
            fontSize: PX(21), 
            fontFamily:'Montserrat-SemiBold',color:'#000'
        },
  heder2: {
            height: '10%', 
            width: '90%'
          },
  email: {
    paddingTop: PX(20),
    width:'90%'
  },
  text: {
    fontSize: PX(12),
    color:'#2D2D2D',
    fontFamily:'Montserrat-Regular'
  },
  text10: {
    fontSize: PX(12),
    color:'#2D2D2D',
    fontFamily:'Montserrat-Regular',
    marginTop:PX(25)
  },
  email1: {
    paddingTop: PX(15),
    width:'100%',
    borderBottomWidth:2,
    borderColor:'#C4C4C4',
  },
  email2: {
    paddingTop: PX(2)
  },
  email3: {
    paddingTop: PX(10),
    width:'100%',
        borderColor:'#C4C4C4',
        borderBottomWidth:2,
        flexDirection:'row',
        alignItems:'center'
  },
  line: {
    width: PX(300), 
    height: PX(2), 
    backgroundColor: '#C4C4C4'
  },
  forgot: {
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingTop: PX(10),
    width:'90%',
    alignSelf:'center'
  },
  forgot1: {
    fontSize: PX(15),color:'#000',
    fontFamily:'Montserrat-Regular'
  },
  reset: {
    fontSize: PX(15), 
    color: '#F55800',fontFamily:'Montserrat-Regular'
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
    height: PX(70),
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',bottom:0
  },
  footer1: {
    fontSize: PX(15),
     color: '#fff',
     fontFamily:'Montserrat-SemiBold'
    },
  create: {
    color: '#F55800', 
    fontSize: PX(15), 
    fontFamily:'Montserrat-SemiBold'
  },
});
export default styles;
