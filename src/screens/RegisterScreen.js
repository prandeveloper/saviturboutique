import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

import DatePicker from 'react-native-date-picker';

import InputField from '../components/InputField';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RegistrationSVG from '../assets/images/misc/registration.svg';
import GoogleSVG from '../assets/images/misc/google.svg';
import FacebookSVG from '../assets/images/misc/facebook.svg';
import TwitterSVG from '../assets/images/misc/twitter.svg';
import CustomButton from '../components/CustomButton';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {color} from 'react-native-reanimated';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dobLabel, setDobLabel] = useState('Date of Birth');

  const [username, setUsername] = useState('');
  const [mobile_no, setMobile_no] = useState('');
  const [otp, setOtp] = useState(true);
  const [code, setCode] = useState('');
  const [storeddata, setStoreddata] = useState('');

  const sendMobile = () => {
    setOtp(false);
    console.log(username, mobile_no);
    axios
      .post(
        `https://saviturboutique.com/newadmin/api/ApiCommonController/registration`,
        {
          username: username,
          mobile_no: mobile_no,
        },
      )
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const _storeData = async id => {
    try {
      await AsyncStorage.setItem('user_id', id);
      console.log('id Saved');
    } catch (error) {
      console.log('Some error in setting id');
    }
  };
  const getData = async () => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      if (user_id !== null) {
        console.log('success');
        console.log(user_id);
        setStoreddata(user_id);
        navigation.replace('Home');
      }
    } catch (e) {
      console.log('no Value in login');
    }
  };
  useEffect(() => {
    getData();
  }, [storeddata]);
  const verifyOtp = () => {
    console.log(mobile_no, code);
    axios
      .post(
        `https://saviturboutique.com/newadmin/api/ApiCommonController/verify_otppp`,
        {
          mobile_no: mobile_no,
          otp: code,
        },
      )
      .then(response => {
        console.log('@@@@@', response.data);
        console.log('#####', response.data.data[0].id);
        if (response.data != null) {
          _storeData(response.data.data[0].id);
          navigation.replace('Home');
        } else {
          console.log('no id!');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      {otp === true ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{paddingHorizontal: 10}}>
          <Text
            style={{
              fontFamily: 'Roboto-MediumItalic',
              fontSize: 28,
              fontWeight: '500',
              color: '#333',
              marginBottom: 30,
              alignSelf: 'center',
            }}>
            Be Stylish Always
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 30,
              width: '100%',
            }}>
            <View style={styles.txtView}>
              <Text style={styles.txt}>Save Time</Text>
              <Text style={styles.txt}>
                Perfectly fitting Custom designer wear online
              </Text>
            </View>
            <View style={styles.imgView}>
              <Image
                style={styles.img}
                source={require('../assets/images/registration.png')}
              />
            </View>
          </View>
          <View
            style={{
              width: '100%',
              borderWidth: 2,
              marginBottom: 20,
              borderRadius: 10,
              borderColor: '#D3D3D3',
            }}>
            <View style={styles.mainView}>
              <View style={{width: '40%'}}>
                <Text style={styles.txtName}>Name</Text>
              </View>
              <View style={{width: '60%'}}>
                <TextInput
                  value={username}
                  onChangeText={setUsername}
                  style={styles.inpu}
                />
              </View>
            </View>
            <View style={styles.mainView}>
              <View style={{width: '40%'}}>
                <Text style={styles.txtName}>Phone Number</Text>
              </View>
              <View style={{width: '60%'}}>
                <TextInput
                  value={mobile_no}
                  onChangeText={setMobile_no}
                  keyboardType="number-pad"
                  style={styles.inpu}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={sendMobile}
            style={{
              backgroundColor: '#198ecf',
              padding: 20,
              borderRadius: 10,
              marginBottom: 10,
              width: 200,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '700',
                fontSize: 16,
                color: '#fff',
              }}>
              Send Otp
            </Text>
          </TouchableOpacity>

          <View
            style={{
              justifyContent: 'center',
              marginBottom: 10,
              alignSelf: 'center',
            }}>
            <Text style={{color: '#333', fontWeight: '500'}}>
              Registration is Free
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 10,
            }}>
            <Text style={{color: '#333', fontWeight: '500'}}>
              To see our latest Design
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{color: '#198ecf', fontWeight: '700'}}> Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{paddingHorizontal: 10}}>
          <Text
            style={{
              fontFamily: 'Roboto-MediumItalic',
              fontSize: 28,
              fontWeight: '500',
              color: '#333',
              marginBottom: 30,
              alignSelf: 'center',
            }}>
            Fresh Garden Always
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 30,
              width: '100%',
            }}>
            <View style={styles.txtView}>
              <Text style={styles.txt}>Save Time</Text>
              <Text style={styles.txt}>
                Perfectly fitting Custom designer wear online
              </Text>
            </View>
            <View style={styles.imgView}>
              <Image
                style={styles.img}
                source={require('../assets/images/registration.png')}
              />
            </View>
          </View>
          <View
            style={{
              width: '100%',
              borderWidth: 2,
              marginBottom: 20,
              borderRadius: 10,
              borderColor: '#D3D3D3',
            }}>
            <View style={styles.mainView}>
              <View style={{width: '40%'}}>
                <Text style={styles.txtName}>Otp</Text>
              </View>
              <View style={{width: '60%'}}>
                <OTPInputView
                  style={{width: '95%', height: 50}}
                  onCodeChanged={setCode}
                  pinCount={4}
                  autoFocusOnLoad
                  codeInputFieldStyle={styles.underlineStyleBase}
                  codeInputHighlightStyle={styles.underlineStyleHighLighted}
                  onCodeFilled={code => {
                    console.log(`Code is ${code}, you are good to go!`);
                  }}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={verifyOtp}
            style={{
              backgroundColor: '#198ecf',
              padding: 20,
              borderRadius: 10,
              marginBottom: 10,
              width: 200,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '700',
                fontSize: 16,
                color: '#fff',
              }}>
              SUBMIT
            </Text>
          </TouchableOpacity>

          <View
            style={{
              justifyContent: 'center',
              marginBottom: 10,
              alignSelf: 'center',
            }}>
            <Text style={{color: '#333', fontWeight: '500'}}>
              Registration is Free
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 10,
            }}>
            <Text style={{color: '#333', fontWeight: '500'}}>
              To see our latest Design
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{color: '#198ecf', fontWeight: '700'}}> Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 130,
    height: 230,
    alignSelf: 'center',
  },
  imgView: {
    width: '70%',
  },
  txtView: {
    width: '30%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  txt: {
    fontFamily: 'Roboto-MediumItalic',
    fontSize: 18,
    color: '#333',
    marginBottom: 30,
  },
  mainView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  txtName: {
    marginLeft: 10,
    color: '#333',
    fontSize: 17,
  },
  inpu: {
    borderWidth: 2,
    width: '95%',
    borderRadius: 10,
    height: 50,
    borderColor: '#D3D3D3',
  },
  secondTop: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  TextInputText: {
    fontSize: 20,
    alignSelf: 'center',
  },
  TextInputView: {
    borderWidth: 1,
    width: 40,
    height: 45,
    borderColor: '#D3D3D3',
    borderRadius: 5,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#D3D3D3',
  },

  underlineStyleBase: {
    width: 40,
    height: 45,
    borderWidth: 0,
    borderWidth: 2,
    borderRadius: 5,
    color: '#333',
    fontFamily: 'Roboto-Medium',
  },

  underlineStyleHighLighted: {
    color: '#333',
  },
});
export default RegisterScreen;
