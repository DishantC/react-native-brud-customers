import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Animated,
  PermissionsAndroid
} from 'react-native';
import {PX} from '../pixel';
import DeviceInfo from 'react-native-device-info';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import GetLocation from 'react-native-get-location';
import {cafeListApi} from '../../Config/api';
import {addItem} from '../../redux/reducer';
import {useDispatch} from 'react-redux';

const index = ({navigation}) => {
  const width = new Animated.Value(60);
  const height = new Animated.Value(60);
  const width1 = new Animated.Value(80);
  const height1 = new Animated.Value(80);
  const width2 = new Animated.Value(100);
  const height2 = new Animated.Value(100);
  const duration = 1000;
  const dispatch = useDispatch();
  useEffect(() => {
    messageListener();
    LoginCheck();
    PushNotification.createChannel({
      channelId: 'channel-id', // (required)
      channelName: 'My channel', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    });
  }, []);

  useEffect(()=>{
   const requestLocationPermission=async()=> 
    {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title': `BRU'D Rewards App`,
            'message': `BRU'D Rewards App access to your location `
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the location")
          // alert("You can use the location");
        } else {
          console.log("location permission denied")
          // alert("Location permission denied");
        }
      } catch (err) {
        console.warn(err)
      }
    }
    requestLocationPermission()
  },[])

  useEffect(() => {
    Animated.timing(
      width1, // The animated value to drive
      {
        toValue: 100, // Animate to opacity: 1 (opaque)
        duration: 1000, // Make it take a while
        useNativeDriver: false,
      },
    ).start(); // Starts the animation
    Animated.timing(
      height1, // The animated value to drive
      {
        toValue: 100, // Animate to opacity: 1 (opaque)
        duration: 1000, // Make it take a while
        useNativeDriver: false,
      },
    ).start();
  }, []);

  useEffect(() => {
    Animated.timing(
      width2, // The animated value to drive
      {
        toValue: 120, // Animate to opacity: 1 (opaque)
        duration: 1000, // Make it take a while
        useNativeDriver: false,
      },
    ).start(); // Starts the animation
    Animated.timing(
      height2, // The animated value to drive
      {
        toValue: 120, // Animate to opacity: 1 (opaque)
        duration: 1000, // Make it take a while
        useNativeDriver: false,
      },
    ).start();
  }, []);

  useEffect(() => {
    Animated.timing(
      width, // The animated value to drive
      {
        toValue: 80, // Animate to opacity: 1 (opaque)
        duration: 1000, // Make it take a while
        useNativeDriver: false,
      },
    ).start(); // Starts the animation
    Animated.timing(
      height, // The animated value to drive
      {
        toValue: 80, // Animate to opacity: 1 (opaque)
        duration: 1000, // Make it take a while
        useNativeDriver: false,
      },
    ).start();
  }, []);

  const messageListener = () => {
    messaging().onMessage(async remoteMessage => {
      const {notification, messageId} = remoteMessage;
      if (Platform.OS == 'ios') {
        PushNotificationIOS.addNotificationRequest({
          id: messageId,
          body: notification.body,
          title: notification.title,
        });
      } else {
        console.log('A new FCM message arrived!', notification.body);

        PushNotification.localNotification({
          channelId: 'channel-id',
          id: messageId,
          body: notification.body,
          title: notification.title,
        });
      }
    });
  };
  const LoginCheck = async () => {
    const id = await AsyncStorage.getItem('id');
    console.log('Ge tID:::', id);
    if (id != null) {
      getCurrentLocation();
      navigation.replace('TabStack');
    }
  };

  const getCurrentLocation = () => {
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
        getCafeList(location.latitude, location.longitude);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  const getCafeList = async (lat, long) => {
    try {
      const id1 = await AsyncStorage.getItem('id');
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
        let datas= response.data.sort((a, b) =>  a.images[0].distance - b.images[0].distance)
        dispatch(addItem(datas));
        //  setCafeList(response.data)
        //  setMasterDataSource(response.data)
      }
    } catch (err) {
      // setLoading(false)
      alert('Server issue.');
    }
  };

  return (
    <View style={styles.container}>
    <View
      style={{
        height: DeviceInfo.hasNotch() ? PX(35) : PX(10),
        backgroundColor: '#000',
      }}
    />
    <View style={styles.firstView}>
      <Animated.Image
        style={[styles.firstImage, {width: width, height: height}]}
        source={require('../../assets/welcome1.png')}
      />
      <View
        style={{
          width: '100%',
          alignItems: 'flex-end',
          marginTop: PX(20),
        }}>
        <Animated.Image
          style={[styles.secondImage, {width: width1, height: height1}]}
          source={require('../../assets/welcome2.png')}
        />
      </View>
      <Animated.Image
        style={[styles.thirdImage, {width: width2, height: height2}]}
        source={require('../../assets/welcome3.png')}
      />
    </View>
    <View style={styles.secondView}>
      <Image
        style={styles.logoImage}
        source={require('../../assets/logo.png')}
      />
      <Text style={styles.desText}>
        Find your perfect place for eat, meet and get rewards
      </Text>
      <View style={styles.ButtonView}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: PX(20),
        }}>
        <Text
          style={{
            fontSize: PX(15),
            color: '#fff',
            fontFamily: 'Montserrat-Bold',
          }}>
          start your day{' '}
        </Text>

        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate('Login')}>
          Login
        </Text>
      </View>
    </View>

    <View style={{position: 'absolute', bottom: PX(20), right: PX(20)}}>
      <Text
        style={{
          fontFamily: 'Montserrat-Bold',
          fontSize: PX(15),
          color: '#828282',
        }}>
        {'Version 1.0 (2)'}
      </Text>
    </View>
  </View>
  );
};

export default index;



{/* <View style={styles.main}>
      <View style={{height: DeviceInfo.hasNotch() ? PX(30) : 0}} />
      <View
        style={{
          position: 'absolute',
          top: DeviceInfo.hasNotch() ? PX(50) : PX(35),
          left: PX(25),
        }}></View>
      <View style={styles.Image}>
        <View style={styles.image1}>
          <ImageBackground
            source={require('../../assets/round.png')}
            style={styles.tee}>
            <View style={styles.tee1}>
              <Image
                source={require('../../assets/Ellipse1.png')}
                style={styles.tee2}
              />
             
            </View>
          </ImageBackground>
        </View>

        <View style={styles.Image1}>
          <ImageBackground
            source={require('../../assets/round.png')}
            style={styles.coffee}>
            <View style={styles.coffee1}>
              <Image
                source={require('../../assets/coffee.png')}
                style={styles.coffee2}
              />
            </View>
          </ImageBackground>
        </View>

        <View style={styles.Image2}>
          <ImageBackground
            source={require('../../assets/round.png')}
            style={styles.cake}>
            <View style={styles.cake1}>
              <Image
                source={require('../../assets/cake.png')}
                style={styles.cake2}
              />
            </View>
          </ImageBackground>
        </View>
      </View>

      <View style={styles.main1}>
        <View style={styles.main2}>
          <View style={styles.logo}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo1}
            />
          </View>
          <View style={styles.text}>
            <Text style={styles.text1}>
              Find your perfect place for eat, meet
            </Text>
            <Text style={styles.text2}>and get rewards</Text>
          </View>
        </View>
        <View style={styles.main3}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Text style={styles.btnText}>Get Started</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.main4}>
          <Text style={styles.text3}>start your day</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={styles.btnLogin}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{position: 'absolute', bottom: PX(20), right: PX(20)}}>
        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            fontSize: PX(15),
            color: '#828282',
          }}>
          {'Version 1.2'}
        </Text>
      </View>
    </View> */}