import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextField } from 'react-native-ui-lib';
import openMap from 'react-native-open-maps';
import Geolocation from '@react-native-community/geolocation';

function AddTripScreen({ route,navigation}: any): React.JSX.Element {
  const {id,vehicle} = route.params;

  const [note, setNote] = useState('');

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const [longitudeOutput, setLongitudeOutput] = useState<string>('');
  const [latitudeOutput, setLatitudeOutput] = useState<string>('');

  function _getCurrentLocation() {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        if (latitude && longitude) {
          setLatitude(latitude);
          setLongitude(longitude);
          setLatitudeOutput(latitude.toString());
          setLongitudeOutput(longitude.toString());
        }
      },
      error => {
        console.log(error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  const Back = () => {
    navigation.goBack();
  };

  function _goToCurrentLocation() {
    if (latitude && longitude) {
      console.log("Vị trí hiện tại của thiết bị: ", latitude, longitude)
      openMap({ latitude: latitude, longitude: longitude })
    } else {
      console.log("Không lấy được vị trí hiện tại của thiết bị")
    }
  }

function _addTrip() {
  
}

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flex_img_back}>
        <TouchableOpacity onPress={Back}>
          <Image
            style={styles.panel_img}
            source={require('../Assets/Asset/icons8-back-48.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={{}}>
        <Text style={{textAlign:'center',fontSize:36,color:'black'}}>Thêm thông tin khẩn cấp</Text>
      </View>
      <View style={[styles.flex_top_1,{flexDirection:'row'}]}>
          <TouchableOpacity style={styles.btnFavorites} onPress={_getCurrentLocation}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
                textAlign:'center'
              }}>
              LẤY VỊ TRÍ HIỆN TẠI
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnCurrentLocation} onPress={_goToCurrentLocation}>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: 'bold',
                textAlign:'center'
              }}>
              XEM VỊ TRÍ HIỆN TẠI
            </Text>
          </TouchableOpacity>
        </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.containerInput}>
            <TextField
                placeholder={'Loại phương tiện cần sửa'}
                floatingPlaceholder
                label={'Loại phương tiện cần sửa'}
                onChangeText={() => {
                    console.log('Text have changed');
                }}

                value={vehicle}
                enableErrors
                validate={['required']}
                validationMessage={[
                    'Không được để trống này',
                ]}
                readOnly={true}
                
                maxLength={20}
                floatingPlaceholderStyle={styles.floatingHolderStyle}
                containerStyle={styles.containerHolderStyle}
                fieldStyle={styles.fieldStyle}
                validateOnBlur
            />
        </View>
        <View style={styles.containerInput}>
            <TextField
                placeholder={'Vị trí của bạn (Tọa độ X)'}
                floatingPlaceholder
                label={''}
                onChangeText={() => {
                    console.log('Text have changed');
                }}
                readOnly={true}
                value={longitudeOutput}
                enableErrors
                validate={['required']}
                validationMessage={[
                    'Không được để trống này',

                ]}
                showCharCounter
                maxLength={30}
                floatingPlaceholderStyle={styles.floatingHolderStyle}
                containerStyle={styles.containerHolderStyle}
                fieldStyle={styles.fieldStyle}
                validateOnBlur
            />
        </View>
        <View style={styles.containerInput}>
            <TextField
                placeholder={'Vị trí của bạn (Tọa độ Y)'}
                floatingPlaceholder
                label={''}
                onChangeText={() => {
                    console.log('Text have changed');
                }}
                readOnly={true}
                value={latitudeOutput}
                enableErrors
                validate={['required']}
                validationMessage={[
                    'Không được để trống này',

                ]}
                showCharCounter
                maxLength={30}
                floatingPlaceholderStyle={styles.floatingHolderStyle}
                containerStyle={styles.containerHolderStyle}
                fieldStyle={styles.fieldStyle}
                validateOnBlur
            />
        </View>
        <View style={styles.containerInput}>
            <TextField
                placeholder={'Ghi chú'}
                floatingPlaceholder
                label={'Tên đăng nhập'}
                onChangeText={(text) => {
                    console.log('Text have changed');
                    setNote(text)
                }}

                value={note}
                enableErrors
                validate={['required']}
                validationMessage={[
                    'Không được để trống này',
                ]}
                showCharCounter
                maxLength={240}
                floatingPlaceholderStyle={styles.floatingHolderStyle}
                containerStyle={styles.containerHolderStyle}
                fieldStyle={styles.fieldStyle}
                validateOnBlur
            />
        </View>
        <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row',marginTop:16}}>
            <TouchableOpacity style={styles.btnAddFav}>
                <Text
                style={{
                    color: 'black',
                    fontSize: 18,
                    fontWeight: 'bold',
                    textAlign:'center'
                }}>
                THÊM VÀO ƯU THÍCH
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnAccpect}>
                <Text
                style={{
                    color: 'white',
                    fontSize: 18,
                    fontWeight: 'bold',
                }}>
                TÌM CHUYẾN
                </Text>
            </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

export default AddTripScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 32,
  },
  containerInput:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginTop:8
  },
  mapView: {
    flex: 0.25,
    
  },
  scrollView: {
    flex: 8,
    paddingTop:36,
  },
  text: {
    fontSize: 42,
  },
  panel_img: {
    width: 48,
    height: 48,
  },
  flex_img_back: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  floatingHolderStyle: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
    paddingVertical: 8,
  },
  fieldStyle: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 8,
    fontSize: 18,
    height: 48,
  },
  containerHolderStyle: {
    width: '80%',
    fontSize: 16,
  },
  flex_top_1: {
    flex:0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnFavorites: {
    borderRadius: 15,
    width: 160,
    height: 48,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    marginHorizontal:16,
    textAlign:'center'
  },
  btnCurrentLocation: {
    borderRadius: 15,
    width: 160,
    height: 48,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    marginHorizontal:16,
    textAlign:'center',
    borderWidth:1,
  },
  btnAccpect: {
    borderRadius: 15,
    width: 120,
    height: 48,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    marginHorizontal:16,
    textAlign:'center',
    borderWidth:1,
  },
  btnAddFav: {
    borderRadius: 15,
    width: 120,
    height: 48,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    marginHorizontal:16,
    textAlign:'center',
    borderWidth:1,
  },
});
