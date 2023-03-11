import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {PX} from '../pixel';
import DeviceInfo from 'react-native-device-info';
import styles from './styles';
import {onCardPointApi, onDealListApi} from '../../Config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import demoBG from '../../assets/demoBG.png';
import demoBG1 from '../../assets/demoBG1.png';

const index = ({navigation}) => {
  const [Confirm, setConfirm] = useState('');
  const [Password, setPassword] = useState('');
  const [NewPass, setNewPass] = useState('');
  const [Points, setPoints] = useState('');
  const [convertedPrice, setConvertedPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [DealList, setDealList] = useState([]);
  const [dayDealList, setDayDealList] = useState([]);
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

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      onCardPointList();
      getDealList();
    });
  }, []);

  const getDealList = async () => {
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
        setDealList(response.data.grab_best_deals);
      }
    } catch (err) {
      setLoading(false);
      alert('Server issue.');
    }
  };

  const onCardPointList = async () => {
    try {
      setLoading(true);
      const id1 = await AsyncStorage.getItem('id');

      const id = encodeURIComponent(id1);
      const requestBody = `id=${id}`;

      const response = await onCardPointApi(requestBody);
      console.log('Get Api Response:::', response);
      if (!response.sucecess) {
        setLoading(false);
      } else {
        setLoading(false);
        setPoints(response?.data?.total_point);
        setConvertedPrice(response?.data?.converted_point);
      }
    } catch (err) {
      setLoading(false);
      console.log('GEt Error:::', err);
    }
  };

  const renderItem2 = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.Image}
        onPress={() => navigation.navigate('singleReward', {data: item})}>
        {/* <Image
                      source={item.img}
                      style={{ width: PX(230), height: PX(227) }}
                      resizeMode="contain"
                    /> */}
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
          style={{width: PX(50), height: PX(50), justifyContent: 'center'}}
          onPress={() => {
            navigation.navigate('HomeStack');
          }}>
          <Image
            source={require('../../assets/backGo.png')}
            style={styles.back}
          />
        </TouchableOpacity>

        <View>
          <Text style={styles.headerText2}>Rewards</Text>
        </View>
        <TouchableOpacity
          style={{
            width: PX(50),
            height: PX(50),
            justifyContent: 'center',
          }}></TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{paddingBottom: PX(150)}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.mainView}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('rewardHistory');
            }}
            style={{justifyContent: 'center', alignItems: 'center'}}>
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
                {parseFloat(Points)}
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

          <View style={{paddingTop: PX(40), paddingLeft: '5%'}}>
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
                      {/* <Text style={{
                        fontSize:PX(17),
                        color:'#fff',
                        fontFamily: 'Montserrat-Regular',
                        marginHorizontal:PX(20)
                        
                      }}>+</Text>
                    <View style={{
                        height:PX(30),
                        width:PX(70),
                        backgroundColor:'#F55800',
                        borderRadius:PX(20),
                        alignItems:'center',
                        justifyContent:'center'

                      }}>
                      <Text style={{
                        fontSize:PX(14),
                        color:'#fff',
                        fontFamily: 'Montserrat-Regular',
                        
                      }}>{item.pts_two} pts</Text>
                    </View> */}
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            horizontal
          />

          <View style={{paddingTop: '1%', paddingLeft: '5%'}}>
            <Text
              style={{
                fontSize: PX(18),
                color: '#000',
                fontFamily: 'Montserrat-Medium',
              }}>
              Grab best deals
            </Text>
          </View>
          <View style={{height: '35%', paddingTop: '5%'}}>
            <FlatList
              data={DealList}
              renderItem={renderItem2}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              horizontal
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default index;
