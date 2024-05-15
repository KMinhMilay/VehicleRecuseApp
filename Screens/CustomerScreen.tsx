import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import 'react-native-gesture-handler';      
import { Image } from 'react-native-ui-lib';


function CustomerScreen({navigation}: any): React.JSX.Element {
  const Motorbike = () => {
    navigation.navigate('AddTripScreen',{
      id:'motorbike',
      vehicle: 'Xe máy'
    });
  };
  const Car = () => {
    navigation.navigate('AddTripScreen',{
      id:'car',
      vehicle: 'Xe ô tô'
    });
  };
  const Truck = () => {
    
    navigation.navigate('AddTripScreen',{
      id:'truck',
      vehicle: 'Xe tải'
    });
  };
  const Bicycle = () => {
    navigation.navigate('AddTripScreen',{
      id:'bike',
      vehicle: 'Xe đạp'
    });
  };
  return (
    <View style={{flex:1,padding:32}}>
      <View style={{flex:1}}>
        <Text style={{fontSize:32,color:'black',fontWeight:'bold'}}>Chọn 1 loại phương tiện bạn cần hỗ trợ</Text>
      </View>
      <View style={styles.flex_img_back}>
        <TouchableOpacity style={styles.containerSelect} onPress={Motorbike}>
          <Image
            style={{height:128,width:128}}
            source={require('../Assets/Asset/3d-casual-life-moped.png')}
            resizeMode={'contain'}
          />
          <Text style={styles.font}>Xe Máy</Text>
          <Image
            style={{height:32,width:32}}
            source={require('../Assets/Asset/icons8-right-arrow-48.png')}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.containerSelect} onPress={Car}>
          <Image
            style={{height:128,width:128}}
            source={require('../Assets/Asset/3d-casual-life-toy-car-turn-right-blue.png')}
            resizeMode={'contain'}
          />
          <Text style={styles.font}>Xe Ô Tô</Text>
          <Image
            style={{height:32,width:32}}
            source={require('../Assets/Asset/icons8-right-arrow-48.png')}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.containerSelect} onPress={Truck}>
          <Image
            style={{height:128,width:128}}
            source={require('../Assets/Asset/3d-casual-life-delivery-truck-yellow.png')}
            resizeMode={'contain'}
          />
          <Text style={styles.font}>Xe Tải</Text>
          <Image
            style={{height:32,width:32}}
            source={require('../Assets/Asset/icons8-right-arrow-48.png')}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.containerSelect} onPress={Bicycle}>
          <Image
            style={{height:128,width:128}}
            source={require('../Assets/Asset/casual-life-3d-side-view-of-green-city-bike.png')}
            resizeMode={'contain'}
          />
          <Text style={styles.font}>Xe Đạp</Text>
          <Image
            style={{height:32,width:32}}
            source={require('../Assets/Asset/icons8-right-arrow-48.png')}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CustomerScreen

const styles = StyleSheet.create({
  flex_img_back: {
    flex:6,
    alignItems:'center',
    justifyContent: 'space-between',
    
  },
  containerSelect:{
    padding:8,width:256,height:128,flexDirection:'row',justifyContent:'space-between',alignItems:'center',
    borderWidth:1,borderColor:'black',borderRadius:20,backgroundColor:'white'
  },
  font: {
    fontSize:18,
    color:'black',
    fontWeight:'bold'
  }
})