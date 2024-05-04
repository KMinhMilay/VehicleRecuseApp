import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {
  Colors,
  Drawer,
  Icon,
  Picker,
  TextField,
  PickerMethods,
  PickerProps,
  WheelPicker,
  ChipsInput,
} from 'react-native-ui-lib';
import DateTimePicker from '@react-native-community/datetimepicker';
import _ from 'lodash';

const DATA = [
  {
    id: '1',
    vehicle: 'Xe Ô Tô',
    status: 'Đang đợi thợ',
    xLocation: '123',
    yLocation: '101',
    day: '10/4/2024',
    note: 'ádfafafaf',
    
  },
  
];
type ItemProps = {
  id: string;
  vehicle: string;
  status: string;
  xLocation: string;
  yLocation: string;
  day: string;
  note: string;
  onPressAccept: () => void;
  onPressCancel: () => void;
  onLongPress: () => void
};
const Item = ({
  id,
  vehicle,
  status,
  xLocation,
  yLocation,
  day,
  note,
  onPressAccept,
  onPressCancel,
  onLongPress,
}: ItemProps) => (
  <Drawer
    rightItems={[
      {
        text: 'Thực hiện',
        background: Colors.green10,
        onPress: onPressAccept,
      },
    ]}
    leftItem={{
      text: 'Hủy',
      background: Colors.red30,
      onPress: onPressCancel,
    }}>
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        flex: 1,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 12,
        backgroundColor: 'white',
        height: 96,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
      }}
      onLongPress={onLongPress}>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 4,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              borderRightWidth: 0.5,
              width: 64,
              height: 32,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{fontSize: 16, textAlign: 'center', fontWeight: 'bold'}}>
              ID: {id}{' '}
            </Text>
          </View>
          <View
            style={{
              borderRightWidth: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
              width: 64,
              height: 32,
            }}>
            <Text style={{fontSize: 16, textAlign: 'center'}}>{vehicle}</Text>
          </View>
          <View
            style={{
              width: 128,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{fontSize: 16, textAlign: 'center', fontWeight: 'bold'}}>
              {status}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              borderRightWidth: 0.5,
              width: 96,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, textAlign: 'center'}}>Ngày: {day}</Text>
          </View>
          <View
            style={{
              borderRightWidth: 0.5,
              width: 96,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, textAlign: 'center'}}>
              X: {xLocation}
            </Text>
          </View>
          <View
            style={{width: 96, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 16, textAlign: 'center'}}>
              Y: {yLocation}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          borderLeftWidth: 0.5,
        }}>
        <TouchableOpacity
          style={{
            height: 32,
            width: 32,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={onPressAccept}>
          <Image
            source={require('../Assets/Asset/icons8-accept-48.png')}
            style={{height: 32, width: 32}}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 32,
            width: 32,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={onPressCancel}>
          <Image
            source={require('../Assets/Asset/icons8-delete-48.png')}
            style={{height: 32, width: 32}}></Image>
        </TouchableOpacity>

      </View>
    </TouchableOpacity>
  </Drawer>
);
function EngineerScreen({navigation}: any): React.JSX.Element {
  const [datetime, setDateTime] = React.useState(new Date());
  const [textDate, setTextDate] = React.useState(
    new Date().toLocaleDateString(),
  );

  const [show, setShow] = React.useState(false);
  const onChangeDate = ({event, selectedDate}: any) => {
    const curDate = selectedDate || datetime;

    setDateTime(curDate);
    let tempDate = new Date(curDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();
    setTextDate(fDate);
    setShow(!show);
  };
  const showDateTime = () => {
    setShow(true);
  };
  return (
    <View style={styles.container}>
      <View style={[styles.flex_img_back, {borderBottomWidth: 0.5}]}>
        <Text style={{fontSize: 32, color: 'black', textAlign: 'center'}}>
          DANH SÁCH CHUYẾN CẦN ĐỢI XỬ LÝ
        </Text>
      </View>
      <View style={[styles.flex_img_back]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 32,
          }}>
          <TextField
            placeholder={'Tìm theo Ngày-tháng-năm:'}
            floatingPlaceholder
            readOnly={true}
            label={'Ngày-tháng-năm'}
            onChangeText={() => {
              console.log('Text have changed');
            }}
            value={textDate}
            enableErrors
            validate={['required']}
            validationMessage={['Field is required']}
            maxLength={30}
            floatingPlaceholderStyle={styles.floatingHolderStyle}
            containerStyle={[styles.containerHolderStyle, {width: '80%'}]}
            fieldStyle={styles.fieldStyle}
            validateOnBlur
          />
          <TouchableOpacity onPress={showDateTime}>
            <Image
              source={require('../Assets/Asset/icons8-date-48.png')}
              style={{height: 30, width: 30, marginLeft: -42}}></Image>
          </TouchableOpacity>
        </View>
        <View           
        style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            
          }}>
            <Text style={{fontSize:16,fontWeight:'bold',color:'black'}}>Phương tiện: </Text>
          <TouchableOpacity style={{marginHorizontal:2,borderWidth:1,borderRadius:10,width:64,height:32,justifyContent:'center',alignItems:'center'}}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              XE MÁY
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginHorizontal:2,borderWidth:1,borderRadius:10,width:64,height:32,justifyContent:'center',alignItems:'center'}}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              XE Ô TÔ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginHorizontal:2,borderWidth:1,borderRadius:10,width:64,height:32,justifyContent:'center',alignItems:'center'}}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              XE TẢI
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginHorizontal:2,borderWidth:1,borderRadius:10,width:64,height:32,justifyContent:'center',alignItems:'center'}}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              XE ĐẠP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.flex_top_1, {flexDirection: 'row',paddingTop:30}]}>
        <TouchableOpacity style={styles.btnFavorites}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            SẮP XẾP THEO NGÀY/THÁNG/NĂM
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnCurrentLocation}>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            SẮP XẾP THEO TÌNH TRẠNG
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, paddingTop: 36}}>
        {/* type ItemProps = {id: string, vehicle: string, status: string, xLocation:string,yLocation: string,day: string,note:string,bookmark: boolean}; */}
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={DATA}
          renderItem={({item}) => (
            <Item
              id={item.id}
              vehicle={item.vehicle}
              status={item.status}
              xLocation={item.xLocation}
              yLocation={item.yLocation}
              day={item.day}
              note={item.note}
              onPressAccept={()=>console.log("Accpect")}
              onPressCancel={()=>console.log("Cancel")}
              onLongPress={()=>Alert.alert("Details")}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>

      {show && (
        <View>
          <DateTimePicker
            testID="dateTimePicker"
            value={datetime}
            mode={'date'}
            display="spinner"
            onChange={onChangeDate}
          />
        </View>
      )}
    </View>
  );
}

export default EngineerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
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
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: -32,
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
    textAlign: 'center',
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
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
});
