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
import {changePasswordApi} from '../../Config/api';
import {Loader} from '../../Navigation/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertPopup from '../../Components/AlertPopup';

const index = ({navigation}) => {
  const [Confirm, setConfirm] = useState('');
  const [Password, setPassword] = useState('');
  const [NewPass, setNewPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertPopup, setAlertPopup] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const onChangePass = async () => {
    var reg = /^(?=[^A-Z\n]*[A-Z])(?=[^a-z\n]*[a-z])(?=[^0-9\n]*[0-9]).{8,}$/;

    if (Password == '') {
      // alert("Please Enter Your Current Password.")
      setAlertMessage('Please Enter Your Current Password.');
      setAlertPopup(true);
    } else if (NewPass == '') {
      // alert("Please Enter Your New Password.")
      setAlertMessage('Please Enter Your New Password.');
      setAlertPopup(true);
    } else if (Password == NewPass) {
      // alert("Please Enter Your New Password.")
      setAlertMessage(
        'This password is already exists. please enter different password.',
      );
      setAlertPopup(true);
    } else if (!reg.test(NewPass)) {
      setAlertMessage(
        'Password require at least one capital letter, one lower case letter and one number.',
      );
      setAlertPopup(true);
      // Alert.alert('Registration',"Password require at least one capital letter, one lower case letter and one number.")
    } else if (Confirm == '') {
      // alert("Please Enter Confirm Password.")
      setAlertMessage('Please Enter Confirm Password.');
      setAlertPopup(true);
    } else if (Confirm != NewPass) {
      // alert("Please Enter Valid  Confirm Password.")
      setAlertMessage('Please Enter Valid  Confirm Password.');
      setAlertPopup(true);
    } else {
      try {
        setLoading(true);
        const id1 = await AsyncStorage.getItem('id');
        const id = encodeURIComponent(id1);
        const old_password = encodeURIComponent(Password);
        const new_password = encodeURIComponent(NewPass);

        const requestBody = `id=${id}&old_password=${old_password}&new_password=${new_password}`;

        const res = await changePasswordApi(requestBody);
        console.log('Get Response::', res);
        if (!res.sucecess) {
          setLoading(false);
          //  alert('Please Enter Valid Current Password')
          setAlertMessage('Please Enter Valid Current Password');
          setAlertPopup(true);
        } else {
          setLoading(false);
          navigation.goBack();
        }
      } catch (err) {
        setLoading(false);
        console.log('Get Error:::', err);
      }
    }
  };

  return (
    <View style={styles.main2}>
      <View style={{height: DeviceInfo.hasNotch() ? PX(30) : PX(10)}} />

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
        <View style={{paddingLeft: PX(80)}}>
          <Text style={styles.headerText2}>Change Password</Text>
        </View>
      </View>

      <View
        style={{
          width: '96%',
          height: '78%',
          alignItems: 'center',
          paddingTop: '1%',
          justifyContent: 'space-between',
        }}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={styles.email01}>
            <Text style={styles.text}>Enter Current Password</Text>
            <View style={styles.email1}>
              <TextInput
                value={Password}
                onChangeText={value => {
                  setPassword(value);
                }}
                placeholderTextColor="#2D2D2D"
                style={{
                  width: '100%',
                  height: PX(40),
                  color: '#000',
                  fontSize: PX(15),
                  fontFamily: 'Montserrat-Regular',
                }}
                secureTextEntry={true}
                placeholder="*******"
              />
            </View>
            {/* <View style={styles.email2}>
             <View style={styles.line}/>
             </View> */}
          </View>

          <View style={styles.email}>
            <Text style={styles.text}>Enter New Password</Text>
            <View style={styles.email1}>
              <TextInput
                value={NewPass}
                onChangeText={value => {
                  setNewPass(value);
                }}
                placeholderTextColor="#2D2D2D"
                style={{
                  width: '100%',
                  height: PX(40),
                  color: '#000',
                  fontSize: PX(15),
                  fontFamily: 'Montserrat-Regular',
                }}
                secureTextEntry={true}
                placeholder="*******"
              />
            </View>
            {/* <View style={styles.email2}>
             <View style={styles.line}/>
             </View> */}
          </View>
          <View style={styles.email}>
            <Text style={styles.text}>Confirm New Password</Text>
            <View style={styles.email1}>
              <TextInput
                value={Confirm}
                onChangeText={value => {
                  setConfirm(value);
                }}
                placeholderTextColor="#2D2D2D"
                style={{
                  width: '100%',
                  height: PX(40),
                  color: '#000',
                  fontSize: PX(15),
                  fontFamily: 'Montserrat-Regular',
                }}
                secureTextEntry={true}
                placeholder="*******"
              />
            </View>
            {/* <View style={styles.email2}>
             <View style={styles.line}/>
             </View> */}
          </View>
        </View>
        <View>
          <View style={styles.main3}>
            <TouchableOpacity style={styles.btn} onPress={() => onChangePass()}>
              <Text style={styles.btnText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {alertPopup && (
        <AlertPopup
          modalVisible={alertPopup}
          onRequestClose={() => {
            setAlertPopup(false);
          }}
          title={'Change password'}
          message={alertMessage}
        />
      )}
    </View>
  );
};

export default index;
