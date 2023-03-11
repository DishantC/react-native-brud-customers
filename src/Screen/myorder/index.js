import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import {PX} from '../pixel';
import DeviceInfo from 'react-native-device-info';
import styles from './styles';
import {GetOrdersApi, PostReorder, onRatingApi} from '../../Config/api';
import {Loader} from '../../Navigation/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {Rating, AirbnbRating} from 'react-native-ratings';

const index = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [onGoingOrder, setOnGoingOrder] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [rating, setRating] = useState(0);
  const [restaurant, setRestaurant] = useState('');
  const [reviews, setReviews] = useState('');

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      GetOrderAPIS();
    });
  }, []);

  const GetOrderAPIS = async () => {
    try {
      let going = [];
      let previouse = [];
      setLoading(true);
      const id1 = await AsyncStorage.getItem('id');

      const id = encodeURIComponent(id1);

      const requestBody = `customer_id=${id}`;
      const orderData = await GetOrdersApi(requestBody);

      if (orderData.sucecess!=undefined) {
        setLoading(false);

        // setOrderList(orderData.data)

        await orderData.data.map((item, index) => {
          if (item.status == 5) {
            previouse.push(item);
          } else {
            going.push(item);
          }
        });

        setOrderList(previouse);
        setOnGoingOrder(going);
      } else {
        setLoading(false);
        alert(orderData?.message);
      }
    } catch (err) {
      setLoading(false);
      alert('Server Issues.');
    }
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

  const onRatingFunction = async () => {
    setModalVisible1(false);
    try {
      setLoading(true);
      const id1 = await AsyncStorage.getItem('id');
      const id = encodeURIComponent(orderId);
      const restaurant_id = encodeURIComponent(restaurant);
      const rate = encodeURIComponent(rating);
      const comment = encodeURIComponent(reviews);
      const customer_id = encodeURIComponent(id1);
      console.log('Get items::::', orderId, restaurant, rating);
      const requestBody = `order_id=${id}&restaurant_id=${restaurant_id}&customer_id=${customer_id}&rate=${rate}&comment=${comment}`;

      const ratingResponse = await onRatingApi(requestBody);
      if (ratingResponse.sucecess) {
        setLoading(false);
        setRating(0);
        setReviews('')
        Alert.alert(' ', ratingResponse.message);
      } else {
        setModalVisible1(false);
        setLoading(false);
        setRating(0);
        setReviews('')
        alert(ratingResponse?.message);
      }
    } catch (err) {
      setModalVisible1(false);

      console.log('Get Error:::', err);
      alert('Server Issue.');
    }
  };

  const reOrder = async id1 => {
    console.log('Get ID::::', id1);
    try {
      setLoading(true);
      const id = encodeURIComponent(id1);

      const requestBody = `order_id=${id}`;

      const response = await PostReorder(requestBody);
      if (response.sucecess) {
        setLoading(false);
        Alert.alert(' ', response.message);
        GetOrderAPIS();
        // setOrderList(response.data)
      } else {
        setLoading(false);
        alert(response?.message);
      }
    } catch (err) {
      console.log('Get Error:::', err);
      alert('Server Issue.');
    }
  };

  const renderItem = (item, index) => {
    // console.log('GEt DATA::::', item.restaurants[0].restaurant_name);
    return (
      <View style={styles.category}>
        <View style={styles.mainView}>
          <View style={styles.header}>
            <Text style={styles.date}>
              {moment(item.createdAt).format('MM/DD/YY, h:mm a ')}
            </Text>
            <Text style={styles.number1}>#{item.order_code}</Text>
          </View>

          <View style={styles.category3}>
            {/* <View style={styles.box2}>
              <Image
                source={{uri: item.restaurants[0].image}}
                style={styles.boxImg}
              />
              <View style={styles.boxView}>
                <Text style={styles.cafe}>
                  {item.restaurants[0].restaurant_name}
                </Text>
                <View style={styles.category4}>
                  <Text style={styles.item1}>items {item.items_count}</Text>
                  <Text style={styles.many1}>${integerCheck(item.total)}</Text>
                </View>
                <View style={styles.text1}>
                  <View style={styles.text2} />
                  <Text style={styles.order3}>
                    {item.status == 1
                      ? 'Order Placed'
                      : item.status == 2
                      ? 'Order Confirm'
                      : item.status == 3
                      ? 'Order Cancel'
                      : item.status == 4
                      ? 'Order Preparing'
                      : item.status == 5 && 'Order Delivered'}
                  </Text>
                </View>
              </View>
            </View> */}
          </View>
          <View style={styles.btnView}>
            <View
              style={{
                height: PX(40),
                justifyContent: 'space-between',
                marginLeft: PX(15),
              }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible), setItemList(item.cart_items);
                }}>
                <Text style={styles.check}>Check Items</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible1(!modalVisible1),
                    setOrderId(item._id),
                    setRestaurant(item.restaurant_id);
                }}>
                <Text style={styles.check}>Rating</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.btnView1}
              onPress={() =>
                navigation.navigate('confirm', {
                  status: item.status,
                  res_id: item.restaurant_id,
                })
              }>
              <Text style={styles.textBtn}>Track Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderItem2 = (item, index) => {
    return (
      <View style={styles.category}>
        <View style={styles.mainView}>
          <View style={styles.header}>
            <Text style={styles.date}>
              {moment(item.createdAt).format('DD/MM/YYYY, hh:mm a ')}
            </Text>
            <Text style={styles.number1}>#{item.order_code}</Text>
          </View>

          <View style={styles.category3}>
            {/* <View style={styles.box2}>
              <Image
                source={{uri: item.restaurants[0].image}}
                style={styles.boxImg}
              />
              <View style={styles.boxView}>
                <Text style={styles.cafe}>
                  {item.restaurants[0].restaurant_name}
                </Text>
                <View style={styles.category4}>
                  <Text style={styles.item1}>{item.items_count} items</Text>
                  <Text style={styles.many1}>${parseInt(item.total)}</Text>
                </View>
                <View style={styles.text1}>
                  <View style={styles.text4} />
                  <Text style={styles.text5}>
                    {item.status == 1
                      ? 'Order Placed'
                      : item.status == 2
                      ? 'Order Confirm'
                      : item.status == 3
                      ? 'Order Cancel'
                      : item.status == 4
                      ? 'Order Preparing'
                      : item.status == 5 && 'Order Delivered'}
                  </Text>
                </View>
              </View>
            </View> */}
          </View>
          <View style={styles.btnView}>
            <View
              style={{
                height: PX(40),
                justifyContent: 'space-between',
                marginLeft: PX(15),
              }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible), setItemList(item.cart_items);
                }}>
                <Text style={styles.check}>Check Items</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible1(!modalVisible1),
                    setOrderId(item._id),
                    setRestaurant(item.restaurant_id);
                }}>
                <Text style={styles.check}>Rating</Text>
              </TouchableOpacity>
            </View>
            {/* <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible),setItemList(item.cart_items)
              }}>
              <Text style={styles.check}>Check Items</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
          
              style={styles.btnView1}
              onPress={() => reOrder(item._id)}>
              <Text style={styles.textBtn}>Reorder</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  // const renderItem2 = ({item, index}) => {
  //   return (
  //     <View style={styles.category}>
  //       <View style={styles.mainView}>
  //         <View style={styles.header}>
  //           <Text style={styles.date}>{item.dateTime}</Text>
  //           <Text style={styles.number1}>{item.number}</Text>
  //         </View>

  //         <View style={styles.category3}>
  //           <View style={styles.box2}>
  //             <Image source={item.img} style={styles.boxImg} />
  //             <View style={styles.boxView}>
  //               <Text style={styles.cafe}>{item.cafe}</Text>
  //               <View style={styles.category4}>
  //                 <Text style={styles.item1}>{item.item}</Text>
  //                 <Text style={styles.many1}>{item.many}</Text>
  //               </View>
  //               <View style={styles.text1}>
  //                 <View style={styles.text2} />
  //                 <Text style={styles.order3}>{item.order}</Text>
  //               </View>
  //             </View>
  //           </View>
  //         </View>
  //         <View style={styles.btnView}>
  //           <TouchableOpacity
  //             onPress={() => {
  //               setModalVisible(!modalVisible);
  //             }}>
  //             <Text style={styles.check}>Check Items</Text>
  //           </TouchableOpacity>
  //           <TouchableOpacity style={styles.btnView1}>
  //             <Text style={styles.textBtn}>Reorder</Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     </View>
  //   );
  // };

  const ratingCompleted = rating => {
    console.log('Rating is: ' + rating);
    setRating(rating);
  };

  return (
    <View style={styles.main2}>
      <View
        style={{
          height: DeviceInfo.hasNotch() ? PX(30) : PX(10),
          backgroundColor: '#fff',
          width: '100%',
        }}
      />
      <Loader backButton={false} isLoding={loading} />
      {/* <View
        style={{
          position: 'absolute',
          top: DeviceInfo.hasNotch() ? PX(50) : PX(35),
          left: PX(25),
        }}></View> */}
      <View style={styles.header1}>
        {/* <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('HomeStack');
            }}>
            <Image
              source={require('../../assets/backGo.png')}
              style={styles.back}
            />
          </TouchableOpacity>
        </View> */}

        <View>
          <Text style={styles.headerText2}>My Orders</Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{width: '100%'}}
        contentContainerStyle={{paddingBottom: PX(90)}}>
        <View style={styles.header3}>
          {console.log('Get DATA:::::', onGoingOrder.length)}
          {loading ? null : onGoingOrder.length <= 0 &&
            orderList.length <= 0 ? (
            <Text style={styles.headerText1}>Data not found</Text>
          ) : (
            <Text style={styles.headerText}>Ongoing Orders</Text>
          )}
        </View>
        <View style={styles.item}>
          {/* <FlatList
            // scrollEnabled={false}
            data={onGoingOrder}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          /> */}

          {onGoingOrder.map(renderItem)}
        </View>

        <View style={styles.header4}>
          {loading ? null : orderList.length <= 0 ? null : (
            <Text style={styles.headerText}>Previous Orders</Text>
          )}
        </View>
        <View style={styles.item}>
          {/* <FlatList
          // scrollEnabled={false}
            data={orderList}
            renderItem={renderItem2}
            keyExtractor={(item, index) => index.toString()}
          /> */}
          {orderList.map(renderItem2)}
        </View>
      </ScrollView>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.box3}>
            <FlatList
              data={itemList}
              renderItem={({item, index}) => {
                console.log('Get ITem::::', item.set_price);
                return (
                  <View style={styles.text6}>
                    <Text style={styles.text7}>
                      {item.qty} X {item.item_name}
                    </Text>
                    <Text style={styles.fontSize}>${item.set_price}</Text>
                  </View>
                );
              }}
            />
            {/* <View style={styles.text8}>
              <Text style={styles.text7}>1 X Cappuccino Banana</Text>
              <Text style={styles.fontSize}>$5.50</Text>
            </View>
            <View style={styles.text8}>
              <Text style={styles.text7}>1 X Caramel Cappuccino</Text>
              <Text style={styles.fontSize}>$5</Text>
            </View> */}
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          setModalVisible1(!modalVisible1);
        }}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible1(!modalVisible1);
            setReviews('')
          }}
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.box3}>
            <View>
              <Text
                style={{
                  fontSize: PX(16),
                  fontFamily: 'Montserrat-Bold',
                  marginTop: PX(20),
                }}>
                Rate this products
              </Text>
            </View>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={30}
              // showRating
              startingValue={rating}
              onFinishRating={rate => ratingCompleted(rate)}
              style={{marginTop: PX(20), marginBottom: PX(10)}}
              containerStyle={{width: 140}}
            />

            <View
              style={{
                paddingTop: PX(10),
                // backgroundColor:'red',
                width: '85%',
                paddingHorizontal: PX(10),
                justifyContent: 'center',
                alignSelf: 'center',
                borderRadius: PX(8),
                borderWidth: 1,
                borderColor: 'grey',
                marginVertical: PX(15),
              }}>
              <TextInput
                value={reviews}
                onChangeText={text => {
                  setReviews(text);
                }}
                placeholder="Your Review"
                multiline={true}
                style={{
                  marginLeft: PX(10),
                  width: '94%',
                  fontSize: PX(16),
                  fontFamily: 'Montserrat-Regular',
                  color: '#000',
                }}
                maxLength={80}
              />
              <Text style={{
                fontSize: PX(14),
                fontFamily: 'Montserrat-Regular',
                textAlign:"right",
                color:'grey',
                width:'100%',
                paddingVertical: PX(10),
              }}>{reviews.length}/80</Text>
            </View>

            <TouchableOpacity
              style={{
                width: '85%',
                height: PX(45),
                backgroundColor: '#F55800',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: PX(40),
                marginVertical: PX(20),
              }}
              onPress={() => onRatingFunction()}>
              <Text
                style={{
                  fontSize: PX(16),
                  fontFamily: 'Montserrat-Bold',
                  color: '#fff',
                }}>
                Submit Rating
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default index;
