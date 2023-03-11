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
import {onRewardHistoryApi} from '../../Config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loader} from '../../Navigation/loader';
import moment from 'moment';
import AlertPopup from '../../Components/AlertPopup';

const index = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [rewardHistory, setRewardHistory] = useState([]);
  const [totalPoint, setTotalPoint] = useState('');
  const [alertPopup, setAlertPopup] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const deals = [
    {
      name: 'Sunday special offer',
      many: '+250 pts',
      dateTime: '15 Aug 2021 | 04:15 PM',
    },
    {
      name: 'Coffee break',
      many: '+100 pts',
      dateTime: '10 Aug 2021 | 02:20 PM',
    },
    {
      name: 'Good coffee day',
      many: '+150 pts',
      dateTime: '01 Aug 2021 | 01:18 PM',
    },
    {
      name: 'Deal of the day',
      many: '+180 pts',
      dateTime: '18 july 2021 | 04:15 PM',
    },
    {
      name: 'Combo offer',
      many: '+250 pts',
      dateTime: '05 july 2021 | 04:15 PM',
    },
  ];

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      onRewardHistory();
    });
  }, []);

  const onRewardHistory = async () => {
    try {
      setLoading(true);
      const id1 = await AsyncStorage.getItem('id');
      const customer_id = encodeURIComponent(id1);

      const requestBody = `customer_id=${customer_id}`;

      const listcart = await onRewardHistoryApi(requestBody);
      console.log('Get Reposne dAta:::', listcart);
      if (listcart.sucecess) {
        setLoading(false);
        setRewardHistory(listcart.data.reverse());
        setTotalPoint(listcart.point?.total_point);
      } else {
        setLoading(false);
        alert(listcart?.message);
      }
    } catch (err) {
      setLoading(false);
      console.log('Get ISsue ::', err);
      alert('Server issue.');
    }
  };

  const renderItem2 = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.Image}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: '5%',
            borderBottomWidth: 2,
            width: '100%',
            borderColor: '#E5E5E5',
          }}>
          <View style={{width: '73%'}}>
            <Text
              style={{
                fontSize: PX(15),
                color: '#000',
                fontFamily: 'Montserrat-Regular',
              }}
              numberOfLines={2}>
              {item.desc}
            </Text>
            <Text
              style={{
                fontSize: PX(11),
                paddingTop: PX(15),
                color: '#848484',
                fontFamily: 'Montserrat-Regular',
              }}>
              {moment(item.createdAt).format('DD MMM YYYY | hh:mm a')}
            </Text>
          </View>

          <Text
            style={{
              width: '27%',
              textAlign: 'right',
              fontSize: PX(15),
              color: item.type == 'add' ? 'green' : '#F55800',
              fontFamily: 'Montserrat-Regular',
            }}>
            {item.type == 'add'
              ? `+ ${parseInt(item.point)}`
              : `- ${parseInt(item.point)}`}{' '}
            pts
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.main2}>
      <View style={{height: DeviceInfo.hasNotch() ? PX(30) : PX(10)}} />
      <Loader isLoding={loading} />
      <View style={styles.header1}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack()
            

            }}>
            <Image
              source={require('../../assets/backGo.png')}
              style={styles.back}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.headerText2}>Rewards History</Text>
        </View>
        <TouchableOpacity
          style={{
            width: PX(10),
            justifyContent: 'center',
          }}></TouchableOpacity>
      </View>

      <View style={styles.mainView}>
        <View style={styles.deal1}>
          <Image
            source={require('../../assets/redeem.png')}
            style={styles.redeem}
          />
          <View style={{position: 'absolute', top: PX(50)}}>
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
              top: PX(70),
              height: PX(35),
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
              {loading?0: parseInt(totalPoint)}
            </Text>
          </View>
          <TouchableOpacity
          activeOpacity={1}
            style={{
              position: 'absolute',
              bottom: PX(8),
              height: PX(40),
              backgroundColor: '#051821',
              width: PX(130),
              alignItems: 'center',
              justifyContent: 'center',
            }} onPress={()=>{setAlertPopup(true),setAlertMessage('Add items to cart to redeem rewards points. Every 100 points earns you $1 towards your shopping cart.')}}>
            <Text
              style={{
                color: '#fff',
                fontSize: PX(16),
                fontFamily: 'Montserrat-Bold',
              }}>
              {`REDEEM NOW`}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{width: '90%', alignSelf: 'center', paddingTop: '8%'}}>
          <Text
            style={{
              fontSize: PX(18),
              color: '#000',
              fontFamily: 'Montserrat-SemiBold',
            }}>
            History Reward
          </Text>
        </View>

        <View
          style={{
            height: '60%',
            paddingTop: '5%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {rewardHistory.length > 0 ? (
            <FlatList
              data={rewardHistory}
              renderItem={renderItem2}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{paddingBottom: PX(100)}}
              showsVerticalScrollIndicator={false}
              bounces={false}
            />
          ) : (
            <View style={{height: '90%', width: '90%'}}>
              <Text
                style={{
                  fontSize: PX(16),
                  textAlign: 'center',
                  color: '#000',
                  fontFamily: 'Montserrat-Medium',
                }}>
                No points earned yet. Grab a coffee or some food to start
                earning points
              </Text>
            </View>
          )}
        </View>
      </View>
      {alertPopup && (
        <AlertPopup
          modalVisible={alertPopup}
          onRequestClose={() => {
            setAlertPopup(false);
          }}
          title={'Rewards'}
          message={alertMessage}
        />
      )}
    </View>
  );
};

export default index;
