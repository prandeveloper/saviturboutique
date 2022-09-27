//import liraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  RefreshControl,
  Image,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RadioButton } from 'react-native-paper';
import RazorpayCheckout from 'react-native-razorpay';


// create a component
const QuoteOrderList = ({ route, navigation }) => {
  const { order_id } = route.params;
  //   console.log('check order id',order_id);

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
  const [userIds, setUserIds] = useState('');
  const [userOrderId, setUserOrderId] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [show, setShow] = useState('');
  const [notificationcount, setNotificationcount] = useState([]);
  const [counter, setCounter] = useState('');
  const [succes, unSucces] = useState('');
  const [PaymentId, setPaymentId] = useState('');




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
        `http://saviturboutique.com/newadmin/api/ApiCommonController/quoteordernewapi/${order_id}`,
      )
      .then(response => {
        console.log("<<<<<Amit", response.data.data)
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
        `http://saviturboutique.com/newadmin/api/ApiCommonController/quoteorderdelivered/${order_id}`,
      )
      .then(response => {
        if (response.data.data && response.data.data.length >= 1) {
          const plants = response.data.data;
          setUserName(plants);
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
        `http://saviturboutique.com/newadmin/api/ApiCommonController/quotetotalpriceget/${order_id}`,
      )
      .then(response => {
        console.log("<<<<<aaaaaaaaaaaaa", response.data.data)
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


  const Order = async id => {
    console.log("<><?<>?><?><>>", PaymentId, userId.amount, userId);
    await axios
      .post(
        `http://saviturboutique.com/newadmin/api/ApiCommonController/efgh`,
        {
          razorpay_payment_id: PaymentId,
          amount: userId.amount,
          order_id: userId.order_id,
        },
        {
          headers: {
            user_id: await AsyncStorage.getItem('user_id'),
          },
        },
      )
      .then(response => {
        console.log('////////aaaa', response.data);
        getCart();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const payment = () => {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_7jsSm3AZI9fhex', // Your api key
      amount: userId.total_discount * 100,
      name: 'foo',
      prefill: {
        email: 'void@razorpay.com',
        contact: '9191919191',
        name: 'Razorpay Software',
      },
      theme: { color: '#F37254' },
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
        console.log('%%%%%%', data.razorpay_payment_id);
        const PaymentId = data.razorpay_payment_id;
        setPaymentId(PaymentId);
        if (
          data.razorpay_payment_id != '' &&
          data.razorpay_payment_id != null &&
          data.razorpay_payment_id != undefined
        ) {
          Order();
          navigation.navigate('OrderStatus');
        }

        console.log(PaymentId);
      })
      .catch(error => {
        console.log(error.error);
        if (error.error.code === 'BAD_REQUEST_ERROR') {
          alert('Payment Failed');
          navigation.navigate('CartScreen');
        }
        // handle failure
        //alert(`Error: ${error.code} | ${error.description}`);
      });
  };
  var modalBackgroundStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };
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
        <View style={{ flexDirection: 'row' }}>
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
          <View style={{ padding: 10 }}>
            <Text style={styles.hedingtxt}>Your Order status</Text>
            <View>
              <View style={{ marginTop: 10, marginBottom: 10 }}>
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
                    <Text style={[styles.txt, { marginLeft: 10 }]}>
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
                      <Text style={{ color: 'black' }}>{userId.expire_date}</Text>
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
          <View style={{ padding: 10 }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.heding}>Order Items</Text>
            </View>
            <View>
              {userName.length !== 0 ? (
                userName?.map(card => (
                  <View style={styles.box}>
                    <View style={styles.row}>
                      <View style={[styles.imgView, { width: '40%' }]}>
                        <Image
                          style={styles.img}
                          source={{ uri: `${card.image}` }}
                        />
                      </View>
                      <View
                        style={{
                          justifyContent: 'space-around',
                          width: '60%',
                          marginLeft: 40,
                        }}>
                        {/* <Text style={styles.txt}>Name:{card.product_name}</Text> */}
                        <Text style={styles.txt}>Price : {card.amount}</Text>
                        <Text style={styles.txt}>Fabric not included</Text>
                        {/* <TouchableOpacity>
                          <Text style={{ color: 'red', fontFamily: 'Roboto-Medium' }} >X Remove</Text>
                        </TouchableOpacity> */}
                      </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
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
                          checked={card.first == 'true' && true}
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
                          checked={card.second == 'true' && true}
                        />
                      </View>
                      <View>
                        <Text style={{ color: '#333' }}>
                          Instructions to tallor
                        </Text>
                        <View
                          style={{
                            borderWidth: 2,
                            padding: 10,
                            borderRadius: 8,
                            borderColor: '#D3D3D3',
                          }}>
                          <Text style={{ color: 'black' }}>{card.note}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={[styles.heding, { color: 'red' }]}>
                  {cartEmptyMessage}
                </Text>
              )}
              <View style={{ marginTop: 10, marginBottom: 10 }}>
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
                      {/* <View style={{marginTop: 10}}>
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
                      </View> */}
                    </View>
                  )}
                </View>
              </View>
              <View style={{ marginTop: 10, marginBottom: 10 }}>
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
                        {/* <CheckBox
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
                        /> */}

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
                  Approximate delivery date {userId.expire_date} days (2 days pickup + 3 days
                  process + 2 days delivery by courier )
                </Text>
              </View> */}
              <Text style={styles.heding}>Discounted Bill</Text>
              {invoice.pay_status == 1 && true ? (
                <View style={styles.disc1}>
                  <View>
                    <Text style={[styles.pickTxt, { marginBottom: 10 }]}>
                      Product charges:{userId.amount}
                    </Text>
                    <Text style={[styles.pickTxt, { marginBottom: 10 }]}>
                      Unbilled product charges:{invoice.pay_status == 0 && true ? (<Text>Pending Quote</Text>) : (<Text>NA</Text>
                      )}
                    </Text>
                    {/* <Text style={[styles.pickTxt, { marginBottom: 10 }]}>
                          Pick up courier charges:Rs 49
                        </Text>
                        <Text style={[styles.pickTxt, { marginBottom: 10 }]}>
                          Delivery courier charges:Rs 49
                        </Text> */}
                    {userId ? (
                      <Text style={[styles.pickTxt, { marginBottom: 10 }]}>
                        Total charges :{userId.total_amount}
                      </Text>
                    )
                      :
                      (
                        <View>
                          <Text style={[styles.pickTxt, { marginBottom: 10 }]}>
                            Total charges : To be calculated
                          </Text>
                        </View>
                      )
                    }
                    <Text style={[styles.pickTxt, { marginBottom: 10 }]}>
                      Discount Applied:{userId.discount ? (<Text>{userId.discount}</Text>) : (<Text>Pending discount</Text>)}
                    </Text>
                    <Text
                      style={[
                        styles.pickTxt,
                        { marginBottom: 10, fontWeight: '800', textAlign: 'center', },
                      ]}>
                      Final charges after discount : {userId ? (<Text>{userId.total_discount}</Text>) : (<Text>Pending Quote</Text>)}
                    </Text>
                    {/* <Text style={styles.pickTxt}>Get 10% Discount Pay just Rs 500 only valid till 29-july-2022</Text> */}
                  </View>
                  <View>
                    {userId.status == 6 && true ? (
                      <View>
                        <Image
                          style={styles.paid}
                          source={require('../../assets/images/Delivereds.png')}
                        />
                      </View>
                    ) : (
                      <View>
                        {invoice.pay_status == 1 && true ? (
                          <Image
                            style={styles.paid}
                            source={require('../../assets/images/paids.png')}
                          />
                        ) : (
                          <Image
                            style={styles.paid}
                            source={require('../../assets/images/quotetoreday.png')}
                          />
                        )}
                      </View>
                    )}
                  </View>
                </View>
              ) : (
                <View style={[styles.disc1, { width: '100%' }]}>
                  <View>
                    <Text style={[styles.pickTxt, { marginBottom: 10 }]}>
                      Product charges:{userId.amount}
                    </Text>
                    <Text style={[styles.pickTxt, { marginBottom: 10 }]}>
                      Unbilled product charges:{invoice.pay_status == 0 && true ? (<Text>Pending Quote</Text>) : (<Text>NA</Text>
                      )}
                    </Text>

                    {/* <Text style={[styles.pickTxt, { marginBottom: 10 }]}>
                          Pick up courier charges:Rs 49
                        </Text>
                        <Text style={[styles.pickTxt, { marginBottom: 10 }]}>
                          Delivery courier charges:Rs 49
                        </Text> */}
                    {userId  ? (
                      <Text style={[styles.pickTxt, { marginBottom: 10 }]}>
                        Total charges :{userId.total_amount}
                      </Text>
                    )
                      :
                      (
                        <View>
                          <Text style={[styles.pickTxt, { marginBottom: 10 }]}>
                            Total charges : To be calculated
                          </Text>
                        </View>
                      )
                    }
                    <Text style={[styles.pickTxt, { marginBottom: 10 }]}>
                      Discount Applied:{userId.discount ? (<Text>{userId.discount}</Text>) : (<Text>Pending discount</Text>)}
                    </Text>
                    <Text
                      style={[
                        styles.pickTxt,
                        { marginBottom: 10, fontWeight: '800', textAlign: 'center', },
                      ]}>
                      Final charges : {userId.total_discount ? (<Text>{userId.total_discount}</Text>) : (<Text>Pending Quote</Text>)}
                    </Text>
                    <Text style={[
                      styles.pickTxt,
                      { marginBottom: 10, fontWeight: '800', textAlign: 'center', marginLeft: 15 },
                    ]}>if urgent, contact on WhatsApp +919886758183</Text>
                  </View>
                  <View>
                    {userId.status == 6 && true ? (
                      <View>
                        <Image
                          style={styles.paid}
                          source={require('../../assets/images/Delivereds.png')}
                        />
                      </View>
                    ) : (
                      <View>
                        {invoice.pay_status == 1 && true ? (
                          <Image
                            style={styles.paid}
                            source={require('../../assets/images/paids.png')}
                          />
                        ) : (
                          <Image
                            style={[styles.paid]}
                            source={require('../../assets/images/pending.png')}
                          />
                        )}
                      </View>
                    )}
                  </View>
                </View>
              )}

              <View style={styles.centeredView}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert('Payment failed.');
                    setModalVisible(!modalVisible);
                  }}>
                  <View style={[styles.centeredView, modalBackgroundStyle]}>
                    <View style={styles.modalView}>
                      <View style={styles.disc}>
                        <Text style={[styles.pickTxt, { marginBottom: 10 }]}>
                          Product charges:{userId.amount}
                        </Text>
                        <Text style={[styles.pickTxt, { marginBottom: 10 }]}>
                      Unbilled product charges:{invoice.pay_status == 0 && true ? (<Text>Pending Quote</Text>) : (<Text>NA</Text>
                      )}
                    </Text>
                        {/* <Text style={[styles.pickTxt, { marginBottom: 10 }]}>
                          Pick up courier charges:Rs 49
                        </Text>
                        <Text style={[styles.pickTxt, { marginBottom: 10 }]}>
                          Delivery courier charges:Rs 49
                        </Text> */}
                        {userId ? (
                          <Text style={[styles.pickTxt, { marginBottom: 10 }]}> Total charges :{userId.total_amount}/- </Text>
                        )
                          :
                          (
                            <View>
                              <Text style={[styles.pickTxt, { marginBottom: 10 }]}>
                                Total charges : To be calculated
                              </Text>
                            </View>
                          )
                        }
                        <Text style={[styles.pickTxt, { marginBottom: 10 }]}>
                      Discount Applied:{userId.discount ? (<Text>{userId.discount}</Text>) : (<Text>Pending discount</Text>)}
                    </Text>
                        <Text
                          style={[
                            styles.pickTxt,
                            { marginBottom: 10, fontWeight: '800', textAlign: 'center' },
                          ]}>
                          Final charges : {userId ? (<Text>{userId.total_discount}</Text>) : (<Text>Pending Quote</Text>)}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        {/* <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => setModalVisible(!modalVisible)}>
                          <Text style={styles.textStyle}>Cart</Text>
                        </Pressable> */}
                        <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={payment}>
                          <Text style={styles.textStyle}>Pay</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </Modal>
                {invoice.pay_status == 1 && true ?
                (<View></View>)
                :
                (
                  <View>
                {userId.amount == 0 ? (
                  <TouchableOpacity style={styles.btn}>
                    <Text style={{
                      textAlign: 'center',
                      fontWeight: '400',
                      color: '#fff',
                    }}>Place wait Quote price updated by 24 hours</Text>
                  </TouchableOpacity>
                )
                  :
                  (
                    <TouchableOpacity style={styles.btn} onPress={() => setModalVisible(true)} >
                      <Text style={{
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: 16,
                        color: '#fff',
                      }}>Continue</Text>
                    </TouchableOpacity>
                  )
                }
                </View>
                )
                }
                
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
    justifyContent: 'space-around',
    alignSelf: 'center',
  },
  disc1: {
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
    width: 80,
    height: 80,
  },
  btn: {
    backgroundColor: '#F00976',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    width: '95%',
    alignSelf: 'center'
  },
  button: {
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    width: 100,
    marginHorizontal: 15,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    alignSelf: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  buttonOpen: {
    backgroundColor: '#F00976',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    width: '95%',
  },
  buttonClose: {
    backgroundColor: '#F00976',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
  pickTxt: {
    color: '#333',
    fontFamily: 'Roboto-Medium',
    alignSelf: 'center',
  },
});

//make this component available to the app
export default QuoteOrderList;
