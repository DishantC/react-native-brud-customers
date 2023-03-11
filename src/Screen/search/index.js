import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {PX} from '../pixel';
import {hasNotch} from 'react-native-device-info';
import styles from './styles';
import GetLocation from 'react-native-get-location';
import backGo from '../../assets/backGo.png';
import search from '../../assets/serch.png';
import addressMap from '../../assets/addressMap.png';
import map from '../../assets/map.png';
import DeviceInfo from 'react-native-device-info';
import {cafeListApi, customerProfileGetApi} from '../../Config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import back1 from '../../assets/back1.png';
import moment from 'moment';
import {Loader} from '../../Navigation/loader';
import {useSelector} from 'react-redux';

const mapBox_token =
  'pk.eyJ1IjoiYnJ1ZHJld2FyZHMiLCJhIjoiY2wwMGYwZWduMGoyajNkbmY0ZGo2NDR5bSJ9.fBDDTBfSZ5GC8pSYyP41BQ';

const index = ({navigation, route}) => {
  const listItems = useSelector(state => state.itemList);
  const [lat, setLat] = useState('37.785834');
  const [long, setLong] = useState('-122.406417');
  const [bothAddress, setBothAddress] = useState([]);
  const [mapVisible, setMapVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [cafeList, setCafeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectItem, setSelectItem] = useState();
  const [AllData, setAllData] = useState([]);
  const [selectVisible, setSelectVisible] = useState(false);
  const [page, setPage] = useState(0);
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
  MapboxGL.setAccessToken(mapBox_token);

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      // getCafeList(route.params?.lat,route.params?.long)
      // getCurrentLocation();
      console.log('Get data::::', listItems.length);
      if (listItems.length > 0) {
        setCafeList(listItems);
        setLat(route.params?.lat);
        setLong(route.params?.long);
      } else {
        getCurrentLocation();
      }
      // setMasterDataSource(listItems)
    });
  }, []);
  const getCurrentLocation = () => {
    // setLoading(true)
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(async location => {
        console.log('get address', location.longitude, location.latitude);
        // setBothAddress([location.longitude,location.latitude])
        await getCafeList(location.latitude, location.longitude);
        setLat(location.latitude);
        setLong(location.longitude);

        getFullAddress(location.longitude, location.latitude);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  const onSearch = async test => {
    setSearchText(test);
    try {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };

      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${test}.json?access_token=pk.eyJ1IjoiYnJ1ZHJld2FyZHMiLCJhIjoiY2wwMGYwZWduMGoyajNkbmY0ZGo2NDR5bSJ9.fBDDTBfSZ5GC8pSYyP41BQ`,
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          //       setLong(result.features[0].center[0]);
          // setLat(result.features[0].center[1]);
          // result.features[0].center[0]
          setAllData(result.features);
          console.log('Get Error::', result.features[0].center[0]);
          console.log('Get Error::', result.features[0].center[1]);
        })
        .catch(error => console.log('error', error));
    } catch (err) {
      console.log('Get Error::', err);
    }
  };

  const getCafeList = async (lat, long) => {
    try {
      // setLoading(true)
      const id1 = await AsyncStorage.getItem('id');
      console.log('Get Api Response:::', lat, long);
      const id = encodeURIComponent(id1);
      const lattitude = encodeURIComponent(lat);
      const longitude = encodeURIComponent(long);
      const requestBody = `id=${id}&lattitude=${lattitude}&longitude=${longitude}`;

      const response = await cafeListApi(requestBody);
      console.log('Get Api Response:::', response);
      setLoading(false);
      if (!response.sucecess) {
        setLoading(false);
        alert(response.message);
      } else {
        setLoading(false);
        setCafeList(response.data);
        setTimeout(() => {
          setMapVisible(true);
        }, 500);
      }
    } catch (err) {
      console.log('Get Lat:::', err);
      setLoading(false);
      alert('Server issue.');
    }
  };

  const getFullAddress = async (long, lat) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/Market%20Street%20and%20Fremont%20Street.json?types=address&proximity=${parseFloat(
        long,
      )},${parseFloat(lat)}&access_token=${mapBox_token}`,
      requestOptions,
    )
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };

  const onclickMap = item => {
    console.log('Get ITems:::');
    setLong(item.center[0]);
    setLat(item.center[1]);
    setSearchText('');
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          width: '95%',
          marginLeft: PX(10),
          height: PX(60),
        }}
        onPress={() => onclickMap(item)}>
        <Text
          style={{
            fontSize: PX(12),
            fontFamily: 'Montserrat-Regular',
            color: '#000',
          }}>
          {item.place_name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Loader isLoding={loading} />
      <View style={{height: DeviceInfo.hasNotch() ? PX(30) : PX(10)}} />
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera
          zoomLevel={9}
          centerCoordinate={[parseFloat(long), parseFloat(lat)]}
        />

        {cafeList.length > 0 ? (
          <>
            {cafeList.map((item, index) => {
              console.log(
                'Get Map Location::::',
                parseFloat(item.longitude),
                parseFloat(item.lattitude),
              );
              return (
                <MapboxGL.PointAnnotation
                  id={item?.restaurant_name}
                  children={true}
                  onSelected={() => {
                    setSelectItem(item), setSelectVisible(true);
                  }}
                  // id={'pointAnnotation'}
                  coordinate={[
                    parseFloat(item.longitude),
                    parseFloat(item.lattitude),
                  ]}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectItem(item), setSelectVisible(true);
                    }}
                    style={{
                      width: PX(65),
                      height: PX(65),
                      borderRadius: PX(10),
                    }}>
                    <Image
                      style={{
                        width: PX(60),
                        height: PX(60),
                        borderRadius: PX(10),
                        borderWidth: 3,
                        borderColor: selectVisible ? '#F55800' : '#fff',
                      }}
                      source={{uri: item.image}}
                    />
                  </TouchableOpacity>
                </MapboxGL.PointAnnotation>
              );
            })}
          </>
        ) : null}
      </MapboxGL.MapView>

      <View
        style={{
          position: 'absolute',
          height: PX(60),
          width: '85%',
          marginTop: PX(50),
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            height: PX(50),
            width: '12%',
            borderRadius: PX(10),
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{height: PX(20), width: PX(20), resizeMode: 'contain'}}
            source={backGo}
          />
        </TouchableOpacity>
        <View
          style={{
            height: PX(50),
            width: '85%',
            borderRadius: PX(10),
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Image
            style={{height: PX(20), width: PX(20), resizeMode: 'contain'}}
            source={search}
          />
          <TextInput
            value={searchText}
            onChangeText={text => onSearch(text)}
            placeholder="search area street name"
            placeholderTextColor={'#C4C4C4'}
            style={{
              marginLeft: PX(10),
              width: '70%',
              fontSize: PX(16),
              color: '#C4C4C4',
            }}
          />
          {/* <TouchableOpacity onPress={()=>onSearch(searchText)}> */}
          <Image
            style={{
              height: PX(20),
              width: PX(20),
              resizeMode: 'contain',
              marginLeft: PX(10),
            }}
            source={addressMap}
          />
          {/* </TouchableOpacity> */}
          {searchText != '' && (
            <View
              style={{
                height: PX(300),
                width: '100%',
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: PX(45),
              }}>
              <FlatList
                data={AllData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )}
        </View>
      </View>
      {selectVisible && (
        <View
          style={{
            position: 'absolute',
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            bottom: PX(80),
          }}>
          <View
            style={{
              height: PX(125),
              width: '94%',
              borderRadius: PX(10),
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Image
              style={{
                width: PX(80),
                height: PX(80),
                borderRadius: PX(10),
                borderWidth: 2,
                borderColor: '#F55800',
              }}
              source={{uri: selectItem.image}}
            />
            <View
              style={{
                width: '50%',
                justifyContent: 'flex-start',
                marginLeft: PX(5),
              }}>
              <View style={styles.cafe1}>
                <Text style={styles.text3}>{selectItem?.restaurant_name}</Text>
              </View>
              <View style={styles.time}>
                {selectItem?.cafe_timing?.map((item1, index) => {
                  return (
                    <Text style={styles.timeText}>
                      {item1[`${day}`].time == 'custom'
                        ? `${item1[`${day}`].start} to ${moment(
                            `${item1[`${day}`].end}`,
                            'hh:mm a',
                          ).format('hh:mm a')}`
                        : item1[`${day}`].time}
                    </Text>
                  );
                })}
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.rate}>
                  <View style={styles.rate1}>
                    <Image
                      source={require('../../assets/Star.png')}
                      style={styles.src}
                    />
                    <Text style={{fontSize: PX(12), color: '#000'}}>
                      {selectItem.images[0].avg_reviews}
                    </Text>
                  </View>
                </View>
                <View style={styles.rate}>
                  <View style={styles.rate2}>
                    <Image
                      source={require('../../assets/map.png')}
                      style={styles.src}
                    />
                    <Text style={{fontSize: PX(12), color: '#000'}}>
                      {selectItem.images[0].distance}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                height: PX(80),
                justifyContent: 'flex-end',
                marginLeft: PX(8),
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('restaurant', {id: selectItem.id})
                }>
                <Image
                  style={{width: PX(30), height: PX(30), resizeMode: 'contain'}}
                  source={back1}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default index;
