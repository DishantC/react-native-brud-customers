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

      <Image source={require('../../assets/locked.png')} style={styles.Image} />
      <View style={styles.image}>
        <Text style={styles.text1}>
          we have sent you a password recovery link
        </Text>
        <Text style={styles.text1}>on your register email address</Text>
      </View>

      <View style={styles.main3}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate('setUpNewPassword');
          }}>
          <Text style={styles.btnText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default index;
