import { StyleSheet, Text, View,Modal,TouchableOpacity } from 'react-native'
import React,{useEffect,useState} from 'react'
import {PX} from '../Screen/pixel'

const AlertDeletePopup = ({modalVisible,onRequestClose,title,message,onClearCartItem}) => {
  return (
    <Modal
    visible={modalVisible}
    animationType="slide"
    transparent={true}
    onRequestClose={onRequestClose}>
    <View
      style={{
        backgroundColor: 'rgba(0,0,0,0.4)',
        position:'absolute',
        top:0,
        bottom:0,
        right:0,
        left:0,
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:"center"
      }}>
      <View
        style={{
          height: '20%',
          width: '90%',
          backgroundColor: '#fff',
          borderRadius: PX(20),
          justifyContent:'space-between',
          paddingVertical:PX(20),
          paddingHorizontal:PX(20)
        }}>
        <View>
        <Text style={{fontSize:PX(18),fontFamily:"Montserrat-Bold",color:"#000"}}>{title}</Text>
        <Text style={{
            fontSize:PX(16),
            fontFamily:"Montserrat-Regular",
            color:"#000",
            marginTop:PX(15),
            width:'90%'
            }}>{message}</Text>
        </View>
        <View style={{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'flex-end',
        }}>
        <TouchableOpacity style={{alignSelf:"flex-end"}} onPress={onClearCartItem}>
        <Text style={{fontSize:PX(18),fontFamily:"Montserrat-Medium",color:"#000"}}>Clear Item</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={{alignSelf:"flex-end",marginLeft:PX(20)}} onPress={onRequestClose}>
        <Text style={{fontSize:PX(18),fontFamily:"Montserrat-Medium",color:"#000"}}>Ok</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal> 
  )
}

export default AlertDeletePopup

const styles = StyleSheet.create({})