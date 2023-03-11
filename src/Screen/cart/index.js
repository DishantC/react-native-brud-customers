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
  Platform,
  Alert,
} from 'react-native';
import {PX} from '../pixel';
import DeviceInfo from 'react-native-device-info';
import styles from './styles';
import {
  ListCartApi,
  PlaceOrderApi,
  RemoveCartItemApi,
  UpdateCartApi,
  CardListApi,
  cafeDetailsApi
} from '../../Config/api';
import {Loader} from '../../Navigation/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Delete from '../../assets/delete.png';
import {SQIPCardEntry} from 'react-native-square-in-app-payments';
import uuid from 'react-native-uuid';
import radio from '../../assets/radio.png';
import select from '../../assets/select.png';
import AlertPopup from '../../Components/AlertPopup';

const index = ({navigation, route}) => {
  const [Send, setSend] = useState('');
  const [loading, setLoading] = useState(false);
  const [listCart, setListCart] = useState([]);
  const [totalCart, setTotalCart] = useState(0);
  const [paymentResponse, setPaymentResponse] = useState();
  const [useRewardPoint, setUseRewardPoint] = useState(false);
  const [rewardPoint, setRewardPoint] = useState(0);
  const [convertValue, setConvertValue] = useState(0);
  const [alertPopup, setAlertPopup] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [cardNumber,setCardNumber] = useState('')
  const [resName,setResName] = useState('')
  const [resImage,setResImage] = useState('')
  const [resAddress,setResAddress] = useState('')
  const [resCity,setResCity] = useState('')
  const [value1, setValue1] = useState('');
  const [resId,setResId] = useState('')
  const deals = [
    {
      img: require('../../assets/items/Rectangle1.png'),
      name: 'Vanilla Cappuccino',
      many: '$5.50',
    },
    {
      img: require('../../assets/items/Rectangle2.png'),
      name: 'Cappuccino Banana',
      many: '$5',
    },
    {
      img: require('../../assets/items/Rectangle3.png'),
      name: 'Caramel Cappuccino',
      many: '$6',
    },
  ];

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      onListCart();
      iosPaymentDesign();
      onCardList()
    });
  }, []);

  const iosPaymentDesign = async () => {
    if (Platform.OS === 'ios') {
      await SQIPCardEntry.setIOSCardEntryTheme({
        saveButtonFont: {
          size: 25,
        },
        saveButtonTitle: 'Pay 💳 ',
        keyboardAppearance: 'Light',
        saveButtonTextColor: {
          r: 255,
          g: 0,
          b: 125,
          a: 0.5,
        },
      });
    }
  };

  const onCardEntryComplete = cardDetails => {
    let idempotency = uuid.v4();

    var myHeaders = new Headers();
    myHeaders.append('Square-Version', '2022-05-12');
    myHeaders.append(
      'Authorization',
      'Bearer EAAAEMa_VAAoYR_8mNj6Np5d2N6XdtLhNvGd6sRcNCfMlE6SQhR_62Au8QwTwT18',
    );
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      amount_money: {
        amount: totalCart,
        currency: 'USD',
      },
      idempotency_key: idempotency,
      source_id: cardDetails.nonce,
      location_id: 'LJSV6MQ533XT4',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://connect.squareupsandbox.com/v2/payments', requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log('Payment Response::::', result);
        setPaymentResponse(result);
        onCardEntryCancel();
      })
      .catch(error => console.log('error', error));
  };

  const onCardNonceRequestSuccess = async cardDetails => {
    try {
      await SQIPCardEntry.completeCardEntry(
        onCardEntryComplete(cardDetails),
        console.log('Payment Response::::', cardDetails.nonce),
      );
    } catch (ex) {
      await SQIPCardEntry.showCardNonceProcessingError(ex.message);
    }
  };

  /**
   * Callback when card entry is cancelled and UI is closed
   */
  const onCardEntryCancel = () => {
    // Handle the cancel callback
    // alert('Payment Cancel.')
  };

  const onStartCardEntry = async () => {
    const cardEntryConfig = {
      collectPostalCode: false,
    };
    await SQIPCardEntry.startCardEntryFlow(
      cardEntryConfig,
      item => onCardNonceRequestSuccess(item),
      () => onCardEntryCancel(),
    );
  };

  const onOrderPlace = async () => {
    const dollarsTotal = parseFloat(listCart[0]?.item_total).toFixed(2);
    const dollarsUsed = parseFloat(pointsUsed / pointsPerDollar);
    const dollarsRemaining = parseFloat(dollarsTotal-dollarsUsed)
    if (totalCart == '') {
      setAlertMessage('Please select first order item.');
      setAlertPopup(true);
      // Alert.alert('Payment','Please select first order item.')
    } else if ( (paymentResponse == null || paymentResponse == '') &&  
     useRewardPoint == false ) {
      setAlertMessage('Please select payment option.');
      setAlertPopup(true)    
    }

    else if(convertValue===totalCart){
      setAlertMessage('Please select payment another option.');
      setAlertPopup(true)  
    }
    else if(dollarsRemaining>0&& (paymentResponse == null || paymentResponse == '')){
      setAlertMessage('Please select payment option.');
      setAlertPopup(true)  
    } 
     
    else {
      try {
        setLoading(true);
        const id1 = await AsyncStorage.getItem('id');
        let totalvalue = useRewardPoint
          ? parseFloat(totalCart - convertValue)
          : totalCart;

        console.log('Get Reward Points:::', totalCart, convertValue);
        const customer_id = encodeURIComponent(id1);
        const restaurant_id = encodeURIComponent(resId);
        const order_instructions = encodeURIComponent(Send);
        const total = encodeURIComponent(totalvalue);
        const payment_type = encodeURIComponent('COD');
        const payment_success_response = encodeURIComponent(paymentResponse);
        const is_check_reward_point = encodeURIComponent(
          useRewardPoint ? 1 : 2,
        );
        const converted_reward_point = encodeURIComponent(
          useRewardPoint ? convertValue : 0,
        );

        // const payment_success_response=encodeURIComponent(route.params?.result);

        const requestBody = `customer_id=${customer_id}&restaurant_id=${restaurant_id}&order_instructions=${order_instructions}&total=${total}&payment_type=${payment_type}&payment_success_response=${payment_success_response}&is_check_reward_point=${is_check_reward_point}&converted_reward_point=${converted_reward_point}`;

        const listcart = await PlaceOrderApi(requestBody);
        console.log('Get Reposne dAta:::', listcart);
        if (listcart.sucecess) {
          setLoading(false);
          // alert('Order place successfully.')
          setAlertMessage('Order place successfully.');
          setAlertPopup(true);
          navigation.navigate('confirm', {
            status: listcart.data.status,
            res_id: listcart.data.restaurant_id,
          });
        } else {
          setLoading(false);
          // alert(listcart?.message)
          setAlertMessage(listcart?.message);
          setAlertPopup(true);
        }
      } catch (err) {
        setLoading(false);
        console.log('Get ISsue ::', err);
        // alert('Server issue.')
        setAlertMessage('Server issue.');
        setAlertPopup(true);
      }
    }
  };

  const onListCart = async () => {
    try {
      setLoading(true);
      const id1 = await AsyncStorage.getItem('id');

      const id = encodeURIComponent(id1);

      const requestBody = `id=${id}`;

      const listcart = await ListCartApi(requestBody);
      console.log('Get Reposne dAta:::+++++',  JSON.stringify(listcart));
      if (listcart.sucecess) {
        // setLoading(false);
        if(listcart?.data.length>0){
          const id1 = encodeURIComponent(listcart?.data[0]?.restaurant_id);
          const requestBody = `id=${id1}`;
          setResId(listcart?.data[0]?.restaurant_id)
          const response = await cafeDetailsApi(requestBody);
          console.log('Get REstaurant id:::', response.data);
          if (!response.sucecess) {
            setLoading(false);
            alert(response.message);
          } else {
            setLoading(false);
            setResName(response.data.restaurant_name);
            setResImage(response.data.image)
            setResAddress(response.data.full_address)
            setResCity(response.data.city)
          }
        }
        setLoading(false);
        setListCart(listcart?.data);
        if(listcart.total!=undefined){
          setTotalCart(listcart.total);
        }
        
        setRewardPoint(listcart?.total_point);
        setConvertValue(listcart?.converted_point);
      } else {
        setLoading(false);
        // alert(listcart?.message)
        setAlertMessage(listcart?.message);
        setAlertPopup(true);
        setModalVisible(!modalVisible);
      }
    } catch (err) {
      setLoading(false);
      setAlertMessage('Server issue.');
      setAlertPopup(true);
    }
  };

  const onUpdateQty = async (id1, from, qtys) => {
    setLoading(true);
    if (from == 'plus') {
      const cart_id = encodeURIComponent(id1);
      const qty = encodeURIComponent(parseInt(qtys) + 1);

      const requestBody = `cart_id=${cart_id}&qty=${qty}`;

      const listcart = await UpdateCartApi(requestBody);
      console.log('Get Reposne dAta:::', listcart);
      if (listcart.sucecess) {
        onListCart();
      } else {
        setLoading(false);
      }
    } else {
      const cart_id = encodeURIComponent(id1);
      const qty = encodeURIComponent(parseInt(qtys) - 1);

      const requestBody = `cart_id=${cart_id}&qty=${qty}`;

      const listcart = await UpdateCartApi(requestBody);
      console.log('Get Reposne dAta:::', listcart);
      if (listcart.sucecess) {
        onListCart();
      } else {
        setLoading(false);
      }
    }
  };

  const onCardList = async () => {
    try {
      setLoading(true);
      const id1 = await AsyncStorage.getItem('id');

      const customer_id = encodeURIComponent(id1);
      const requestBody = `customer_id=${customer_id}`;

      const response = await CardListApi(requestBody);
      
      if (!response.sucecess) {
        setLoading(false);
      } else {
        if(response.data.length>0){
        response.data.map((item)=>{
          if(item.is_select == 1){
            console.log('Get Api Response:::Data',item.card_number);
            setCardNumber(item.card_number);
            setLoading(false);
          }
        
        })
      }
      setLoading(false);

        
      }
    } catch (err) {
      setLoading(false);
      console.log('GEt Error:::', err);
    }
  };

  const onDeleteCart = async id => {
    try {
      setLoading(true);
      const cart_id = encodeURIComponent(id);

      const requestBody = `cart_id=${cart_id}`;

      const listcart = await RemoveCartItemApi(requestBody);
      console.log('Get Reposne dAta:::++++++', listcart);
      if (listcart.sucecess) {
        setLoading(false);
        onListCart();
        setAlertMessage('Item delete successfully.');
        setAlertPopup(true);
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setAlertMessage('Server issue.');
      setAlertPopup(true);
    }
  };
  function GetCardType(number)
  {
      // visa
      var re = new RegExp("^4");
      if (number.match(re) != null)
          return "Visa";
  
      // Mastercard 
      // Updated for Mastercard 2017 BINs expansion
       if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number)) 
          return "Mastercard";
  
      // AMEX
      re = new RegExp("^3[47]");
      if (number.match(re) != null)
          return "AMEX";
  
      // Discover
      re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
      if (number.match(re) != null)
          return "Discover";
  
      // Diners
      re = new RegExp("^36");
      if (number.match(re) != null)
          return "Diners";
  
      // Diners - Carte Blanche
      re = new RegExp("^30[0-5]");
      if (number.match(re) != null)
          return "Diners - Carte Blanche";
  
      // JCB
      re = new RegExp("^35(2[89]|[3-8][0-9])");
      if (number.match(re) != null)
          return "JCB";
  
      // Visa Electron
      re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
      if (number.match(re) != null)
          return "Visa Electron";
  
      return "";
  }

  // console.log('listcart?.data[0]?.restaurant_id', JSON.stringify(listCart[0].item_total));

 
  const renderItem2 = ({item, index}) => {
    console.log('Ge t MantainITEM:::::', item);
    return item?.cart_items?.map((item1, index1) => {
      return (
        <View style={styles.category}>
          <View style={styles.box}>
            <View style={styles.main}>
              {item1.image != undefined ? (
                <Image source={{uri: item1.image}} style={styles.img} />
              ) : (
                <Image
                  source={require('../../assets/items/Rectangle1.png')}
                  style={styles.img}
                />
              )}
            </View>
            <View style={styles.view}>
              <View style={styles.box2}>
                <View style={{width: '65%'}}>
                  <Text style={styles.name}>{item1.item_name}</Text>
                </View>
                <TouchableOpacity
                  style={{width: PX(30), height: PX(30)}}
                  onPress={() => onDeleteCart(item._id)}>
                  <Image
                    source={require('../../assets/delete.png')}
                    style={styles.img10}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.box1}>
                <View style={styles.many}>
                  <Text style={styles.textMany}>
                    ${parseFloat(item.item_total).toFixed(2)}
                  </Text>
                </View>
                <View
                  style={{
                    width: PX(80),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      item.qty != 1
                        ? onUpdateQty(item._id, 'minus', item.qty)
                        : onDeleteCart(item._id)
                    }
                    disabled={loading ? true : false}
                    style={styles.btn}>
                    <Text style={styles.btnText}>-</Text>
                  </TouchableOpacity>

                  <Text style={styles.btnText}>{item.qty}</Text>

                  <TouchableOpacity
                    onPress={() => onUpdateQty(item._id, 'plus', item.qty)}
                    disabled={loading ? true : false}
                    // navigation.navigate('customize');
                    style={styles.btn1}>
                    <Text style={styles.btnText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{width: PX(550), height: PX(2), backgroundColor: '#E5E5E5'}}
          />
        </View>
      );
    });
  };





const pointsPerDollar = 100; // 100 points equals 1 dollar
const pointsUsed = parseInt(rewardPoint);
const dollarsTotal = parseFloat(listCart[0]?.item_total).toFixed(2);
const dollarsUsed = parseFloat(pointsUsed / pointsPerDollar);
const dollarsRemaining = parseFloat(dollarsTotal-dollarsUsed)
// const dollarsRemaining = (dollarsTotal)-(dollarsUsed)


if (dollarsRemaining >= 0) {
  dollarsRemaining.toString()
} else {
  dollarsRemaining.toString()>=0
}



const totalDollarscount = parseFloat(totalCart).toFixed(2)-parseFloat(dollarsRemaining).toFixed(2)

  return (
    
    <View style={styles.main2}>
      <View style={{height: DeviceInfo.hasNotch() ? PX(30) : PX(10)}} />
      <Loader isLoding={loading} />
      <View style={styles.header1}>
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
        <View style={{paddingLeft: PX(125)}}>
          <Text style={styles.headerText2}>Your Cart</Text>
        </View>
      </View>

      <View style={styles.item}>
        <View style={{
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'flex-start',
          width:"100%"
        }}>
          
          <View >
          <Text style={{
                fontSize: PX(13),
                color: '#000',
                fontFamily: 'Montserrat-Bold',
              }}>{resName!=''?`${resName} Restaurant`:''}</Text>
              <Text style={{
                fontSize: PX(13),
                color: '#000',
                fontFamily: 'Montserrat-Medium',
              }}>{resAddress}{resCity!=''?`, ${resCity}`:''}</Text>
              </View>
        </View>
        {listCart.length>0?
        <FlatList
          data={listCart}
          renderItem={renderItem2}
          keyExtractor={(item, index) => index.toString()}
        />
: 
<Text
style={{
  fontSize: PX(16),
  fontFamily: 'Montserrat-Medium',
  color: '#000',
  textAlign: 'center',
  marginTop:PX(-20)
}}>
No Item yet.
</Text>
}
      </View>
      <TouchableOpacity
        onPress={() => onStartCardEntry()}
        // onPress={() =>   navigation.navigate('Selection',{from:'cartItem',res_id:route.params.res_id})}
        style={styles.payments}>
        <View
          style={{
            width: '85%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{width: '60%'}}>
            <Text
              style={{
                fontSize: PX(13),
                color: '#000',
                fontFamily: 'Montserrat-Medium',
              }}>
              Payment Option
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/items/visa.png')}
              style={{width: PX(30), height: PX(22),resizeMode:'contain'}}
            />
            <View 
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: PX(10),
                color: '#000',
                fontFamily: 'Montserrat-Medium',
                marginLeft:PX(10)
              }}>
              {/* {GetCardType(cardNumber)} */}
              Credit Card
            </Text>
            <Image
              source={require('../../assets/items/go.png')}
              style={{width: PX(6.59), height: PX(11.17),marginLeft:PX(5),resizeMode:'contain'}}
            />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '90%',
          marginTop: PX(20),
          justifyContent: 'space-between',
          marginLeft: PX(-8),
        }}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => {
            setUseRewardPoint(!useRewardPoint);
          }}>
          <Image
            style={{
              width: PX(35),
              height: PX(30),
              resizeMode: 'contain',
              marginTop: PX(5),
            }}
            source={ useRewardPoint ? select : radio}
          />
          <Text
            style={{
              fontSize: PX(15),
              color: '#000',
              fontFamily: 'Montserrat-Regular',
              marginLeft: PX(5),
            }}>
            Use Reward Point
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: PX(13),
            color: '#000',
            fontFamily: 'Montserrat-Medium',
          }}>
          {parseInt(rewardPoint)} points
        </Text>
      </View>

      <Text
        style={{
          fontSize: PX(13),
          paddingTop: PX(20),
          paddingRight: '56%',
          color: '#000',
          fontFamily: 'Montserrat-SemiBold',
        }}>
        Order Instructions
      </Text>
      <View
        style={{
          width: '90%',
          height: PX(75),
          backgroundColor: '#ffffff',
          borderWidth: PX(2),
          borderRadius: PX(15),
          borderColor: '#DADADA',
          marginTop: PX(15),
        }}>
        <TextInput
          placeholder="send some extra sugar and tissues"
          placeholderTextColor="#7C7C7C"
          value={Send}
          onChangeText={value => {
            setSend(value);
          }}
          style={{paddingTop: '3%', paddingLeft: PX(15), color: '#000'}}
        />
      </View>
      <View
        style={{
          width: '100%',
          backgroundColor: '#FFF7F2',
          height: PX(120),
          marginTop: PX(20),
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: PX(15),
          paddingHorizontal: PX(23),
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}>
          <Text
            style={{
              fontSize: PX(13),
              color: '#000',
              fontFamily: 'Montserrat-Regular',
            }}>
            Item Total
          </Text>
          <Text
            style={{
              fontSize: PX(13),
              color: '#000',
              fontFamily: 'Montserrat-Regular',
            }}>
            ${loading?'0':parseFloat(totalCart).toFixed(2)}
          </Text>
        </View>
     
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}>
         
          <Text
            style={{
              fontSize: PX(13),
              color: '#000',
              fontFamily: 'Montserrat-Regular',
            }}>
            Point Utilization
          </Text>
          <Text
            style={{
              fontSize: PX(13),
              color: '#000',
              fontFamily: 'Montserrat-Regular',
            }}>
            ${useRewardPoint?parseFloat(totalDollarscount).toFixed(2) :'0.00' }
          </Text>
        </View>
       
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}>
          <Text
            style={{
              fontSize: PX(16),
              color: '#F55800',
              fontFamily: 'Montserrat-Bold',
            }}>
            Total
          </Text>
          <Text
            style={{
              fontSize: PX(16),
              color: '#F55800',
              fontFamily: 'Montserrat-Bold',
            }}>
            ${  useRewardPoint?parseFloat(dollarsRemaining).toFixed(2) :parseFloat(totalCart).toFixed(2)}
          </Text>
        </View>
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: PX(30),
        }}>
        <TouchableOpacity
          onPress={() => onOrderPlace()}
          disabled={loading ? true : false}
          // navigation.navigate('confirm');
          style={{
            width: PX(350),
            height: PX(52),
            borderRadius: PX(60),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F55800',
          }}>
          <Text
            style={{
              fontSize: PX(20),
              color: '#fff',
              fontFamily: 'Montserrat-Bold',
            }}>
            Place Order
          </Text>
        </TouchableOpacity>
      </View>
      {alertPopup && (
        <AlertPopup
          modalVisible={alertPopup}
          onRequestClose={() => {
            setAlertPopup(false);
          }}
          title={'Add cart'}
          message={alertMessage}
        />
      )}
    </View>
  );
};

export default index;
