//import liraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  RefreshControl,
  Image,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RadioButton} from 'react-native-paper';

// create a component
const OrderList = ({route, navigation}) => {
  const {order_id} = route.params;
  // console.log('check order id',order_id);

  const [pickup_r, setPickup_r] = useState(false);
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [delivery_same, setDelivery_same] = useState('');
  const [delivery_r, setDelivery_r] = useState(false);
  const [checkBoxValues, setCheckBoxValues] = useState(false);
  const [checkBoxValu, setCheckBoxValu] = useState(false);
  const [checked, setChecked] = React.useState('first');
  const [userName, setUserName] = useState([]);
  const [title, setTitle] = useState([]);
  const [invoice, setInvoice] = useState('');
  const [cardDelete, setCardDelete] = useState('');
  const [price, setPric] = useState('');
  const [storedata, setStoredata] = useState('');

  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState();
  const [pickup_date, setPickup_date] = useState();
  const [delivery_address, setDelivery_address] = useState();
  const [delivery_pincode, setDelivery_pincode] = useState();
  const [cartEmptyMessage, setCartEmptyMessage] = useState('No Items in Cart');
  const [display, setDisplay] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [storefav, setStorefav] = useState('');
  const [status, setStatus] = useState([]);
  const [state, setState] = useState('');
  const [userId, setUserId] = useState('');
  const [userOrderId, setUserOrderId] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [show, setShow] = useState('');
  const [notificationcount, setNotificationcount] = useState([]);
  const [counter, setCounter] = useState('');
  const [succes, unSucces] = useState('');

  const getCount = async () => {
    axios
      .get(
        `http://saviturboutique.com/newadmin/api/ApiCommonController/notificationcount`,
      )
      .then(response => {
        //console.log("<<<<<",response.data.data)
        const count = response.data;
        setNotificationcount(count);
        // console.log("//////////",count);
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getCount();
  }, []);

  const getData = async () => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      if (user_id !== null) {
        // console.log('@@@@@@@@', user_id);
        setStorefav(user_id);
      }
    } catch (e) {
      console.log('no Value in login');
    }
  };
  const getOrder = async () => {
    setRefreshing(true);
    axios
      .get(
        `http://saviturboutique.com/newadmin/api/ApiCommonController/ordercheck/${storefav}`,
      )
      .then(response => {
        // console.log("<<<<< order",response.data.data[0].order_id)
        const plants = response.data.data;
        setStatus(plants);
        setState(response.data.data[0].status);
        // console.log('status??????', plants);
        const userOrder = response.data.data[0].order_id;
        setUserOrderId(userOrder);
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const getOrderView = async () => {
    setRefreshing(true);
    axios
      .get(
        `https://saviturboutique.com/newadmin/api/ApiCommonController/ordernewapi/${order_id}`,
      )
      .then(response => {
        // console.log("<<<<<Amit",response.data.data)
        const userOr = response.data.data[0];
        setUserId(userOr);
        // console.log('aaaaaaaa',userOr);
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const getCart = async () => {
    axios
      .get(
        `http://saviturboutique.com/newadmin/api/ApiCommonController/justtry/${order_id}`,
      )
      .then(response => {
        if (response.data.data && response.data.data.length >= 1) {
          const plants = response.data.data;
          setUserName(plants);
          const cardDelete = response.data.data[0].id;
          const pric = response.data.data[0].price;
          const picName = [];
          for (var i = 0; i < plants.length; i++) {
            picName.push(plants[i].product_name);
          }
          setPric(pric);
          setCardDelete(cardDelete);
          setTitle(picName);
          // console.log("cardid <><M>M>>>", picName);
        } else {
          setUserName([]);
          setCartEmptyMessage('No Items in Order Screen');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const getInvoice = async () => {
    setRefreshing(true);
    axios
      .get(
        `http://saviturboutique.com/newadmin/api/ApiCommonController/totalpriceget/${order_id}`,
      )
      .then(response => {
        // console.log("<<<<<aaaaaaaaaaaaa",response.data)
        const invoice = response.data.data;
        setInvoice(invoice);
        console.log('/</</ test invoice', invoice);
        getCart();
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const getCartCounter = async () => {
    axios
      .get(
        `http://saviturboutique.com/newadmin/api/ApiCommonController/cartcountbyuserid/${storefav}`,
      )
      .then(response => {
        //console.log("<<<<<",response.data.data)
        const cartCounter = response.data.data;
        setCounter(cartCounter);
        console.log('cartCounter', cartCounter);
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getOrder();
    getOrderView();
    getData();
    getCart();
    getInvoice();
    getCartCounter();
  }, [storefav]);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
          padding: 5,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" color={'#F00976'} size={30} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          {/* <TouchableOpacity>
          <View style={{flexDirection:'row-reverse'}} >
          <TouchableOpacity style={styles.counterbtn} >
              <Text style={styles.countertxt}>{counter}</Text>
              </TouchableOpacity>
            <Ionicons name="cart" color={'#F00976'} size={30} onPress={() => navigation.navigate('CartScreen')} />
          </View>
          </TouchableOpacity> */}
          {/* <TouchableOpacity onPress={() => navigation.navigate
            ('NotificationScreen')}>
              <View style={{flexDirection:'row-reverse'}}>
              <TouchableOpacity style={styles.counterbtn} >
              <Text style={styles.countertxt}>{notificationcount.data}</Text>
              </TouchableOpacity>
            <Ionicons name="notifications" color={'#F00976'} size={30} />
              </View>
          </TouchableOpacity> */}
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getOrder} />
        }>
        <View>
          <View style={{padding: 10}}>
            <Text style={styles.hedingtxt}>Your Order status</Text>
            <View>
              <View style={{marginTop: 10, marginBottom: 10}}>
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 10,
                    borderColor: '#15d03e',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={[styles.txt, {marginLeft: 10}]}>
                      Invoice Number {userId.order_id}
                    </Text>
                    <Text style={styles.txt}>
                      Order Date {userId.created_date}
                    </Text>
                  </View>
                  <View>
                    <CheckBox
                      checkedColor="#15d03e"
                      uncheckedColor="#15d03e"
                      containerStyle={{
                        margin: 0,
                        width: '100%',
                        borderColor: '#fff',
                        backgroundColor: '#fff',
                      }}
                      title={'Order Recieved'}
                      checked={userId.status == 0 && true}
                    />
                    <CheckBox
                      checkedColor="#15d03e"
                      uncheckedColor="#15d03e"
                      containerStyle={{
                        margin: 0,
                        width: '100%',
                        borderColor: '#fff',
                        backgroundColor: '#fff',
                      }}
                      title={'Pickup Scheduled'}
                      checked={userId.status == 1 && true}
                    />
                    <CheckBox
                      checkedColor="#15d03e"
                      uncheckedColor="#15d03e"
                      containerStyle={{
                        margin: 0,
                        width: '100%',
                        borderColor: '#fff',
                        backgroundColor: '#fff',
                      }}
                      title={'Work In Progress'}
                      checked={userId.status == 2 && true}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <CheckBox
                        checkedColor="#15d03e"
                        uncheckedColor="#15d03e"
                        containerStyle={{
                          margin: 0,
                          width: '70%',
                          borderColor: '#fff',
                          backgroundColor: '#fff',
                        }}
                        title={'Ready to Dispatch'}
                        checked={userId.status == 4 && true}
                      />
                      <Text style={{color: 'black'}}>{userId.expire_date}</Text>
                    </View>
                    <CheckBox
                      checkedColor="#15d03e"
                      uncheckedColor="#15d03e"
                      containerStyle={{
                        margin: 0,
                        width: '100%',
                        borderColor: '#fff',
                        backgroundColor: '#fff',
                      }}
                      title={'Out for Delivery'}
                      checked={userId.status == 5 && true}
                    />
                    <CheckBox
                      checkedColor="#15d03e"
                      uncheckedColor="#15d03e"
                      containerStyle={{
                        margin: 0,
                        width: '100%',
                        borderColor: '#fff',
                        backgroundColor: '#fff',
                      }}
                      title={'Delivered'}
                      checked={userId.status == 6 && true}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{padding: 10}}>
            <View style={{marginBottom: 10}}>
              <Text style={styles.heding}>Order Items</Text>
            </View>
            <View>
              {userName.length !== 0 ? (
                userName?.map(card => (
                  <View style={styles.box}>
                    <View style={styles.row}>
                      <View style={[styles.imgView, {width: '40%'}]}>
                        <Image
                          style={styles.img}
                          source={{uri: `${card.image}`}}
                        />
                      </View>
                      <View
                        style={{
                          justifyContent: 'space-around',
                          width: '60%',
                          marginLeft: 40,
                        }}>
                        <Text style={styles.txt}>{card.product_name}</Text>
                        <Text style={styles.txt}>Price : {card.price}</Text>
                        {/* <TouchableOpacity>
                          <Text style={{ color: 'red', fontFamily: 'Roboto-Medium' }} >X Remove</Text>
                        </TouchableOpacity> */}
                      </View>
                    </View>
                    <View style={{marginTop: 10}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <CheckBox
                          checkedColor="blue"
                          uncheckedColor="blue"
                          containerStyle={{
                            marginLeft: 0,
                            width: '100%',
                            borderColor: '#fff',
                          }}
                          title={'I am providing reference outfit'}
                          checked={card.first == 1 && true}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <CheckBox
                          checkedColor="blue"
                          uncheckedColor="blue"
                          containerStyle={{
                            marginLeft: 0,
                            width: '100%',
                            borderColor: '#fff',
                          }}
                          title={'I want designer to take the measurement'}
                          checked={card.second == 1 && true}
                        />
                      </View>
                      <View>
                        <Text style={{color: '#333'}}>
                          Instructions to tallor
                        </Text>
                        <View
                          style={{
                            borderWidth: 2,
                            padding: 10,
                            borderRadius: 8,
                            borderColor: '#D3D3D3',
                          }}>
                          <Text style={{color: 'black'}}>{card.note}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={[styles.heding, {color: 'red'}]}>
                  {cartEmptyMessage}
                </Text>
              )}
              <View style={{marginTop: 10, marginBottom: 10}}>
                <Text style={styles.heding}>Pick up my Fabric</Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 10,
                    borderColor: 'blue',
                  }}>
                  <View>
                    <CheckBox
                      checkedColor="blue"
                      uncheckedColor="blue"
                      containerStyle={{
                        marginLeft: 0,
                        width: '100%',
                        borderColor: '#fff',
                      }}
                      title={'Pickup is not required. I will visit shop'}
                      checked={userId.pickup_r == 1 && true}
                      onPress={() => setPickup_r(!pickup_r)}
                    />
                  </View>
                  {pickup_r ? (
                    <View></View>
                  ) : (
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginBottom: 10,
                        }}>
                        <Text style={styles.pickTxt}>Pickup Address</Text>
                        <TextInput
                          value={address}
                          onChangeText={setAddress}
                          style={[
                            styles.input,
                            {
                              height: 70,
                              paddingVertical: 10,
                              textAlignVertical: 'top',
                            },
                          ]}
                          multiline={true}
                          placeholder={userId.address}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginBottom: 10,
                        }}>
                        <Text style={styles.pickTxt}>Pin Code</Text>
                        <TextInput
                          placeholder={userId.pincode}
                          value={pincode}
                          onChangeText={setPincode}
                          style={[
                            styles.input1,
                            {
                              height: 40,
                              paddingVertical: 10,
                              textAlignVertical: 'top',
                              borderColor: 'blue',
                            },
                          ]}
                          multiline={true}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={styles.pickTxt}>Fabric pick up date</Text>
                        <TextInput
                          placeholder={userId.pickup_date}
                          value={pickup_date}
                          onChangeText={setPickup_date}
                          style={[
                            styles.input1,
                            {
                              height: 40,
                              paddingVertical: 10,
                              textAlignVertical: 'top',
                              borderColor: 'blue',
                            },
                          ]}
                          multiline={true}
                        />
                      </View>
                      <View style={{marginTop: 10}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <CheckBox
                            checkedColor="blue"
                            uncheckedColor="blue"
                            containerStyle={{
                              marginLeft: 0,
                              width: '100%',
                              borderColor: '#fff',
                            }}
                            title={'I am providing reference outfit'}
                            checked={userId.first == 1 && true}
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <CheckBox
                            checkedColor="blue"
                            uncheckedColor="blue"
                            containerStyle={{
                              marginLeft: 0,
                              width: '100%',
                              borderColor: '#fff',
                            }}
                            title={'I want designer to take the measurement'}
                            checked={userId.second == 1 && true}
                          />
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              </View>
              <View style={{marginTop: 10, marginBottom: 10}}>
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 10,
                    borderColor: '#15d03e',
                  }}>
                  <View>
                    <CheckBox
                      checkedColor="#15d03e"
                      uncheckedColor="#15d03e"
                      containerStyle={{
                        marginLeft: 0,
                        width: '100%',
                        borderColor: '#fff',
                      }}
                      title={'Delivery is not required. I will visit shop'}
                      checked={userId.delivery_r == 1 && true}
                      value={delivery_r}
                      onChangeText={setDelivery_r}
                      onPress={() => setDelivery_r(!delivery_r)}
                    />
                    {delivery_r ? (
                      <View></View>
                    ) : (
                      <View>
                        <CheckBox
                          checkedColor="#15d03e"
                          uncheckedColor="#15d03e"
                          containerStyle={{
                            marginLeft: 0,
                            width: '100%',
                            borderColor: '#fff',
                          }}
                          title={'Delivery Address is same as pick up'}
                          checked={userId.delivery_same == 1 && true}
                          value={delivery_same}
                          onChangeText={setDelivery_same}
                          onPress={() => setDelivery_same(!delivery_same)}
                        />

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 10,
                          }}>
                          <Text style={styles.pickTxt}>Delivery Address</Text>
                          <TextInput
                            placeholder={userId.delivery_address}
                            value={delivery_address}
                            onChangeText={setDelivery_address}
                            style={[
                              styles.input,
                              {
                                height: 70,
                                paddingVertical: 10,
                                textAlignVertical: 'top',
                                borderColor: '#15d03e',
                              },
                            ]}
                            multiline={true}
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 10,
                          }}>
                          <Text style={styles.pickTxt}>Delivery Pin Code</Text>
                          <TextInput
                            placeholder={userId.delivery_pincode}
                            value={delivery_pincode}
                            onChangeText={setDelivery_pincode}
                            style={[
                              styles.input1,
                              {
                                height: 40,
                                paddingVertical: 10,
                                textAlignVertical: 'top',
                                borderColor: '#15d03e',
                              },
                            ]}
                            multiline={true}
                          />
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </View>
              {/* <View style={styles.disc}>
                <Text style={styles.pickTxt}>
                  Approximate delivery date 7 days (2 days pickup + 3 days
                  process + 2 days delivery by courier )
                </Text>
              </View> */}
              <Text style={styles.heding}>Discounted Bill</Text>

              <View style={styles.disc}>
                <View>
                  <Text style={[styles.pickTxt, {marginBottom: 10}]}>
                    Product charges:{userId.product_charge}
                  </Text>
                        <Text style={[styles.pickTxt, { marginBottom: 10 }]}>
                          Delivery courier charges:Rs 49
                        </Text>
                  <Text style={[styles.pickTxt, {marginBottom: 10}]}>
                  Pick up courier charges:{userId.co_charge}
                  </Text>
                  <Text style={[styles.pickTxt, {marginBottom: 10}]}>
                    Total charges:{userId.total_amount}/-
                  </Text>
                  <Text style={[styles.pickTxt, {marginBottom: 10}]}>
                  Discount:{userId.discount}/-
                  </Text>
                  <Text style={[styles.pickTxt, {marginBottom: 10}]}>
                  Final charges after discount: Rs{userId.after_discount}/-
                  </Text>
                </View>
                <View>
                  {userId.status == 6 && true ? (
                    <View>
                      <Image
                        style={styles.paid}
                        source={require('../../assets/images/delivered.png')}
                      />
                    </View>
                  ) : (
                    <View>
                      {invoice.pay_status == 1 && true ? (
                        <Image
                          style={styles.paid}
                          source={require('../../assets/images/paid.png')}
                        />
                      ) : (
                        <Image
                          style={styles.paid}
                          source={require('../../assets/images/unpaid.png')}
                        />
                      )}
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  hedingtxt: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },
  txt: {
    color: '#333',
    fontFamily: 'Roboto-Medium',
  },
  heding: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    marginLeft: 10,
    marginBottom: 10,
  },
  img: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: 'red',
  },
  input: {
    width: '70%',
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'blue',
  },
  input1: {
    width: '50%',
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  pickTxt: {
    color: '#333',
    fontFamily: 'Roboto-Medium',
    alignSelf: 'center',
  },
  box: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
  imgView: {},
  txt: {
    color: '#333',
    fontFamily: 'Roboto-Medium',
  },
  disc: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: '#15d03e',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
  },
  countertxt: {
    color: 'black',
    fontWeight: 'bold',
  },
  counterbtn: {
    backgroundColor: 'yellow',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  paid: {
    width: 100,
    height: 100,
  },
});

//make this component available to the app
export default OrderList;
