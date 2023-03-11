import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {PX} from '../pixel';
import {hasNotch} from 'react-native-device-info';
import styles from './styles';
import logo from '../../assets/logo1.png';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {forgotPasswordApi} from '../../Config/api';
import {Loader} from '../../Navigation/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertPopup from '../../Components/AlertPopup';
import auth from '@react-native-firebase/auth';

const index = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [countryName, setcountryName] = useState('US');
  const [countryCode, setcountryCode] = useState('+1');
  const [alertPopup, setAlertPopup] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const phoneNumberString = async text => {
    let newText = '';
    let cleaned = ('' + text).replace(/\D/g, '');
    for (var i = 0; i < cleaned.length; i++) {
      if (i == 3) {
        newText = newText + '-';
      } else if (i == 6) {
        newText = newText + '-';
      }
      newText = newText + cleaned[i];
    }
    setPhoneNumber(newText);
    console.log('Get Lenght:::', cleaned.length);
    if (cleaned.length == 10) {
      Keyboard.dismiss();
    }
  };

  const registerApi = async () => {
    var email1 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    try {
      if (PhoneNumber == '') {
        setAlertMessage('Please Enter Your Mobile Number.');
        setAlertPopup(true);
        // Alert.alert('Registration',"Please Enter Your Mobile Number.")
      } else if (PhoneNumber.length != 12) {
        setAlertMessage('Please Enter Valid Mobile Number.');
        setAlertPopup(true);
        // Alert.alert('Registration',"Please Enter Valid Mobile Number.")
      } else {
        setLoading(true);
        let num = PhoneNumber.replace('-', '');
        let num1 = num.replace('-', '');
        console.log('Get Numbers:::', num1);

        const country_code = encodeURIComponent('1');
        const phone_number = encodeURIComponent(num1);
        const requestBody = `country_code=${country_code}&phone_number=${phone_number}`;
        const response = await forgotPasswordApi(requestBody);
        console.log('Response:::', response, email);

        if (!response?.sucecess) {
          setLoading(false);
          console.log('Response:::', response);
          setAlertMessage('Phone number not exist.');
          setAlertPopup(true);
        } else {
          setLoading(false);
          const confirmation = await auth().signInWithPhoneNumber('+1' + num1);
          if (confirmation) {
            console.log('Get Otp:::', confirmation);
          } else {
            console.log('error');
          }
          // alert(response.data.otp)

          navigation.navigate('Otp', {
            id: response.data.id,
            confirm: confirmation,
            number: num1,
            from: 'forgot',
          });
        }
      }
    } catch (err) {
      alert('Server Issue.');
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: hasNotch() ? PX(35) : 0,
          backgroundColor: '#000',
        }}
      />
      <Loader isLoding={loading} />
      <KeyboardAwareScrollView>
        <View style={styles.logo1}>
          <Image source={logo} style={styles.logo} />
        </View>

        <View style={styles.main}>
          <Text style={styles.header}>Forgot Password</Text>
          <Text style={styles.heder1}>
            Enter your mobile number and get code
          </Text>
        </View>

        <View style={{width: '100%', alignItems: 'center', paddingTop: PX(50)}}>
          <View style={styles.email}>
            <Text style={styles.text}>Phone Number</Text>
            <View
              style={[styles.textInputView, {justifyContent: 'space-between'}]}>
              <View style={[styles.imageView1, {flexDirection: 'row'}]}>
                {/* <Image style={styles.Images} source={pngImage.Email}/> */}
                {/* <CountryPicker
                      withFilter
                      withCallingCode
                      withCallingCodeButton
                      countryCode={countryName}
                      visible={false}
                      
                      // onSelect={onCountrySelect}
                      // theme={DARK_THEME}
                    /> */}
                <Image
                  style={{height: PX(25), width: PX(25), resizeMode: 'contain'}}
                  source={require('../../assets/flag.png')}
                />
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    fontSize: PX(16),
                    marginLeft: PX(5),
                    color: '#000',
                  }}>
                  +1
                </Text>
                <Image
                  style={styles.Images}
                  source={require('../../assets/Polygon.png')}
                />
              </View>
              <TextInput
                value={PhoneNumber}
                onChangeText={text => phoneNumberString(text)}
                // onBlur={()=>FunctionVisible()}
                style={styles.TextInputStyle1}
                placeholder={'Mobile Number'}
                keyboardType={'numeric'}
                maxLength={12}
              />
            </View>
            {/* <View style={styles.email1}>
              <TextInput
                placeholder="Enter Email"
                value={email}
                
                onChangeText={value => {
                  setEmail(value);
                }}
                style={styles.textInputStyle}
                placeholderTextColor="#2D2D2D"
              />
            </View> */}
          </View>

          <View style={styles.main3}>
            <TouchableOpacity style={styles.btn} onPress={() => registerApi()}>
              <Text style={styles.btnText}>Get Code</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
      {alertPopup && (
        <AlertPopup
          modalVisible={alertPopup}
          onRequestClose={() => {
            setAlertPopup(false);
          }}
          title={'Forgot Password'}
          message={alertMessage}
        />
      )}
    </View>
  );
};

export default index;
