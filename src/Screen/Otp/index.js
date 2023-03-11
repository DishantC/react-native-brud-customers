
import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {PX} from '../pixel';
import {hasNotch} from 'react-native-device-info';
import logo from '../../assets/logo1.png';
import {VerifyOtp,resendOtp} from '../../Config/api'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
  isLastFilledCell,
} from 'react-native-confirmation-code-field';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loader} from '../../Navigation/loader';
import auth from '@react-native-firebase/auth';
import AlertPopup from '../../Components/AlertPopup'

 const index = ({navigation,route}) => {
  const inputCodeRef = useRef(null);
  const [email, setEmail] = useState('');
  const [value, setValue] = useState('');
  const [loading,setLoading] = useState(false)
  const [resend,setResend] = useState(false)
  const [confirmation,setConfirmation] = useState('')
  const [alertPopup,setAlertPopup] = useState(false)
  const [alertMessage,setAlertMessage] = useState('')

  const [inputCodeProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const onVerifyOtp=async()=>{
    if(resend==false){
    try {
      const confirmation=route.params?.confirm
      setLoading(true)
     const verify= await confirmation.confirm(value);
     console.log('Get Api Response:::',verify)
     if(verify){
      setLoading(false)
      
      if(route.params?.from=='forgot'){
        navigation.navigate('setUpNewPassword',{id:route.params?.id});
      }
      else{
        AsyncStorage.setItem('id',route.params?.id)
      navigation.navigate('OtpSuccess',{id:route.params?.id});
      } 
    }
     else{
      setLoading(false)
      setAlertMessage('Please Enter Valid Otp.')
      setAlertPopup(true)
     }
    } catch (error) {
      setLoading(false)
      setAlertMessage('Invalid Otp.')
      setAlertPopup(true)
    }
  }
  else{
    try {
      // const confirmation=route.params?.confirm
      setLoading(true)
     const verify= await confirmation.confirm(value);
     console.log('Get Api Response:::',verify)
     if(verify){
      setLoading(false)
      if(route.params?.from=='forgot'){
        navigation.navigate('setUpNewPassword',{id:route.params?.id});
      }
      else{
        AsyncStorage.setItem('id',route.params?.id)
      navigation.navigate('OtpSuccess',{id:route.params?.id});
      } 
     }
     else{
      setLoading(false)
      setAlertMessage('Please Enter Valid Otp.')
      setAlertPopup(true)
      // alert('Invalid Otp.')
     }
    } catch (error) {
      setLoading(false)
      setAlertMessage('Invalid Otp.')
      setAlertPopup(true)
      // alert('Invalid Otp.')
    }
  }
  //   const id = encodeURIComponent(route.params?.id);
  //   const otp= encodeURIComponent(value);
  
  //   const requestBody = `id=${id}&otp=${otp}`;
  //  const res= await VerifyOtp(requestBody)
  //  console.log('Get Api Response:::',res)
  //  if(!res.sucecess){
  //   setLoading(false)
  //  alert(res.message)
  //  }
  //  else{
  //   setLoading(false)
  //   // alert(res.message)
  //   navigation.navigate('OtpSuccess',{id:route.params?.id});
  //  }
  //  navigation.navigate('CreatePassword');
  }
  
  const resendOtp=async()=>{
  //   setLoading(true)
  //   const id = encodeURIComponent(route.params?.id);
  //   const requestBody = `id=${id}`;
  //  const response= await ResendOTPApi(requestBody)
  //  console.log('Get Api Response:::',response)
  //  if(!response.sucecess){
  //   setLoading(false)
  //  alert(response.message)
  //  }
  //  else{
  //   setLoading(false)
  //   alert(response.message)
  //  }
  console.log('get Number:::',route.params?.number)
  const confirmation = await auth().signInWithPhoneNumber('+1' + route.params?.number);
  console.log('get Number:::',confirmation)
  setConfirmation(confirmation)

  }


  return (
    <View style={styles.container}>
      <View
        style={{
          height: hasNotch() ? PX(35) : 0,
          backgroundColor: '#000',
        }}
      />
      <Loader isLoding={loading}/>
      <KeyboardAwareScrollView>
        <View style={styles.logo1}>
          <Image source={logo} style={styles.logo} />
        </View>

        <View style={styles.main}>
          <Text style={styles.header}>Enter Code</Text>
          <Text style={styles.heder1}>
            Submit code recieved on your Mobile Number
          </Text>
        </View>

        <View style={{width: '100%', alignItems: 'center', paddingTop: PX(50)}}>
          <View style={styles.email}>
            <Text style={styles.text}>your 6 digit OTP</Text>
            <View style={styles.email1}>
              <CodeField
                ref={inputCodeRef}
                {...inputCodeProps}
                value={value}
                onChangeText={(value, i) => {
                  setValue(value);
                  // if (value && value.length === 4) {
                  //   onVerifyOtp()
                  // }
                }}
                cellCount={6}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                  <View
                    style={[
                      styles.optTextView,
                      {
                        borderBottomColor: isFocused ? '#F55800' : '#848484',
                      },
                    ]}>
                    <Text
                      key={index}
                      style={[styles.cell, isFocused && styles.focusCell]}
                      onLayout={getCellOnLayoutHandler(index)}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  </View>
                )}
              />
            </View>
          </View>
        </View>

        <View style={styles.main3}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => onVerifyOtp()}>
            <Text style={styles.btnText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{marginTop: PX(25)}}  onPress={() => resendOtp()}>
            <Text style={styles.ResetText}>RESEND</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      {alertPopup&&
          <AlertPopup 
          modalVisible={alertPopup}
          onRequestClose={()=>{setAlertPopup(false)}}
            title={'Otp Verification'}
            message={alertMessage}
          />
          }
    </View>
  );
};

export default index
