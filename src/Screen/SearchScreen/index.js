import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {PX} from '../pixel';
import DeviceInfo from 'react-native-device-info';
import styles from './styles';
import {cafeListApi} from '../../Config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loader} from '../../Navigation/loader';
import GetLocation from 'react-native-get-location';
import {useSelector} from 'react-redux';
import {addItem} from '../../redux/reducer';
import {useDispatch} from 'react-redux';

const Arrays = [
  {
    name: 'Resto Cafe',
    des: 'North Carolina',
    meter: '1.2 kms away',
  },
  {
    name: 'Coffee Roaster',
    des: 'New Jersey',
    meter: '5.3 kms away',
  },
  {
    name: 'Vanilla Cappuccino',
    des: 'Beverages',
  },
  {
    name: 'The Coffee Bean',
    des: 'New Jersey',
    meter: '7.1 kms away',
  },
  {
    name: 'Hammus Sandwich',
    des: 'Dish',
  },
  {
    name: 'Cafe Oktopus',
    des: 'New York',
    meter: '12.5 kms away',
  },
  {
    name: 'The Light Cafe',
    des: 'New York',
    meter: '14.5 kms away',
  },
];

const SearchScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const listItems = useSelector(state => state.itemList);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [cafeList, setCafeList] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      getAllDatas();
    });
  }, []);

  const getAllDatas = async () => {
    setTimeout(() => {
      // getCurrentLocation()

      if (listItems.length > 0) {
        setCafeList(listItems);
        setMasterDataSource(listItems);
        console.log('Get data::::', listItems.length);
      } else {
        getCurrentLocation();
      }
    }, 500);
  };

  // useEffect(()=>{
  //   const subscribe=navigation.addListener('focus',()=>{
  //     if(page!=0){
  //     allData()
  //     }
  //   })

  // },[page])

  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.restaurant_name
          ? item.restaurant_name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setCafeList(newData);
      setSearch(text);
    } else {
      setCafeList(masterDataSource);
      setSearch(text);
    }
  };

  const getCurrentLocation = () => {
    setLoading(true);
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

  const allData = async () => {
    setLoading(true);
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
        getCafeList1(location.latitude, location.longitude);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  const getCafeList1 = async (lat, long) => {
    try {
      const id1 = await AsyncStorage.getItem('id');

      const id = encodeURIComponent(id1);
      const lattitude = encodeURIComponent(lat);
      const longitude = encodeURIComponent(long);
      const requestBody = `id=${id}&lattitude=${lattitude}&longitude=${longitude}&start=${
        page + 1
      }`;
      console.log('Get Data:::', page);
      const response = await cafeListApi(requestBody);
      setLoading(false);
      console.log('Get Api Response:::', response);
      if (!response.sucecess) {
        setLoading(false);
        alert(response.message);
      } else {
        setLoading(false);
        setCafeList(prevData => [...prevData, ...response.data]);
        setMasterDataSource(prevData => [...prevData, ...response.data]);
        //  cafeList.push(response.data)
        //  masterDataSource.push(response.data)
      }
    } catch (err) {
      setLoading(false);
      alert('Server issue.');
    }
  };

  const getCafeList = async (lat, long) => {
    try {
      const id1 = await AsyncStorage.getItem('id');

      const id = encodeURIComponent(id1);
      const lattitude = encodeURIComponent(lat);
      const longitude = encodeURIComponent(long);
      const requestBody = `id=${id}&lattitude=${lattitude}&longitude=${longitude}`;

      const response = await cafeListApi(requestBody);
      setLoading(false);
      console.log('Get Api Response:::', response);
      if (!response.sucecess) {
        setLoading(false);
        alert(response.message);
      } else {
        setLoading(false);
        dispatch(addItem(response.data));
        
       let datas= response.data.sort((a, b) =>  a.images[0].distance - b.images[0].distance)
        setMasterDataSource(datas);
        setCafeList(datas);
      }
    } catch (err) {
      setLoading(false);
      alert('Server issue.',err);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('restaurant', {id: item.id})}
        style={{
          width: '90%',
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingVertical: PX(8),
        }}>
        <Image
          source={{uri: item?.image}}
          style={{width: PX(70), height: PX(70), borderRadius: PX(10)}}
        />
        <View style={{marginLeft: PX(20)}}>
          <Text
            style={{
              fontSize: PX(13),
              fontFamily: 'Montserrat-Bold',
              color: '#2D2D2D',
            }}>
            {item.restaurant_name}
          </Text>
          {item.about != '' && (
            <Text
              style={{
                fontSize: PX(13),
                fontFamily: 'Montserrat-Regular',
                color: '#848484',
                paddingTop: PX(3),
                width: '25%',
              }}
              numberOfLines={2}>
              {item.about}
            </Text>
          )}
          <Text
            style={{
              fontSize: PX(13),
              fontFamily: 'Montserrat-Regular',
              color: '#F55800',
            }}>
            {item?.images[0]?.distance} away
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const loadMoreCommit = () => {
    setPage(page + 1);
    console.log('Get Data:::', page);
    allData();
  };

  return (
    <View style={styles.main2}>
      <View style={{height: DeviceInfo.hasNotch() ? PX(30) : PX(10)}} />
      <Loader
        isLoding={loading}
        backButton={true}
        backOnPress={() => {
          navigation.navigate('HomeStack');
        }}
      />
      <View style={styles.header1}>
        <View style={{width:'4%'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('HomeStack');
            }}>
              {!loading&&
            <Image
              source={require('../../assets/backGo.png')}
              style={[styles.back,{tintColor:loading?'#fff':'#000'}]}
            />
              }
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginLeft: PX(30),
            flexDirection: 'row',
            alignItems: 'center',
            width: '85%',
            borderColor: '#F4F4F4',
            borderWidth: 2,
            height: PX(50),
            borderRadius: PX(10),
            paddingLeft: PX(15),
          }}>
          <Image
            source={require('../../assets/serch.png')}
            style={{
              width: PX(30),
              height: PX(20),
              resizeMode: 'contain',
              tintColor: '#C4C4C4',
            }}
          />
          <TextInput
            placeholder="search cafe, products"
            placeholderTextColor={'#C4C4C4'}
            value={search}
            onChangeText={text => {
              searchFilterFunction(text);
            }}
            style={{marginLeft: PX(15), fontSize: PX(16), color: '#000',width:'80%'}}
          />
        </View>
      </View>

      <View style={{width: '100%'}}>
        <FlatList
          data={cafeList}
          keyExtractor={(item, index) => index.toString()}
          extraData={cafeList}
          // onEndReached={loadMoreCommit}
          renderItem={renderItem}
          contentContainerStyle={{paddingBottom: PX(250)}}
        />
      </View>
    </View>
  );
};
export default SearchScreen;
