import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {PX} from '../pixel';
import DeviceInfo from 'react-native-device-info';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {LoginApi} from '../../Config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loader} from '../../Navigation/loader';
import messaging from '@react-native-firebase/messaging';
import eye from '../../assets/eye.png';
import eye1 from '../../assets/eye1.png';
import GetLocation from 'react-native-get-location';
import {cafeListApi} from '../../Config/api';
import {addItem} from '../../redux/reducer';
import {useDispatch} from 'react-redux';

const index = ({navigation}) => {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      setToken(fcmToken);
    }
  };

  const getCurrentLocation = id => {
    // setLoading(true)
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log('get address', location.longitude, location.latitude);
        // setBothAddress([location.longitude,location.latitude])
        // setLat(location.latitude);
        // setLong(location.longitude);
        // getFullAddress(location.longitude,location.latitude)
        getCafeList(id, location.latitude, location.longitude);
      })
      .catch(error => {
        const {code, message} = error;
      });
  };

  const getCafeList = async (id1, lat, long) => {
    try {
      // const id1= await AsyncStorage.getItem('id')
      console.log('Get Api Response:::', lat, long);
      const id = encodeURIComponent(id1);
      const lattitude = encodeURIComponent(lat);
      const longitude = encodeURIComponent(long);
      const requestBody = `id=${id}&lattitude=${lattitude}&longitude=${longitude}`;

      const response = await cafeListApi(requestBody);
      // setLoading(false)
      console.log('Get Api Response:::', response);
      if (!response.sucecess) {
        //  setLoading(false)
        alert(response.message);
      } else {
        //  setLoading(false)
        dispatch(addItem(response.data));
        //  setCafeList(response.data)
        //  setMasterDataSource(response.data)
      }
    } catch (err) {
      // setLoading(false)
      console.log('Error:::', err);
      alert('Server issue.', err);
    }
  };

  const Login = async () => {
    var email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (Email == '') {
      alert('Please Enter Your EmailId.');
    } else if (Password == '') {
      alert('Please Enter Password.');
    } else {
      try {
        setLoading(true);
        const email = encodeURIComponent(Email);
        const password = encodeURIComponent(Password);
        const device_token = encodeURIComponent(token);
        const requestBody = `email=${email}&password=${password}&device_token=${device_token}`;

        const response = await LoginApi(requestBody);

        console.log('Get Api Response:::', response);
        if (!response.sucecess) {
          setLoading(false);
          alert(response.message);
        } else {
          setLoading(false);
          AsyncStorage.setItem('id', response.data.id);
          getCurrentLocation(response.data.id);
          navigation.replace('TabStack');
        }
      } catch (err) {
        setLoading(false);
        console.log('Error:::', err);
        alert('Server issue.');
      }

      //   useEffect(()=>{
      //     LoginCheck()
      //   },[])

      // const LoginCheck=async()=>{
      //   const id=await AsyncStorage.getItem('id')
      //   if(id!=null){
      //     navigation.navigate('MainStack')
      //   }

      // }
      //   const Logout=()=>{
      //     AsyncStorage.setItem('id','')
      //     navigation.navigate('AuthStack')
      //   }
      // }

      // let data={
      //   "email":Email,
      //   "password":Password,
      //   "type":"user"

      // }

      //   await LoginApi(data)
      //   .then((res)=>{
      //     console.log("Get Data::::",res)
      //     if(res?.token){
      //         alert(JSON.stringify(res))
      //         AsyncStorage.setItem('userToken',res.token)
      //       navigation.navigate("TabStack");
      //     }
      //     else{
      //       console.log("Get ::::",res)
      //       alert("Please Enter Valid Email ID And Password...")
      //     }
      //   })
      //   .catch((err)=>{
      //     console.log(err)
      //   })
    }
    //     navigation.navigate("Otp");
  };

  return (
    <View style={styles.main}>
      <Loader isLoding={loading} />
      <View style={{height: DeviceInfo.hasNotch() ? PX(30) : PX(10)}} />
      <View
        style={{
          position: 'absolute',
          top: DeviceInfo.hasNotch() ? PX(50) : PX(35),
          left: PX(25),
        }}></View>
      <View style={styles.logo1}>
        <Image source={require('../../assets/logo1.png')} style={styles.logo} />
      </View>

      <View style={styles.heder2}>
        <Text style={styles.heder1}>Login your account</Text>
        <Text style={styles.heder}>
          Fill in your credentials and start ordering
        </Text>
      </View>

      <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
        <View style={{width: '98%', alignItems: 'center'}}>
          <View style={styles.email}>
            <Text style={styles.text}>Username or Email address</Text>
            <View style={styles.email1}>
              <TextInput
                autoCapitalize="none"
                value={Email}
                onChangeText={value => {
                  setEmail(value);
                }}
                placeholder="Enter Email or Username"
                style={{
                  width: '100%',
                  height: PX(40),
                  color: '#000',
                  fontSize: PX(15),
                  fontFamily: 'Montserrat-Regular',
                  paddingLeft: -1,
                }}
                placeholderTextColor="#2D2D2D"
              />
            </View>
            {/* <View style={styles.email2}>
             <View style={styles.line}/>
             </View> */}
          </View>

          <View style={styles.email}>
            <Text style={styles.text10}>Password</Text>
            <View style={styles.email3}>
              <TextInput
                value={Password}
                placeholder="Enter Password"
                placeholderTextColor="#2D2D2D"
                onChangeText={value => {
                  setPassword(value);
                }}
                style={{
                  width: '92%',
                  height: PX(40),
                  color: '#000',
                  fontSize: PX(15),
                  fontFamily: 'Montserrat-Regular',
                  paddingLeft: -1,
                }}
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
            {/* <View style={styles.email2}>
             <View style={styles.line}/>
             </View> */}
          </View>

          <View style={{width: '100%'}}>
            <View style={styles.main3}>
              <TouchableOpacity style={styles.btn} onPress={() => Login()}>
                <Text style={styles.btnText}>Login</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.forgot}>
              <Text style={styles.forgot1}>Forgot password ? </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ForgotPassword');
                }}>
                <Text style={styles.reset}>Reset password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footer1}>don't have an account ?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <Text style={styles.create}> create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default index;
