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
  ImageBackground,
  Modal,
} from 'react-native';
import {PX} from '../pixel';
import DeviceInfo from 'react-native-device-info';
import styles from './styles';
import {cafeDetailsApi, GetRatingListApi} from '../../Config/api';
import {Loader} from '../../Navigation/loader';
import GetLocation from 'react-native-get-location';
import {Rating, AirbnbRating} from 'react-native-ratings';
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

const restaurant = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [resName, setResName] = useState('');
  const [image, setImage] = useState('');
  const [number, setNumber] = useState('');
  const [about, setAbout] = useState('');
  const [id, setId] = useState('');
  const [images, setImages] = useState([]);
  const [distance, setDistance] = useState('');
  const [totalReview, setTotalReview] = useState('');
  const [avgReview, setAvgReview] = useState('');
  const [ratingList, setRatingList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  // useEffect(()=>{
  //   const subscribe=navigation.addListener('focus',()=>{
  //     onCafeDetails()
  //   })

  // },[])

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      getCurrentLocation();
      onRatingList();
    });
  }, []);
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
        onCafeDetails(location.latitude, location.longitude);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  const onRatingList = async () => {
    try {
      console.log('Get IDLLLLLL', route.params.id);
      const id1 = encodeURIComponent(route.params.id);
      const requestBody = `restaurant_id=${id1}`;

      const response = await GetRatingListApi(requestBody);
      console.log('Get Api Response:::123', response.data);
      if (!response.sucecess) {
        //  setLoading(false)
        alert(response.message);
      } else {
        //  setLoading(false)
        setRatingList(response.data);
      }
    } catch (err) {
      console.log('Get Error::', err);
      // setLoading(false)
      alert('Server issue.');
    }
  };

  const onCafeDetails = async (lat, long) => {
    try {
      // const id1= await AsyncStorage.getItem('id')
      console.log('Get IDLLLLLL', route.params.id);
      const id1 = encodeURIComponent(route.params.id);
      const lattitude = encodeURIComponent(lat);
      const longitude = encodeURIComponent(long);
      const requestBody = `id=${id1}&lattitude=${lattitude}&longitude=${longitude}`;

      const response = await cafeDetailsApi(requestBody);
      console.log('Get Api Response:::', response.distance);
      if (!response.sucecess) {
        setLoading(false);
        alert(response.message);
      } else {
        setLoading(false);
        setResName(response.data.restaurant_name);
        setImage(response.data.image);
        let num = response.data.phone_number.replace('-', '');
        let num1 = num.replace('(', '');
        let num2 = num1.replace(')', '');
        let num3 = num2.replace('-', '');

        console.log('Get Numbers:::', num3);
        let newText = '';
        let cleaned = ('' + num3).replace(/\D/g, '');
        for (var i = 0; i < cleaned.length; i++) {
          if (i == 3) {
            newText = newText + '-';
          } else if (i == 6) {
            newText = newText + '-';
          }
          newText = newText + cleaned[i];
        }
        setNumber(newText);
        setAbout(response.data.about);
        setId(response.data.id);
        console.log('Get Numbers:::', response.data.images);
        setImages(response.data.images);
        setDistance(response.distance);
        setTotalReview(response.dataRate.total_reviews);
        setAvgReview(response.dataRate.avg_reviews);
      }
    } catch (err) {
      console.log('Get Error::', err);
      setLoading(false);
      alert('Server issue.');
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.Image}>
        <Image
          source={item.img}
          style={{width: PX(15), height: PX(15), resizeMode: 'contain'}}
        />
      </View>
    );
  };
  const renderItem1 = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.Image}
        onPress={() => {
          setSelectedImage(item), setModalVisible(true);
        }}>
        <Image
          source={{uri: item}}
          style={{
            width: PX(70),
            height: PX(70),
            borderRadius: PX(7),
            marginLeft: PX(7),
          }}
        />
      </TouchableOpacity>
    );
  };

  const renderItem2 = ({item, index}) => {
    if (index < 3) {
      return (
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            paddingVertical: PX(10),
            paddingHorizontal: PX(10),
            marginTop: PX(10),
            height: PX(120),
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
    }
  };

  return (
    <View style={styles.main2}>
      <View
        style={{
          height: DeviceInfo.hasNotch() ? PX(30) : PX(10),
          backgroundColor: '#000',
          width: '100%',
        }}
      />
      <Loader isLoding={loading} />
      <View
        style={{width: '95%', justifyContent: 'center', alignItems: 'center'}}>
        <ImageBackground
          source={
            image == '' ? require('../../assets/restaurant.png') : {uri: image}
          }
          style={{width: PX(470), height: PX(480)}}>
          <View
            style={{
              top: '5%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: '10%',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                width: PX(52),
                height: PX(52),
                backgroundColor: '#ffffff',
                borderRadius: PX(15),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/backGo.png')}
                style={{width: PX(12.23), height: PX(21)}}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '60%',
          backgroundColor: '#fff',
          borderTopRightRadius: PX(50),
          borderTopLeftRadius: PX(50),
          bottom: 0,
        }}>
        <ScrollView
          contentContainerStyle={{paddingBottom: PX(90)}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              justifyContent: 'space-between',
              paddingTop: PX(25),
              marginLeft: PX(25),
            }}>
            <Text
              style={{
                fontSize: PX(21),
                color: '#051821',
                fontFamily: 'Montserrat-SemiBold',
              }}>
              {resName}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '85%',
              justifyContent: 'space-between',
              alignItems: 'center',
              alignSelf: 'center',
              paddingTop: PX(20),
            }}>
            <View style={{width: '48%'}}>
              <View
                style={{
                  width: '89%',
                  flexDirection: 'row',
                  paddingRight: '10%',
                }}>
                <Rating
                  type="star"
                  ratingCount={5}
                  imageSize={13}
                  // showRating
                  startingValue={avgReview}
                  readonly
                  // onFinishRating={(rate)=>ratingCompleted(rate)}
                />
                <Text
                  style={{
                    fontSize: PX(13),
                    paddingLeft: PX(10),
                    color: '#2D2D2D',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {avgReview==0?'' :avgReview}
                </Text>
              </View>
              <View style={{width: '60%', marginTop: PX(10)}}>
                <Text
                  style={{
                    fontSize: PX(12),
                    // paddingLeft: '5%',
                    paddingBottom: '10%',
                    color: '#848484',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {totalReview==0?'No reviews yet' :`${totalReview} reviews`}
                </Text>
              </View>
            </View>

            <View
              style={{
                width: PX(3),
                height: PX(50),
                backgroundColor: '#F5F4F3',
                // marginLeft: -PX(40),
              }}></View>
            <View style={{width: '48%', paddingLeft: PX(35)}}>
              <View style={{flexDirection: 'row', marginTop: PX(10)}}>
                <Image
                  source={require('../../assets/send.png')}
                  style={{width: PX(12.27), height: PX(12.25)}}
                />
                <Text
                  style={{
                    fontSize: PX(12),
                    color: '#000',
                    fontFamily: 'Montserrat-Medium',
                    marginLeft: PX(10),
                  }}>
                  {distance}
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: PX(10)}}>
                <Image
                  source={require('../../assets/call.png')}
                  style={{
                    width: PX(12.97),
                    height: PX(13),
                    paddingBottom: '5%',
                  }}
                />
                <Text
                  style={{
                    fontSize: PX(12),
                    // paddingLeft: '5%',
                    paddingBottom: '5%',
                    marginLeft: PX(10),
                    color: '#000',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {number}
                </Text>
              </View>
            </View>
          </View>
          {/* <View
          style={{
            flexDirection: 'row',
            width: '90%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '3%',
          }}>
           <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../../assets/send.png')}
              style={{width: PX(12.27), height: PX(12.25)}}
            />
            <Text
              style={{
                fontSize: PX(12),
                color: '#000',
                fontFamily: 'Montserrat-Medium',
                paddingLeft: '5%',
              }}>
              {distance}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../../assets/call.png')}
              style={{width: PX(12.97), height: PX(13), paddingBottom: '5%'}}
            />
            <Text
              style={{
                fontSize: PX(12),
                paddingLeft: '5%',
                paddingBottom: '5%',
                color: '#000',
                fontFamily: 'Montserrat-Medium',
              }}>
              {number}
            </Text>
          </View>
        </View> */}

          <View
            style={{
              width: '87%',
              borderWidth: PX(1),
              borderColor: '#F5F4F3',
              alignItems: 'center',
              marginLeft: '6%',
            }}
          />
          <View
            style={{
              marginLeft: PX(30),
              paddingVertical: PX(15),
            }}>
            <Text
              style={{
                fontSize: PX(18),
                fontFamily: 'Montserrat-SemiBold',
                color: '#000',
                textAlign: 'left',
              }}>
              About
            </Text>
          </View>
          <View style={{marginHorizontal: PX(30), justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: PX(12),
                textAlign: 'justify',
                color: '#636363',
                // paddingHorizontal: '9%',
                fontFamily: 'Montserrat-Regular',
              }}>
              {about}
            </Text>
          </View>

          <View style={styles.main3}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                navigation.navigate('restaurantMenu', {
                  id: id,
                  res_id: route.params.id,
                  res_name:resName
                });
              }}>
              <Text style={styles.btnText}>Order Now</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginLeft: PX(30),
              justifyContent: 'space-between',
              paddingTop: PX(30),
            }}>
            <Text
              style={{
                fontSize: PX(18),
                fontFamily: 'Montserrat-SemiBold',
                color: '#000',
              }}>
              Photos
            </Text>
          </View>

          <View
            style={{width: '100%', paddingHorizontal: '8%', paddingTop: '3%'}}>
            {images.length > 0 ? (
              <FlatList
                data={images}
                renderItem={renderItem1}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                horizontal
              />
            ) : (
              <Text
                style={{
                  fontSize: PX(16),
                  fontFamily: 'Montserrat-Medium',
                  color: '#000',
                  textAlign: 'center',
                }}>
                No Photos yet.
              </Text>
            )}
          </View>

          <View
            style={{
              height: 0.2,
              width: '84%',
              backgroundColor: '#828282',
              alignSelf: 'center',
              marginTop: PX(30),
            }}></View>

          <View
            style={{width: '100%', paddingHorizontal: '8%', paddingTop: '3%'}}>
            <Text
              style={{
                fontSize: PX(18),
                fontFamily: 'Montserrat-SemiBold',
                color: '#000',
                textAlign: 'left',
                marginTop: PX(15),
              }}>
              Reviews
            </Text>
            <FlatList
              data={ratingList}
              renderItem={renderItem2}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
            />
          </View>
          {ratingList.length > 0 ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ReviewScreen', {id: route.params.id})
              }
              style={{
                width: '100%',
                paddingHorizontal: '8%',
                paddingTop: '5%',
              }}>
              <Text
                style={{
                  fontSize: PX(16),
                  fontFamily: 'Montserrat-Medium',
                  color: '#000',
                  textAlign: 'center',
                }}>
                Load More Reviews
              </Text>
            </TouchableOpacity>
          ) : (
            <Text
              style={{
                fontSize: PX(16),
                fontFamily: 'Montserrat-Medium',
                color: '#000',
                textAlign: 'center',
              }}>
              No reviews yet.
            </Text>
          )}
        </ScrollView>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            width: '100%',
            backgroundColor: '#000',
            height: '100%',
          }}>
          <TouchableOpacity
            style={{
              width: '95%',
              height: '10%',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <Image
              style={{height: PX(40), width: PX(40), resizeMode: 'contain'}}
              source={require('../../assets/cross.png')}
            />
          </TouchableOpacity>
          <View
            style={{
              width: '100%',
              height: '90%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: '10%',
            }}>
            <Image
              style={{
                height: '60%',
                width: '100%',
                resizeMode: 'contain',
              }}
              source={{uri: selectedImage}}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default restaurant;
