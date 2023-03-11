import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {PX} from '../pixel';
import DeviceInfo from 'react-native-device-info';
import styles from './styles';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import CountryPicker from 'react-native-country-picker-modal';
import {RegisterApi} from '../../Config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loader} from '../../Navigation/loader';
import GetLocation from 'react-native-get-location';
import Polygon from '../../assets/Polygon.png';
import eye from '../../assets/eye.png';
import eye1 from '../../assets/eye1.png';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AlertPopup from '../../Components/AlertPopup';
import auth from '@react-native-firebase/auth';

const index = ({navigation}) => {
  const [FName, setFName] = useState('');
  const [UName, setUName] = useState('');
  const [Email, setEmail] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [countryName, setcountryName] = useState('US');
  const [countryCode, setcountryCode] = useState('+1');
  const [Password, setPassword] = useState('');
  const [CPass, setCPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cPasswordVisible, setCPasswordVisible] = useState(false);
  const [alertPopup, setAlertPopup] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const ref_name = useRef();
  const ref_userName = useRef();
  const ref_email = useRef();
  const ref_mobileNumber = useRef();
  const ref_password = useRef();
  const ref_confirmPass = useRef();

  const onCountrySelect = country => {
    setcountryName(country.cca2);
    setcountryCode('+' + country.callingCode[0]);
  };

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      getCurrentLocation();
    });
  }, []);
  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log('get address', location.longitude, location.latitude);
        setLong(location.longitude);
        setLat(location.latitude);
        // setBothAddress([location.longitude,location.latitude])
        // setLat(location.latitude);
        // setLong(location.longitude);
        // getFullAddress(location.longitude,location.latitude)
        // onCafeDetails(location.latitude,location.longitude)
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  const onRegister = async () => {
    var reg = /^(?=[^A-Z\n]*[A-Z])(?=[^a-z\n]*[a-z])(?=[^0-9\n]*[0-9]).{8,}$/;
    var phoneno = /^\d{10}$/;
    var email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (FName == '') {
      setAlertMessage('Please Enter Your Name.');
      setAlertPopup(true);
      // Alert.alert('Registration',"Please Enter Your Name.")
    }
    if (UName == '') {
      setAlertMessage('Please Enter Your User Name.');
      setAlertPopup(true);
      // Alert.alert('Registration',"Please Enter Your Name.")
    } else if (Email == '') {
      setAlertMessage('Please Enter Your EmailId.');
      setAlertPopup(true);
      // Alert.alert('Registration',"Please Enter Your EmailId.")
    } else if (!email.test(Email)) {
      setAlertMessage('Please Enter Valid  EmailId.');
      setAlertPopup(true);
      // Alert.alert('Registration',"Please Enter Valid  EmailId.")
    } else if (PhoneNumber == '') {
      setAlertMessage('Please Enter Your Mobile Number.');
      setAlertPopup(true);
      // Alert.alert('Registration',"Please Enter Your Mobile Number.")
    } else if (PhoneNumber.length != 12) {
      setAlertMessage('Please Enter Valid Mobile Number.');
      setAlertPopup(true);
      // Alert.alert('Registration',"Please Enter Valid Mobile Number.")
    } else if (Password == '') {
      setAlertMessage('Please Enter Password.');
      setAlertPopup(true);
      // Alert.alert('Registration',"Please Enter Password.")
    } else if (Password.length < 8) {
      setAlertMessage('Please enter minimum 8 character password.');
      setAlertPopup(true);
      // Alert.alert('Registration',"Please enter minimum 8 character password.")
    } else if (!reg.test(Password)) {
      setAlertMessage(
        'Password require at least one capital letter, one lower case letter and one number.',
      );
      setAlertPopup(true);
      // Alert.alert('Registration',"Password require at least one capital letter, one lower case letter and one number.")
    } else if (CPass != Password) {
      setAlertMessage('Please Enter Valid Confirm Password.');
      setAlertPopup(true);
      // Alert.alert('Registration',"Please Enter Valid Confirm Password.")
    } else {
      try {
        let num = PhoneNumber.replace('-', '');
        let num1 = num.replace('-', '');
        console.log('Get Numbers:::', num1);
        // const confirmation = await auth().signInWithPhoneNumber('+91' + num1);
        // if (confirmation) {
        const name = encodeURIComponent(FName);
        const username = encodeURIComponent(UName);
        const email = encodeURIComponent(Email);
        const country_code = encodeURIComponent('1');
        const phone_number = encodeURIComponent(num1);
        const password = encodeURIComponent(Password);
        const lattitude = encodeURIComponent(lat);
        const longitude = encodeURIComponent(long);
        const requestBody = `name=${name}&username=${username}&email=${email}&country_code=${country_code}&phone_number=${phone_number}&password=${password}&lattitude=${lattitude}&longitude=${longitude}`;

        const res = await RegisterApi(requestBody);
        console.log('Get Response::', res);
        if (!res.sucecess) {
          setLoading(false);
          alert(res.message);
        } else {
          setLoading(false);
          // alert(res.data.otp)
          const confirmation = await auth().signInWithPhoneNumber('+1' + num1);
          if (confirmation) {
            navigation.navigate('Otp', {
              id: res.data.id,
              confirm: confirmation,
              number: num1,
            });
          } else {
            console.log('error');
          }
          console.log('Get Otp:::', confirmation);

          // AsyncStorage.setItem('id',res.data.id)
        }
      } catch (err) {
        setLoading(false);
        console.log('Get Error:::', err);
        setAlertMessage('Something is wrong.');
        setAlertPopup(true);
      }
    }
    // navigation.navigate("Login");
  };

  const FunctionVisible = () => {
    var phoneno = /^\d{10}$/;
    var email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (FName == '') {
      setButtonVisible(false);
      // alert("Please Enter Your Name.")
    } else if (Email == '') {
      setButtonVisible(false);
      // alert("Please Enter Your EmailId.")
    } else if (!email.test(Email)) {
      setButtonVisible(false);
      // alert("Please Enter Valid  EmailId.")
    } else if (PhoneNumber == '') {
      setButtonVisible(false);
      // alert("Please Enter Your Mobile Number.")
    } else if (!PhoneNumber.match(phoneno)) {
      setButtonVisible(false);
      // alert("Please Enter Valid Mobile Number.")
    } else if (Password == '') {
      setButtonVisible(false);
      // alert("Please Enter Password.")
    } else if (CPass != Password) {
      setButtonVisible(false);
      // alert("Please Enter Valid Confirm Password.")
    } else {
      setButtonVisible(true);
    }
  };

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
      ref_password.current.focus();
    }
  };

  return (
    <View style={styles.main}>
      <View style={{height: DeviceInfo.hasNotch() ? PX(30) : PX(10)}} />
      <Loader isLoding={loading} />
      <View style={styles.Image}>
        <Image source={require('../../assets/logo1.png')} style={styles.logo} />
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Create an account</Text>
        <Text style={styles.headerText1}>
          We need little information about you
        </Text>
      </View>

      <ScrollView
        style={{width: '100%'}}
        contentContainerStyle={{paddingBottom: PX(100)}}
        showsVerticalScrollIndicator={false}>
        <View style={{width: '100%', alignItems: 'center', marginTop: PX(20)}}>
          <View style={styles.from}>
            <View style={{width: '48%'}}>
              <Text style={styles.text2}>Full Name</Text>
              <View style={styles.line}>
                <TextInput
                  placeholder="Full Name"
                  ref={ref_name}
                  value={FName}
                  onChangeText={value => {
                    setFName(value);
                  }}
                  placeholderTextColor="#2D2D2D"
                  onBlur={() => FunctionVisible()}
                  returnKeyType={'next'}
                  onSubmitEditing={() => ref_userName.current.focus()}
                  style={styles.inputBox}
                />
              </View>
            </View>
            <View style={{width: '48%'}}>
              <Text style={styles.text2}>User Name</Text>
              <View style={styles.line}>
                <TextInput
                  placeholder="User Name"
                  ref={ref_userName}
                  value={UName}
                  onChangeText={value => {
                    setUName(value);
                  }}
                  placeholderTextColor="#2D2D2D"
                  onBlur={() => FunctionVisible()}
                  returnKeyType={'next'}
                  onSubmitEditing={() => ref_email.current.focus()}
                  style={styles.inputBox}
                />
              </View>
            </View>
          </View>

          <View style={styles.email}>
            <Text style={styles.text2}>Email address</Text>
            <View style={styles.email1}>
              <TextInput
                ref={ref_email}
                placeholder="Email address"
                value={Email}
                onChangeText={value => {
                  setEmail(value);
                }}
                style={{
                  width: '100%',
                  height: PX(40),
                  fontFamily: 'Montserrat-Regular',
                  color: '#2D2D2D',
                  paddingLeft: -1,
                }}
                onBlur={() => FunctionVisible()}
                placeholderTextColor="#2D2D2D"
                returnKeyType={'next'}
                onSubmitEditing={() => ref_mobileNumber.current.focus()}
              />
            </View>
            {/* <View style={styles.email2}>
             <View style={styles.line}/>
             </View> */}
          </View>

          <View style={{width: '90%', paddingTop: PX(40)}}>
            <Text style={styles.text2}>Phone Number</Text>
          </View>

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
              <Image style={styles.Images} source={Polygon} />
            </View>
            <TextInput
              ref={ref_mobileNumber}
              value={PhoneNumber}
              onChangeText={text => phoneNumberString(text)}
              onBlur={() => FunctionVisible()}
              style={styles.TextInputStyle1}
              placeholder={'Mobile Number'}
              keyboardType={'numeric'}
              onSubmitEditing={() => ref_password.current.focus()}
              maxLength={12}
            />
          </View>
          <View style={styles.email}>
            <Text style={styles.text2}>Password</Text>
            <View style={styles.email3}>
              <TextInput
                ref={ref_password}
                placeholder="***********"
                value={Password}
                onBlur={() => FunctionVisible()}
                onChangeText={value => {
                  setPassword(value);
                }}
                style={{
                  width: '92%',
                  height: PX(40),
                  fontFamily: 'Montserrat-Regular',
                  color: '#2D2D2D',
                }}
                returnKeyType={'next'}
                onSubmitEditing={() => ref_confirmPass.current.focus()}
                placeholderTextColor="#2D2D2D"
                secureTextEntry={passwordVisible ? false : true}
              />

              <TouchableOpacity
                onPress={() => {
                  setPasswordVisible(!passwordVisible);
                }}>
                <Image
                  style={{
                    width: PX(20),
                    height: PX(20),
                    resizeMode: 'contain',
                    tintColor: '#000',
                  }}
                  source={passwordVisible ? eye1 : eye}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.email}>
            <Text style={styles.text2}>Confirm Password</Text>
            <View style={styles.email3}>
              <TextInput
                placeholder="************"
                value={CPass}
                ref={ref_confirmPass}
                onBlur={() => FunctionVisible()}
                onSubmitEditing={() => ref_name.current.focus()}
                onChangeText={value => {
                  setCPass(value);
                }}
                style={{
                  width: '92%',
                  height: PX(40),
                  fontFamily: 'Montserrat-Regular',
                  color: '#2D2D2D',
                }}
                placeholderTextColor="#2D2D2D"
                secureTextEntry={cPasswordVisible ? false : true}
              />
              <TouchableOpacity
                onPress={() => {
                  setCPasswordVisible(!cPasswordVisible);
                }}>
                <Image
                  style={{
                    width: PX(20),
                    height: PX(20),
                    resizeMode: 'contain',
                    tintColor: '#000',
                  }}
                  source={cPasswordVisible ? eye1 : eye}
                />
              </TouchableOpacity>
            </View>
            {/* <View style={styles.email2}>
             <View style={styles.line}/>
             </View> */}
          </View>
        </View>
      </ScrollView>

      <View style={{width: '100%'}}>
        <View style={styles.main3}>
          <TouchableOpacity
            style={[styles.btn, {backgroundColor: '#F55800'}]}
            onPress={() => onRegister()}>
            <Text style={styles.btnText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By tapping sign up you accept all our
          </Text>
          <Text
            style={styles.footerText1}
            onPress={() => navigation.navigate('policy')}>
            terms and conditions
          </Text>
        </View>
      </View>

      <View style={styles.footer1}>
        <View style={styles.footer2}>
          <Text style={styles.textFooter}>already have an account ? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={styles.textFooter1}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>

      {alertPopup && (
        <AlertPopup
          modalVisible={alertPopup}
          onRequestClose={() => {
            setAlertPopup(false);
          }}
          title={'Registration'}
          message={alertMessage}
        />
      )}
    </View>
  );
};

export default index;
