import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  Dimensions,
  Modal,
  Alert,
  Keyboard,
} from 'react-native';
import {PX} from '../pixel';
import styles from './styles';
import {
  CreditCardInput,
  LiteCreditCardInput,
  CardView,
} from 'react-native-credit-card-input';
import {
  AddCardApi,
  CardListApi,
  DeleteCardApi,
  DefaultCardApi,
  onCardPointApi,
} from '../../Config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loader} from '../../Navigation/loader';
import Carousel from 'react-native-snap-carousel';
import radio from '../../assets/radio.png';
import select from '../../assets/select.png';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ConfirmPopup from '../../Components/ConfirmPopup';
import AlertPopup from '../../Components/AlertPopup';

const {width: screenWidth} = Dimensions.get('window');

const index = ({navigation, route}) => {
  const cardRef = useRef(null);
  const ref_expiry = useRef();
  const ref_cvv = useRef();
  const [Visible, setVisible] = useState(false);
  const [Email, setEmail] = useState('');
  const [Date, setDate] = useState('');
  const [Cvv, setCvv] = useState('');
  const [Card, setCard] = useState('');
  const [number, setNumber] = useState('');
  const [Mode, setMode] = useState(false);
  const [cardList, setCardList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [cardDetails, setCardDetails] = useState(null);
  const [amountPay, setAmountPay] = useState('0');
  const [Points, setPoints] = useState('');
  const [convertedPrice, setConvertedPrice] = useState('');
  const [confirmAlert, setConfirmAlert] = useState(false);
  const [cardId, setCardId] = useState('');
  const [alertPopup, setAlertPopup] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      onCardList();
      getCrdAmount();
      onCardPointList();
    });
  }, []);

  const getCrdAmount = async () => {
    const amounts = JSON.parse(await AsyncStorage.getItem('cardAmount'));
    if (amounts == null) {
      AsyncStorage.setItem('cardAmount', JSON.stringify(0));
    } else {
      setAmountPay(amounts);
    }
  };

  const onCardList = async () => {
    try {
      setLoading(true);
      const id1 = await AsyncStorage.getItem('id');

      const customer_id = encodeURIComponent(id1);
      const requestBody = `customer_id=${customer_id}`;

      const response = await CardListApi(requestBody);
      console.log('Get Api Response:::Data', response);
      if (!response.sucecess) {
        setLoading(false);
      } else {
        setLoading(false);
        setCardList(response.data);
      }
    } catch (err) {
      setLoading(false);
      console.log('GEt Error:::', err);
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

  const onAddCard = async () => {
    if (Card == '') {
      Alert.alert('Card Details', 'Please Enter Card Owner Name');
    } else if (number == '') {
      Alert.alert('Card Details', 'Please Enter Card Number');
    } else if (Date == '') {
      Alert.alert('Card Details', 'Please Enter Card Expiry Date');
    } else if (Cvv == '') {
      Alert.alert('Card Details', 'Please Enter Card CVV Number');
    } else {
      try {
        setLoading(true);
        const id1 = await AsyncStorage.getItem('id');

        const customer_id = encodeURIComponent(id1);
        const name_of_card = encodeURIComponent(Card);
        const card_number = encodeURIComponent(number);
        const expiry_date = encodeURIComponent(Date);

        const requestBody = `customer_id=${customer_id}&name_of_card=${name_of_card}&card_number=${card_number}&expiry_date=${expiry_date}`;

        const response = await AddCardApi(requestBody);
        console.log('Get Api Response:::', response);
        if (!response.sucecess) {
          setLoading(false);
          setAlertMessage('Card number is already exist.');
          setAlertPopup(true);
        } else {
          setLoading(false);
          setModalVisible(false);
          onCardList();
        }
      } catch (err) {
        setLoading(false);
        console.log('GEt Error:::', err);
      }
    }
  };

  const handlecard = text => {
    let formattedText = text.split(' ').join('');
    if (formattedText.length <= 16) {
      if (formattedText.length > 0) {
        formattedText = formattedText
          .match(new RegExp('.{1,4}', 'g'))
          .join(' ');
      }
    } else {
      alert('Card number limit is 16.');
    }
    setNumber(formattedText);
    if (text.length == 19) {
      ref_expiry.current.focus();
    }
    return formattedText;
  };

  const onDeleteCard = async () => {
    setConfirmAlert(false);
    console.log('Get Card Details::::', cardDetails);
    try {
      setLoading(true);

      const card_id = encodeURIComponent(cardId);

      const requestBody = `card_id=${card_id}`;

      const response = await DeleteCardApi(requestBody);
      console.log('Get Api Response:::', response);
      if (!response.sucecess) {
        setLoading(false);
      } else {
        setLoading(false);
        setModalVisible(false);
        onCardList();
      }
    } catch (err) {
      setLoading(false);
      console.log('GEt Error:::', err);
    }
  };

  const onSelectDefaultCard = async id => {
    console.log('Get Card Details::::', cardDetails);
    try {
      setLoading(true);
      const id1 = await AsyncStorage.getItem('id');

      const customer_id = encodeURIComponent(id1);
      const card_id = encodeURIComponent(id);

      const requestBody = `card_id=${card_id}&customer_id=${customer_id}`;

      const response = await DefaultCardApi(requestBody);
      console.log('Get Api Response:::', response);
      if (!response.sucecess) {
        setLoading(false);
      } else {
        setLoading(false);
        setModalVisible(false);
        onCardList();
      }
    } catch (err) {
      setLoading(false);
      console.log('GEt Error:::', err);
    }
  };

  const onCardEntryCancel = () => {
    // Handle the cancel callback
    // alert('Payment Cancel.')
  };

  const onCardEntryComplete = () => {
    var myHeaders = new Headers();
    myHeaders.append('Square-Version', '2022-03-16');
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
      idempotency_key: '7de640d7-3170-4639-8418-8fb7c5f6f835',
      source_id: 'cnon:card-nonce-ok',
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
        alert('Payment Successful.');
        setPaymentResponse(result);

        onCardEntryCancel();
        navigation.navigate('cart', {
          result: result,
          res_id: route.params.res_id,
        });
      })
      .catch(error => console.log('error', error));
  };

  const onaddCardClick = async () => {
    setCard('');
    setCvv('');
    setDate('');
    setNumber('');
    setModalVisible(true);
  };

  const fixCardText = text => {
    if (text.length == 2 && Date.length == 1) {
      text += '/';
    } else if (text.length == 2 && Date.length == 3) {
      text = text.substring(0, text.length - 1);
    }
    setDate(text);
    if (text.length == 5) {
      ref_cvv.current.focus();
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.mainView}>
        {/* <View style={styles.header1}>
            
                <TouchableOpacity onPress={() => {
                             navigation.navigate('cart');
                    }}>
                     <Image source={require('../../assets/backGo.png')}
                    style={styles.back} />  
                </TouchableOpacity>
            
                <View style={styles.header}>
                    <Text style={styles.headerText2}>Payment method</Text>
                </View>    
    </View> */}

        <View style={styles.header1}>
          <View style={{width: '15%'}}>
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

          <Text style={styles.headerText2}>Payment method</Text>

          <View
            style={{
              width: '15%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </View>

        <Text style={styles.header2}>Select your payment method</Text>
        <View style={styles.btn}>
          <TouchableOpacity
            onPress={() => {
              setVisible(0);
            }}
            style={{
              width: '31.5%',
              height: PX(75),
              borderRadius: PX(10),
              borderWidth: 1,
              borderColor: Visible == 0 ? '#fff' : '#848484',
              backgroundColor: Visible == 0 ? '#fff' : '#000',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/payment.png')}
              style={{
                resizeMode: 'contain',
                width: PX(40),
                height: PX(30),
                tintColor: Visible == 0 ? '#F55800' : '#848484',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setVisible(1);
            }}
            style={{
              width: '31.5%',
              height: PX(75),
              borderRadius: PX(10),
              borderWidth: 1,
              borderColor: Visible == 1 ? '#fff' : '#848484',
              backgroundColor: Visible == 1 ? '#fff' : '#000',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/items/Star.png')}
              style={{
                resizeMode: 'contain',
                width: PX(43.75),
                height: PX(30.08),
                tintColor: Visible == 1 ? '#F55800' : '#848484',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setVisible(2);
            }}
            style={{
              width: '31.5%',
              height: PX(75),
              borderRadius: PX(10),
              borderWidth: 1,
              borderColor: Visible == 2 ? '#fff' : '#848484',
              backgroundColor: Visible == 2 ? '#fff' : '#000',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/items/gift.png')}
              style={{
                resizeMode: 'contain',
                width: PX(40),
                height: PX(29),
                tintColor: Visible == 2 ? '#F55800' : '#848484',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {Visible == 0 ? (
        <ScrollView
          style={{width: '100%'}}
          contentContainerStyle={{paddingBottom: PX(270)}}>
          <Text style={styles.visible}>Credit/Debit Card</Text>
          <View style={styles.visible1}>
            <Carousel
              ref={c => {
                cardRef.current = c;
              }}
              data={cardList}
              renderItem={({item, index}) => {
                if (item.is_select == 1) {
                  setCardDetails(item);
                }
                return (
                  <>
                    <CardView
                      number={`${item.card_number}`}
                      name={item.name_of_card}
                      expiry={item.expiry_date}
                      brand={'visa'}
                    />
                    <View
                      style={{
                        width: '94%',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      <TouchableOpacity
                        style={{
                          justifyContent: 'center',
                          flexDirection: 'row',
                          alignItems: 'center',
                          height: PX(60),
                        }}
                        onPress={() => onSelectDefaultCard(item.id)}>
                        <Image
                          style={{
                            width: PX(25),
                            height: PX(25),
                            resizeMode: 'contain',
                            marginTop: PX(4),
                          }}
                          source={item.is_select == 1 ? select : radio}
                        />
                        <Text style={styles.defaultText}>Default Card</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setCardId(item.id), setConfirmAlert(true);
                        }}>
                        <Text style={styles.visible3}>Remove Card</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                );
              }}
              sliderWidth={screenWidth}
              itemWidth={screenWidth - 90}
            />
          </View>

          <TouchableOpacity onPress={() => onaddCardClick()}>
            <Text style={styles.visible3}>+ Add Another Card</Text>
          </TouchableOpacity>
          <View style={styles.visible4}>
            <TouchableOpacity
              style={styles.visible5}
              onPress={() =>
                route.params?.from == 'cartItem'
                  ? onCardEntryComplete()
                  : navigation.goBack()
              }>
              <Text style={styles.visible6}>Done</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : Visible == 1 ? (
        <ScrollView
          style={{width: '100%'}}
          contentContainerStyle={{paddingBottom: PX(170)}}>
          <Text style={styles.redeem}>Loyalty Points</Text>
          <View style={styles.redeem1}>
            <Image
              source={require('../../assets/redeem.png')}
              style={styles.redeem2}
            />
            <View style={{position: 'absolute', top: PX(55)}}>
              <Text
                style={{
                  color: '#F55800',
                  fontSize: PX(16),
                  fontFamily: 'Montserrat-Medium',
                }}>
                Total Points
              </Text>
            </View>
            <View
              style={{
                position: 'absolute',
                top: PX(85),
                height: PX(40),
                backgroundColor: '#051821',
                width: PX(90),
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#F55800',
                  fontSize: PX(22),
                  fontFamily: 'Montserrat-Medium',
                }}>
                {parseInt(Points)}
              </Text>
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: PX(5),
                height: PX(40),
                backgroundColor: '#051821',
                width: PX(160),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: PX(16),
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                {`${parseInt(Points)} pts = $${parseInt(convertedPrice)}`}
              </Text>
            </View>
          </View>
          <View style={styles.redeem3}>
            <TouchableOpacity
              style={styles.redeem4}
              onPress={() => navigation.goBack()}>
              <Text style={styles.redeem5}>Done</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : Visible == 2 ? (
        <ScrollView
          style={{width: '100%'}}
          contentContainerStyle={{paddingBottom: PX(200)}}>
          <Text style={styles.gift}>Gift Card</Text>
          <View style={styles.gift1}>
            <Image
              source={require('../../assets/card7.png')}
              style={styles.gift2}
            />
            <View
              style={{
                position: 'absolute',
                bottom: PX(30),
                backgroundColor: 'rgb(250,250,250)',
                width: PX(120),
                height: PX(40),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: PX(16),
                  color: '#000',
                }}>
                $ {amountPay}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('RechargeCard');
            }}>
            <Text style={styles.gift3}>Recharge Card</Text>
          </TouchableOpacity>
          <View style={styles.gift4}>
            <TouchableOpacity
              style={styles.gift5}
              onPress={() => navigation.goBack()}>
              <Text style={styles.gift6}>Done</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <ScrollView
          contentContainerStyle={{paddingBottom: PX(300)}}
          style={{width: '100%'}}
          showsVerticalScrollIndicator={false}>
          <View style={{width: '100%'}}>
            <View style={styles.gift1}>
              <Image
                source={require('../../assets/items/Card1.png')}
                style={styles.from2}
              />
            </View>
            <View>
              <View style={styles.from3}>
                <View style={styles.email}>
                  <Text style={styles.text}>Name on card</Text>
                  <View style={styles.email1}>
                    <View style={styles.icon}>
                      <Image
                        source={require('../../assets/profile.png')}
                        style={styles.icon1}
                      />
                      <TextInput
                        placeholder="Luis Martin"
                        value={Card}
                        onChangeText={value => {
                          setCard(value);
                        }}
                        style={styles.icon2}
                        placeholderTextColor="#2D2D2D"
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.email}>
                  <Text style={styles.text2}>Card Number</Text>
                  <View style={styles.email1}>
                    <View style={styles.icon}>
                      <Image
                        source={require('../../assets/payment.png')}
                        style={styles.icon3}
                      />
                      <TextInput
                        placeholder="Card Number "
                        value={number}
                        onChangeText={value => {
                          setNumber(value);
                        }}
                        style={{
                          width: '70%',
                          height: PX(40),
                          fontSize: PX(15),
                          fontFamily: 'Montserrat-Regular',
                          color: '#2D2D2D',
                        }}
                        placeholderTextColor="#2D2D2D"
                      />
                    </View>

                    <Image
                      source={require('../../assets/items/mc_symbol.png')}
                      style={{
                        width: PX(32),
                        height: PX(20),
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                </View>
                <View style={styles.from}>
                  <View style={{width: '48%'}}>
                    <Text style={styles.text2}>Expiry Date</Text>
                    <View style={styles.line}>
                      <View style={{width: '15%', paddingTop: '5.6%'}}>
                        <Image
                          source={require('../../assets/items/date.png')}
                          style={{
                            width: PX(18),
                            height: PX(18),
                            fontFamily: 'Montserrat-Regular',
                          }}
                        />
                      </View>
                      <TextInput
                        placeholder="Enter expire Date"
                        value={Date}
                        onChangeText={value => {
                          setDate(value);
                        }}
                        placeholderTextColor="#2D2D2D"
                        style={styles.inputBox}
                      />
                    </View>
                  </View>
                  <View style={{width: '48%'}}>
                    <Text style={styles.text2}>cvv</Text>
                    <View style={styles.line}>
                      <View style={{width: '15%', paddingTop: '8%'}}>
                        <Image
                          source={require('../../assets/items/Hint.png')}
                          style={{width: PX(18), height: PX(13)}}
                        />
                      </View>
                      <TextInput
                        placeholder="Enter Cvv Number"
                        value={Cvv}
                        onChangeText={value => {
                          setCvv(value);
                        }}
                        placeholderTextColor="#2D2D2D"
                        secureTextEntry={true}
                        style={styles.inputBox}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.btn1}>
              <TouchableOpacity style={styles.btn2}>
                <Text style={styles.btnText}>Add Card</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        style={{backgroundColor: 'rgba(0,0,0,0.4)'}}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}>
          <TouchableOpacity
            style={{
              height: '25%',
              width: '100%',
            }}
            onPress={() => {
              setModalVisible(false);
            }}></TouchableOpacity>
          <View
            style={{
              height: '75%',
              width: '100%',
              backgroundColor: '#fff',
              borderRadius: PX(20),
            }}>
            <KeyboardAwareScrollView
              contentContainerStyle={{paddingBottom: PX(50)}}
              style={{width: '100%'}}
              showsVerticalScrollIndicator={false}>
              <View style={{width: '100%'}}>
                <View style={styles.gift1}>
                  <CardView
                    number={number}
                    name={Card}
                    expiry={Date}
                    brand={'visa'}
                  />
                </View>
                <View>
                  <View style={styles.from3}>
                    <View style={styles.email}>
                      <Text style={styles.text}>Name on card</Text>
                      <View style={styles.email1}>
                        <View style={styles.icon}>
                          <Image
                            source={require('../../assets/profile.png')}
                            style={styles.icon1}
                          />

                          <TextInput
                            placeholder="Name of Card"
                            value={Card}
                            onChangeText={value => {
                              setCard(value);
                            }}
                            style={styles.icon2}
                            placeholderTextColor="#2D2D2D"
                          />
                        </View>
                      </View>
                    </View>

                    <View style={styles.email}>
                      <Text style={styles.text2}>Card Number</Text>
                      <View style={styles.email1}>
                        <View style={styles.icon}>
                          <Image
                            source={require('../../assets/payment.png')}
                            style={styles.icon3}
                          />

                          <TextInput
                            placeholder="Card Number"
                            value={number}
                            onChangeText={value => {
                              handlecard(value);
                            }}
                            keyboardType={'number-pad'}
                            maxLength={19}
                            style={{
                              width: '70%',
                              height: PX(40),
                              fontSize: PX(15),
                              fontFamily: 'Montserrat-Regular',
                              color: '#2D2D2D',
                            }}
                            placeholderTextColor="#2D2D2D"
                          />
                        </View>

                        <Image
                          source={require('../../assets/items/mc_symbol.png')}
                          style={{
                            width: PX(32),
                            height: PX(20),
                            resizeMode: 'contain',
                          }}
                        />
                      </View>
                    </View>
                    <View style={styles.from}>
                      <View style={{width: '48%'}}>
                        <Text style={styles.text2}>Expiry Date</Text>
                        <View style={styles.line}>
                          <View style={{width: '15%', paddingTop: '5.6%'}}>
                            <Image
                              source={require('../../assets/items/date.png')}
                              style={{
                                width: PX(18),
                                height: PX(18),
                                fontFamily: 'Montserrat-Regular',
                              }}
                            />
                          </View>
                          <TextInput
                            ref={ref_expiry}
                            placeholder="MM/YY"
                            value={Date}
                            onChangeText={value => {
                              fixCardText(value);
                            }}
                            placeholderTextColor="#2D2D2D"
                            keyboardType="number-pad"
                            style={styles.inputBox}
                            maxLength={5}
                          />
                        </View>
                      </View>
                      <View style={{width: '48%'}}>
                        <Text style={styles.text2}>cvv</Text>
                        <View style={styles.line}>
                          <View style={{width: '15%', paddingTop: '8%'}}>
                            <Image
                              source={require('../../assets/items/Hint.png')}
                              style={{width: PX(18), height: PX(13)}}
                            />
                          </View>
                          <TextInput
                            ref={ref_cvv}
                            placeholder="CVV"
                            value={Cvv}
                            onChangeText={value => {
                              setCvv(value);
                              if (value.length == 3) {
                                Keyboard.dismiss();
                              }
                            }}
                            placeholderTextColor="#2D2D2D"
                            keyboardType="number-pad"
                            secureTextEntry={true}
                            style={styles.inputBox}
                            maxLength={3}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.btn1}>
                  <TouchableOpacity
                    style={styles.btn2}
                    onPress={() => onAddCard()}>
                    <Text style={styles.btnText}>Add Card</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAwareScrollView>
          </View>
        </View>
      </Modal>
      <ConfirmPopup
        modalVisible={confirmAlert}
        onRequestClose={() => {
          setConfirmAlert(false);
        }}
        title={'Confirmation Message'}
        message={'Are you sure you want to delete card?'}
        onPress={() => onDeleteCard()}
      />
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
