import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import {PX} from '../pixel';
import DeviceInfo from 'react-native-device-info';
import styles from './styles';
import QRCode from 'react-native-qrcode-svg';
const index = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [Visible, setVisible] = useState(false);

  let base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..';
  const DATA = [
    {
      img: require('../../assets/Card5.png'),
    },
    {
      img: require('../../assets/card7.png'),
    },
    {
      img: require('../../assets/card4.png'),
    },
    {
      img: require('../../assets/card8.png'),
    },
  ];

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.Image}>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <Image
            source={item.img}
            style={{width: PX(335), height: PX(178.72)}}
            resizeMode="contain"
          />
        </TouchableOpacity>
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
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('HomeStack');
            }}>
            <Image
              source={require('../../assets/backGo.png')}
              style={styles.back}
            />
          </TouchableOpacity>
        </View>
        <View style={{paddingLeft: PX(100)}}>
          <Text style={styles.headerText2}>Payment Methods</Text>
        </View>
      </View>
      <View style={{width: '100%', height: '100%'}}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          Vertical
        />
      </View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={{width: '100%', height: '100%', backgroundColor: '#000'}}>
          <View style={styles.header2}>
            <View style={{paddingLeft: '10%'}}>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Image
                  source={require('../../assets/backGo.png')}
                  style={styles.back1}
                />
              </TouchableOpacity>
            </View>
            <View style={{paddingLeft: PX(100)}}>
              <Text style={styles.headerText3}> Scan Reward</Text>
            </View>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                width: PX(330),
                height: PX(494),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderRadius: PX(10),
              }}>
              <QRCode
                value="Just some string value"
                logo={{uri: base64Logo}}
                logoSize={80}
                logoBackgroundColor="transparent"
                size={200}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '110%',
                  paddingTop: PX(50),
                }}>
                <View
                  style={{
                    width: PX(33),
                    height: PX(33),
                    borderRadius: PX(22),
                    backgroundColor: '#000',
                  }}
                />
                <View
                  style={{
                    width: PX(33),
                    height: PX(33),
                    borderRadius: PX(22),
                    backgroundColor: '#000',
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '90%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: PX(50),
                }}>
                <View style={{width: '40%'}}>
                  <Text
                    style={{
                      fontSize: PX(22),
                      color: '#000',
                      fontFamily: 'Montserrat-Regular',
                    }}>
                    Redeem Points
                  </Text>
                </View>
                <View style={{width: '23%'}}>
                  <Text
                    style={{
                      fontSize: PX(36),
                      color: '#F55800',
                      fontFamily: 'Montserrat-Regular',
                    }}>
                    150
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                width: PX(300),
                height: PX(25),
                backgroundColor: '#F4F4F4',
                borderBottomRightRadius: PX(20),
                borderBottomLeftRadius: PX(20),
              }}
            />
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                width: PX(250),
                height: PX(20),
                backgroundColor: '#F4F4F4',
                borderBottomRightRadius: PX(20),
                borderBottomLeftRadius: PX(20),
              }}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '15%',
            }}>
            <Text
              style={{
                fontSize: PX(18),
                color: '#fff',
                fontFamily: 'Montserrat-Regular',
              }}>
              Bring the phone to the scanner to{' '}
            </Text>
            <Text
              style={{
                fontSize: PX(18),
                color: '#fff',
                fontFamily: 'Montserrat-Regular',
              }}>
              read the QR code
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default index;
