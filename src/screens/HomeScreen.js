//import liraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// create a component
const HomeScreen = ({navigation}) => {
  const [plant, setPlant] = useState([]);
  const [notificationcount, setNotificationcount] = useState([]);
  const [collection, setCollection] = useState([]);
  const [userName, setUserName] = useState();
  const [counter, setCounter] = useState('');
  const [storeddata, setStoreddata] = useState('');
  const [isLoded, setIsLoded] = useState(false);
  console.log(plant);
  const getPlant = async () => {
    setIsLoded(true);
    axios
      .get(
        `http://saviturboutique.com/newadmin/api/ApiCommonController/plantcategory`,
      )
      .then(response => {
        //console.log("<<<<<",response.data.data)
        const plants = response.data.data;
        setPlant(plants);
        console.log(plants);
        getCartCounter();
        setIsLoded(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getPlant();
  }, []);

  const getCount = async () => {
    setIsLoded(true);
    axios
      .get(
        `http://saviturboutique.com/newadmin/api/ApiCommonController/notificationcount`,
      )
      .then(response => {
        //console.log("<<<<<",response.data.data)
        const count = response.data;
        setNotificationcount(count);
        console.log('//////////', count);
        setIsLoded(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getCount();
  }, []);

  const getCollection = async () => {
    setIsLoded(true);
    axios
      .get(
        `http://saviturboutique.com/newadmin/api/ApiCommonController/categorycount`,
      )
      .then(response => {
        //console.log("<<<<<",response.data.data)
        const counts = response.data;
        setCollection(counts);
        console.log('//////////', counts);
        setIsLoded(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getCollection();
  }, []);

  const getData = async () => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      if (user_id !== null) {
        console.log('@@@@@@@@', user_id);
        setStoreddata(user_id);
      }
    } catch (e) {
      console.log('no Value in login');
    }
  };
  const getUserName = async () => {
    setIsLoded(true);
    axios
      .get(
        `http://saviturboutique.com/newadmin/api/ApiCommonController/usersingledata/${storeddata}`,
      )
      .then(response => {
        //console.log("<<<<<",response.data.data)
        const plants = response.data.data;
        setUserName(plants);
        console.log('name ????', plants);
        setIsLoded(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const getCartCounter = async () => {
    setIsLoded(true);
    axios
      .get(
        `http://saviturboutique.com/newadmin/api/ApiCommonController/cartcountbyuserid/${storeddata}`,
      )
      .then(response => {
        //console.log("<<<<<",response.data.data)
        const cartCounter = response.data.data;
        setCounter(cartCounter);
        console.log('cartCounter', cartCounter);
        setIsLoded(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
    getUserName();
    getCartCounter();
  }, [storeddata]);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
          padding: 5,
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu" color={'#F00976'} size={30} />
          </TouchableOpacity>
          {userName?.map(uname => (
            <Text style={styles.heding1}>{uname.username}</Text>
          ))}
        </View>

        <Text style={styles.heding}>Good Day</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
            <View style={{flexDirection: 'row-reverse'}}>
              <TouchableOpacity style={styles.counterbtn}>
                <Text style={styles.countertxt}>{counter}</Text>
              </TouchableOpacity>
              <Ionicons name="cart" color={'#F00976'} size={30} />
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
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isLoded}
            onRefresh={
              (getCartCounter, getUserName, getCollection, getCount, getPlant)
            }
          />
        }>
        <View>
          <View style={{marginBottom: 20}}>
            <Text style={styles.heding3}>Choose your outfit</Text>
            <Text style={styles.heding4}>
              We have {collection.data} + latest collection
            </Text>
          </View>
          <View>
            <FlatList
              numColumns={2}
              data={plant}
              renderItem={element => {
                return (
                  <View style={styles.mainBox}>
                    <View style={styles.secondBox}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('CategoryList', {
                            id: element.item.id,
                          })
                        }>
                        <View style={styles.imageview}>
                          <View>
                            <Image
                              style={styles.exerciseImage}
                              source={{uri: `${element.item.image}`}}
                            />
                          </View>
                        </View>
                        <Text style={styles.pricetxt}>
                          {element.item.category_name}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
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
  exerciseImage: {
    width: 160,
    height: 160,
    borderRadius: 10,
  },
  heding1: {
    fontFamily: 'Roboto-MediumItalic',
    fontSize: 18,
    color: '#333',
    marginLeft: 5,
  },
  heding: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    color: '#333',
  },
  imageview: {
    // borderWidth: 2,
    borderColor: 'red',
    borderRadius: 10,
  },
  pricetxt: {
    color: '#333',
    alignSelf: 'center',
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
  },
  heding3: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    marginLeft: 10,
    alignSelf: 'center',
  },
  heding4: {
    fontSize: 20,
    color: 'black',
    marginLeft: 10,
    alignSelf: 'center',
  },
  mainBox: {
    width: '50%',
    alignItems: 'center',
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
export default HomeScreen;
