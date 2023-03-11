import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {PX} from '../pixel';
import DeviceInfo from 'react-native-device-info';
import styles from './styles';
import {
  AddCartApi,
  itemDetailsApi,
  itemListApi,
  orderCategoryApi,
  ListCartApi,
  DeleteCartItemApi,
  onItemListApi
} from '../../Config/api';
import {Loader} from '../../Navigation/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertPopup from '../../Components/AlertPopup';
import AlertDeletePopup from "../../Components/AlertDeletePopup";
import radio from '../../assets/radio.png';
import select from '../../assets/select.png';
const category = [
  {
    name: 'Cappuccino',
  },
  {
    name: 'Espresso',
  },
  {
    name: 'Latte',
  },
  {
    name: 'Cold Coffee',
  },
];
let prices = 0;
const index = ({navigation, route}) => {
  const [Item, setItem] = useState('');
  const [Visible, setVisible] = useState(true);
  const [Small, setSmall] = useState(false);
  const [Medium, setMedium] = useState(true);
  const [Large, setLarge] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [SteamedMilk, setSteamedMilk] = useState(false);
  const [CondensedMilk, setCondensedMilk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [itemName, setItemName] = useState('');
  const [productType, setProductType] = useState('');
  const [categoryType, setCategoryType] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [itemCount, setItemCount] = useState(1);
  const [itemId, setItemId] = useState('');
  const [modifierData, setModifierData] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState('Coffee');
  const [alertPopup, setAlertPopup] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertDeletePopup, setAlertDeletePopup] = useState(false);
  const [alertDeleteMessage, setAlertDeleteMessage] = useState('');
  const [listCart, setListCart] = useState([]);
  const [masterDataSource,setMasterDataSource] = useState([])

  // useEffect(() => {
  //   const subscribe = navigation.addListener('focus', () => {
  //     onListCart();
  //   });
  // }, []);

  const onListCart = async () => {
    try {
      const id1 = await AsyncStorage.getItem('id');

      const id = encodeURIComponent(id1);

      const requestBody = `id=${id}`;

      const listcart = await ListCartApi(requestBody);
      console.log('Get Reposne dAta:::', listcart);
      if (listcart.sucecess) {
        setListCart(listcart?.data);
      } else {
        // alert(listcart?.message)
        setAlertMessage(listcart?.message);
        setAlertPopup(true);
        // setModalVisible(!modalVisible)
      }
    } catch (err) {
      setAlertMessage('Server issue.');
      setAlertPopup(true);
    }
  };

  const onSelectItem = async (item, modifier) => {
    let data = false;
    let items = [];

    items = modifierData;

    items.map((item1, index) => {
      if (item1.modifiers.length > 0) {
        item1.modifiers.filter((i, index1) => {
          if (item1.is_required != 1) {
            if (i.modifier_name == modifier.modifier_name) {
              console.log(
                'Get Valeu::::',
                parseFloat(price) + parseFloat(i.price),
              );
              console.log(
                'Get Valeu::::',
                parseFloat(prices) + parseFloat(i.price),
              );
              if (!i.visible || i.visible == undefined) {
                setPrice(parseFloat(price) + parseFloat(i.price));
                prices = parseFloat(prices) + parseFloat(i.price);
                return (i.visible = true);
              } else {
                setPrice(parseFloat(price) - parseFloat(i.price));
                prices = parseFloat(prices) - parseFloat(i.price);
                return (i.visible = false);
              }
            }
          }
        });
      } else {
        prices = item1.price;
      }

      console.log('GEt DATA::::', item1);
    });

    setModalVisible(true);
    setLoading(true);
    setModifierData(items);
    setLoading(false);
    setSelectedItem([]);
    setSelectedItem(items);
  };

  const onSelectItem1 = async (item, modifier) => {
    let data = false;
    let items = [];

    items = modifierData;

    items.map((item1, index) => {
      item1.modifiers.filter((i, index1) => {
        if (item1.is_required == 1) {
          if (i.modifier_name == modifier.modifier_name) {
            if (!i.visible) {
              setPrice(parseFloat(price) + parseFloat(i.price));
              prices = parseFloat(prices) + parseFloat(i.price);
              return (i.visible = true);
            }
            // else{
            //   setPrice(parseFloat(price)-parseFloat(i.price))
            //   return i.visible=false
            // }
          } else {
            if (i.visible) {
              console.log('GEt DATA::::', price, i.price);
              setPrice(parseFloat(price) - parseFloat(i.price));
              prices = parseFloat(prices) - parseFloat(i.price);
              return (i.visible = false);
            }
          }
        }

        // else{
        //   return i.visible=false
        // }
      });
    });

    setModalVisible(true);
    setLoading(true);
    setModifierData(items);
    setLoading(false);
    setSelectedItem([]);
    setSelectedItem(items);
  };

  useEffect(() => {
    getItemList();
    // getCategory();
  }, []);

  const getCategory = async () => {
    try {
      setLoading(true);
      const itemList = await orderCategoryApi();
      console.log('Get Item List>>>>>>', itemList);
      if (itemList?.sucecess) {
        setLoading(false);
        setCategory(itemList.data);
        
      } else {
        setLoading(false);
        //  alert(itemList.message)
        setAlertMessage(itemList.message);
        setAlertPopup(true);
      }
    } catch (err) {
      setLoading(false);
      console.log('GEt Error::', err);
    }
  };

  const onCategoryManage = async name => {
    setLoading(true);
    // setItemList([]);
    setCategoryName(name);

    // const id1 = await AsyncStorage.getItem('id');
    // console.log('Get ID::', id1);
    // const id = encodeURIComponent(route.params?.id);
    // const category = encodeURIComponent(name);
    // const requestBody = `id=${id}&category=${category}`;
    // const itemList = await itemListApi(requestBody);
    // console.log('Get Item List>>>>>>', itemList);
    // if (itemList?.sucecess) {
    //   setLoading(false);
    //   setItemList(itemList.data);
    // } else {
    //   setLoading(false);
    //   setAlertMessage(itemList.message);
    //   setAlertPopup(true);
    // }
  };

  const getItemList = async () => {
    setLoading(true);
    try{
     
      const id = encodeURIComponent(route.params?.id);
      const requestBody = `rest_id=${id}`;
      const response = await onItemListApi(requestBody);
      console.log("Get Rest_ID>>>",response)
      if (!response.sucecess) {
        setLoading(false);
        setAlertMessage(response.message);
        setAlertPopup(true);
      } else {
        setCategory(response.category);
        setCategoryName(response?.category[0]?.category_name)
        setItemList(response.data);
        setMasterDataSource(response.data)
        // categoryName(response.category[0]?.category_name)
        setLoading(false);
      }
    }
    catch(err){
      setLoading(false);
      console.log('GET ERROR:::::', err);
      // alert('Server issue.')
      setAlertMessage('Please check your network.');
      setAlertPopup(true);
    }
  };

  const onSearchFunc = async text => {
    setItem(text);
      if (text!='') {
        const newData = masterDataSource.filter(
          function (item) {
            const itemData = item.item_name
              ? item.item_name.toUpperCase()
              : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setItemList(newData);
      } else {
        setItemList(masterDataSource);
      }
    // try {
    //   setLoading(true);
    //   const id = encodeURIComponent(route.params?.id);
    //   const requestBody = `id=${id}&search=${text}`;

    //   const response = await itemListApi(requestBody);
    //   console.log('Get Api Response:::', response);
    //   if (!response.sucecess) {
    //     setLoading(false);
    //     // alert(response.message)
    //     setAlertMessage(response.message);
    //     setAlertPopup(true);
    //   } else {
    //     setLoading(false);
    //     setItemList(response.data);
    //   }
    // } catch (err) {
    //   setLoading(false);
    //   setAlertMessage('Please check your network.');
    //   setAlertPopup(true);
    // }
  };

  const onItemDetails = async id => {
    prices = 0;
    try {
      setLoading(true);
      const id1 = encodeURIComponent(id);
      const requestBody = `item_id=${id1}`;

      const response = await itemDetailsApi(requestBody);
      console.log('Get Api Response:::', response.data);
      if (!response.sucecess) {
        setLoading(false);
        // alert(response.message)
        setAlertMessage(response.message);
        setAlertPopup(true);
      } else {
        setLoading(false);
        setItemName(response.data.item_name);
        setProductType(response.data.product_type);
        setCategoryType(response.data.category_type);
        setPrice('0');
        setImage(response.data.image);
        setModalVisible(!modalVisible);
        setItemId(id);
        let datas = response.data.modifiers;
        if (response.data.modifiers.length > 0) {
          datas.map((item1, index) => {
            if (item1.is_required == 1) {
              item1.modifiers[0].visible = true;
              prices = parseFloat(item1.modifiers[0].price);
            } else {
              prices = parseFloat(response.data.price);
            }
          });
        } else {
          prices = parseFloat(response.data.price);
        }
        setModifierData(datas);
      }
    } catch (err) {
      setLoading(false);
      setAlertMessage('Please check your network.');
      setAlertPopup(true);
    }
  };

  const renderItem2 = ({item, index}) => {
    if(categoryName==item.category_type){
      return (
        <View style={styles.category}>
          <View style={styles.box}>
            <View style={styles.main}>
              <Image source={{uri: item.image}} style={styles.img} />
            </View>
            <View style={styles.view}>
              <Text style={styles.name}>{item.item_name}</Text>
              {/* <View style={styles.view1}> */}
              <Text style={styles.dec} numberOfLines={2}>
                {item.product_type}
              </Text>
              {/* </View> */}
              <View style={styles.box1}>
                <Text style={styles.textMany}>${item.price}</Text>
                <TouchableOpacity
                  onPress={() => onItemDetails(item.id)}
                  style={styles.btn}>
                  <Text style={styles.btnText}>ADD</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      );
    }

  };

  const renderItem1 = ({item, index}) => {

    return (
      <TouchableOpacity
        style={styles.Image1}
        onPress={() => { setCategoryName(item.category_name)}}>
        <Text
          style={{
            fontSize: PX(15),
            color: item.category_name != categoryName ? '#848484' : '#F55800',
            fontFamily: 'Montserrat-Medium',
          }}>
          {item.category_name}
        </Text>
        {item.category_name == categoryName && (
          <View
            style={{
              height: PX(6),
              width: PX(6),
              borderRadius: PX(6),
              backgroundColor: '#F55800',
              marginTop: PX(5),
            }}></View>
        )}
      </TouchableOpacity>
    );
  };

  const onMapingAdd = async () => {
    let datas = [];
    let itemData = [];
    console.log('Get Selected Item dataLL', modifierData);

    await modifierData.map(async (item, index) => {
      await item.modifiers?.map(async (item1, index1) => {
        console.log('Get Selected Item dataLL', item1);
        if (item1.visible) {
          console.log('Get DATA:::: IF Condition', item1);
          if (datas.length == 0) {
            let data = item.group_name;
            datas = [item.group_name, item1];
            console.log('Get DATA:::: IF Condition', datas);
          } else {
            let data = item.group_name;
            datas.push(item.group_name, item1);
            console.log('Get DATA::::ELSE Condition', datas);
          }
        }
      });
    });
    console.log('Get DATA::::', datas);

    return datas;
  };

  const onClearCart=async()=>{
    try {
    const id1 = await AsyncStorage.getItem('id');

        const customer_id = encodeURIComponent(id1);
        const requestBody = `customer_id=${customer_id}`;

        const cartRes = await DeleteCartItemApi(requestBody);

        console.log("Response Data>>>",cartRes)
        if(cartRes?.sucecess){
          // alert('Server issue.')
          setAlertDeletePopup(false)
          onAddItemClick()
        }
        else{
          setLoading(false);
          setAlertDeletePopup(false)
          // alert('Server issue.')
          setAlertMessage('Please check your network.');
          setAlertPopup(true);
        }

    }catch(err){
      setLoading(false);
      setAlertDeletePopup(false)
      
      // alert('Server issue.')
      setAlertMessage('Please check your network.');
      setAlertPopup(true);
    }
  }

  const onAddItemClick = async () => {
    try {
      if (prices == '0') {
        alert('Please select any one item.');
      } else {
        setLoading(true);
        let datas = await onMapingAdd();

        let totalPrice = parseFloat(prices * itemCount).toFixed(2);
        const id1 = await AsyncStorage.getItem('id');

        const customer_id = encodeURIComponent(id1);
        const item_id = encodeURIComponent(itemId);
        const qty = encodeURIComponent(itemCount);
        const set_price = encodeURIComponent(totalPrice);
        const modifiers = encodeURIComponent(JSON.stringify(datas));
        const res_id=encodeURIComponent(route.params.res_id);

        console.log(
          'Get DATA::::',
          id1,
          '>>>',
          itemId,
          '>>>',
          itemCount,
          '>>>',
          totalPrice,
          '>>>>>',
          datas,
          '>>>>>>>>',
          res_id
        );
        const requestBody = `customer_id=${customer_id}&item_id=${item_id}&qty=${qty}&modifiers=${modifiers}&set_price=${set_price}&rest_id=${res_id}`;

        const cartRes = await AddCartApi(requestBody);
        console.log('Get Reposne dAta:::', cartRes?.message,!cartRes.sucecess);
        if (!cartRes.sucecess) {
          setLoading(false);
          setModalVisible(false);
          // alert(cartRes?.message)
          if(cartRes?.message=='Items already added in other restaurant'){
            setAlertDeletePopup(true)
            setAlertDeleteMessage(cartRes?.message);
          }
          else{
            setAlertMessage(cartRes?.message);
            setAlertPopup(true);
          }
          
        } else {
          setLoading(false);
          // alert(cartRes?.message)
          setAlertMessage(cartRes?.message);
          setAlertPopup(true);
          setModalVisible(false);
          setItemCount(1);
          prices = 0;
          onListCart();
        }
      }
    } catch (err) {
      setLoading(false);
      setModalVisible(false);
      // alert('Server issue.')
      setAlertMessage('Please check your network.');
      setAlertPopup(true);
    }

    // setModalVisible(!modalVisible)
  };

  const EmptyListMessage = ({item}) => {
    return <Text style={styles.emptyListStyle}>No Data Found</Text>;
  };

  return (
    <View style={styles.main2}>
      <View style={{height: DeviceInfo.hasNotch() ? PX(30) : PX(10)}} />
      <Loader isLoding={loading} />
      <View style={styles.header1}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('restaurant', {
              res_id: route.params?.res_id,
              id: route.params?.id,
            });
          }}
          styles={{width: '15%'}}>
          <Image
            source={require('../../assets/backGo.png')}
            style={styles.back}
          />
        </TouchableOpacity>

        <Text style={styles.headerText2}>{route.params?.res_name} </Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('cart', {res_id:listCart[0]?.restaurant_id});
          }}
          styles={{width: '15%'}}>
          <Image
            source={require('../../assets/cart2.png')}
            style={styles.cart}
          />
          {listCart.length > 0 && <View style={styles.back1} />}
        </TouchableOpacity>
      </View>

      <View style={styles.mainView}>
        {/* <ScrollView
          contentContainerStyle={{paddingBottom: PX(20)}}
          showsVerticalScrollIndicator={false}> */}
        <Image
          source={require('../../assets/banner.png')}
          style={styles.banner}
        />

        <View style={styles.search}>
          <View style={styles.img1}>
            <Image
              source={require('../../assets/search.png')}
              style={styles.img2}
            />
          </View>
          <TextInput
            placeholder="search items"
            value={Item}
            onChangeText={value => onSearchFunc(value)}
            placeholderTextColor="#C4C4C4"
            style={{
              paddingLeft: '5%',
              color: '#C4C4C4',
              fontSize: PX(15),
              fontFamily: 'Montserrat-Regular',
              width: '95%',
            }}
          />
        </View>
        <View style={styles.category1}>
          <FlatList
            data={category}
            renderItem={renderItem1}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </View>

        <View style={styles.item}>
          <FlatList
            data={itemList}
            renderItem={renderItem2}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: PX(780)}}
            ListEmptyComponent={EmptyListMessage}
          />
        </View>
        {/* </ScrollView> */}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            height: '100%',
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setModalVisible(!modalVisible), setItemCount(1);
            }}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.main1}>
            <Image
              source={
                image == ''
                  ? require('../../assets/items/restaurant-interior.png')
                  : {uri: image}
              }
              style={styles.backImg}
            />

            <View style={styles.mainView1}>
              <View style={styles.headerMain}>
                <Text style={styles.header}>{itemName}</Text>
                <Text style={styles.header3}>{productType}</Text>
              </View>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'space-between',
                  paddingVertical: PX(20),
                }}>
                <ScrollView>
                  {modifierData?.map((item, index) => {
                    console.log('Get Modifier Value::', item.modifiers.length);

                    return (
                      <>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: PX(10),
                            paddingTop: '5%',
                          }}>
                          <Text
                            style={{
                              fontSize: PX(15),
                              color: '#000',
                              fontFamily: 'Montserrat-Medium',
                            }}>
                            {item.group_name}
                          </Text>
                          <View
                            style={{
                              paddingHorizontal: PX(15),
                              height: PX(30),
                              backgroundColor:
                                item.is_required == 1 ? '#FFD25F' : '#9DFFA7',
                              borderRadius: PX(20),
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: PX(14),
                                color: '#000',
                                fontFamily: 'Montserrat-Regular',
                              }}>
                              {item.is_required == 1 ? 'Required' : 'Optional'}
                            </Text>
                          </View>
                        </View>
                        {item.modifiers?.map((item1, index1) => {
                          return (
                            <View
                              style={{
                                flexDirection: 'row',
                                paddingVertical: PX(5),
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingHorizontal: PX(10),
                              }}>
                              <Text
                                style={{
                                  fontSize: PX(13),
                                  color: '#000',
                                  fontFamily: 'Montserrat-Regular',
                                }}>
                                {item1.modifier_name}
                              </Text>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: PX(13),
                                    color: '#000',
                                    fontFamily: 'Montserrat-Regular',
                                    paddingRight: '2%',
                                  }}>
                                  ${item1.price}
                                </Text>

                                <TouchableOpacity
                                  onPress={() =>
                                    item.is_required == 1
                                      ? onSelectItem1(item, item1)
                                      : onSelectItem(item, item1)
                                  }>
                                  {item1.visible ? (
                                    <Image
                                      style={{
                                        width: PX(35),
                                        height: PX(35),
                                        resizeMode: 'contain',
                                        tintColor: '#F55800',
                                      }}
                                      source={require('../../assets/select.png')}
                                    />
                                  ) : (
                                    <Image
                                      style={{
                                        width: PX(35),
                                        height: PX(35),
                                        resizeMode: 'contain',
                                        tintColor: '#F55800',
                                      }}
                                      source={require('../../assets/radio.png')}
                                    />
                                  )}
                                  {item1.visible
                                    ? console.log(
                                        'GWT TEFDFDFF::::',
                                        item1.visible,
                                      )
                                    : console.log('issue')}
                                </TouchableOpacity>
                              </View>
                            </View>
                          );
                        })}
                      </>
                    );
                  })}
                </ScrollView>
                <View style={styles.btnMain}>
                  <View style={styles.btn1}>
                    <TouchableOpacity
                      onPress={() => {
                        itemCount == 0
                          ? setItemCount(0)
                          : setItemCount(itemCount - 1);
                      }}>
                      <Text style={styles.btn1Text}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.btn1Text2}>{itemCount}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setItemCount(itemCount + 1);
                      }}>
                      <Text style={styles.btn1Text}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => onAddItemClick()}
                    style={styles.btn2}>
                    <Text style={styles.add}>ADD ITEM</Text>
                    <View>
                      <Text style={styles.total}>Total</Text>
                      <Text style={styles.add}>
                        ${parseFloat(prices * itemCount).toFixed(2)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {alertPopup && (
        <AlertPopup
          modalVisible={alertPopup}
          onRequestClose={() => {
            setAlertPopup(false);
          }}
          title={'Add Cart'}
          message={alertMessage}
        />
      )}
      {alertDeletePopup && (
        <AlertDeletePopup
          modalVisible={alertDeletePopup}
          onRequestClose={() => {
            setAlertDeletePopup(false);
          }}
          onClearCartItem={()=>onClearCart()}
          title={'Add Cart'}
          message={alertDeleteMessage}
        />
      )}
    </View>
  );
};

export default index;
