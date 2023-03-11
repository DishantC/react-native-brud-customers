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
import {resetPassword} from '../../Config/api';
import {Loader} from '../../Navigation/loader';
import AlertPopup from '../../Components/AlertPopup';

const index = ({navigation, route}) => {
  const [Confirm, setConfirm] = useState('');
  const [Password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertPopup, setAlertPopup] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const onResetPassword = async () => {
    var reg = /^(?=[^A-Z\n]*[A-Z])(?=[^a-z\n]*[a-z])(?=[^0-9\n]*[0-9]).{8,}$/;
    if (!reg.test(Password)) {
      setAlertMessage(
        'Password require at least one capital letter, one lower case letter and one number.',
      );
      setAlertPopup(true);
      // Alert.alert('Registration',"Password require at least one capital letter, one lower case letter and one number.")
    } else if (Confirm != Password) {
      setAlertMessage('Please Enter Valid Confirm Password.');
      setAlertPopup(true);
      // Alert.alert('Registration',"Please Enter Valid Confirm Password.")
    } else {
      try {
        setLoading(true);
        const id = encodeURIComponent(route.params?.id);
        const new_password = encodeURIComponent(Password);
        const confirm_password = encodeURIComponent(Confirm);

        const requestBody = `id=${id}&new_password=${new_password}&confirm_password=${confirm_password}`;

        const response = await resetPassword(requestBody);
        console.log('Get Api Response:::', response);
        if (!response.sucecess) {
          setLoading(false);
          setAlertMessage(response.message);
          setAlertPopup(true);
        } else {
          setLoading(false);
          setAlertMessage(response.message);
          setAlertPopup(true);
          navigation.navigate('Login', {id: route.params?.id});
        }
      } catch (err) {
        setLoading(false);
        console.log('Get Error:::', err);
        setAlertMessage('Something is wrong.');
        setAlertPopup(true);
      }
    }
    //  navigation.navigate('LoginScreen')
  };
  return (
    <View style={styles.main2}>
      <View style={{height: DeviceInfo.hasNotch() ? PX(30) : PX(10)}} />

      <Loader isLoding={loading} />
      <View style={styles.logo1}>
        <Image source={require('../../assets/logo1.png')} style={styles.logo} />
      </View>

      <View style={styles.main}>
        <Text style={styles.header}>Setup New Password</Text>
        <Text style={styles.heder1}>Type in your new password and confirm</Text>
      </View>

      <View style={{width: '96%', alignItems: 'center'}}>
        <View style={styles.email}>
          <Text style={styles.text}>Enter New Password</Text>
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

        <View>
          <View style={styles.main3}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => onResetPassword()}>
              <Text style={styles.btnText}>Reset</Text>
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
          title={'New Password'}
          message={alertMessage}
        />
      )}
    </View>
  );
};

export default index;
