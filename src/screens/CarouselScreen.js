import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get("window");
const height = width * 100 / 60; //60%

export default function CarouselScreen({ route,navigation }) {
  const { id } = route.params;
  console.log("???<><><></",id);
  const [plant, setPlant] = useState([]);

  const getPlant = async () => {
    axios
      .get(`http://saviturboutique.com/newadmin/api/ApiCommonController/productbaseonimage/${id}`)
      .then((response) => {
        //console.log("<<<<<",response.data.data)
        const plants = response.data.data[0]
        setPlant(plants);
        console.log("OOOOOOOOOOOO",plants);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getPlant();
  }, []);


  return (
    <SafeAreaView style={{ marginTop: 50, width, height }}>
      <ScrollView pagingEnabled horizontal style={{ width, height }} >
         
              <Image
                source={{ uri: `${plant.image}` }}
                resizeMode='contain'
                style={{ height, width, borderRadius: 10, resizeMode: 'contain' }}
              />
              <Image
                source={{ uri: `${plant.image1}` }}
                resizeMode='contain'
                style={{ height, width, borderRadius: 10, resizeMode: 'contain' }}
              />
              <Image
                source={{ uri: `${plant.image2}` }}
                resizeMode='contain'
                style={{ height, width, borderRadius: 10, resizeMode: 'contain' }}
              />
      </ScrollView>
    </SafeAreaView>
  );
}