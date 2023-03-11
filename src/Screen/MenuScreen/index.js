import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {PX} from '../pixel';
import DeviceInfo from 'react-native-device-info';
import styles from './styles';
import Swiper from 'react-native-swiper';
import {
  cafeListApi,
  customerProfileGetApi,
  onBannerListApi,
  onDealListApi,
  GetHomeListApi,
  onCardPointApi,
} from '../../Config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loader} from '../../Navigation/loader';
import moment from 'moment';
import demoBG from '../../assets/demoBG.png';
import GetLocation from 'react-native-get-location';

import demoBG1 from '../../assets/demoBG1.png';
const mapBox_token =
  'pk.eyJ1IjoiYnJ1ZHJld2FyZHMiLCJhIjoiY2wwMGYwZWduMGoyajNkbmY0ZGo2NDR5bSJ9.fBDDTBfSZ5GC8pSYyP41BQ';

const index = ({navigation}) => {
  const DATA = [
    {
      img: require('../../assets/Rectangle.png'),
    },
    {
      img: require('../../assets/Rectangle.png'),
    },
    {
      img: require('../../assets/Rectangle.png'),
    },
  ];

  const DATA1 = [
    {
      img: require('../../assets/Ellipse26.png'),
    },
    {
      img: require('../../assets/Ellipse27.png'),
    },
    {
      img: require('../../assets/Ellipse27.png'),
    },
  ];

  const deals = [
    {
      img: require('../../assets/card1.png'),
    },
    {
      img: require('../../assets/card2.png'),
    },
    {
      img: require('../../assets/card3.png'),
    },
  ];
  const cafes = [
    {
      src: require('../../assets/Star.png'),
      img: require('../../assets/sort.png'),
      rate: '4.5',
      cafe: 'Cafe baliza',
      time: '09:am 11:00pm',
      map: require('../../assets/map.png'),
      km: '2.1 Km',
    },
    {
      src: require('../../assets/Star.png'),
      img: require('../../assets/sort.png'),
      rate: '4.5',
      cafe: 'Aroma',
      time: '09:am 11:00pm',
      map: require('../../assets/map.png'),
      km: '2.1 Km',
    },
    {
      src: require('../../assets/Star.png'),
      img: require('../../assets/sort.png'),
      rate: '4.5',
      cafe: 'Aroma',
      time: '09:am 11:00pm',
      map: require('../../assets/map.png'),
      km: '2.1 Km',
    },
  ];

  const [modalVisible, setModalVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [cafeList, setCafeList] = useState([]);
  const [bannerList, setBannerList] = useState([]);
  const [DealList, setDealList] = useState([]);
  const [Points, setPoints] = useState('');
  const [FName, setFName] = useState('');
  const [address, setAddress] = useState('');
  const [street, setStreet] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [dayDealList, setDayDealList] = useState([]);
  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      setLoading(true);
      // getBannerList()
      // getDealList1();
      // onLocationGet();
      onGetProfile();
   
    });
  }, []);
  // const onCardPointList = async () => {
  //   try {
  //     setLoading(true);
  //     const id1 = await AsyncStorage.getItem('id');

  //     const id = encodeURIComponent(id1);
  //     const requestBody = `id=${id}`;

  //     const response = await onCardPointApi(requestBody);
  //     console.log('Get Api Response:::', response);
  //     if (!response.sucecess) {
  //       setLoading(false);
  //     } else {
  //       setLoading(false);
  //       setPoints(response?.data?.total_point);
  //     }
  //   } catch (err) {
  //     setLoading(false);
  //     console.log('GEt Error:::', err);
  //   }
  // };
  const getDealList1 = async () => {
    try {
      let day = [];
      let deal = [];
      const response = await onDealListApi();
      console.log('Get Api Response:::', response);
      if (!response.sucecess) {
        setLoading(false);
      } else {
        setLoading(false);

        setDayDealList(response.data.deal_of_the_day);
        //  setDealList(response.data.grab_best_deals)
      }
    } catch (err) {
      setLoading(false);
      alert('Server issue.');
    }
  };
  const getBannerList = async () => {
    try {
      const response = await onBannerListApi();
      console.log('Get Api Response:::', response);
      if (!response.sucecess) {
        //  setLoading(false)
      } else {
        //  setLoading(false)
        setBannerList(response.data);
      }
    } catch (err) {
      // setLoading(false)
      alert('Server issue.');
    }
  };

  const getDealList = async () => {
    try {
      let day = [];
      let deal = [];
      const response = await onDealListApi();
      console.log('Get Api Response:::', response);
      if (!response.sucecess) {
        //  setLoading(false)
      } else {
        //  setLoading(false)
        response.data.map((item, index) => {
          if (item.pts_two == '0') {
            deal.push(item);
          }
        });

        setDealList(deal);
      }
    } catch (err) {
      // setLoading(false)
      alert('Server issue.');
    }
  };

  const onLogout = () => {
    AsyncStorage.setItem('id', '');
    setModalVisible(!modalVisible);
    navigation.navigate('AuthStack');
  };

  // useEffect(()=>{
  //   const subscribe=navigation.addListener('focus',()=>{
  //     onGetProfile()
  //   })

  // },[])

  const onLocationGet = async () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log('get address', location.longitude, location.latitude);
        var requestOptions = {
          method: 'GET',
          redirect: 'follow',
        };
        setLong(location.longitude);
        setLat(location.latitude);
        getCafeList(location.latitude, location.longitude);
        fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/Market%20Street%20&%20Fremont%20Street.json?types=address&proximity=${location.longitude},${location.latitude}&access_token=${mapBox_token}`,
          requestOptions,
        )
          .then(response => response.json())
          .then(result => {
            console.log(
              'Get Location Address:::',
              result.features[0].place_name.split(',')[3],
            );
            setAddress(result.features[0].place_name.split(',')[1]);
            setStreet(result.features[0].place_name.split(',')[2]);
          })
          .catch(error => console.log('error', error));
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  const onGetProfile = async () => {
    setLoading(true)
    try {
      const id1 = await AsyncStorage.getItem('id');

      const user_id = encodeURIComponent(id1);
      const requestBody = `user_id=${user_id}`;

      const response = await customerProfileGetApi(requestBody);
      console.log('Get Api Response:::GetPRofile', response);
      if (!response.sucecess) {
         setLoading(false)
      } else {
         setLoading(false)
        setFName(response.data.name);
        setProfileImage(response.data.image);
        console.log('response.data.image+++++++++',response.data.name);
        //  setCafeList(response.data)
      }
    } catch (err) {
      setLoading(false)
      alert('Server issue.');
    }
  };

  // const getCafeList =async(lat,long)=>{
  //   try{
  //   setLoading(true)
  //   const id1= await AsyncStorage.getItem('id')

  //   const id = encodeURIComponent(id1);
  //   const lattitude = encodeURIComponent(lat);
  //   const longitude = encodeURIComponent(long);
  //     const requestBody = `id=${id}&lattitude=${lattitude}&longitude=${longitude}`;

  //     const response= await cafeListApi(requestBody)
  //     setLoading(false)
  //     console.log('Get Api Response:::',response)
  //     if(!response.sucecess){
  //      setLoading(false)
  //     alert(response.message)
  //     }
  //     else{
  //      setLoading(false)
  //      setCafeList(response.data)
  //     }
  //   }
  //   catch(err){
  //     setLoading(false)
  //     alert('Server issue.')
  //   }
  // }

  const getCafeList = async (lat, long) => {
    try {
      setLoading(true);
      const id1 = await AsyncStorage.getItem('id');

      const customer_id = encodeURIComponent(id1);
      const lattitude = encodeURIComponent(lat);
      const longitude = encodeURIComponent(long);
      const requestBody = `customer_id=${customer_id}&lattitude=${lattitude}&longitude=${longitude}`;

      const response = await GetHomeListApi(requestBody);
      setLoading(false);
      console.log('Get Api Response:::', response);
      if (!response.sucecess) {
        setLoading(false);
        alert(response.message);
      } else {
        setLoading(false);
        setCafeList(response.data.restaurants);
        setDealList(response.data.deals);
        setBannerList(response.data.banners);
      }
    } catch (err) {
      setLoading(false);
      alert('Server issue.');
    }
  };

  return (
    <View style={styles.main}>
      {/* <View style={{height: DeviceInfo.hasNotch() ? PX(30) : 0}} /> */}
      <Loader isLoding={loading} />

      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.cross1}>
            <Image
              source={require('../../assets/logo-white.png')}
              style={styles.logo}
            />
            {/* <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Image
                    source={require('../../assets/cross.png')}
                    style={styles.cross}
                  />
                </TouchableOpacity> */}
          </View>

          <View style={styles.profile}>
            <View style={styles.box1}>
             
              {profileImage == '' || profileImage == null ? (
               <View style={{width:PX(45),height:PX(45),borderRadius:PX(45),backgroundColor:"rgba(255,255,255,0.8)",alignItems:"center",justifyContent:'center'}}>
               <Image
                     source={require('../../assets/profile.png')}
                     style={{width:PX(35),height:PX(35),resizeMode:'contain'}}
                   />
                   </View>
              ) : (
                <Image source={{uri: profileImage}} style={styles.clint1} />
              )}
              <Text style={styles.name}>{FName}</Text>
            </View>
            <View
              style={{
                alignItems: 'flex-end',
                width: '15%',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('EditProfile');
                  setModalVisible(!modalVisible);
                }}>
                <Image
                  source={require('../../assets/edit.png')}
                  style={styles.edit}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.menu}>
            {/* <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  onPress={() => {
                    navigation.navigate('Rewards');
                    setModalVisible(!modalVisible)
                  }}>
                  <Image
                    source={require('../../assets/pints.png')}
                    style={styles.menuImage}
                  />
                  <Text style={styles.text2}>Reward Points</Text>
                </TouchableOpacity> */}

            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => {
                navigation.navigate('Selection');
                setModalVisible(!modalVisible);
              }}>
              <Image
                source={require('../../assets/payment.png')}
                style={styles.payment}
              />
              <Text style={styles.text2}>Payments</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  onPress={() => {
                    navigation.navigate('myorder');
                    setModalVisible(!modalVisible)
                  }}>
                  <Image
                    source={require('../../assets/order.png')}
                    style={styles.order}
                  />
                  <Text style={styles.text2}>My Orders</Text>
                </TouchableOpacity> */}

            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => {
                navigation.navigate('About');
                setModalVisible(!modalVisible);
              }}>
              <Image
                source={require('../../assets/about.png')}
                style={styles.about}
              />
              <Text style={styles.text2}>About Brud</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => {
                navigation.navigate('policy');
                setModalVisible(!modalVisible);
              }}>
              <Image
                source={require('../../assets/policy.png')}
                style={styles.policy}
              />
              <Text style={styles.text2}>Terms & Policy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => onLogout()}>
              <Image
                source={require('../../assets/logout.png')}
                style={styles.logout}
              />
              <Text style={styles.text10}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default index;
