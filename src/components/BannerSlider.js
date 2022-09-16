import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {View, Image} from 'react-native';

export default function BannerSlider({data}) {
  const [plant, setPlant] = useState([]);

  const getPlant = async () => {
    axios
      .get(`http://saviturboutique.com/newadmin/api/ApiCommonController/productbaseonimage/8`)
      .then((response) => {
        //console.log("<<<<<",response.data.data)
        const plants = response.data.data
        setPlant(plants);
        console.log(plants);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getPlant();
  }, []);
  return (
    <View>
      <Image
        source={data.image}
        style={{height: 150, width: 300, borderRadius: 10}}
      />
    </View>
  );
}
