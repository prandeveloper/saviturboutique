import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Alert,
  Button,
  Linking,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const supportedURL = 'https://www.saviturboutique.com/aboutus.html';

const unsupportedURL = 'slack://open?team=123456';

const OpenURLButton = ({url, children}) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some About, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};

const CustomDrawer = props => {
  const navigation = useNavigation();
  const [storeddata, setStoreddata] = useState('');
  const [userName, setUserName] = useState();
  const [refreshing, setRefreshing] = React.useState(false);

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
    setRefreshing(true);
    axios
      .get(
        `http://saviturboutique.com/newadmin/api/ApiCommonController/usersingledata/${storeddata}`,
      )
      .then(response => {
        //console.log("<<<<<",response.data.data)
        const plants = response.data.data;
        setUserName(plants);
        console.log(plants);
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
    getUserName();
  }, [storeddata]);
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#8200d6'}}>
        <ImageBackground
          source={require('../assets/images/menu-bg.jpeg')}
          style={{padding: 20}}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={getUserName} />
            }>
            {userName?.map(uname => (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={{uri: `${uname.image}`}}
                  style={{
                    height: 80,
                    width: 80,
                    borderRadius: 40,
                    marginBottom: 10,
                  }}
                />
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 18,
                    fontFamily: 'Roboto-Medium',
                    marginBottom: 5,
                  }}>
                  {uname.username}
                </Text>
              </View>
            ))}
          </ScrollView>
          {/* <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Regular',
                marginRight: 5,
              }}>
              280 Coins
            </Text>
            <FontAwesome5 name="coins" size={14} color="#fff" />
          </View> */}
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://www.saviturboutique.com/aboutus.html')
            }
            style={{paddingVertical: 15}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 20,
              }}>
              <Ionicons
                name="information-circle-outline"
                size={22}
                color={'black'}
              />
              {/* <OpenURLButton  url={supportedURL}>About Us</OpenURLButton> */}
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 5,
                  color: '#333',
                }}>
                About Us
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://www.saviturboutique.com/terms-of-use.html',
              )
            }
            style={{paddingVertical: 15}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 20,
              }}>
              <Ionicons
                name="information-circle-outline"
                size={22}
                color={'black'}
              />
              {/* <OpenURLButton  url={supportedURL}>About Us</OpenURLButton> */}
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 5,
                  color: '#333',
                }}>
                Terms & Conditions
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://www.saviturboutique.com/privacy-policy.html',
              )
            }
            style={{paddingVertical: 15}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 20,
              }}>
              <Ionicons
                name="information-circle-outline"
                size={22}
                color={'black'}
              />
              {/* <OpenURLButton  url={supportedURL}>About Us</OpenURLButton> */}
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 5,
                  color: '#333',
                }}>
                Privacy Policy
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://www.saviturboutique.com/payment-terms.html',
              )
            }
            style={{paddingVertical: 15}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 20,
              }}>
              <Ionicons
                name="information-circle-outline"
                size={22}
                color={'black'}
              />
              {/* <OpenURLButton  url={supportedURL}>About Us</OpenURLButton> */}
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 5,
                  color: '#333',
                }}>
                Payment Terms
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://www.saviturboutique.com/refund-cancellation.html',
              )
            }
            style={{paddingVertical: 15}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 20,
              }}>
              <Ionicons
                name="information-circle-outline"
                size={22}
                color={'black'}
              />
              {/* <OpenURLButton  url={supportedURL}>About Us</OpenURLButton> */}
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 5,
                  color: '#333',
                }}>
                Refund Policy
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{paddingVertical: 15}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 20,
              }}>
              <Ionicons name="md-location-outline" size={22} color={'black'} />
              {/* <OpenURLButton  url={supportedURL}>About Us</OpenURLButton> */}
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 5,
                  color: '#333',
                }}>
                Our Address
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{paddingVertical: 15}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 20,
              }}>
              <Ionicons name="logo-whatsapp" size={22} color={'black'} />
              {/* <OpenURLButton  url={supportedURL}>About Us</OpenURLButton> */}
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 5,
                  color: '#333',
                }}>
                9886758183
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Share the App
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="md-star-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Rate the App
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            // navigation.closeDrawer();
            // navigation.dispatch(StackActions.push('Login'));
            navigation.dispatch(DrawerActions.closeDrawer());
            console.log('<<<<<<<<<<<');
            navigation.reset({
              index: 0,
              routes: [{name: 'Login'}],
            });
            // navigation.replace('Login');
            console.log('>>>>>>>>>>>');
            await AsyncStorage.removeItem('user_id');
          }}
          style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} color={'red'} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
                color: 'red',
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
