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
  AppState,
  PermissionsAndroid,
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
  ListCartApi
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

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cafeList, setCafeList] = useState([]);
  const [bannerList, setBannerList] = useState([]);
  const [DealList, setDealList] = useState([]);
  const [Points, setPoints] = useState('0');
  const [FName, setFName] = useState('');
  const [address, setAddress] = useState('');
  const [street, setStreet] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [dayDealList, setDayDealList] = useState([]);
  const [convertedPrice, setConvertedPrice] = useState('');
  const [listCart, setListCart] = useState([]);


  
  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      setLoading(true);
      // getDealList1();
      onLocationGet();
      onGetProfile();
      onCardPointList();
      // onListCart()
    });
  }, []);

  // const onListCart = async () => {
  //   try {
  //     const id1 = await AsyncStorage.getItem('id');

  //     const id = encodeURIComponent(id1);

  //     const requestBody = `id=${id}`;

  //     const listcart = await ListCartApi(requestBody);
  //     console.log('Get Response Cart Data:::', listcart);
  //     if (listcart.sucecess) {
  //       setListCart(listcart?.data);
  //     } else {
  //       alert(listcart?.message)
  //       // setAlertMessage(listcart?.message);
  //       // setAlertPopup(true);
  //       // setModalVisible(!modalVisible)
  //     }
  //   } catch (err) {
  //     // setAlertMessage('Server issue.');
  //     // setAlertPopup(true);
  //     alert('Data is not available.')
  //   }
  // };

  const onCardPointList = async () => {
    try {
      const id1 = await AsyncStorage.getItem('id');

      const id = encodeURIComponent(id1);
      const requestBody = `id=${id}`;

      const response = await onCardPointApi(requestBody);
      console.log('Get Api Response:::', response);
      if (!response.sucecess) {
      } else {
        if(response?.data?.total_point!=undefined && response?.data?.total_point!=null){
          setPoints(response?.data?.total_point);
        }
        if(response?.data?.converted_point!=undefined && response?.data?.converted_point!=null){
        setConvertedPrice(response?.data?.converted_point);
        }
      }
    } catch (err) {
      console.log('GEt Error:::', err);
    }
  };
  // const getDealList1 = async () => {
  //   try {
  //     let day = [];
  //     let deal = [];
  //     const response = await onDealListApi();
  //     console.log('Get Api Response:::', response);
  //     if (!response.sucecess) {
  //     } else {

  //       setDayDealList(response.data.deal_of_the_day);
  //       //  setDealList(response.data.grab_best_deals)
  //     }
  //   } catch (err) {
  //     setLoading(false);
  //     console.log('getDealList1',err)
  //     alert('Network connection error.');
  //   }
  // };
  // const getBannerList = async () => {
  //   try {
  //     const response = await onBannerListApi();
  //     console.log('Get Api Response:::', response);
  //     if (!response.sucecess) {
  //       //  setLoading(false)
  //     } else {
  //       //  setLoading(false)
  //       setBannerList(response.data);
  //     }
  //   } catch (err) {
  //     setLoading(false)
  //     // setLoading(false)
  //     alert('Network connection error.');
  //   }
  // };

  // const getDealList = async () => {
  //   try {
  //     let day = [];
  //     let deal = [];
  //     const response = await onDealListApi();
  //     console.log('Get Api Response:::', response);
  //     if (!response.sucecess) {
  //       //  setLoading(false)
  //     } else {
  //       //  setLoading(false)
  //       response.data.map((item, index) => {
  //         if (item.pts_two == '0') {
  //           deal.push(item);
  //         }
  //       });

  //       setDealList(deal);
  //     }
  //   } catch (err) {
  //     // setLoading(false)
  //     setLoading(false)
  //     alert('Network connection error.');
  //   }
  // };

  const onLogout = () => {
    AsyncStorage.setItem('id', '');
    setModalVisible(!modalVisible);
    navigation.navigate('AuthStack');
  };

  const onLocationGet = async () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log('get address', location);
        var requestOptions = {
          method: 'GET',
          redirect: 'follow',
        };
        setLong(location.longitude);
        setLat(location.latitude);
        getCafeList(location.latitude, location.longitude);
        fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/Street.json?proximity=${location.longitude},${location.latitude}&access_token=${mapBox_token}`,
          requestOptions,
        )
          .then(response => response.json())
          .then(result => {
            console.log(
              'Get Location Address:::',
              result,
            );
            setAddress(result.features[0].place_name.split(',')[1]);
            setStreet(result.features[0].place_name.split(',')[2]);
          })
          .catch(error => {
            console.log('error', error)
          setLoading(false)
        });
      })
      .catch(error => {
        setLoading(false)
        const {code, message} = error;
        console.log('GEt Error:::', error);
        console.warn(code, message);
      });
  };

  const onGetProfile = async () => {
    try {
      const id1 = await AsyncStorage.getItem('id');

      const user_id = encodeURIComponent(id1);
      const requestBody = `user_id=${user_id}`;

      const response = await customerProfileGetApi(requestBody);
      console.log('Get Api Response:::', response);
      if (!response.sucecess) {
        //  setLoading(false)
      } else {
        //  setLoading(false)
        setFName(response.data.name);
        setProfileImage(response.data.image);
        //  setCafeList(response.data)
      }
    } catch (err) {
      setLoading(false)
      // setLoading(false)
      console.log('onGetProfile',err)
      alert('Network connection error.');
    }
  };

  const getCafeList = async (lat, long) => {
    try {
      setLoading(true);
      const id1 = await AsyncStorage.getItem('id');
      console.log('Get Api Cafe And All List Response:::', id1,lat,long);
      const customer_id = encodeURIComponent(id1);
      const lattitude = encodeURIComponent(lat);
      const longitude = encodeURIComponent(long);
      const requestBody = `customer_id=${customer_id}&lattitude=${lattitude}&longitude=${longitude}`;

      const response = await GetHomeListApi(requestBody);
      console.log('Get Api Cafe And All List Response:::', response);
      setLoading(false);
      
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
      console.log('getCafeList',err)
      alert('Network connection error.');
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.Image}>
        <Image
          source={item.img}
          style={{width: PX(368), height: PX(172)}}
          resizeMode="contain"
        />
      </View>
    );
  };

  const renderItem3 = ({item, index}) => {
    return (
      <View style={styles.Image}>
        <Image
          source={item.img}
          style={{width: PX(6), height: PX(6)}}
          resizeMode="contain"
        />
      </View>
    );
  };

  const renderItem2 = ({item, index}) => {
    if (item.type == 2) {
      return (
        <TouchableOpacity
          style={styles.Image2}
          onPress={() => navigation.navigate('singleReward', {data: item})}>
          <ImageBackground
            source={demoBG}
            resizeMode={'contain'}
            style={{
              width: PX(240),
              height: PX(280),
              paddingHorizontal: PX(10),
              justifyContent: 'space-between',
              paddingVertical: PX(15),
            }}>
            <View>
              <Text
                style={{
                  fontSize: PX(22),
                  color: '#fff',
                  fontFamily: 'Montserrat-Bold',
                  marginTop: PX(20),
                }}>
                {item.title}
              </Text>
              <Text
                style={{
                  fontSize: PX(12),
                  color: '#fff',
                  fontFamily: 'Montserrat-Regular',
                  marginTop: PX(10),
                  width: '90%',
                }}>
                {item.short_desc}
              </Text>
            </View>
            <View
              style={{
                height: PX(30),
                width: PX(70),
                backgroundColor: '#F55800',
                borderRadius: PX(20),
                marginBottom: PX(25),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: PX(14),
                  color: '#fff',
                  fontFamily: 'Montserrat-Regular',
                }}>
                {item.pts_one} pts
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      );
    }
  };

  const renderItem1 = ({item, index}) => {
    var dayName = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
    var day = dayName[new Date().getDay()];
    console.log('Get Day Daata>>>>', item?.cafe_timing, day);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('restaurant', {id: item.id})}
        activeOpacity={1}
        style={styles.Image}>
        <ImageBackground
          source={{uri: item.image}}
          imageStyle={{borderRadius: PX(10)}}
          style={styles.back}>
          <View style={styles.rate}>
            <View style={styles.rate1}>
              <Image
                source={require('../../assets/Star.png')}
                style={styles.src}
              />
              <Text style={{fontSize: PX(12), color: '#000'}}>
                {item.images[0].avg_reviews}
              </Text>
            </View>
          </View>
          <View style={styles.box2}>
            <View style={styles.footer}>
              <View style={styles.cafe1}>
                <Text style={styles.text3}>{item.restaurant_name}</Text>
              </View>
              <View>
                <View style={styles.footer1}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                      alignItems: 'center',
                    }}>
                    <View style={styles.time}>
                      {item?.cafe_timing?.map((item1, index) => {
                        
                        return (
                          <Text style={styles.timeText}>
                            {item1[`${day}`]?.time == 'custom'
                              ? `${item1[`${day}`]?.start} am to ${moment(
                                  `${item1[`${day}`]?.end}`,
                                  'hh:mm a',
                                ).format('hh:mm a')}`
                              : item1[`${day}`]?.time}
                          </Text>
                        );
                      })}
                    </View>
                    <View style={styles.map}>
                      <Image
                        source={require('../../assets/map.png')}
                        style={styles.mapImage}
                      />
                      <Text style={styles.km}>{item.images[0].distance}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const integerCheck = (num) => {
    const isInt = (n) => Number(n) === n && n % 1 === 0
    const isFloat = (n) => Number(n) === n && n % 1 !== 0
    if (isInt(num) || !isFloat(num)){
      return parseInt(num)
    }
else{
  return parseFloat(num).toFixed(2)
   
}
}

  return (
    <View style={styles.main}>
      <View style={{height: DeviceInfo.hasNotch() ? PX(35) : PX(10)}} />
      <Loader isLoding={loading} />
      <View style={styles.header}>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
        <View>
          <Image
            source={require('../../assets/Group.png')}
            style={styles.image}
          />
        </View>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('search', {lat: lat, long: long})}>
          <Text style={styles.text}>{address}</Text>
          <Text style={styles.text1}>{street}</Text>
        </TouchableOpacity>
        <View>
          <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.cross1}>
                  <Image
                    source={require('../../assets/logo-white.png')}
                    style={styles.logo}
                  />
                  <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Image
                      source={require('../../assets/cross.png')}
                      style={styles.cross}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.profile}>
                  <View style={styles.box1}>
                    {profileImage == '' || profileImage == null ? (
                      <Image
                        source={require('../../assets/Ellipse25.png')}
                        style={styles.clint}
                      />
                    ) : (
                      <Image
                        source={{uri: profileImage}}
                        style={styles.clint1}
                      />
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
          </Modal>
        </View>
        </View>
        <TouchableOpacity 
          onPress={() => {
            navigation.navigate('cart', {res_id: listCart[0]?.restaurant_id});
          }}
          styles={{width: '15%'}}>
          <Image
            source={require('../../assets/cart2.png')}
            style={styles.cart}
          />
          {listCart.length > 0 && <View style={styles.back1} />}
        </TouchableOpacity>
        

      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{width: '100%'}}
        contentContainerStyle={{paddingBottom: PX(100)}}>
        <View style={{width: '100%', height: PX(230)}}>
          <Swiper
            key={bannerList.length}
            style={[styles.wrapper,{opacity:1}]}
            showsButtons={false}
            autoplay
            loop
            removeClippedSubviews={false}
          
            >
            {bannerList.map(item => {
              console.log("Image upload::::",item.image);
              return (
                <TouchableOpacity
                activeOpacity={1}
                  onPress={() =>
                    navigation.navigate('restaurant', {id: item.restaurant_id})
                  }
                  style={styles.Image}>
                  <Image
                    source={{uri: item.image}}
                    style={{
                      width: PX(370), 
                      height: PX(172),
                      resizeMode: 'stretch',
                      marginBottom: PX(70),
                      borderRadius: PX(20),
                      opacity:1
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </Swiper>
        </View>
        <View style={{paddingLeft: '5%'}}>
          <Text
            style={{
              fontSize: PX(18),
              color: '#000',
              fontFamily: 'Montserrat-Medium',
            }}>
            Reward
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('rewardHistory');
          }}
          activeOpacity={1}
          style={{justifyContent: 'center', alignItems: 'center', marginTop:PX(20)}}>
          <Image
            source={require('../../assets/redeem.png')}
            style={styles.redeem}
          />
          <View style={{position: 'absolute', top: PX(20)}}>
            <Text
              style={{
                color: '#fff',
                fontSize: PX(16),
                fontFamily: 'Montserrat-Bold',
              }}>
              Your Points
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              top: PX(47),
              height: PX(40),
              backgroundColor: '#051821',
              width: PX(90),
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#F55800',
                fontSize: PX(22),
                fontFamily: 'Montserrat-Bold',
              }}>
              {integerCheck(Points)}
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: PX(8),
              height: PX(40),
              backgroundColor: '#051821',
              width: PX(130),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: PX(16),
                fontFamily: 'Montserrat-Bold',
              }}>
              {`REDEEM NOW`}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={[styles.cafes,{paddingTop: PX(18)}]}>
          <Text
            style={{
              fontSize: PX(18),
              color: '#000',
              fontFamily: 'Montserrat-Medium',
            }}>
            Cafe's near you
          </Text>
          <Text
            style={styles.view}
            onPress={() => navigation.navigate('SearchScreen')}>
            View All
          </Text>
        </View>

        <View style={{width: '100%', height: PX(330)}}>
          <FlatList
            data={cafeList}
            renderItem={renderItem1}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </View>
        {/* <View style={styles.mainView}> */}
       

        <View style={{ paddingLeft: '5%'}}>
          <Text
            style={{
              fontSize: PX(18),
              color: '#000',
              fontFamily: 'Montserrat-Medium',
            }}>
            Deal of the day
          </Text>
        </View>
        <FlatList
          data={dayDealList}
          contentContainerStyle={{paddingHorizontal: PX(15)}}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('singleReward', {data: item});
                }}
                style={styles.deal1}>
                <ImageBackground source={demoBG1} style={styles.deal}>
                  <Text
                    style={{
                      fontSize: PX(26),
                      color: '#fff',
                      fontFamily: 'Montserrat-Bold',
                      marginTop: PX(20),
                      width: '70%',
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: PX(13),
                      color: '#fff',
                      fontFamily: 'Montserrat-Regular',
                      marginTop: PX(10),
                      width: '90%',
                    }}>
                    {item.short_desc}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: PX(50),
                      marginTop: PX(15),
                    }}>
                    <View
                      style={{
                        height: PX(30),
                        width: PX(70),
                        backgroundColor: '#F55800',
                        borderRadius: PX(20),
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: PX(14),
                          color: '#fff',
                          fontFamily: 'Montserrat-Regular',
                        }}>
                        {item.pts_one} pts
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
        <View style={styles.cafes}>
          <Text
            style={{
              fontSize: PX(18),
              color: '#000',
              fontFamily: 'Montserrat-Medium',
            }}>
            Grab best deals
          </Text>
          <Text style={styles.view}>View All</Text>
        </View>

        <View style={{width: '100%', height: PX(300)}}>
          <FlatList
            data={DealList}
            renderItem={renderItem2}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default index;
