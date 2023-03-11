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
import {onNotificationApi} from '../../Config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loader} from '../../Navigation/loader';
import moment from 'moment';

const index = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      onNotifications();
      console.log('Get Reposne notification dAta:::');
    });
  }, []);

  const onNotifications = async () => {
    try {
      setLoading(true);
      const id1 = await AsyncStorage.getItem('id');
      const customer_id = encodeURIComponent(id1);

      const requestBody = `customer_id=${customer_id}`;

      const listCart = await onNotificationApi(requestBody);
      console.log('Get Reposne notification dAta:::', listCart.data);
      if (listCart.sucecess) {
        setLoading(false);
        setNotificationList(listCart.data);
      } else {
        setLoading(false);
        alert(listCart?.message);
      }
    } catch (err) {
      setLoading(false);
      console.log('Get ISsue ::', err);
      alert('Server issue.');
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.view}>
        <TouchableOpacity style={styles.btn}>
          <View style={styles.icon}>
            <Image
              source={require('../../assets/placed.png')}
              style={styles.imageIcon}
            />
          </View>

          <View style={{width: '88%', marginLeft: PX(10)}}>
            <Text style={styles.text}>{item.title}</Text>
            <View style={{paddingTop: PX(8)}}>
              <Text style={styles.textTime}>
                {moment(item.createdAt).format('DD MMM YYYY | hh:mm a')}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        {/* <View style={styles.green} /> */}
      </View>
    );
  };

  return (
    <View style={styles.main2}>
      <View style={{height: DeviceInfo.hasNotch() ? PX(30) : PX(10)}} />
      <View
        style={{
          position: 'absolute',
          top: DeviceInfo.hasNotch() ? PX(50) : PX(35),
          left: PX(25),
        }}></View>
      <View style={styles.header1}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('HomeStack');
          }}>
          <Image
            source={require('../../assets/backGo.png')}
            style={styles.back}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerText2}>Notifications</Text>
        </View>
        <TouchableOpacity>
          <Image style={styles.back} />
        </TouchableOpacity>
      </View>

      <View style={styles.mainView}>
        {notificationList.length > 0 ? (
          <FlatList
            data={notificationList}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{paddingBottom: PX(100)}}
            showsVerticalScrollIndicator={false}
            bounces={false}
          />
        ) : (
          <Text style={styles.headerText1}>You have no new messages</Text>
        )}
      </View>
    </View>
  );
};

export default index;
