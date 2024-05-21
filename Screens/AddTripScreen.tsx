import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { TextField } from 'react-native-ui-lib';
import openMap from 'react-native-open-maps';
import Geolocation from '@react-native-community/geolocation';
import { addRequest } from '../Controller/RequestController';
import { UserContext } from '../Contexts/UserContext';

function AddTripScreen({ route, navigation }: any): React.JSX.Element {

  const { id } = useContext(UserContext)    // id của người dùng

  const { idVehicle, vehicle } = route.params;    // id của phương tiện

  const [note, setNote] = useState('');     // ghi chú

  const [latitude, setLatitude] = useState<number | null>(null);      // tọa độ để mở openMap
  const [longitude, setLongitude] = useState<number | null>(null);

  const [longitudeOutput, setLongitudeOutput] = useState<string>('');     // tọa độ kiểu string để truyền vào value
  const [latitudeOutput, setLatitudeOutput] = useState<string>('');

  const [bookmarkByUser, setBookmarkByUser] = useState(false);      // nhận biết người dùng có ưa thích yêu cầu đó không

  const Back = () => {
    navigation.goBack();
  };

  function _bookmark() {      // cập nhật ưa thích
    setBookmarkByUser(true);
    Alert.alert('Yêu cầu này đã được đánh dấu là ưa thích');
  }
  
  function _getCurrentLocation() {          // lấy vị trí hiện tại của thiết bị
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

  function _goToCurrentLocation() {       // mở gg map đi đến vị trí hiện tại
    if (latitude && longitude) {
      console.log("Vị trí hiện tại của thiết bị: ", latitude, longitude)
      openMap({ latitude: latitude, longitude: longitude })
    } else {
      console.log("Không lấy được vị trí hiện tại của thiết bị")
    }
  }

  const formatDate = (dateString: Date) => {
    const year = dateString.getFullYear();
    const month = String(dateString.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0 nên cần +1
    const day = String(dateString.getDate()).padStart(2, '0');
    console.log(`${year}-${month}-${day}`)
    return `${year}-${month}-${day}`;
  };

  function _addTrip() {                   // thêm yêu cầu mới từ người dùng
    try {
      Alert.alert('Thành công', 'Yêu cầu của bạn đã được gửi')
      if (bookmarkByUser) {
        addRequest(1, 0, 1, 1, idVehicle, id, null, longitude, latitude, 'Đang đợi thợ', note, formatDate(new Date()))
      } else {
        addRequest(0, 0, 1, 1, idVehicle, id, null, longitude, latitude, 'Đang đợi thợ', note, formatDate(new Date()))
      }
      
    } catch (error) {
      console.log(error)
    }
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
        <Text style={{ textAlign: 'center', fontSize: 36, color: 'black' }}>Thêm thông tin khẩn cấp</Text>
      </View>
      <View style={[styles.flex_top_1, { flexDirection: 'row' }]}>
        <TouchableOpacity style={styles.btnFavorites} onPress={_getCurrentLocation}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'center'
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
              textAlign: 'center'
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
        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 16 }}>
          <TouchableOpacity style={styles.btnAddFav} onPress={_bookmark}>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center'
              }}>
              THÊM VÀO ƯU THÍCH
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnAccpect} onPress={_addTrip}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
                GỬI YÊU CẦU
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
  containerInput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8
  },
  mapView: {
    flex: 0.25,

  },
  scrollView: {
    flex: 8,
    paddingTop: 36,
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
    flex: 0.2,
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
    marginHorizontal: 16,
    textAlign: 'center'
  },
  btnCurrentLocation: {
    borderRadius: 15,
    width: 160,
    height: 48,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    marginHorizontal: 16,
    textAlign: 'center',
    borderWidth: 1,
  },
  btnAccpect: {
    borderRadius: 15,
    width: 120,
    height: 48,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    marginHorizontal: 16,
    textAlign: 'center',
    borderWidth: 1,
  },
  btnAddFav: {
    borderRadius: 15,
    width: 120,
    height: 48,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    marginHorizontal: 16,
    textAlign: 'center',
    borderWidth: 1,
  },
});
