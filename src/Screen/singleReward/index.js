import React, {useState} from 'react';
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
import demoBG1 from '../../assets/demoBG1.png';

const index = ({navigation, route}) => {
  const [Confirm, setConfirm] = useState('');
  const [Password, setPassword] = useState('');
  const [NewPass, setNewPass] = useState('');
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

  const renderItem2 = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.Image}>
        <Image
          source={item.img}
          style={{width: PX(230), height: PX(227)}}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.main2}>
      <View style={{height: DeviceInfo.hasNotch() ? PX(30) : PX(10)}} />
      <View style={styles.header1}>
        <View>
          <TouchableOpacity
            style={{width: PX(50), height: PX(50), justifyContent: 'center'}}
            onPress={() => {
              navigation.navigate('TabStack');
            }}>
            <Image
              source={require('../../assets/backGo.png')}
              style={styles.back}
            />
          </TouchableOpacity>
        </View>
        <View style={{paddingLeft: PX(100)}}>
          <Text style={styles.headerText2}>Deal</Text>
        </View>
      </View>

      <View style={styles.mainView}>
        <View style={styles.deal1}>
          <ImageBackground source={demoBG1} style={styles.deal}>
            <Text
              numberOfLines={2}
              style={{
                fontSize: PX(26),
                color: '#fff',
                fontFamily: 'Montserrat-Bold',
                marginTop: PX(20),
                width: '70%',
                paddingLeft: PX(15),
              }}>
              {route.params?.data.title}
            </Text>
            <Text
              numberOfLines={2}
              style={{
                fontSize: PX(13),
                color: '#fff',
                fontFamily: 'Montserrat-Regular',
                marginTop: PX(10),
                width: '90%',
                paddingLeft: PX(15),
              }}>
              {route.params?.data.short_desc}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: PX(50),
                marginTop: PX(15),
                paddingLeft: PX(15),
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
                  {route.params?.data.pts_one} pts
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <ScrollView
          style={{width: '85%'}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: PX(300)}}>
          <Text
            style={{
              paddingTop: '5%',
              fontSize: PX(18),
              fontFamily: 'Montserrat-Medium',
              color: '#000',
              paddingTop: PX(40),
            }}>
            Description
          </Text>
          <Text
            style={{
              textAlign: 'justify',
              fontSize: PX(12),
              marginTop: PX(15),
              color: '#848484',
              fontFamily: 'Montserrat-Regular',
              lineHeight: PX(19),
            }}>
            {route.params?.data.description}
          </Text>

          <Text
            style={{
              fontSize: PX(18),
              fontFamily: 'Montserrat-Medium',
              paddingTop: PX(35),
              color: '#000',
            }}>
            Terms and conditions
          </Text>

          <Text
            style={{
              fontSize: PX(12),
              textAlign: 'justify',
              paddingRight: '5%',
              color: '#848484',
              fontFamily: 'Montserrat-Regular',
              marginTop: PX(15),
              lineHeight: PX(19),
            }}>
            {route.params?.data?.terms_conditions}
          </Text>

          {/* <Text
            style={{
              fontSize: PX(12),
              textAlign: 'justify',
              paddingRight: '5%',
              color: '#000',
              fontFamily: 'Montserrat-Regular',
            }}
            numberOfLines={3}>
            <Text
              style={{
                color: '#C4C4C4',
                fontSize: PX(20),
              }}>
              {'\u2022'}
            </Text>
            {'  '}
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </Text> */}
        </ScrollView>
      </View>
    </View>
  );
};

export default index;
