import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Colors, Drawer, TextField} from 'react-native-ui-lib';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getRequestById } from '../Controller/RequestController';
import { UserContext } from '../Contexts/UserContext';

// const DATA = [
//   {
//     id: '1',
//     vehicle: 'Xe Ô Tô',
//     status: 'Đang đợi thợ',
//     xLocation: '123',
//     yLocation: '101',
//     day: '10/4/2024',
//     note: 'ádfafafaf',
//     id_engineer:'1a12',
//     bookmark: false,
//   },
//   {
//     id: '2',
//     vehicle: 'Xe tải',
//     status: 'Đã hoàn thành',
//     xLocation: '123',
//     yLocation: '1211',
//     day: '10/4/2024',
//     note: 'ádfafafaf',
//     id_engineer:'2a12',
//     bookmark: true,
//   },
//   {
//     id: '3',
//     vehicle: 'Xe Đạp',
//     status: 'Hủy',
//     xLocation: '123',
//     yLocation: '101',
//     day: '10/4/2024',
//     note: 'ádfafafaf',
//     id_engineer:'null',
//     bookmark: true,
//   },
//   {
//     id: '4',
//     vehicle: 'Xe máy',
//     status: 'Đang thực hiện',
//     xLocation: '123',
//     yLocation: '101',
//     day: '10/4/2024',
//     note: 'ádfafafaf',
//     id_engineer:'2a12',
//     bookmark: false,
//   },
//   {
//     id: '5',
//     vehicle: 'Xe Ô Tô',
//     status: 'Đã hoàn thành',
//     xLocation: '123',
//     yLocation: '101',
//     day: '10/4/2024',
//     note: 'ádfafafaf',
//     id_engineer:'2a12',
//     bookmark: false,
//   },
// ];
type ItemProps = {
  id: string;
  vehicle_name: string;
  status: string;
  longitude: string;
  latitude: string;
  create_at: string;
  notes: string;
  bookmark: boolean;
  engineer_id: string;
  onPressBookmark: () => void;
  onPressRead:() => void;
};
const Item = ({
  id,
  vehicle_name,
  status,
  longitude,
  latitude,
  create_at,
  notes,
  bookmark,
  engineer_id,
  onPressBookmark,
  onPressRead
}: ItemProps) => (
  <Drawer
    rightItems={[
      {
        text: 'Ưa thích',
        background: Colors.yellow10,
        onPress: onPressBookmark,
      },
      {
        text: 'Chi tiết',
        background: Colors.black,
        onPress: onPressRead,
      }
    ]}
    >
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
      }}>
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
          <View style={{borderRightWidth: 0.5, width: 64, height: 32,              justifyContent:'center',
              alignItems:'center',}}>
            <Text style={{fontSize: 16, textAlign: 'center',fontWeight:'bold'}}>ID: {id} </Text>
          </View>
          {/* <View style={{borderRightWidth: 0.5, width: 64, height: 32,              justifyContent:'center',
              alignItems:'center',}}>
            <Text style={{fontSize: 16, textAlign: 'center',fontWeight:'bold'}}>ID Tài xế: {id_engineer} </Text>
          </View> */}
          <View
            style={{
              borderRightWidth: 0.5,
              justifyContent:'center',
              alignItems:'center',
              width: 64,
              height: 32,
            }}>
            <Text style={{fontSize: 16, textAlign: 'center'}}>{vehicle_name}</Text>
          </View>
          <View style={{ width: 128,justifyContent:'center',alignItems:'center',}}>
            <Text style={{fontSize: 16, textAlign: 'center',fontWeight:'bold'}}>
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
          <View style={{borderRightWidth: 0.5, width: 96,              justifyContent:'center',
              alignItems:'center',}}>
            <Text style={{fontSize: 16, textAlign: 'center'}}>Ngày: {create_at}</Text>
          </View>
          <View style={{borderRightWidth: 0.5, width: 96,              justifyContent:'center',
              alignItems:'center',}}>
            <Text style={{fontSize: 16, textAlign: 'center'}}>
              X: {longitude}
            </Text>
          </View>
          <View style={{width: 96,              justifyContent:'center',
              alignItems:'center',}}>
            <Text style={{fontSize: 16, textAlign: 'center'}}>
              Y: {latitude}
            </Text>
          </View>
          {/* <View style={{ width: 64, height: 32,justifyContent:'center',alignItems:'center',}}>
            <Text style={{fontSize: 16, textAlign: 'center'}}>ID Tài xế: {id_engineer} </Text>
          </View>  */}
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
          }} onPress={onPressBookmark}>
          <Image
            source={
              bookmark
                ? require('../Assets/Asset/icons8-bookmark-48.png')
                : require('../Assets/Asset/icons8-unbookmark-48.png')
            }
            style={{height: 32, width: 32}}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 32,
            width: 32,
            justifyContent: 'center',
            alignItems: 'center',
          }} onPress={onPressRead}>
          <Image
            source={require('../Assets/Asset/icons8-info-48.png')}
            style={{height: 32, width: 32}}></Image>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  </Drawer>
);

function TripList(): React.JSX.Element {
  const [datetime, setDateTime] = React.useState(new Date());
  const [textDate, setTextDate] = React.useState(
    new Date().toLocaleDateString(),
  );
  const [bookmark,setBookmark] = useState(true);
  const [show, setShow] = React.useState(false);
  const clickBookmark = () => {
    setBookmark(!bookmark);
  }
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

  const {id} = useContext(UserContext)
  const [requests, setRequests] = React.useState<ItemProps[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await getRequestById(id);
      setRequests(data);
    };

    loadData();
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={[styles.flex_img_back, {borderBottomWidth: 0.5}]}>
        <Text style={{fontSize: 32, color: 'black', textAlign: 'center'}}>
          DANH SÁCH CÁC CHUYẾN
        </Text>
      </View>
      <View style={[styles.flex_img_back,{paddingTop:16}]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 16,
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
      
      <View style={[styles.flex_top_1, {flexDirection: 'row',paddingTop:24}]}>
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
          data={requests}
          renderItem={({item}) => (
            <Item
              id={item.id}
              vehicle_name={item.vehicle_name}
              status={item.status}
              longitude={item.longitude}
              latitude={item.latitude}
              create_at={item.create_at}
              notes={item.notes}
              bookmark={item.bookmark}
              engineer_id={item.engineer_id}
              onPressBookmark={()=>console.log("Đã thêm bookmark")}
              onPressRead={()=>console.log("Details")}
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

export default TripList;

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
