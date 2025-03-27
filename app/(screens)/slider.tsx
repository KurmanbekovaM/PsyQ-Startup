import React, { useState } from 'react';
import { SafeAreaView, Dimensions, View, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';  
import Welcome1 from '../(screens)/welcome1';  
import Welcome2 from '../(screens)/welcome2';
import Welcome3 from '../(screens)/welcome3';
import Welcome4 from '../(screens)/welcome4';

const { width, height } = Dimensions.get('window');  

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0); 

  return (
<SafeAreaView style={styles.appContainer}>
  <Swiper
    loop={false}  
    showsPagination={true}  
    paginationStyle={{
      bottom: height * 0.21,  
    }}
    activeDotColor="#50A1ED" 
    dotColor="#B0B0B0"  
    dotStyle={{
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 1,
    }}
    activeDotStyle={{
      width: 14,
      height: 14,
      borderRadius: 7,
    }}
    index={activeIndex}  
    onIndexChanged={(index) => setActiveIndex(index)}  
  >
    <View key="1" style={{ flex: 1 }}>
      <Welcome1 />
    </View>
    <View key="2" style={{ flex: 1 }}>
      <Welcome2 />
    </View>
    <View key="3" style={{ flex: 1 }}>
      <Welcome3 />
    </View>
    <View key="4" style={{ flex: 1 }}>
      <Welcome4 />
    </View>
  </Swiper>
</SafeAreaView>

  );
};
export default Slider;
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
