import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity, Image} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Gaming from '../assets/images/misc/gaming.svg';
import BrandLogo from '../assets/images/misc/brandLogo.svg';

const OnboardingScreen = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      {/* <View style={{marginTop: 20}}>
        <Text
          style={{
            fontFamily: 'Inter-Bold',
            fontWeight: 'bold',
            fontSize: 30,
            color: '#20315f',
          }}>
          GAMEON
        </Text>
      </View> */}
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/* <BrandLogo
          width={300}
          height={300}
          style={{transform: [{rotate: '-15deg'}]}}
        /> */}
        <Image
          style={{width: 300, height: 300}}
          source={require('../assets/images/logoflash.png')}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#F00976',
          padding: 20,
          width: '90%',
          borderRadius: 10,
          marginBottom: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onPress={() => navigation.navigate('Login')}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            textAlign: 'center',
            fontWeight: 'bold',
            fontFamily: 'Roboto-MediumItalic',
          }}>
          Let's Begin
        </Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
