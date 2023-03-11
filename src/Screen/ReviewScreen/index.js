import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {PX} from '../pixel';
import DeviceInfo from 'react-native-device-info';
import styles from './styles';
import {WebView} from 'react-native-webview';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {GetRatingListApi} from '../../Config/api';
import {Loader} from '../../Navigation/loader';
import moment from 'moment';

const review = [
  {
    name: 'jitubhai',
    rate: 5,
    date: '19 february, 2022',
    comment: 'Testing purpose comment.',
  },
  {
    name: 'jitubhai',
    rate: 5,
    date: '19 february, 2022',
    comment: 'Testing purpose comment.',
  },
];

const index = ({navigation, route}) => {
  const [ratingList, setRatingList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      onRatingList();
    });
  }, []);

  const onRatingList = async () => {
    try {
      console.log('Get IDLLLLLL', route.params.id);
      const id1 = encodeURIComponent(route.params.id);
      const requestBody = `restaurant_id=${id1}`;

      const response = await GetRatingListApi(requestBody);
      console.log('Get Api Response:::123', response.data);
      if (!response.sucecess) {
        setLoading(false);
        alert(response.message);
      } else {
        setLoading(false);
        setRatingList(response.data);
      }
    } catch (err) {
      console.log('Get Error::', err);
      setLoading(false);
      alert('Server issue.');
    }
  };

  const renderItem2 = ({item, index}) => {
    return (
      <View
        style={{
          width: '94%',
          justifyContent: 'center',
          paddingVertical: PX(10),
          paddingHorizontal: PX(15),
          marginTop: PX(20),
          height: PX(120),
          alignSelf: 'center',
          backgroundColor: '#fff',
          borderRadius: PX(7),
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: PX(16),
              fontFamily: 'Montserrat-Medium',
              color: '#000',
            }}>
            {item.cust_info[0].name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: PX(13),
          }}>
          <Rating
            type="star"
            ratingCount={5}
            imageSize={15}
            startingValue={item.rate}
            readonly
          />
          <Text
            style={{
              fontSize: PX(13),
              fontFamily: 'Montserrat-Regular',
              color: '#000',
            }}>
            {moment(item.createdAt).format('DD MMM, YYYY')}
          </Text>
        </View>
        <Text
          style={{
            fontSize: PX(15),
            fontFamily: 'Montserrat-Regular',
            color: '#000',
          }}>
          {item.comment}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <View
        style={{
          height: DeviceInfo.hasNotch() ? PX(30) : PX(10),
          backgroundColor: '#fff',
          width: '100%',
        }}
      />
      <Loader isLoding={loading} />
      <View style={styles.header}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={require('../../assets/backGo.png')}
              style={styles.back}
            />
          </TouchableOpacity>
        </View>
        <View style={{paddingLeft: PX(70)}}>
          <Text style={styles.headerText}>Rating and Reviews</Text>
        </View>
      </View>
      <View style={styles.header1}>
        <FlatList
          data={ratingList}
          renderItem={renderItem2}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: PX(170)}}
        />
      </View>
    </View>
  );
};

export default index;
