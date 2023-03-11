import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import {PX} from '../pixel';
import DeviceInfo from 'react-native-device-info';
import styles from './styles';
import Selection from '../../Screen/Payment Selection Card';
import {
  CreditCardInput,
  LiteCreditCardInput,
  CardView,
} from 'react-native-credit-card-input';
import {AddCardApi, CardListApi, DeleteCardApi} from '../../Config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from 'react-native-snap-carousel';

const {width: screenWidth} = Dimensions.get('window');

const index = ({navigation}) => {
  const cardRef = useRef(null);
  const [amount, setAmount] = useState('');
  const [Visible, setVisible] = useState(false);
  const [Email, setEmail] = useState('');
  const [Date, setDate] = useState('');
  const [Cvv, setCvv] = useState('');
  const [Card, setCard] = useState('');
  const [number, setNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [cardDetails, setCardDetails] = useState(null);
  const [cardList, setCardList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      onCardList();
    });
  }, []);

  const onCardList = async () => {
    try {
      setLoading(true);
      const id1 = await AsyncStorage.getItem('id');

      const customer_id = encodeURIComponent(id1);
      const requestBody = `customer_id=${customer_id}`;

      const response = await CardListApi(requestBody);
      console.log('Get Api Response:::', response);
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

  const onAddAmount = async () => {
    const amounts = JSON.parse(await AsyncStorage.getItem('cardAmount'));
    if (amounts == null) {
      AsyncStorage.setItem('cardAmount', JSON.stringify(amount));
      navigation.navigate('Selection');
    } else {
      const total = amounts + parseInt(amount);
      AsyncStorage.setItem('cardAmount', JSON.stringify(total));
      navigation.navigate('Selection');
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
    return formattedText;
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

  const fixCardText = text => {
    if (text.length == 2 && Date.length == 1) {
      text += '/';
    } else if (text.length == 2 && Date.length == 3) {
      text = text.substring(0, text.length - 1);
    }
    setDate(text);
  };

  return (
    <View style={styles.main2}>
      <View style={{height: DeviceInfo.hasNotch() ? PX(30) : PX(10)}} />
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
        <Text style={styles.headerText2}>Recharge Gift Card</Text>
        <View style={{width: '15%'}} />
      </View>

      <View style={styles.box}>
        <View style={styles.InputLine}>
          <Text style={{color: '#2D2D2D', fontFamily: 'Montserrat-Regular'}}>
            $
          </Text>
          <TextInput
            placeholder="0"
            value={amount}
            onChangeText={value => {
              setAmount(value);
            }}
            placeholderTextColor="#2D2D2D"
            keyboardType="number-pad"
            style={{color: '#2D2D2D', fontFamily: 'Montserrat-Regular'}}
          />
        </View>
        <Text 
          style={{
            fontSize: PX(13),
            fontFamily: 'Montserrat-Regular',
            color: '#000',
            paddingTop: '3%',
          }}>
          Enter Amount
        </Text>
      </View>

      <View style={{width: '100%'}}>
        <Text style={styles.visible}>Credit/Debit Card</Text>
        <View style={styles.visible1}>
          {/* <Image
            source={require('../../assets/Card5.png')}
            style={styles.visible2}
          /> */}
          <Carousel
            ref={c => {
              cardRef.current = c;
            }}
            data={cardList}
            renderItem={({item, index}) => {
              setCardDetails(item);
              return (
                <CardView
                  number={`${item.card_number}`}
                  name={item.name_of_card}
                  expiry={item.expiry_date}
                  brand={'visa'}
                />
              );
            }}
            sliderWidth={screenWidth}
            itemWidth={screenWidth - 90}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          // onPress={()=>{setVisible(4)}}
        >
          <Text style={styles.visible3}>+ Add Another Card</Text>
        </TouchableOpacity>
        <View style={styles.visible4}>
          <TouchableOpacity
            style={styles.visible5}
            onPress={() => onAddAmount()}>
            <Text style={styles.visible6}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
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
            <ScrollView
              contentContainerStyle={{paddingBottom: PX(100)}}
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
                            placeholder="4747 4747 4747 4747 "
                            value={number}
                            onChangeText={value => {
                              handlecard(value);
                            }}
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
                            placeholder="20/01"
                            value={Date}
                            onChangeText={value => {
                              fixCardText(value);
                            }}
                            placeholderTextColor="#2D2D2D"
                            keyboardType="numeric"
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
                            placeholder="912"
                            value={Cvv}
                            onChangeText={value => {
                              setCvv(value);
                            }}
                            keyboardType="numeric"
                            secureTextEntry={true}
                            placeholderTextColor="#2D2D2D"
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
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default index;
