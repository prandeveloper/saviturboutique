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

// create a component
const QuoteInvoiceList = ({navigation}) => {
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
  const [invoice, setInvoice] = useState([]);
  const [cardDelete, setCardDelete] = useState('');
  const [price, setPric] = useState('');
  const [storedata, setStoredata] = useState('');

  const [address, setAddress] = useState();
  const [pincode, setPincode] = useState();
  const [pickup_date, setPickup_date] = useState();
  const [delivery_address, setDelivery_address] = useState();
  const [delivery_pincode, setDelivery_pincode] = useState();
  const [cartEmptyMessage, setCartEmptyMessage] = useState('No Items in Cart');
  const [display, setDisplay] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [storefav, setStorefav] = useState('');
  const [status, setStatus] = useState([]);
  const [quoteStatus, setQuoteStatus] = useState([]);
  const [state, setState] = useState('');
  const [userId, setUserId] = useState('');
  const [userOrderId, setUserOrderId] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [show, setShow] = useState('');
  const [notificationcount, setNotificationcount] = useState([]);
  const [counter, setCounter] = useState('');

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

  const getData = async () => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      if (user_id !== null) {
        console.log('@@@@@@@@', user_id);
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
        console.log('status??????', plants);
        const userOrder = response.data.data[0].order_id;
        setUserOrderId(userOrder);
        getCartCounter();
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const getQuoteOrder = async () => {
    setRefreshing(true);
    axios
      .get(
        `http://saviturboutique.com/newadmin/api/ApiCommonController/ordercheckquote/${storefav}`,
      )
      .then(response => {
        // console.log("<<<<< order",response.data.data[0].order_id)
        const quteStatus = response.data.data;
        setQuoteStatus(quteStatus);
        console.log("order status???",quteStatus[0].order_id);
        
        getCartCounter();
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
    getData();
    getQuoteOrder();
    getCartCounter();
  }, [storefav]);
  return (
    <View style={styles.container}>
      {/* <View
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
          <TouchableOpacity>
            <View style={{flexDirection: 'row-reverse'}}>
              <TouchableOpacity style={styles.counterbtn}>
                <Text style={styles.countertxt}>{counter}</Text>
              </TouchableOpacity>
              <Ionicons
                name="cart"
                color={'#F00976'}
                size={30}
                onPress={() => navigation.navigate('CartScreen')}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('NotificationScreen')}>
            <View style={{flexDirection: 'row-reverse'}}>
              <TouchableOpacity style={styles.counterbtn}>
                <Text style={styles.countertxt}>{notificationcount.data}</Text>
              </TouchableOpacity>
              <Ionicons name="notifications" color={'#F00976'} size={30} />
            </View>
          </TouchableOpacity>
        </View>
      </View> */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getOrder} />
        }>
        {/* {status?.map(items => (
          <TouchableOpacity
            style={{marginTop: 10, marginBottom: 10}}
            onPress={() =>
              navigation.navigate('OrderList', {order_id: items.order_id})
            }>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                borderColor: '#15d03e',
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={[styles.txt, {marginLeft: 10}]}>
                  Invoice Number {items.order_id}
                </Text>
                <Text style={styles.txt}>Order Date {items.created_date}</Text>
              </View>
            </View>
          </TouchableOpacity>
          
        ))} */}
        {quoteStatus?.map(items => (
          <TouchableOpacity
            style={{marginTop: 10, marginBottom: 10}}
            onPress={() =>
              navigation.navigate('QuoteOrderList', {order_id: items.order_id})
            }>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                borderColor: '#15d03e',
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={[styles.txt, {marginLeft: 10}]}>
                  Quote Invoice Id {items.order_id}
                </Text>
                <Text style={styles.txt}>Order Date {items.created_date}</Text>
              </View>
            </View>
          </TouchableOpacity>
          
        ))}

        {/* <View>
        <View style={{ padding: 10 }}>
          <Text style={styles.hedingtxt} >Your Order status</Text>
          
        
            <View>
               <View style={{ marginTop: 10, marginBottom: 10 }}>
                <View style={{ borderWidth: 1, borderRadius: 10, padding: 10, borderColor: '#15d03e', }} >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[styles.txt, { marginLeft: 10 }]}>Invoice Number {userId.order_id}</Text>
                    <Text style={styles.txt}>Order Date {userId.created_date}</Text>
                  </View>
                  <View>
                    <CheckBox
                      checkedColor='#15d03e'
                      uncheckedColor='#15d03e'
                      containerStyle={{ margin: 0, width: '100%', borderColor: '#fff', backgroundColor: '#fff' }}
                      title={'order Recieved'}
                      checked={userId.status == 0 && true}
                    />
                    <CheckBox
                      checkedColor='#15d03e'
                      uncheckedColor='#15d03e'
                      containerStyle={{ margin: 0, width: '100%', borderColor: '#fff', backgroundColor: '#fff' }}
                      title={'Pickup Scheduled'}
                      checked={userId.status == 1 && true}
                    />
                    <CheckBox
                      checkedColor='#15d03e'
                      uncheckedColor='#15d03e'
                      containerStyle={{ margin: 0, width: '100%', borderColor: '#fff', backgroundColor: '#fff' }}
                      title={'Work In Progress'}
                      checked={userId.status == 2 && true}
                    />
                    <CheckBox
                      checkedColor='#15d03e'
                      uncheckedColor='#15d03e'
                      containerStyle={{ margin: 0, width: '100%', borderColor: '#fff', backgroundColor: '#fff', }}
                      title={'Ready to Dispatch'}
                      checked={userId.status == 4 && true}
                    />
                    <CheckBox
                      checkedColor='#15d03e'
                      uncheckedColor='#15d03e'
                      containerStyle={{ margin: 0, width: '100%', borderColor: '#fff', backgroundColor: '#fff', }}
                      title={'Out for Delivery'}
                      checked={userId.status == 5 && true}
                    />
                    <CheckBox
                      checkedColor='#15d03e'
                      uncheckedColor='#15d03e'
                      containerStyle={{ margin: 0, width: '100%', borderColor: '#fff', backgroundColor: '#fff', }}
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
            <Text style={styles.heding} >Your Selected plants</Text>
          </View>
          <View>
            {
              userName.length !== 0 ?
                userName?.map((card) => (
                  <View style={styles.box}>
                    <View style={styles.row} >
                      <View style={[styles.imgView, { width: '40%' }]}>
                        <Image
                          style={styles.img}
                          source={{ uri: `${card.image}` }}
                        />
                      </View>
                      <View style={{ justifyContent: 'space-around', width: '60%', marginLeft: 40 }}>
                        <Text style={styles.txt}>{card.product_name}</Text>
                        <Text style={styles.txt}>Price : {card.price}</Text>
                        <TouchableOpacity>
                          <Text style={{ color: 'red', fontFamily: 'Roboto-Medium' }} >X Remove</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))
                :
                <Text style={[styles.heding, { color: 'red' }]}>{cartEmptyMessage}</Text>
            }
            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <Text style={styles.heding} >Pick up my plants</Text>
              <View style={{ borderWidth: 1, borderRadius: 10, padding: 10, borderColor: 'blue' }} >
                <View >
                  <CheckBox
                    checkedColor='blue'
                    uncheckedColor='blue'
                    containerStyle={{ marginLeft: 0, width: '100%', borderColor: '#fff' }}
                    title={'Pickup is not required. i will visit shop'}
                    checked={pickup_r}
                    value={pickup_r}
                    onChangeText={setPickup_r}
                    onPress={() => setPickup_r(!pickup_r)}
                  />
                </View>
                {pickup_r ? <View></View> : <View >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, }} >
                    <Text style={styles.pickTxt}>Pickup Address</Text>
                    <TextInput
                      value={address}
                      onChangeText={setAddress}
                      style={[styles.input, { height: 70, paddingVertical: 10, textAlignVertical: 'top' },]}
                      multiline={true}
                    />
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }} >
                    <Text style={styles.pickTxt}>Pin Code</Text>
                    <TextInput
                      value={pincode}
                      onChangeText={setPincode}
                      style={[styles.input1, { height: 40, paddingVertical: 10, textAlignVertical: 'top', borderColor: 'blue' },]}
                      multiline={true}
                    />
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', }} >
                    <Text style={styles.pickTxt}>Courier pickup Date</Text>
                    <TextInput
                      value={pickup_date}
                      onChangeText={setPickup_date}
                      style={[styles.input1, { height: 40, paddingVertical: 10, textAlignVertical: 'top', borderColor: 'blue' },]}
                      multiline={true}
                    />
                  </View>
                  <View style={{ marginTop: 10 }} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }} >
                      <RadioButton
                        color='#15d03e'
                        value={first}
                        onChangeText={setFirst}
                        status={checked === 'first' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('first')}
                      />
                      <Text style={styles.txt}>i am including damaged/ infected also</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }} >
                      <RadioButton
                        color='#15d03e'
                        value={second}
                        onChangeText={setSecond}
                        status={checked === 'second' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('second')}
                      />
                      <Text style={styles.txt}>i want online professional care expert</Text>
                    </View>
                  </View>
                </View>}

              </View>
            </View>
            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <View style={{ borderWidth: 1, borderRadius: 10, padding: 10, borderColor: '#15d03e' }} >
                <View>
                  <CheckBox
                    checkedColor='#15d03e'
                    uncheckedColor='#15d03e'
                    containerStyle={{ marginLeft: 0, width: '100%', borderColor: '#fff' }}
                    title={'Delivery is not required. i will visit shop'}
                    checked={delivery_r}
                    value={delivery_r}
                    onChangeText={setDelivery_r}
                    onPress={() => setDelivery_r(!delivery_r)}
                  />
                  {delivery_r ? <View></View> : <View>
                    <CheckBox
                      checkedColor='#15d03e'
                      uncheckedColor='#15d03e'
                      containerStyle={{ marginLeft: 0, width: '100%', borderColor: '#fff' }}
                      title={'Delivery Address is same as pick up'}
                      checked={delivery_same}
                      value={delivery_same}
                      onChangeText={setDelivery_same}
                      onPress={() => setDelivery_same(!delivery_same)}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }} >
                      <Text style={styles.pickTxt}>Delivery Address</Text>
                      <TextInput
                        value={delivery_address}
                        onChangeText={setDelivery_address}
                        style={[styles.input, { height: 70, paddingVertical: 10, textAlignVertical: 'top', borderColor: '#15d03e' },]}
                        multiline={true}
                      />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }} >
                      <Text style={styles.pickTxt}>Delivery Pin Code</Text>
                      <TextInput
                        value={delivery_pincode}
                        onChangeText={setDelivery_pincode}
                        style={[styles.input1, { height: 40, paddingVertical: 10, textAlignVertical: 'top', borderColor: '#15d03e', },]}
                        multiline={true}
                      />
                    </View>
                  </View>}
                </View>
              </View>
            </View>
            <View style={styles.disc}>
              <Text style={styles.pickTxt}>Approximate delivery date 7 days (2 days pickup + 3 days process + 2 days delivery by courier )</Text>
            </View>
            <View>
              <Text style={styles.heding} >invoice</Text>
              <View style={styles.disc}>
                <Text style={[styles.pickTxt, { marginBottom: 10 }]}>Replacement charges:{invoice.re_charge}</Text>
                <Text style={[styles.pickTxt, { marginBottom: 10 }]}>Courier charges:{invoice.co_charge}</Text>
                <Text style={[styles.pickTxt, { marginBottom: 10 }]}>Total charges:{invoice.total_amount}/-</Text>
                {/* <Text style={styles.pickTxt}>Get 10% Discount Pay just Rs 500 only valid till 29-july-2022</Text> */}
        {/* </View>
            </View>

          </View>
        </View>
        </View>  */}
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

//make this component available to the app
export default QuoteInvoiceList;
