import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, ImageBackground, Platform, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {PX} from '../Screen/pixel';
import Welcome from '../Screen/Welcome';
import Login from '../Screen/Login';
import SignUp from '../Screen/SignUp';
import Otp from '../Screen/Otp';
import OtpSuccess from '../Screen/optSuccess';
import PasswordReset from '../Screen/PasswordReset';
import setUpNewPassword from '../Screen/SetUpNewPassword';
import cart from '../Screen/cart';
import giftCart from '../Screen/giftCart';
import Home from '../Screen/Home';
import search from '../Screen/search';
import Notification from '../Screen/Notification';
import About from '../Screen/About';
import policy from '../Screen/term&policy';
import EditProfile from '../Screen/EditProfile';
import ChangePassword from '../Screen/ChangePassword';
import Rewards from '../Screen/Rewards';
import singleReward from '../Screen/singleReward';
import rewardHistory from '../Screen/rewardHistory';
import MenuScreen from '../Screen/MenuScreen';
import restaurant from '../Screen/restaurant';
import restaurantMenu from '../Screen/restaurantMenu';
import customize from '../Screen/customize';
import Selection from '../Screen/Payment Selection Card';
import myorder from '../Screen/myorder';
import RechargeCard from '../Screen/RechargeCard';
import confirm from '../Screen/confirm';
import SearchScreen from '../Screen/SearchScreen';
import LoadingScreen from '../Screen/LoadingScreen';
import ReviewScreen from '../Screen/ReviewScreen';
import ForgotPassword from '../Screen/ForgotPassword';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {onNotificationApi} from '../Config/api';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const navigation = () => {

  const [notificationVisible, setNotificationVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
   
  //     onNotificationVisible();
    
  // }, []);




  
  // const onNotificationVisible = async () => {
  //   try {
  //     setLoading(true);
  //     const id1 = await AsyncStorage.getItem('id');
  //     const customer_id = encodeURIComponent(id1);
  //     const requestBody = `customer_id=${customer_id}`;
  //     const listCart = await onNotificationApi(requestBody);
  //     console.log('Get Reposne dAta:::', listCart.data);
  //     if (listCart.sucecess) {
  //       console.log('listCart',listCart.data);
  //       setLoading(false);
  //       setNotificationVisible(true);
  //     } else {
  //       setLoading(false);
  //       // alert(listCart?.message);
  //     }
  //   } catch (err) {
  //     setLoading(false);
  //     console.log('Get ISsue ::', err);
  //     alert('Server issue.');
  //   }
  // };




  const HomeStack = () => {
    return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="restaurant"
          component={restaurant}
          options={{headerShown: false, tabBarVisible: false}}
        />
        <Stack.Screen
          name="restaurantMenu"
          component={restaurantMenu}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="search"
          component={search}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="cart"
          component={cart}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="myorder"
          component={myorder}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="confirm"
          component={confirm}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="policy"
          component={policy}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RechargeCard"
          component={RechargeCard}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  };
  const MenuScreenStack = () => {
    return (
      <Stack.Navigator initialRouteName="MenuScreen">
        <Stack.Screen
          name="MenuScreen"
          component={MenuScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="restaurant"
          component={restaurant}
          options={{headerShown: false, tabBarVisible: false}}
        />
        <Stack.Screen
          name="restaurantMenu"
          component={restaurantMenu}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="search"
          component={search}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="cart"
          component={cart}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="myorder"
          component={myorder}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="confirm"
          component={confirm}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="policy"
          component={policy}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RechargeCard"
          component={RechargeCard}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  };
  const RewardsStack = () => {
    return (
      <Stack.Navigator initialRouteName="Rewards">
        <Stack.Screen
          name="Rewards"
          component={Rewards}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name="singleReward"
          component={singleReward}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="rewardHistory"
          component={rewardHistory}
          options={{headerShown: false}}
        /> */}
      </Stack.Navigator>
    );
  };

  const TabStack = () => {
    return (
      <Tab.Navigator
        initialRouteName="HomeStack"
        tabBarOptions={{
          // activeTintColor: '#000',
          showLabel: false,
        }}
        screenOptions={{
          tabBarStyle: {
            position: 'absolute',
            width: '100%',
            height:Platform.OS=='ios'?PX(83): PX(70),
            borderTopColor: '#ffffff',
            backgroundColor: '#ffffff',
          },
        }}>
        <Tab.Screen
          name="MenuScreenStack"
          component={MenuScreenStack}
          options={{
            headerShown: false,
            tabBarIcon: ({focused, tintColor}) => (
              <Image
                focused={focused}
                source={require('../assets/settings.png')}
                tintColor={tintColor}
                style={{
                  width: PX(26),
                  height: PX(23),
                  tintColor: focused ? '#F55800' : '#000',
                  resizeMode: 'contain',
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="myorder"
          component={myorder}
          options={{
            headerShown: false,
            tabBarIcon: ({focused, tintColor}) => (
              <Image
                focused={focused}
                resizeMode="contain"
                source={require('../assets/order.png')}
                tintColor={tintColor}
                style={{
                  width: PX(28),
                  height: PX(30),
                  tintColor: focused ? '#F55800' : '#000',
                  resizeMode: 'contain',
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="HomeStack"
          component={Home}
          
          options={{
            headerShown: false,

            tabBarIcon: ({focused, tintColor}) => (
              <ImageBackground
                source={require('../assets/Ellipse13.png')}
                style={{
                  width: PX(52),
                  height: PX(52),
                  // tintColor: '(245, 88, 0, 0.14)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../assets/home.png')}
                  tintColor={tintColor}
                  style={{
                    width: PX(30),
                    height: PX(30),
                    tintColor: focused ? '#F55800' : '#000',
                    resizeMode: 'contain',
                  }}
                />
              </ImageBackground>
            ),
          }}
        />
        <Tab.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused, tintColor}) => (
              <Image
                focused={focused}
                source={require('../assets/serch.png')}
                tintColor={tintColor}
                style={{
                  width: PX(24.58),
                  height: PX(24.58),
                  tintColor: focused ? '#F55800' : '#000',
                  resizeMode: 'contain',
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={Notification}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.target
              // navigation.navigate('Notification');
              setNotificationVisible(false)
              //=> navigation.navigate('Search', { screen: 'Search' }); This works but the shared element transition gets jumpy
              //=> navigation.popToTop(); This works but the next time you click it, it fails because there is no screen in the stack to pop up to.
            },
          })}
          options={{
            headerShown: false,
           
            tabBarIcon: ({focused, tintColor}) => (
              <>
              <Image
                focused={focused}
                source={require('../assets/items/mss.png')}
                tintColor={tintColor}
                style={{
                  width: PX(23.5),
                  height: PX(28.2),
                  tintColor: focused ? '#F55800' : '#000',
                  resizeMode: 'contain',
                }}
              />
             {
               notificationVisible?
                <View style={styles.dotstyles} />  :null
             }
              </>
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  const AuthStack = () => {
    return (
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Otp"
          component={Otp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OtpSuccess"
          component={OtpSuccess}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PasswordReset"
          component={PasswordReset}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="setUpNewPassword"
          component={setUpNewPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  };

  // const token = async () =>{
  //   try{
  //     const userId = await AsyncStorage.getItem("UserId");
  //     if(!userId){
  //       navigation.navigate('TabStack')
  //     }
  //     else{
  //       navigation.navigate('Login')
  //     }
  //   }
  //   catch(err){
  //     alert(err);
  //   }
  // }

  // useEffect(()=>{
  // token()
  // },[]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AuthStack"
        screenOptions={{
          headerStyle: {backgroundColor: '#42f44b'},
          headerTintColor: '#fff',
          headerTitleStyle: {fontWeight: 'bold'},
        }}>
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TabStack"
          component={TabStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RechargeCard"
          component={RechargeCard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="restaurant"
          component={restaurant}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="restaurantMenu"
          component={restaurantMenu}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="customize"
          component={customize}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="cart"
          component={cart}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Selection"
          component={Selection}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name="myorder"
          component={myorder}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="confirm"
          component={confirm}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="policy"
          component={policy}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="search"
          component={search}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="singleReward"
          component={singleReward}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ReviewScreen"
          component={ReviewScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="rewardHistory"
          component={rewardHistory}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default navigation;

const styles = StyleSheet.create({
  dotstyles:{
    position: 'absolute',
    width: PX(9),
    height: PX(9),
    borderRadius: PX(6),
    backgroundColor: '#F55800',
    top:PX(10),
    right:PX(25)
  }
 
});
