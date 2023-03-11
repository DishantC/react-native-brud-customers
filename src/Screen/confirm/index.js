import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {PX} from '../pixel';
import DeviceInfo from 'react-native-device-info';
import styles from './styles';
import StepIndicator from 'react-native-step-indicator';
import {ScrollView} from 'react-native-gesture-handler';
import {cafeDetailsApi, GetRatingListApi} from '../../Config/api';
const {width, height} = Dimensions.get('screen');
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 25,
  separatorStrokeWidth: 1,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#C3C3C3',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#C3C3C3',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#C3C3C3',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#C3C3C3',
  stepIndicatorCurrentColor: '#C3C3C3',
  currentStepLabelColor: '#fe7013',
};
const index = ({navigation, route}) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resName, setResName] = useState('');
  const [image, setImage] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      onCurrentPosition();
      onCafeDetails();
    });
  }, []);

  const onCafeDetails = async () => {
    try {
      setLoading(true);
      // const id1= await AsyncStorage.getItem('id')
      console.log('Get IDLLLLLL', route.params.res_id);
      const id1 = encodeURIComponent(route.params.res_id);

      const requestBody = `id=${id1}`;

      const response = await cafeDetailsApi(requestBody);
      console.log('Get Api Response:::', response.distance);
      if (!response.sucecess) {
        setLoading(false);
        alert(response.message);
      } else {
        setLoading(false);
        setResName(response.data.restaurant_name);
        setImage(response.data.image);
        setNumber(response.data.id);
      }
    } catch (err) {
      console.log('Get Error::', err);
      setLoading(false);
      alert('Server issue.');
    }
  };

  const onCurrentPosition = async () => {
    if (route.params?.status == 1) {
      setCurrentPosition(1);
    } else if (route.params?.status == 4) {
      setCurrentPosition(2);
    } else if (route.params?.status == 5) {
      setCurrentPosition(3);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: PX(100)}}
      showsVerticalScrollIndicator={false}>
      <View style={styles.main}>
        <View
          style={{
            height: DeviceInfo.hasNotch() ? PX(30) : PX(10),
            backgroundColor: 'white',
            width: '100%',
          }}
        />
        <View style={styles.header1}>
          {/* <View style={{width: '10%'}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('TabStack');
              }}>
              <Image
                source={require('../../assets/backGo.png')}
                style={styles.back}
              />
            </TouchableOpacity>
          </View> */}

          <Text
            style={{
              fontSize: PX(21),
              color: '#000',
              fontFamily: 'Montserrat-Bold',
            }}>
            Order Confirm
          </Text>

          {/* <View
            style={{
              width: '15%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          /> */}
        </View>
        <Image
          source={require('../../assets/processing.png')}
          style={{width: PX(417), height: PX(200)}}
        />
        <View
          style={{
            width: '100%',
            backgroundColor: '#FBFBFB',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: PX(21),
              color: '#000',
              fontFamily: 'Montserrat-SemiBold',
              paddingTop: '10%',
            }}>
            Order Confirmed
          </Text>
          <Text
            style={{
              fontSize: PX(15),
              color: '#000',
              fontFamily: 'Montserrat-Regular',
              paddingTop: '6%',
            }}>
            Your order will be ready in 7 Minutes
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            height: '41%',
            borderTopLeftRadius: PX(20),
            borderTopRightRadius: PX(20),
            backgroundColor: '#FBFBFB',
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: '15%',
              height: '71%',
              margin: '5%',
              elevation: PX(10),
            }}>
            <StepIndicator
              customStyles={customStyles}
              currentPosition={currentPosition}
              direction="vertical"
              stepCount={3}
              renderStepIndicator={({position, stepstatus}) => (
                <Image
                  source={require('../../assets/items/done_24px.png')}
                  style={{width: PX(12.59), height: PX(9.43)}}
                />
              )}
            />
          </View>
          <View style={{width: '60%'}}>
            <Text
              style={{
                fontSize: PX(18),
                color: '#000',
                fontFamily: 'Montserrat-Bold',
                paddingTop: '17%',
              }}>
              Order Placed
            </Text>
            <Text
              style={{
                fontSize: PX(14),
                color: '#7E7B7B',
                fontFamily: 'Montserrat-Regular',
                marginTop: PX(4),
              }}>
              Your order has been placed
            </Text>

            <Text
              style={{
                fontSize: PX(18),
                color: '#000',
                fontFamily: 'Montserrat-Bold',
                paddingTop: PX(28),
              }}>
              Order Preparing
            </Text>
            <Text
              style={{
                fontSize: PX(14),
                color: '#7E7B7B',
                fontFamily: 'Montserrat-Regular',
                marginTop: PX(4),
              }}>
              Your order will be served soon
            </Text>

            <Text
              style={{
                fontSize: PX(18),
                color: '#000',
                fontFamily: 'Montserrat-Bold',
                paddingTop: PX(28),
              }}>
              Delivered
            </Text>
            <Text
              style={{
                fontSize: PX(14),
                color: '#7E7B7B',
                fontFamily: 'Montserrat-Regular',
                marginTop: PX(4),
              }}>
              Enjoy you order
            </Text>
          </View>
          
        </View>
        <View style={{
          width:'100%',
          backgroundColor:"#fff",
          alignItems:'center',
          justifyContent:'center',
          paddingBottom:PX(20)
        }}>
        <TouchableOpacity style={{
          width:"90%",
          height:PX(45),
          backgroundColor:"#F55800",
          alignItems:'center',
          justifyContent:'center',
          borderRadius:PX(30)
        }} onPress={() => {
          navigation.navigate('TabStack');
        }}>
          <Text style={{
                fontSize: PX(15),
                color: '#fff',
                fontFamily: 'Montserrat-Bold',
              }}>Back to Home</Text>
        </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            height: '10%',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F55800',
          }}>
          <View
            style={{
              width: '20%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{uri: image}}
              style={{width: PX(36), height: PX(36), borderRadius: PX(36)}}
            />
          </View>
          <View style={{width: '50%'}}>
            <Text
              style={{
                fontSize: PX(13),
                color: '#fff',
                fontFamily: 'Montserrat-Bold',
              }}>
              {resName}
            </Text>
            <Text
              style={{
                fontSize: PX(10),
                color: '#fff',
                fontFamily: 'Montserrat-Medium',
              }}>
              Id- {number}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default index;
