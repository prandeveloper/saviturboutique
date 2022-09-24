import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  RefreshControl,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import RazorpayCheckout from 'react-native-razorpay';

const CartScreen = ({ navigation }) => {
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
  const [singalName, setSingalName] = useState([]);
  const [invoice, setInvoice] = useState([]);
  const [cardDelete, setCardDelete] = useState('');
  const [price, setPric] = useState('');
  const [storedata, setStoredata] = useState('');
  const [textBox, setTextBox] = useState([]);

  const [address, setAddress] = useState();
  const [pincode, setPincode] = useState();
  const [pickup_date, setPickup_date] = useState();
  const [delivery_address, setDelivery_address] = useState();
  const [delivery_pincode, setDelivery_pincode] = useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const [cartEmptyMessage, setCartEmptyMessage] = useState('No Items in Cart');
  const [cartEmptyMessages, setCartEmptyMessages] = useState(
    'No Items in Quote Cart',
  );
  const [display, setDisplay] = useState('');
  const [userId, setUserId] = useState('');
  const [PaymentId, setPaymentId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [quotemodalVisible, setquotemodalVisible] = useState(false);
  const [notificationcount, setNotificationcount] = useState([]);
  const [fourth, setFourth] = useState('');
  const [third, setThird] = useState('');
  const [notes, setNotes] = useState('');
  const [quote, setQuote] = useState([]);
  const [productId, setProductId] = useState('');
  const [sendQuoteProduction, setSendQuoteProduction] = useState('');

  const getCount = async () => {
    axios
      .get(
        `http://saviturboutique.com/newadmin/api/ApiCommonController/notificationcount`,
      )
      .then(response => {
        //console.log("<<<<<",response.data.data)
        const count = response.data;
        setNotificationcount(count);
        console.log('//////////', count);
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getCount();
  }, []);
  const AddCart = async () => {
    axios
      .post(
        `http://saviturboutique.com/newadmin/api/ApiCommonController/cart`,
        {
          pickup_r: pickup_r,
          first: first,
          second: second,
          address: address,
          pincode: pincode,
          pickup_date: pickup_date,
          delivery_address: delivery_address,
          delivery_pincode: delivery_pincode,
          delivery_r: delivery_r,
          delivery_same: delivery_same,
          price: price,
          product_name: JSON.stringify(title),
          product_name1: singalName,
          note: JSON.stringify(notes)
        },
        {
          headers: {
            user_id: await AsyncStorage.getItem('user_id'),
          },
        },
      )
      .then(response => {
        console.log('@@@@@', response.data);
        if (response.data.message === 'data Send successfully.') {
          setModalVisible(true);
        } else {
          Alert.alert('error.');
        }
        getInvoice();
      })
      .catch(error => {
        console.log(error);
      });
  };
  const AddQuote = async () => {
    console.log("chack quote//////", pickup_r, address, pincode, pickup_date, delivery_address, delivery_pincode, delivery_r, delivery_same, productId);
    axios
      .post(
        `http://saviturboutique.com/newadmin/api/ApiCommonController/quotedeliver`,
        {
          pickup_r: pickup_r,
          address: address,
          pincode: pincode,
          pickup_date: pickup_date,
          delivery_address: delivery_address,
          delivery_pincode: delivery_pincode,
          delivery_r: delivery_r,
          delivery_same: delivery_same,
          product_id: productId
        },
        {
          headers: {
            user_id: await AsyncStorage.getItem('user_id'),
          },
        },
      )
      .then(response => {
        console.log('aaaaaaa', response.data);
        getInvoice();
      })
      .catch(error => {
        console.log(error);
      });
  };


  const placeOrder = () => {
    if (userName.length >= 1 && quote.length >= 1) {

      AddCart()
      AddQuote()
    }
    else {

      if (!userName.length >= 1) {
        if (quote.length >= 1) {
          AddQuote()
          navigation.navigate('TabOrderStatus');
        } else {
          navigation.navigate('CartScreen');

        }
        // navigation.navigate('TabNavigator',{ screen: 'OrderStatus' })
      }
      AddCart()
    }
  }



  const getData = async () => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      if (user_id !== null) {
        console.log('@@@@@@@@', user_id);
        setStoredata(user_id);
      }
    } catch (e) {
      console.log('no Value in login');
    }
  };
  const getCart = async () => {
    axios
      .get(
        `http://saviturboutique.com/newadmin/api/ApiCommonController/cartlistttt/${storedata}`,
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
          const note = [];
          for (var i = 0; i < plants.length; i++) {
            note.push(plants[i].note);
          }
          setPric(pric);
          setCardDelete(cardDelete);
          setTitle(picName);
          // console.log('cardid <><M>M>>>', picName);
          const singalName = plants[0].product_name;
          setSingalName(singalName);
          console.log(',,,,,,,,,,', singalName);
          setNotes(note);
          
        } else {
          setUserName([]);
          setCartEmptyMessage('No Items in cart');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
    getCart();
  }, [storedata]);
  const getQuoteCart = async () => {
    setRefreshing(true);
    axios
      .get(
        `http://saviturboutique.com/newadmin/api/ApiCommonController/quotegettt/${storedata}`,
      )
      .then(response => {
        if (response.data.data && response.data.data.length >= 1) {
          const quotes = response.data.data;
          setQuote(quotes);
          const quoteProduct = quotes[0].id
          setProductId(quoteProduct)

        } else {
          setQuote([]);
          setCartEmptyMessages('No Items in quotes cart');
        }
        setRefreshing(false);

      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
    getQuoteCart();
  }, [storedata]);
  const getInvoice = async () => {
    setRefreshing(true);
    axios
      .get(
        `http://saviturboutique.com/newadmin/api/ApiCommonController/invoice/${storedata}`,
      )
      .then(response => {
        // console.log("<<<<<",response.data.data)
        const invoice = response.data.data;
        setInvoice(invoice);
        console.log('/</</', invoice);
        const order = response.data.data.order_id;
        setUserId(order);
        getCart();
        getQuoteCart();
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const getCheckBox = async () => {
    setRefreshing(true);
    axios
      .get(
        `http://saviturboutique.com/newadmin/api/ApiCommonController/cartnewqwerty/${storedata}`,
      )
      .then(response => {
        console.log('<<<<<ananan', response.data.data[0]);
        const chack = response.data.data[0];
        setTextBox(chack);
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
    getInvoice();
    getCheckBox();
  }, [storedata]);

  const onRemoveItem = async id => {
    await axios
      .post(
        `http://saviturboutique.com/newadmin/api/ApiCommonController/deletecart`,
        {
          product_id: id,
        },
        {
          headers: {
            user_id: await AsyncStorage.getItem('user_id'),
          },
        },
      )
      .then(response => {
        console.log('////////', response.data);
        getCart();
      })
      .catch(error => {
        console.log(error);
      });
  };
  const onRemoveQuote = async id => {
    await axios
      .post(
        `http://saviturboutique.com/newadmin/api/ApiCommonController/deletequote`,
        {
          id: id,
        },
        {
          headers: {
            user_id: await AsyncStorage.getItem('user_id'),
          },
        },
      )
      .then(response => {
        console.log('////////', response.data);
        getQuoteCart();
      })
      .catch(error => {
        console.log(error);
      });
  };
  const Order = async id => {
    await axios
      .post(
        `http://saviturboutique.com/newadmin/api/ApiCommonController/abcd`,
        {
          razorpay_payment_id: PaymentId,
          amount: invoice.total_amount,
          order_id: userId,
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
      amount: invoice.total_amount * 100,
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
        <View style={{ flexDirection: 'row-reverse' }}>
          <TouchableOpacity style={styles.counterbtn} >
            <Text style={styles.countertxt}>{notificationcount.data}</Text>
          </TouchableOpacity >
          <TouchableOpacity
              onPress={() => navigation.navigate('NotificationScreen')}>
              <Ionicons name="notifications" color={'#F00976'} size={30} />
            </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={{ padding: 5 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getCart} />
        }>
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
                        width: '40%',
                      }}>
                      <Text style={[styles.txt, { marginBottom: 10 }]}>
                        {card.product_name}
                      </Text>
                      <Text style={[styles.txt, { marginBottom: 10 }]}>
                        Price : {card.price}
                      </Text>
                      <Text style={styles.txt}>Fabric is not included</Text>
                    </View>
                    <View
                      style={{
                        width: '20%',
                      }}>
                      <TouchableOpacity
                        style={{ alignSelf: 'flex-end' }}
                        onPress={() => onRemoveItem(card.id)}>
                        <Ionicons name="close" color={'red'} size={25} />
                      <Text style={{fontSize:8,color:'red'}}>Remove</Text>
                      </TouchableOpacity>
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
                        checked={card.first == 1 && true}
                        value={third}
                        onChangeText={setThird}
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
                        value={fourth}
                        onChangeText={setFourth}
                      />
                    </View>
                    <View>
                      <Text style={{ color: '#333' }}>
                        Instructions to tailor
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
            {quote.length !== 0 ? (
              quote?.map(quotes => (
                <View style={styles.box}>
                  <View style={styles.row}>
                    <View style={[styles.imgView, { width: '40%' }]}>
                      <Image
                        style={styles.img}
                        source={{ uri: `${quotes.image}` }}
                      />
                    </View>
                    <View
                      style={{
                        width: '40%',
                      }}>
                      <Text style={[styles.txt, { marginBottom: 10 }]}>
                        Price : Quote Pending Expected with in 24 Hours
                      </Text>
                      <Text style={styles.txt}>Fabric is not included</Text>
                    </View>
                    <View
                      style={{
                        width: '20%',
                      }}>
                      <TouchableOpacity
                        style={{ alignSelf: 'flex-end' }}
                        onPress={() => onRemoveQuote(quotes.id)}>
                        <Ionicons name="close" color={'red'} size={25} />
                      <Text style={{fontSize:8,color:'red'}}>Remove</Text>

                      </TouchableOpacity>
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
                        checked={quotes.first == 'true' && true}
                        value={third}
                        onChangeText={setThird}
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
                        checked={quotes.second == 'true' && true}
                        value={fourth}
                        onChangeText={setFourth}
                      />
                    </View>
                    <View>
                      <Text style={{ color: '#333' }}>
                        Instructions to tailor
                      </Text>
                      <View
                        style={{
                          borderWidth: 2,
                          padding: 10,
                          borderRadius: 8,
                          borderColor: '#D3D3D3',
                        }}>
                        <Text style={{ color: 'black' }}>{quotes.note}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <Text style={[styles.heding, { color: 'red' }]}>
                {cartEmptyMessages}
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
                    checked={pickup_r}
                    value={pickup_r}
                    onChangeText={setPickup_r}
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
                          checked={first}
                          value={first}
                          onChangeText={setFirst}
                          onPress={() => setFirst(!first)}
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
                          checked={second}
                          value={second}
                          onChangeText={setSecond}
                          onPress={() => setSecond(!second)}
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
                    checked={delivery_r}
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
                        checked={delivery_same}
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
            <Text style={{fontSize:20,fontWeight:'700',color:'black',marginBottom:10}}>Delivery Date</Text>
            <View style={styles.disc}>
              <Text style={styles.pickTxt}>
                If you order with in 11 Hr:29 minutes, best change to delivered by{invoice.expire_date} before 7:00
              </Text>
            </View>
            <View>
              {/* <Text style={styles.heding} >invoice</Text>
              <View style={styles.disc}>
                <Text style={[styles.pickTxt, { marginBottom: 10 }]}>Replacement charges:{invoice.re_charge}</Text>
                <Text style={[styles.pickTxt, { marginBottom: 10 }]}>Courier charges:{invoice.co_charge}</Text>
                <Text style={[styles.pickTxt, { marginBottom: 10 }]}>Total charges:{invoice.total_amount}/-</Text> */}
              {/* <Text style={styles.pickTxt}>Get 10% Discount Pay just Rs 500 only valid till 29-july-2022</Text> */}
              {/* </View> */}
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
                          Product charges:{invoice.product_charge}
                        </Text>
                        <Text style={[styles.pickTxt, { marginBottom: 10 }]}>
                          Unbilled product charges:NA
                        </Text>
                        <Text style={[styles.pickTxt, { marginBottom: 10 }]}>
                          Pick up courier charges:Rs{invoice.re_charge}
                        </Text>
                        <Text style={[styles.pickTxt, { marginBottom: 10 }]}>
                          Delivery courier charges:Rs{invoice.co_charge}
                        </Text>
                        <Text style={[styles.pickTxt, { marginBottom: 10 }]}>
                          Total charges:{invoice.total_amount}/-
                        </Text>
                        <Text style={[styles.pickTxt, { marginBottom: 10 }]}>
                          Discount Applied:Rs.{invoice.discount}
                        </Text>
                        <Text
                          style={[
                            styles.pickTxt,
                            { marginBottom: 10, fontWeight: '600',textAlign:'center' },
                          ]}>
                          Final charges after discount:Rs.
                          {invoice.after_discount} only
                        </Text>
                        <View
                          style={{
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: '#F00976',
                          }}>
                          <View style={{ padding: 5 }}>
                            <Text style={[styles.pickTxt]}>
                              Applied 10% DISCOUNT
                            </Text>
                            <Text style={[styles.pickTxt]}>
                              Rs {invoice.discount}/- OFF
                            </Text>
                            <Text style={[styles.pickTxt]}>
                              Pay within 4 Min:22 second
                            </Text>
                          </View>
                        </View>
                        <Text style={[styles.pickTxt, { textAlign: 'center' }]}>
                          Best chance to be delivered by{' '}
                          <Text style={{ fontSize: 18 }}>
                            {invoice.expire_date}
                          </Text>{' '}
                          before {invoice.expire_time}
                        </Text>
                        <Text style={[styles.pickTxt, { textAlign: 'center' }]}>
                          Quote product will be available for purchase after price update
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




                <TouchableOpacity
                  style={[styles.button, styles.buttonOpen]}
                  onPress={placeOrder}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: '700',
                      fontSize: 16,
                      color: '#fff',
                    }}>
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    // borderWidth: 2,
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
    borderColor: '#F00976',
    marginBottom: 10,
    width: '100%',
    alignSelf: 'center',
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
});

export default CartScreen;
