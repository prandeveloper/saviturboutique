//import liraries
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
  RefreshControl,
  ScrollView,
  Alert,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import ImageModal from 'react-native-image-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CheckBox} from 'react-native-elements';

// create a component
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
const FavoriteScreen = ({navigation}) => {
  const [storefav, setStorefav] = useState('');
  const [userId, setUserId] = useState();
  const [deleteData, setDeleteData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(true);
  const [notificationcount, setNotificationcount] = useState([]);
  const [counter, setCounter] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [delivery_address, setDelivery_address] = useState();
  const [modelData, setModelData] = useState();
  const [resiveId, setResiveId] = useState();
  //console.log(sports);

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
  const getfav = async () => {
    axios
      .get(
        `http://saviturboutique.com/newadmin/api/ApiCommonController/favoritebasedonuserid/${storefav}`,
      )
      .then(response => {
        if (response.data.data && response.data.data.length >= 1) {
          // console.log("<<<<<", response.data.data[0].id)
          const plants = response.data.data;
          setUserId(plants);
          const deletefav = response.data.data[0].id;
          setDeleteData(deletefav);
          console.log('favorite??????', plants);
        } else {
          setUserId([]);
        }
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
    getfav();
    getData();
    getCartCounter();
  }, [storefav]);

  const handleOnpress = element => {
    const newItem = userId.map(val => {
      if (val.id === element.item.id) {
        return {...val, selected: !val.selected};
      } else {
        return val;
      }
    });

    setUserId(newItem);
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
      <View style={{width: '100%', height: '100%'}}>
        <View>
          <Text style={styles.heding}>Favorites</Text>
        </View>

        <View style={{width: '100%'}}>
          <FlatList
            style={{width: '100%', height: '90%'}}
            refreshing={refreshing}
            onRefresh={getfav}
            numColumns={3}
            data={userId}
            renderItem={element => {
              return (
                <View style={styles.main}>
                  <View style={styles.imageview}>
                    <ImageModal
                      overlayBackgroundColor="#333"
                      resizeMode="contain"
                      source={{uri: `${element.item.image}`}}
                      style={[
                        styles.exerciseImage,
                        { borderRadius: 10},
                      ]}>
                      <View style={{flex: 1, borderRadius: 10}}>
                        <View style={{flex: 1, alignSelf: 'flex-end'}}>
                          <TouchableOpacity
                            onPress={async () =>
                              axios
                                .post(
                                  `http://saviturboutique.com/newadmin/api/ApiCommonController/deletefavorite`,
                                  {
                                    fav: element.item.id,
                                  },
                                  {
                                    headers: {
                                      user_id: await AsyncStorage.getItem(
                                        'user_id',
                                      ),
                                    },
                                  },
                                )
                                .then(response => {
                                  console.log('////////', response.data);
                                  getfav();
                                })
                                .catch(error => {
                                  console.log(error);
                                })
                            }>
                            <Image
                              source={require('../assets/images/love.png')}
                              style={{
                                width: 20,
                                height: 20,
                                tintColor: '#d5267a',
                                marginRight: 5,
                                marginTop: 5,
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            marginBottom: 6,
                          }}>
                          {/* <TouchableOpacity
                            style={styles.view}
                            onPress={() =>
                              navigation.navigate('CarouselScreen', {
                                id: element.item.id,
                              })
                            }>
                            <Text style={{color: 'white'}}>View</Text>
                          </TouchableOpacity> */}
                          <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                              Alert.alert('Modal has been closed.');
                              setModalVisible(!modalVisible);
                            }}>
                            <View style={styles.centeredView}>
                              <View style={styles.modalView}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    width: 250,
                                    justifyContent: 'space-between',
                                  }}>
                                  <View
                                    style={{
                                      borderWidth: 2,
                                      marginRight: 10,
                                      borderRadius: 20,
                                      borderColor: '#F00976',
                                    }}>
                                    <Image
                                      style={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: 20,
                                      }}
                                      source={{uri: `${modelData?.image}`}}
                                    />
                                  </View>
                                  <View style={{marginRight: 10}}>
                                    <Text
                                      style={{color: 'black', marginBottom: 5}}>
                                      {modelData?.product_name}
                                    </Text>
                                    <Text
                                      style={{color: 'black', marginBottom: 5}}>
                                      Stitching Price : {modelData?.price}
                                    </Text>
                                    <Text
                                      style={{color: 'black', marginBottom: 5}}>
                                      Fabric is not included
                                    </Text>
                                  </View>
                                  <Pressable
                                    // style={[styles.button, styles.buttonClose]}
                                    onPress={() =>
                                      setModalVisible(!modalVisible)
                                    }>
                                    <Ionicons
                                      name="close"
                                      color={'#F00976'}
                                      size={20}
                                    />
                                  </Pressable>
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
                                      title={
                                        'I want designer to take the measurement'
                                      }
                                      checked={second}
                                      value={second}
                                      onChangeText={setSecond}
                                      onPress={() => setSecond(!second)}
                                    />
                                  </View>
                                </View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginBottom: 10,
                                  }}>
                                  <TextInput
                                    value={delivery_address}
                                    onChangeText={setDelivery_address}
                                    style={[
                                      styles.input,
                                      {
                                        height: 70,
                                        paddingVertical: 10,
                                        textAlignVertical: 'top',
                                        borderColor: '#F00976',
                                      },
                                    ]}
                                    multiline={true}
                                  />
                                  <View style={{justifyContent: 'flex-end'}}>
                                    <TouchableOpacity
                                      onPress={async () =>
                                        axios
                                          .post(
                                            `http://saviturboutique.com/newadmin/api/ApiCommonController/cartnewapi`,
                                            {
                                              product_id: resiveId,
                                              note: delivery_address,
                                              first: first,
                                              second: second,
                                            },
                                            {
                                              headers: {
                                                user_id:
                                                  await AsyncStorage.getItem(
                                                    'user_id',
                                                  ),
                                              },
                                            },
                                          )
                                          .then(response => {
                                            console.log(
                                              '////////',
                                              response.data,
                                            );
                                            getCartCounter();
                                            setModalVisible(!modalVisible);
                                          })
                                          .catch(error => {
                                            console.log(error);
                                          })
                                      }
                                      style={{
                                        justifyContent: 'center',
                                        marginLeft: 20,
                                        backgroundColor: '#F00976',
                                        height: 40,
                                        width: 40,
                                        borderRadius: 10,
                                        alignItems: 'center',
                                      }}>
                                      <Text
                                        style={{
                                          textAlign: 'center',
                                          color: '#fff',
                                          fontSize: 16,
                                        }}>
                                        OK
                                      </Text>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </Modal>
                          {/* <Pressable
                            style={[styles.button, styles.buttonOpen]}
                            onPress={() => setModalVisible(true)}>
                            <Text style={styles.textStyle}>Show Modal</Text>
                          </Pressable> */}
                          <Pressable
                            style={styles.view}
                            onPress={() =>
                              axios
                                .get(
                                  `http://saviturboutique.com/newadmin/api/ApiCommonController/productbaseonid/${element.item.id}`,
                                )
                                .then(response => {
                                  // console.log("<<<<<//////",response.data.data[0].id)
                                  const model = response.data.data[0];
                                  setModelData(model);
                                  console.log('amit ////', model);
                                  const imageId = response.data.data[0].id;
                                  setResiveId(imageId);
                                  console.log('image id ///////', imageId);
                                  setModalVisible(true);
                                })
                                .catch(error => {
                                  console.log(error);
                                })
                            }>
                            <Ionicons name="cart" color={'#F00976'} size={30} />
                          </Pressable>
                        </View>
                      </View>
                    </ImageModal>
                    <Text style={styles.pricetxt}>
                      Price:Rs{element.item.price}
                    </Text>
                    <Text style={styles.pricetxt1}>
                      {element.item.product_name}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  exerciseImage: {
    width: 115,
    height: 115,
    position: 'relative',
  },
  main: {
    width: '33%',
    alignItems: 'center',
  },
  imageview: {},
  pricetxt: {
    color: '#333',
    alignSelf: 'center',
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
  },
  pricetxt1: {
    color: '#333',
    alignSelf: 'center',
    fontSize: 16,
    marginBottom: 5,
  },
  view: {
    backgroundColor: '#fff',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  heding: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    marginLeft: 10,
  },
  scrollView: {
    flex: 1,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
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
  input: {
    width: '70%',
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'blue',
  },
  pickTxt: {
    color: '#333',
    fontFamily: 'Roboto-Medium',
    alignSelf: 'center',
  },
});

//make this component available to the app
export default FavoriteScreen;
