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
import {WebView} from 'react-native-webview';

const index = ({navigation}) => {
  return (
    <View style={styles.main}>
      <View style={{height: DeviceInfo.hasNotch() ? PX(30) : PX(10)}} />
      <View style={styles.header}>
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
        <View style={{paddingLeft: PX(110)}}>
          <Text style={styles.headerText}>About Brud</Text>
        </View>
      </View>

      <View style={styles.header1}>
        <WebView
          javaScriptEnabled={true}
          source={{uri: 'https://www.brudrewards.com/'}}
          style={{marginBottom: PX(10)}}
          // injectedJavaScript={myInjectedJs}
        />
      </View>

      {/* <View style={styles.header1}>
        <Text style={{fontFamily: 'Montserrat-Bold', color: '#000'}}>
          A brief about Brud
        </Text>
      </View>

      <View style={styles.content}>
        <Text
          style={{
            fontSize: PX(13),
            textAlign: 'justify',
            color: '#000',
            fontFamily: 'Montserrat-Regular',
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>

        <View style={{paddingTop: '10%'}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: PX(13),
              color: '#000',
              fontFamily: 'Montserrat-Bold',
            }}>
            de Finibus Bonorum et Malorum
          </Text>
        </View>
        <View style={{paddingTop: '3%'}}>
          <View>
            <Text
              style={{
                fontSize: PX(13),
                textAlign: 'justify',
                color: '#000',
                fontFamily: 'Montserrat-Regular',
              }}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni
            </Text>
            <Text
              style={{
                fontSize: PX(13),
                textAlign: 'justify',
                color: '#000',
                fontFamily: 'Montserrat-Regular',
              }}>
              dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
              quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
              adipisci velit, sed quia non numquam eius modi tempora incidunt ut
              labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad
              minima veniam.
            </Text>
          </View>
        </View>
      </View> */}
    </View>
  );
};

export default index;
