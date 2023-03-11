import React,{useState} from 'react'
import { StyleSheet,Image ,Text, View ,TextInput,TouchableOpacity,FlatList} from 'react-native'
import {PX} from '../pixel'
import styles from './styles';
// import RadioGroup from 'react-native-radio-buttons-group';
const index = ({navigation}) => {
    const [radioButtons, setRadioButtons] = useState('')
    const [Small, setSmall] = useState(false);
    const [Medium, setMedium] = useState(true);
    const [Large, setLarge] = useState(false);
    const [SteamedMilk, setSteamedMilk] = useState(false)
    const [CondensedMilk, setCondensedMilk] = useState(false)
    const onSelectItem = item => {
        if (item == 'Small') {
            setSmall(true);
            setMedium(false);
            setLarge(false);
        } else if (item == 'Medium') {
            setSmall(false);
            setMedium(true);
            setLarge(false);
        } else {
            setSmall(false);
            setMedium(false);
            setLarge(true);
        }
      };

      const onSelectItem1 = item => {
        if (item == 'SteamedMilk') {
            setSteamedMilk(true);
            setCondensedMilk(false);
        } else if (item == 'CondensedMilk') {
            setSteamedMilk(false);
            setCondensedMilk(true);
        }}
    // const radioButtonsData = [{
    //     id: '1', // acts as primary key, should be unique and non-empty string
    //     label: 'Option 1',
    //     value: 'option1'
    // }, {
    //     id: '2',
    //     label: 'Option 2',
    //     value: 'option2'
    // }]
    // const onPressRadioButton=(radioButtonsArray) =>{
    //     setRadioButtons(radioButtonsArray);
    // }
    return (
        <View style={styles.main}>
            <Image source={require('../../assets/items/restaurant-interior.png')}
            style={styles.backImg} />

            <View style={styles.mainView}>
            <View style={styles.headerMain}>
                <Text style={styles.header}>Vanilla Cappuccino</Text>
                <Text style={styles.header1}>It blends rich vanilla flavor
                 with bold espresso and steamed milk.</Text>
            </View>
           <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:PX(5),paddingTop:'5%'}}>
                <Text style={{fontSize:PX(14),color:'#000',fontFamily:'Montserrat-Bold'}}>Size</Text>
                <TouchableOpacity style={{width:PX(76),height:PX(21),borderRadius:PX(11),backgroundColor:'#FFD25F',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:PX(10),color:'#000',fontFamily:'Montserrat-Regular'}}>Required</Text>
                </TouchableOpacity>
           </View>
          <View style={{flexDirection: 'row', paddingVertical: PX(10),justifyContent:'space-between',alignItems:'center',paddingHorizontal:PX(5)}}>
          <Text style={{fontSize: PX(12),color:'#000',fontFamily:'Montserrat-Regular'}}>Small</Text>
          <View style={{flexDirection:'row',alignItems:'center'}}>
          <Text style={{fontSize: PX(12),color:'#000' ,fontFamily:'Montserrat-Regular',paddingRight:'2%'}}>$4</Text>
            <TouchableOpacity
              style={{
                height: PX(20),
                // backgroundColor: male ? '#1460FF' : '#fff',
                width: PX(20),
                borderRadius: PX(10),
                borderWidth: 1,
                alignItems:'center',
                justifyContent:'center',
                borderColor: '#F55800',
              }}
              onPress={() => onSelectItem('Small')}>
            {Small &&     <View style={{height:PX(10),width:PX(10),borderRadius:PX(5),backgroundColor:'#F55800'}}></View>}
              </TouchableOpacity>
          </View>
          
        </View>

        <View style={{flexDirection: 'row', paddingVertical: PX(10),justifyContent:'space-between',alignItems:'center',paddingHorizontal:PX(5)}}>
          <Text style={{fontSize: PX(12),color:'#000',fontFamily:'Montserrat-Regular'}}>Medium</Text>
          <View style={{flexDirection:'row',alignItems:'center'}}>
          <Text style={{fontSize: PX(12),color:'#000' ,fontFamily:'Montserrat-Regular',paddingRight:'2%'}}>$7</Text>
            <TouchableOpacity
              style={{
                height: PX(20),
                // backgroundColor: male ? '#1460FF' : '#fff',
                width: PX(20),
                borderRadius: PX(10),
                borderWidth: 1,
                alignItems:'center',
                justifyContent:'center',
                borderColor: '#F55800',
              }}
              onPress={() => onSelectItem('Medium')}>
            {Medium &&     <View style={{height:PX(10),width:PX(10),borderRadius:PX(5),backgroundColor:'#F55800'}}></View>}
              </TouchableOpacity>
          </View>
          
        </View>

        <View style={{flexDirection: 'row', paddingVertical: PX(10),justifyContent:'space-between',alignItems:'center',paddingHorizontal:PX(5)}}>
          <Text style={{fontSize: PX(12),color:'#000',fontFamily:'Montserrat-Regular'}}>Large</Text>
          <View style={{flexDirection:'row',alignItems:'center'}}>
          <Text style={{fontSize: PX(12),color:'#000' ,fontFamily:'Montserrat-Regular',paddingRight:'2%'}}>$10</Text>
            <TouchableOpacity
              style={{
                height: PX(20),
                // backgroundColor: male ? '#1460FF' : '#fff',
                width: PX(20),
                borderRadius: PX(10),
                borderWidth: 1,
                alignItems:'center',
                justifyContent:'center',
                borderColor: '#F55800',
              }}
              onPress={() => onSelectItem('Large')}>
            {Large &&     <View style={{height:PX(10),width:PX(10),borderRadius:PX(5),backgroundColor:'#F55800'}}></View>}
              </TouchableOpacity>
          </View>



          
          
        </View>


        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:PX(5),paddingTop:'5%'}}>
                <Text style={{fontSize:PX(14),color:'#000',fontFamily:'Montserrat-Bold'}}>Milk</Text>
                <TouchableOpacity style={{width:PX(76),height:PX(21),borderRadius:PX(11),backgroundColor:'#9DFFA7',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:PX(10),color:'#000',fontFamily:'Montserrat-Regular'}}>Optional</Text>
                </TouchableOpacity>
           </View>
          <View style={{flexDirection: 'row', paddingVertical: PX(10),justifyContent:'space-between',alignItems:'center',paddingHorizontal:PX(5)}}>
          <Text style={{fontSize: PX(12),color:'#000',fontFamily:'Montserrat-Regular'}}>Steamed Milk</Text>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <TouchableOpacity
              style={{
                height: PX(20),
                // backgroundColor: male ? '#1460FF' : '#fff',
                width: PX(20),
                borderRadius: PX(10),
                borderWidth: 1,
                alignItems:'center',
                justifyContent:'center',
                borderColor: '#F55800',
              }}
              onPress={() => onSelectItem1('SteamedMilk')}>
            {SteamedMilk &&     <View style={{height:PX(10),width:PX(10),borderRadius:PX(5),backgroundColor:'#F55800'}}></View>}
              </TouchableOpacity>
          </View>
          
        </View>

        <View style={{flexDirection: 'row', paddingVertical: PX(10),justifyContent:'space-between',alignItems:'center',paddingHorizontal:PX(5)}}>
          <Text style={{fontSize: PX(12),color:'#000',fontFamily:'Montserrat-Regular'}}>Condensed Milk</Text>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <TouchableOpacity
              style={{
                height: PX(20),
                // backgroundColor: male ? '#1460FF' : '#fff',
                width: PX(20),
                borderRadius: PX(10),
                borderWidth: 1,
                alignItems:'center',
                justifyContent:'center',
                borderColor: '#F55800',
              }}
              onPress={() => onSelectItem1('CondensedMilk')}>
            {CondensedMilk &&     <View style={{height:PX(10),width:PX(10),borderRadius:PX(5),backgroundColor:'#F55800'}}></View>}
              </TouchableOpacity>
          </View>
          
        </View>


        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:PX(5),paddingTop:'5%'}}>
                <Text style={{fontSize:PX(14),color:'#000',fontFamily:'Montserrat-Bold'}}>Extras</Text>
               
           </View>
          <View style={{flexDirection: 'row', paddingVertical: PX(10),justifyContent:'space-between',alignItems:'center',paddingHorizontal:PX(5)}}>
          <Text style={{fontSize: PX(12),color:'#000',fontFamily:'Montserrat-Regular'}}>Foam</Text>
          <View style={{flexDirection:'row',alignItems:'center'}}>
          <Text style={{fontSize: PX(12),color:'#000' ,fontFamily:'Montserrat-Regular',paddingRight:'2%'}}>+91</Text>
            <TouchableOpacity
              style={{
                height: PX(18),
                // backgroundColor: male ? '#1460FF' : '#fff',
                width: PX(18),
                // borderRadius: PX(10),
                borderWidth: 1,
                alignItems:'center',
                justifyContent:'center',
                borderColor: '#F55800',
              }}>
            {/* //   onPress={() => onSelectItem1('SteamedMilk')}>
            // {SteamedMilk &&     <View style={{height:PX(10),width:PX(10),borderRadius:PX(5),backgroundColor:'#F55800'}}></View>} */}
              </TouchableOpacity>
          </View>
          
        </View>
            <View style={styles.btnMain}>
                <View style={styles.btn1}>
                    <TouchableOpacity ><Text style={styles.btn1Text}>-</Text></TouchableOpacity>
                    <Text style={styles.btn1Text2}>2</Text>
                    <TouchableOpacity ><Text >+</Text></TouchableOpacity>
                </View>
                <TouchableOpacity 
                onPress={()=>{navigation.navigate('cart')}}
                style={styles.btn2}>
                    <Text style={styles.add}>ADD ITEM</Text>
                    <View>
                        <Text style={styles.total}>Total</Text>
                        <Text style={styles.add}>$14</Text>
                    </View>
                </TouchableOpacity>
            </View>
            </View>
        </View>
    )
}

export default index

