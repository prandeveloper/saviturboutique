import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Feather from 'react-native-vector-icons/Feather';

import BannerSlider from '../../components/BannerSlider';
import {windowWidth} from '../../utils/Dimensions';

import {freeGames, paidGames, sliderData} from '../../model/data';
import CustomSwitch from '../../components/CustomSwitch';
import ListItem from '../../components/ListItem';
import OrderStatus from './OrderStatus';
import QuoteInvoiceList from './QuoteInvoiceList';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect } from 'react';






export default function TabOrderStatus({navigation}) {
  const [gamesTab, setGamesTab] = useState(1);
  const [counter, setCounter] = useState('');
const [storefav, setStorefav] = useState('');
const [notificationcount, setNotificationcount] = useState([]);


  const renderBanner = ({item, index}) => {
    return <BannerSlider data={item} />;
  };

  const onSelectSwitch = value => {
    setGamesTab(value);
  };

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
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
    getCartCounter();
  }, [storefav]);
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
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getCount();
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
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
      </View>
      <ScrollView style={{padding: 10}}>

        <View style={{marginVertical: 0}}>
          <CustomSwitch
            selectionMode={1}
            option1="Product"
            option2="Quote Product"
            onSelectSwitch={onSelectSwitch}
          />
        </View>

        {gamesTab == 1 &&
          freeGames.map(item => (
            <OrderStatus />
          ))}
        {gamesTab == 2 &&
          paidGames.map(item => (
            
            <QuoteInvoiceList />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    counterbtn: {
        backgroundColor: 'yellow',
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
      },
       countertxt: {
    color: 'black',
    fontWeight: 'bold',
  },
})