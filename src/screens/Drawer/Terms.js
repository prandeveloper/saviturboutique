//import liraries
import axios from 'axios';
import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import HTMLView from 'react-native-htmlview';
import Ionicons from 'react-native-vector-icons/Ionicons';



// create a component
const Terms = ({navigation}) => {
    const [heding,setHeding] = useState([]);
    const aboutUS = ()=>{
        axios.get(`http://saviturboutique.com/newadmin/api/ApiCommonController/termcondition`)
        .then((response)=>{
            console.log("<>>>M>>",response.data.data[0].editor1);
            const heding = response.data.data[0]
            setHeding(heding);

        })
       .catch((error)=>{
        console.log(error);
       })
    }
    useEffect(()=>{
        aboutUS()
    },[]);
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
        </View>
        <ScrollView>
        <HTMLView
        value={heding.editor1}
        stylesheet={styles}
      />
        </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  aa: {
    fontSize: 25,
    marginLeft: 20,
    color: '#349FFE',
    fontWeight: '500',
    paddingVertical: 15,
  },
  bb: {
    marginLeft:20,
    color: 'black',
  },
});

//make this component available to the app
export default Terms;
