import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {PX} from '../pixel';
import DeviceInfo from 'react-native-device-info';
import styles from './styles';
import CountryPicker from 'react-native-country-picker-modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  customerProfileGetApi,
  updateProfileApi,
  UploadImage,
} from '../../Config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loader} from '../../Navigation/loader';
import AlertPopup from '../../Components/AlertPopup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const index = ({navigation}) => {
  const [FName, setFName] = useState('');
  const [filePath, setFilePath] = useState([]);
  const [LName, setLName] = useState('');
  const [Email, setEmail] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [Password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState('US');
  const [callingCode, setCallingCode] = useState('+1');
  const [Visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [alertPopup, setAlertPopup] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [success,setSuccess] = useState(false)

  useEffect(() => {
    onGetProfile();
  }, []);

  const onGetProfile = async () => {
    try {
      setLoading(true);
      const id1 = await AsyncStorage.getItem('id');

      const user_id = encodeURIComponent(id1);
      const requestBody = `user_id=${user_id}`;

      const response = await customerProfileGetApi(requestBody);
      console.log('Get Api Response:::GetPRofile', response);
      if (!response.sucecess) {
        setLoading(false);
        // alert(response.message)
        setAlertMessage(response.message);
        setAlertPopup(true);
      } else {
        setLoading(false); 
        setFName(response.data.name);
        setLName(response.data.username);
        setEmail(response.data.email);
        let num = response.data.phone_number.replace('-', '');
        let num1 = num.replace('(', '');
        let num2 = num1.replace(')', '');
        let num3 = num2.replace('-', '');
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
        setPhoneNumber(newText);
        //  setPhoneNumber(response.data.phone_number)
        if (response?.data?.image != undefined) {
          var filename = response?.data?.image.substring(
            response?.data?.image.lastIndexOf('/') + 1,
          );
          var type = response?.data?.image.substring(
            response?.data?.image.lastIndexOf('.') + 1,
          );
          // setProfile(response.data.image)
          console.log("Get Image DAta::::",response.data?.image)
          setFilePath([
            {
              uri: response.data?.image,
              fileName: filename,
              type: `image/${type}`,
            },
          ]);
        }
        //  setCafeList(response.data)
      }
    } catch (err) {
      setLoading(false);
      console.log('errr',err);
      // alert('Server issue.')
      setAlertMessage('Server issue.');
      setAlertPopup(true);
    }
  };

  const onUpdateProfile = async () => {
    try {
      setLoading(true);
    var email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (FName == '') {
        setLoading(false);
        // alert("Please Enter Your Name.")
        setAlertMessage('Please enter your first name');
      setAlertPopup(true);
      } else if (LName == '') {
        setLoading(false);
        setAlertMessage('Please enter your username');
      setAlertPopup(true);
        // alert("Please Enter Your EmailId.")
      } else if (Email == '') {
        setLoading(false);
        setAlertMessage('Please enter your emailId');
      setAlertPopup(true);
        // alert("Please Enter Your EmailId.")
      }else if (!email.test(Email)) {
        setLoading(false);
        setAlertMessage('Please enter valid emailId');
      setAlertPopup(true);
        // alert("Please Enter Valid  EmailId.")
      } else if (PhoneNumber == '') {
        setLoading(false);
        setAlertMessage('Please enter your phone number');
      setAlertPopup(true);
        // alert("Please Enter Your Mobile Number.")
      } 
      else{
        
        const id1 = await AsyncStorage.getItem('id');
        if (filePath.length > 0) {
          var formdata = new FormData();
        formdata.append('image', {
          name: filePath[0]?.fileName,
          uri: filePath[0]?.uri,
          type: filePath[0]?.type,
        });
        
        const imagePath = await UploadImage(formdata);
        
          const user_id = encodeURIComponent(id1);
          const name = encodeURIComponent(FName);
          const country_code = encodeURIComponent('+91');
          const phone_number = encodeURIComponent(PhoneNumber);
          const email=encodeURIComponent(Email);
          const username=encodeURIComponent(LName);
          const image = encodeURIComponent(imagePath.data.filepath_url);
          const requestBody = `user_id=${user_id}&name=${name}&country_code=${country_code}&phone_number=${phone_number}&email=${email}&username=${username}&image=${image}`;
  
          const response = await updateProfileApi(requestBody);
          console.log('Get Api Response:::', response); 
          if (!response.sucecess) {
            setLoading(false);
            // alert(response.message)
            setAlertMessage(response.message);
            setAlertPopup(true);
          } else {
            setSuccess(true)

            setLoading(false);
            //  Alert.alert('Profile','Profile Update Successful.')
            setAlertMessage('Profile Update Successful.');
            setAlertPopup(true);
            
            //  setCafeList(response.data)
          }
        } else {
          const user_id = encodeURIComponent(id1);
          const name = encodeURIComponent(FName);
          const country_code = encodeURIComponent('+91');
          const phone_number = encodeURIComponent(PhoneNumber);
          const email=encodeURIComponent(Email);
          const username=encodeURIComponent(LName);

          const requestBody = `user_id=${user_id}&name=${name}&country_code=${country_code}&phone_number=${phone_number}&email=${email}&username=${username}`;
  
          const response = await updateProfileApi(requestBody);
          console.log('Get Api Response:::', response);
          if (!response.sucecess) {
            setLoading(false);
            setAlertMessage(response.message);
            setAlertPopup(true);
          } else {
            setSuccess(true)
            setLoading(false);
            setAlertMessage('Profile Update Successful.');
            setAlertPopup(true);
            
            // navigation.navigate('MenuScreen');
          }
        }
      }
      
    } catch (err) {
      setLoading(false);
      console.log('Error:::', err);
    }
    // {
    //   navigation.navigate('TabStack');
    // }
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        // alert('User cancelled camera picker');
        setAlertMessage('User cancelled camera picker');
        setAlertPopup(true);
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        // alert('Camera not available on device');
        setAlertMessage('Camera not available on device');
        setAlertPopup(true);
        return;
      } else if (response.errorCode == 'permission') {
        // alert('Permission not satisfied');
        setAlertMessage('Permission not satisfied');
        setAlertPopup(true);
        return;
      } else if (response.errorCode == 'others') {
        // alert(response.errorMessage);
        setAlertMessage(response.errorMessage);
        setAlertPopup(true);
        return;
      }
      // console.log('base64 -> ', response.base64);
      // console.log('uri -> ', response.uri);
      // console.log('width -> ', response.width);
      // console.log('height -> ', response.height);
      // console.log('fileSize -> ', response.fileSize);
      // console.log('type -> ', response.type);
      // console.log('fileName -> ', response.fileName);
      // setFilePath(response);
      //  setFilePath(response);
      setFilePath(response.assets);
      // response.assets.map((item, index) => {
      //   console.log('image======>', item.uri);

      // });
    });
  };

  const phoneNumberString = async text => {
    let newText = '';
    let cleaned = ('' + text).replace(/\D/g, '');
    for (var i = 0; i < cleaned.length; i++) {
      if (i == 3) {
        newText = newText + '-';
      } else if (i == 6) {
        newText = newText + '-';
      }
      newText = newText + cleaned[i];
    }
    setPhoneNumber(newText);
   
  };

  return (
    <View style={styles.main}>
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
        <View style={{paddingLeft: PX(120)}}>
          <Text style={styles.headerText2}>Edit Profile</Text>
        </View>
      </View>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: PX(130)}}>
        <View style={{width: '98%', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              // position:'absolute',
              borderRadius: 50,
              backgroundColor: '#B2B0AF',
              width: 104,
              height: 104,

              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => chooseFile('photo')}>
            {filePath?.length <= 0 ? (
              <Image
                source={require('../../assets/profile.png')}
                style={{
                  width: PX(80),
                  height: PX(80),
                  resizeMode:"contain"
                }}
              />
            ) : (
              <Image
                source={{uri: filePath[0]?.uri}}
                style={{borderRadius: 50, width: 104, height: 104}}
              />
            )}
          </TouchableOpacity>

          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: '40%',
              width: PX(21),
              height: PX(21),
              backgroundColor: '#ffffff',
              borderRadius: PX(10),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => chooseFile('photo')}>
              <Image
                source={require('../../assets/camera1.png')}
                style={{
                  width: PX(12),
                  height: PX(10),
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.from}>
          <View style={{width: '48%'}}>
            <Text style={styles.text2}>Your Name</Text>
            <View style={styles.line}>
              <TextInput
                placeholder="Your Name"
                value={FName}
                onChangeText={value => {
                  setFName(value);
                }}
                placeholderTextColor="#2D2D2D"
                style={styles.inputBox}
              />
            </View>
          </View>
          <View style={{width: '48%'}}>
            <Text style={styles.text2}>User Name</Text>
            <View style={styles.line}>
              <TextInput
                placeholder="User Name"
                value={LName}
                onChangeText={value => {
                  setLName(value);
                }}
          
                placeholderTextColor="#2D2D2D"
                style={{
                  // paddingTop:PX(5),
                  fontSize: PX(15),
                  width: '100%',
                  height: PX(40),
                  color: 'rgb(0,0,0)',
                  fontFamily: 'Montserrat-Regular',
                }}
              />
            </View>
          </View>
        </View>

        <View style={styles.email}>
          <Text style={styles.text2}>Email address</Text>
          <View style={styles.email1}>
            <TextInput
              placeholder="Email address"
              value={Email}
              onChangeText={value => {
                setEmail(value);
              }}
              style={{
                width: '100%',
                height: PX(40),
                color: 'rgb(0,0,0)',
                fontSize: PX(15),
                fontFamily: 'Montserrat-Regular',
              }}
              placeholderTextColor="#2D2D2D"
            />
          </View>
          {/* <View style={styles.email2}>
             <View style={styles.line}/>
             </View> */}
        </View>

        <View style={{width: '93%', paddingTop: '10%',alignSelf:'center'}}>
          <Text style={styles.text2}>Phone Number</Text>
        </View>

        <View style={[styles.textInputView, {justifyContent: 'space-between'}]}>
          <View style={[styles.imageView1, {flexDirection: 'row'}]}>
            <Image
              style={{height: PX(25), width: PX(25), resizeMode: 'contain'}}
              source={require('../../assets/flag.png')}
            />
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: PX(16),
                marginLeft: PX(5),
                color: 'rgb(0,0,0)',
              }}>
              +1
            </Text>
            <Image
              style={styles.Images}
              source={require('../../assets/Polygon.png')}
            />
          </View>
          <TextInput
            value={PhoneNumber}
            onChangeText={text => phoneNumberString(text)}
            style={styles.TextInputStyle1}
            placeholder={'Mobile Number'}
            keyboardType={'numeric'}
            maxLength={12}
          />
        </View>

        <TouchableOpacity
          style={styles.email}
          onPress={() => {
            navigation.navigate('ChangePassword');
          }}>
          <Text style={styles.text3}>Change Password</Text>
        </TouchableOpacity>

        <View>
          <View style={styles.main3}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => onUpdateProfile()}>
              <Text style={styles.btnText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
      {alertPopup && (
        <AlertPopup
          modalVisible={alertPopup}
          onRequestClose={() => {
            setAlertPopup(false);
            if(success){
              setSuccess(false)
              navigation.navigate('MenuScreen');
            }
            // navigation.navigate('MenuScreen');
          }}
          title={'Profile'}
          message={alertMessage}
        />
      )}
    </View>
  );
};

export default index;
