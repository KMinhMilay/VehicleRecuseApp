import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Colors, Drawer, TextField} from 'react-native-ui-lib';
import DateTimePicker from '@react-native-community/datetimepicker';
import { updateBookmarkRequestCustomer, getRequestFilter } from '../Controller/RequestController';
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
  is_bookmarked_by_user: number;
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
  is_bookmarked_by_user,
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
          <View style={{borderRightWidth: 0.5, width: 96, justifyContent:'center',
              alignItems:'center',}}>
            <Text style={{fontSize: 16, textAlign: 'center'}}>Ngày: {create_at}</Text>
          </View>
          <View style={{borderRightWidth: 0.5, width: 96, justifyContent:'center',
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
              is_bookmarked_by_user === 1
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

  const [dateFilter, setDateFilter] = useState('');

  const [vehicleFilter, setVehicleFilter] = useState('');
  const [vehicleFilterPressed, setVehicleFilterPressed] = useState(false);
  const [refreshControl, setRefreshControl] = useState(false);


  const [orderingType, setOrderingType] = useState('byDate');

  // const clickBookmark = () => {
  //   setBookmark(!bookmark);
  // }
  const onChangeDate = ({event, selectedDate}: any) => {
    const curDate = selectedDate || datetime;

    setDateTime(curDate);
    let tempDate = new Date(curDate);
    let month = tempDate.getMonth() + 1;
    let date = tempDate.getDate();

    let formattedMonth = month < 10 ? '0' + month.toString() : month.toString();
    let formattedDate = date < 10 ? '0' + date.toString() : date.toString();

    let fDate =
      formattedDate +
      '-' +
      formattedMonth +
      '-' +
      tempDate.getFullYear();
    setShow(!show);
    setTextDate(fDate);
  };
  const showDateTime = () => {
    setShow(true);
  };

  const {id} = useContext(UserContext)
  const [requests, setRequests] = React.useState<ItemProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getRequestFilter(id, dateFilter, vehicleFilter, orderingType);
        setRequests(result);
      } catch (error) {
        console.error("Error loading data: ", error);
      }
    };
    fetchData();
  }, [id, dateFilter, vehicleFilter, orderingType]);

  // useEffect(() => {
  //   if (textDate != "") {
  //     setDateFilter(textDate.split('-').reverse().join('-'))
  //   }
  // }, [textDate])

  const handleBookmarkPress = async (itemId: string, currentBookmark: number) => {
    const newBookmark = currentBookmark === 1 ? 0 : 1;
    try {
      await updateBookmarkRequestCustomer(itemId, newBookmark);
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === itemId ? { ...request, is_bookmarked_by_user: newBookmark } : request
        )
      );
    } catch (error) {
      console.error('Có lỗi khi cập nhật bookmark yêu cầu:', error);
    }
  };

  

  const filterVehicle = (vehicle: string) => {
    if (vehicleFilter == vehicle) {
      setVehicleFilterPressed(false);
      setVehicleFilter("");
    }
    else {
      setVehicleFilter(vehicle);
      setVehicleFilterPressed(true);
    }
  }
  // const showInformationRequest = async (itemId: string) => {
  //   // Hiển thị dữ liệu trong Alert
  //   const data = await getRequestById(id);
  //   setIn4Request(data)
  //   console.log(in4request);
  //   if (in4request) {
  //     // Hiển thị thông tin yêu cầu trong Alert
  //     const requestString = `ID: ${in4request.id}\nVehicle: ${in4request.vehicle_name}\nStatus: ${in4request.status}\nDate: ${new Date(in4request.create_at).toLocaleString()}\nNotes: ${in4request.notes}`;
  //     Alert.alert('Thông tin yêu cầu', requestString);
  //   } else {
  //     Alert.alert('Thông tin yêu cầu', 'Không có dữ liệu');
  //   }
  // };

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
            onChangeText={setTextDate}
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
            <TouchableOpacity style={[styles.btnFilter, vehicleFilterPressed && vehicleFilter == "Xe máy" && styles.btnSelected]}
          onPress={() => filterVehicle("Xe máy")}>
            <Text
              style={[styles.textUnselected, vehicleFilterPressed && vehicleFilter == "Xe máy" && styles.textSelected]}>
              XE MÁY
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnFilter, vehicleFilterPressed && vehicleFilter == "Xe ô tô" && styles.btnSelected]}
          onPress={() => filterVehicle("Xe ô tô")}>
            <Text
              style={[styles.textUnselected, vehicleFilterPressed && vehicleFilter == "Xe ô tô" && styles.textSelected]}>
              XE Ô TÔ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnFilter, vehicleFilterPressed && vehicleFilter == "Xe tải" && styles.btnSelected]}
          onPress={() => filterVehicle("Xe tải")}>
            <Text
              style={[styles.textUnselected, vehicleFilterPressed && vehicleFilter == "Xe tải" && styles.textSelected]}>
              XE TẢI
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnFilter, vehicleFilterPressed && vehicleFilter == "Xe đạp" && styles.btnSelected]}
          onPress={() => filterVehicle("Xe đạp")}>
            <Text
              style={[styles.textUnselected, vehicleFilterPressed && vehicleFilter == "Xe đạp" && styles.textSelected]}>
              XE ĐẠP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={[styles.flex_top_1, {flexDirection: 'row',paddingTop:24}]}>
      <TouchableOpacity style={[[styles.btnOrderUnselected, orderingType == "byDate" && styles.btnSelected]]}
        onPress={() => setOrderingType("byDate")}>
          <Text
            style={[styles.textUnselected, orderingType == "byDate" && styles.textSelected]}>
            SẮP XẾP THEO NGÀY/THÁNG/NĂM
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnOrderUnselected, orderingType == "byStatus" && styles.btnSelected]}
        onPress={() => setOrderingType("byStatus")}>
          <Text
            style={[styles.textUnselected, orderingType == "byStatus" && styles.textSelected]}>
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
              is_bookmarked_by_user={item.is_bookmarked_by_user}
              engineer_id={item.engineer_id}
              onPressBookmark={()=>handleBookmarkPress(item.id, item.is_bookmarked_by_user)}
              onPressRead={()=>Alert.alert('Thông tin yêu cầu', `ID: ${item.id}\nPhương tiện: ${item.vehicle_name}\nTình trạng: ${item.status}\nThời gian tạo: ${item.create_at}\nGhi chú: ${item.notes}`)}
            />
            
          )}
          refreshControl={
            <RefreshControl refreshing={refreshControl} onRefresh={() => {
              getRequestFilter(id, dateFilter, vehicleFilter, orderingType)
              
              setTimeout(() => {
                setRefreshControl(false);
              }, 500)

            }} />
          }
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
            onChange={(event, selectedDate) => {
              onChangeDate({event, selectedDate});
            }}
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
  btnFilter: {
    marginHorizontal:2,
    borderWidth:1,
    borderRadius:10,
    width:64,
    height:32,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    color:'black',
  },
  btnSelected: {
    backgroundColor: 'black',
    color: 'white',
  },
  textUnselected: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textSelected: {
    color: 'white',
  },
  btnOrderUnselected: {
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
});
