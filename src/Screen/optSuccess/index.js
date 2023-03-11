import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {PX} from '../pixel';
import DeviceInfo from 'react-native-device-info';
import styles from './styles';
const index = ({navigation}) => {
  return (
    <View style={styles.main}>
      <View style={{height: DeviceInfo.hasNotch() ? PX(30) : PX(10)}} />
      <View
        style={{
          position: 'absolute',
          top: DeviceInfo.hasNotch() ? PX(50) : PX(35),
          left: PX(25),
        }}></View>
      <View>
        <Image
          source={require('../../assets/Successfully.png')}
          style={{width: PX(200), height: PX(200)}}
        />
      </View>
      <View style={styles.heder}>
        <Text style={styles.heder1}>you have been verified</Text>
        <Text style={styles.text}>Successfully!</Text>
      </View>

      <View style={styles.main3}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.replace('TabStack');
          }}>
          <Text style={styles.btnText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default index;
