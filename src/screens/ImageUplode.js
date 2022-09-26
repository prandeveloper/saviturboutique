import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';

import {useTheme} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CheckBox} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';

const ImageUplode = ({navigation}) => {
  const [image, setImage] = useState(
    'https://api.adorable.io/avatars/80/abott@adorable.png',
  );
  const [username, setUsername] = useState('');
  const [lastname, setLastname] = useState('');
  const [mobile_no, setMobile_no] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [storeProfile, setStoreProfile] = useState('');
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [userImage, setUserImage] = useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const [card, setCard] = useState();
  const [note, setNote] = useState('');
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [users, setUsers] = useState('');

  const [language, setLanguage] = useState([]);
  const [nameId, setNameId] = useState([]);

  const getDataProfile = async () => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      if (user_id !== null) {
        console.log('@@@@@@@@', user_id);
        setStoreProfile(user_id);
      }
    } catch (e) {
      console.log('no Value in login');
    }
  };
  const getProfile = async () => {
    setRefreshing(true);
    axios
      .get(
        `http://saviturboutique.com/newadmin/api/ApiCommonController/getuserbyuserid/${storeProfile}`,
      )
      .then(response => {
        // console.log("<<<<<",response.data.data[0].username)
        const plants = response.data.data;
        {
          setUsername(plants[0].username);
          setMobile_no(plants[0].mobile_no);
          setEmail(plants[0].email);
          setCountry(plants[0].country);
          setAddress(plants[0].address);
        }
        setUserId(plants);
        const userName = response.data.data[0].username;
        setUserName(userName);
        console.log(userName);
        const userImage = response.data.data[0].image;
        setUserImage(userImage);
        console.log(userImage);
        console.log('profle ///////', plants);
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getProfile();
    getDataProfile();
  }, [storeProfile]);

  const sendData = () => {
    editData();
  };

  const editData = async () => {
    console.log("@@@@@@@@@",first, second, note, image);
    var img = {uri: `${image}`, name: 'imageUplode.jpg', type: 'image/jpeg'};
    const formData = new FormData();
    formData.append('first', first);
    formData.append('second', second);
    formData.append('note', note);
    formData.append('image', img);
    fetch(`http://saviturboutique.com/newadmin/api/ApiCommonController/quote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        user_id: await AsyncStorage.getItem('user_id'),
      },
      body: formData,
    })
      .then(response => {
        response.json().then(res => {
          console.log(res);
          if (res != null) {
            navigation.replace('CartScreen');
          } else {
            console.log('no id!');
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  const getCategiry = async () => {
    axios
      .get(
        `http://saviturboutique.com/newadmin/api/ApiCommonController/categorylistall`,
      )
      .then(response => {
        // console.log('new <<<<<', response.data.data[0].id);
        const language = response.data.data;
        setLanguage(language);
        const nameId = response.data.data[0].id;
        setNameId(nameId);
        console.log("aaiaiaiaiaiai",nameId);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getCategiry();
  }, []);

  const {colors} = useTheme();

  // const takePhotoFromCamera = () => {
  //   ImagePicker.openCamera({
  //     compressImageMaxWidth: 300,
  //     compressImageMaxHeight: 300,
  //     cropping: true,
  //     compressImageQuality: 0.7
  //   }).then(image => {
  //     console.log(image);
  //     setImage(image.path);
  //     bs.current.snapTo(1);
  //   });
  // }

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      console.log(image);
      setImage(image.path);

      bs.current.snapTo(1);
    });
  };

  renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      {/* <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  bs = React.createRef();
  fall = new Animated.Value(1);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getProfile} />
        }>
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
            <TouchableOpacity
              onPress={() => navigation.navigate('NotificationScreen')}>
              <Ionicons name="notifications" color={'#F00976'} size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <BottomSheet
          ref={bs}
          snapPoints={[330, 0]}
          renderContent={renderInner}
          renderHeader={renderHeader}
          initialSnap={1}
          callbackNode={fall}
          enabledGestureInteraction={true}
        />
        <Animated.View
          style={{
            margin: 20,
            opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
          }}>
          <View
            style={{
              justifyContent: 'center',
              width: '97%',
              alignSelf: 'center',
            }}>
            {/* <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
              <View
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ImageBackground
                  source={{
                    uri: userImage,
                  }}
                  style={{height: 150, width: 150, padding: 10}}
                  imageStyle={{borderRadius: 15}}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderStyle: 'dashed',
                      borderWidth: 1,
                      borderRadius: 8,
                    }}>
                    <Icon
                      name="camera"
                      size={35}
                      color="#fff"
                      style={{
                        opacity: 0.7,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: '#fff',
                        borderRadius: 10,
                      }}
                    />
                    <Text style={styles.txt}>
                      Click here to upload your design reference Image
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            <Text style={{marginTop: 20, fontSize: 18, fontWeight: 'bold'}}>
              {userName}
            </Text> */}
            <View style={styles.box}>
              <View style={styles.row}>
                <View style={[styles.imgView, {width: '40%'}]}>
                  {/* <Image style={styles.img} source={{uri: `${card.image}`}} /> */}
                  <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                    <View
                      style={{
                        height: 100,
                        width: 100,
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <ImageBackground
                        // source={{
                        //   uri: userImage,
                        // }}
                        style={{height: 120, width: 130, padding: 10}}
                        imageStyle={{borderRadius: 15}}>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderStyle: 'dashed',
                            borderWidth: 1,
                            borderRadius: 8,
                          }}>
                          {/* <Icon
                            name="camera"
                            size={35}
                            color="#fff"
                            style={{
                              opacity: 0.7,
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderWidth: 1,
                              borderColor: '#fff',
                              borderRadius: 10,
                            }}
                          /> */}
                          <Text style={styles.txt}>
                            Click here to upload your design reference Image
                          </Text>
                        </View>
                      </ImageBackground>
                    </View>
                  </TouchableOpacity>
                </View>
                {/* <View
                  style={{
                    justifyContent: 'space-around',
                    width: '60%',
                  }}>
                  <Picker
                    selectedValue={users}
                    onValueChange={itemVal => {
                      setUsers(itemVal);
                    }}>
                    {language?.map(lam => (
                      <Picker.Item
                        label={lam.category_name}
                        value={lam.id}
                        style={{color: 'black', backgroundColor: '#fff'}}
                      />
                    ))}
                  </Picker>
                </View> */}
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
                    title={'I want designer to take the measurement'}
                    checked={second}
                    value={second}
                    onChangeText={setSecond}
                    onPress={() => setSecond(!second)}
                  />
                </View>
                <View>
                  <Text style={{color: '#333'}}>Instructions to tailor</Text>
                  <View style={{}}>
                    <TextInput
                      value={note}
                      onChangeText={setNote}
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
                  </View>
                </View>
                <Text style={{color: '#333',marginTop:8}}>The quotation will be updated by next working day </Text>
              </View>
            </View>
          </View>

          {/* <View style={styles.action}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="Full Name"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
            />
          </View>
          
          <View style={styles.action}>
            <Feather name="phone" color={colors.text} size={20} />
            <TextInput
              value={mobile_no}
              onChangeText={setMobile_no}
              placeholder="Phone"
              placeholderTextColor="#666666"
              keyboardType="number-pad"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
            />
          </View>

          <View style={styles.action}>
            <FontAwesome name="envelope-o" color={colors.text} size={20} />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor="#666666"
              keyboardType="email-address"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="globe" color={colors.text} size={20} />
            <TextInput
              value={country}
              onChangeText={setCountry}
              placeholder="Country"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
            />
          </View>
          <View style={styles.action}>
            <Icon name="map-marker-outline" color={colors.text} size={20} />
            <TextInput
              value={address}
              onChangeText={setAddress}
              placeholder="Address"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
            />
          </View> */}

          <TouchableOpacity style={styles.commandButton} onPress={sendData}>
            <Text style={styles.panelButtonTitle}>Submit</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default ImageUplode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#F00976',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  uplode: {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderRadius: 10,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderColor: '#F00976',
  },
  main: {
    alignSelf: 'center',
  },
  txt: {
    color: 'black',
    textAlign: 'center',
    position: 'absolute',
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
  txt1: {
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
  input: {
    width: '90%',
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'blue',
  },
});
