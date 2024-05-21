import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

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
import { List } from 'react-native-paper';
import SQLite from 'react-native-sqlite-storage';
import { UserContext } from '../Contexts/UserContext';
import openMap from 'react-native-open-maps';


const db = SQLite.openDatabase(
  {
      name: 'VehicleRescue',
      location: 'default',
  },
  () => { },
  error => { console.log(error) }
);

type ItemProps = {
  id: string;
  vehicle: string;
  status: string;
  xLocation: string;
  yLocation: string;
  day: string;
  notes: string;
  customerId: string;
}
type CustomerInfo = {
  id: string;
  fullname: string;
  phone_number: string;
}
type ItemProps_Processing = {
  id: string;
  vehicle: string;
  status: string;
  xLocation: string;
  yLocation: string;
  day: string;
  notes: string;
  onPressDone: () => void;
  onPressCancel: () => void;
  onLongPress: () => void
};
type ItemProps_NoProcessing = {
  id: string;
  vehicle: string;
  status: string;
  xLocation: string;
  yLocation: string;
  day: string;
  notes: string;
  onPressAccept: () => void;
  onLongPress: () => void
};
const Item_Processing = ({
  id,
  vehicle,
  status,
  xLocation,
  yLocation,
  day,
  notes,
  onPressDone,
  onPressCancel,
  onLongPress,
}: ItemProps_Processing) => (
  <Drawer
    rightItems={[
      {
        text: 'Hủy',
        background: Colors.red30,
        onPress: onPressCancel,
      },
    ]}
    leftItem={{
      text: 'Hoàn thành',
      background: Colors.green10,
      onPress: onPressDone,
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
          onPress={onPressDone}>
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
const Item_NoProcessing = ({
  id,
  vehicle,
  status,
  xLocation,
  yLocation,
  day,
  notes,
  onPressAccept,
  onLongPress,
}: ItemProps_NoProcessing) => (
  <Drawer
    rightItems={[
      {
        text: 'Thêm',
        background: Colors.green30,
        onPress: onPressAccept,
      },
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
            source={require('../Assets/Asset/icons8-add-48.png')}
            style={{height: 32, width: 32}}></Image>
        </TouchableOpacity>

      </View>
    </TouchableOpacity>
  </Drawer>
);
function EngineerScreen({navigation}: any): React.JSX.Element {
  const {userData, renewEngineerLocation} = useContext(UserContext);

  const [dataProcessing, setDataProcessing] = useState<ItemProps[]>([]);
  const [dataNoProcessing, setDataNoProcessing] = useState<ItemProps[]>([]);

  const [isOnActiveRequest, setIsOnActiveRequest] = useState(false);

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>();

  const [showListProcessing,setShowListProcessing] = useState(true);
  const [showListNoProcessing,setShowListNoProcessing] = useState(true);
  const [datetime, setDateTime] = React.useState(new Date());
  const [textDate, setTextDate] = React.useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [show, setShow] = React.useState(false);
  const [vehicleFilter, setVehicleFilter] = useState('');
  const [vehicleFilterPressed, setVehicleFilterPressed] = useState(false);

  const [orderingType, setOrderingType] = useState('DESC');

  useEffect(() => {
    if (dataProcessing.length > 0) {
      setShowListProcessing(true);

      //Log dữ liệu, xóa khi hoàn thành app
      console.log("Đang thực hiện: ");
      dataProcessing.forEach(element => {
        console.log(element)
      });
      console.log(" ");
    }
    else {
      setShowListProcessing(false);

      //Log dữ liệu, xóa khi hoàn thành app
      console.log("Chưa thực hiện: ");
      dataNoProcessing.forEach(element => {
        console.log(element)
      });
      console.log(" ");

    }
  }, [dataProcessing, dataNoProcessing]);
  useEffect(() => {
    setShowListNoProcessing(!showListProcessing)
  },[showListProcessing]);
  
  useEffect(() => {
    
    setTimeout(() => {
      checkActiveRequest();
      loadData();
    }, 250);
  },[dateFilter, vehicleFilter, orderingType])

  useEffect(() => {
    console.log(customerInfo)
    if (customerInfo){
      Alert.alert(
        "Thông tin khách hàng",
        "ID: "+ customerInfo?.id + "\nHọ và tên: "+ customerInfo?.fullname +"\nSố điện thoại: " + customerInfo?.phone_number,
        [{
          text: 'Đóng',
          onPress: () => {
            setCustomerInfo(undefined)
          }
        }]
      )
    }
  },[customerInfo])
  useEffect(() => {
    if (textDate != "") {
      setDateFilter(textDate.split('-').reverse().join('-'))
    }
  }, [textDate])
  const getUserInfo = (id: any) => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          "SELECT fullname, phone_number, id FROM Accounts WHERE id = ?",
          [id],
          (tx, results) => {
            if (results.rows.length > 0) {
              setCustomerInfo(results.rows.item(0))
            }
          }
        )
      })
    } catch (error) {
      console.log(error);
    }
  }

  const updateRequestStatus = (request: ItemProps, status: any) => {
    if (status == "Done"){
      Alert.alert(
        'Xác nhận',
        'Đánh dấu hoàn thành chuyến này?',
        [
          {
            text: 'Hủy',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () =>{
              try {
                db.transaction((tx) =>{
                  tx.executeSql(
                    "UPDATE Requests set status = 'Đã hoàn thành' WHERE id = ?",
                    [request.id],
                    (tx, results) => {
                      if (results.rowsAffected > 0){
                        db.transaction((tx) =>{
                          tx.executeSql(
                            "UPDATE Accounts set current_longitude = ?, current_latitude = ? WHERE id = ?",
                            [request.xLocation, request.yLocation, userData.id],
                            (tx, results2) => {
                              if (results2.rowsAffected > 0){
                                RenewEngineerData();
                                Alert.alert(
                                  'Thông báo',
                                  'Đánh dấu hoàn thành chuyến thành công!',
                                  [
                                    {
                                      text: 'Đóng',
                                      onPress: () => {
                                        checkActiveRequest();
                                        loadData();
                                      }
                                    }
                                  ]
                                );
                              }
                            }
                          )
                        })
                      }
                    }
                  )
                })
              }
              catch (error) {
                console.log(error);
              }
            },
          },
        ],
        { cancelable: false }
      );
    }
    if (status == "Cancel"){
      Alert.alert(
        'Xác nhận',
        'Xác nhận hủy chuyến này?',
        [
          {
            text: 'Hủy',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () =>{
              try {
                db.transaction((tx) =>{
                  tx.executeSql(
                    "UPDATE Requests set status = 'Đã hủy' WHERE id = ?",
                    [request.id],
                    (tx, results) => {
                      if (results.rowsAffected > 0){
                        Alert.alert(
                          'Thông báo',
                          'Hủy chuyến thành công!',
                          [
                            {
                              text: 'Đóng',
                              onPress: () => {
                                checkActiveRequest();
                                loadData();
                              }
                            }
                          ]);    
                      }
                    }
                  )
                })
              }
              catch (error) {
                console.log(error);
              }
            },
          },
        ],
        { cancelable: false }
      );
    }
    if (status == "Accept"){
      Alert.alert(
        'Xác nhận',
        'Nhận sửa chửa chuyến này?',
        [
          {
            text: 'Hủy',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () =>{
              try {
                db.transaction((tx) =>{
                  tx.executeSql(
                    "UPDATE Requests set status = 'Đang thực hiện', engineer_id = ? WHERE id = ?",
                    [userData.id, request.id],
                    (tx, results) => {
                      if (results.rowsAffected > 0){
                        Alert.alert(
                          'Thông báo',
                          'Đã nhận chuyến thành công!',
                          [
                            {
                              text: 'Đóng',
                              onPress: () => {
                                checkActiveRequest();
                                loadData();
                              }
                            }
                          ]);
                      }
                    }
                  )
                })
              }
              catch (error) {
                console.log(error);
              }
            },
          },
        ],
        { cancelable: false }
      );
    }
  }
  const RenewEngineerData = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT current_longitude, current_latitude FROM Accounts WHERE id = ?",
          [userData.id],
          (tx, results) => {
            if (results.rows.length > 0) {
              const coordinates = results.rows.item(0);
              renewEngineerLocation(coordinates)

            }
            else {
              console.log("Không thể lấy thông tin mới nhất của người dùng")
            }
          }
        )
      })
    }
    catch (error) {

    }
  }

  const loadData = () => {
    try {
      setDataProcessing([]);
      setDataNoProcessing([]);
      let query = "SELECT Requests.id, is_bookmarked_by_engineer, show_on_engineer, vehicle_name, customer_id, longitude, latitude, status, strftime('%d-%m-%Y', create_at) as created_at, engineer_id, notes from Requests INNER JOIN Vehicles on Requests.vehicle_id = Vehicles.id WHERE"
      let params: any[] = []

      if (dateFilter != "") {
        query = query + " create_at = ?"
        params.push(dateFilter)
      }
      if (vehicleFilter != "") {
        if (dateFilter != "") {
          query += " AND"
        }
        query += " vehicle_name = ?"
        params.push(vehicleFilter)
      }

      if (dateFilter != "" || vehicleFilter != "") {
        query += " AND"
      }
      query += " (engineer_id = ? or engineer_id is NULL)"
      params.push(userData.id)

      if (orderingType == 'DESC') {
        query += " ORDER by create_at DESC"
      }
      if (orderingType == 'ASC') {
        query += " ORDER by create_at ASC"
      }

      db.transaction(tx => {
        tx.executeSql(
        query,
        params,
        (tx, results) => {
          let tmpDataProcessing: ItemProps;
          let tmpDataNoProcessing: ItemProps;
          for (let i = 0; i < results.rows.length; i++) {
            if (results.rows.item(i).engineer_id == userData.id && results.rows.item(i).status == "Đang thực hiện") {
              tmpDataProcessing = {
                id: results.rows.item(i).id,
                vehicle: results.rows.item(i).vehicle_name,
                xLocation: results.rows.item(i).longitude,
                yLocation: results.rows.item(i).latitude,
                status: results.rows.item(i).status,
                day: results.rows.item(i).created_at,
                notes : results.rows.item(i).notes,
                customerId: results.rows.item(i).customer_id
              }
              setDataProcessing((dataProcessing) => [
                ...dataProcessing,
                tmpDataProcessing,
              ]);
            } else {
              if (results.rows.item(i).status == "Đang đợi thợ"){
                tmpDataNoProcessing = {
                  id: results.rows.item(i).id,
                  vehicle: results.rows.item(i).vehicle_name,
                  xLocation: results.rows.item(i).longitude,
                  yLocation: results.rows.item(i).latitude,
                  status: results.rows.item(i).status,
                  day: results.rows.item(i).created_at,
                  notes: results.rows.item(i).notes,
                  customerId: results.rows.item(i).customer_id
                }
                setDataNoProcessing((dataNoProcessing) => [
                  ...dataNoProcessing,
                  tmpDataNoProcessing,
                ]);
              }
            }
          }
        });
      })
    } catch (error) {

    }
  }

//-------------------------
  const checkActiveRequest = () => {
    try {
      setIsOnActiveRequest(false)
      db.transaction(tx => {
        tx.executeSql(
          "SELECT id FROM Requests WHERE engineer_id = ? and status = 'Đang thực hiện'",
          [userData.id],
          (tx, results) => {
            if (results.rows.length > 0) {
              setIsOnActiveRequest(true)
            }
            else {
              setIsOnActiveRequest(false)
            }
          }
        )
      })
    } catch (error) {
      
    }
  }

  const changeDisplayOrder = (orderType: string) => {
    if (orderingType == orderType){
      setOrderingType("ASC");
    }
    else {
      setOrderingType(orderType);
    }
  }
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

  const openCurrentLocationOnMap = () => {
    openMap({ latitude: userData.current_latitude, longitude: userData.current_longitude })
    // console.log(userData)
  }

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
  const showFlatListProcessing = () => {
    setShowListProcessing(!showListProcessing)
  }  
  const showFlatListNoProcessing = () => {
    setShowListNoProcessing(!showListNoProcessing)
  }
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
      <View style={[styles.flex_top_1, {flexDirection: 'row',paddingTop:30}]}>
        <TouchableOpacity style={[[styles.btnOrderUnselected, orderingType == "DESC" && styles.btnSelected]]}
        onPress={() => changeDisplayOrder("DESC")}>
          <Text
            style={[styles.textUnselected, orderingType == "DESC" && styles.textSelected]}>
            {orderingType == "DESC" ? "SẮP XẾP MỚI NHẤT" : "SẮP XẾP CŨ NHẤT"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnOrderUnselected, orderingType == "byStatus" && styles.btnSelected]}
        onPress={() => openCurrentLocationOnMap()}>
          <Text
            style={[styles.textUnselected]}>
            MỞ VỊ TRÍ CỦA BẠN TRÊN BẢN ĐỒ
          </Text>
        </TouchableOpacity>
      </View>
      {isOnActiveRequest && (
        <View style={{flex: 0.75, paddingTop: 36}}>
        <View>
        <TouchableOpacity onPress={showFlatListProcessing}>
                        <Text             style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>Đang thực hiện</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={dataProcessing}
          renderItem={({item}) => (
            <Item_Processing
              id={item.id}
              vehicle={item.vehicle}
              status={item.status}
              xLocation={item.xLocation}
              yLocation={item.yLocation}
              day={item.day}
              notes={item.notes}
              onPressDone={()=>updateRequestStatus(item, "Done")}
              onPressCancel={()=>updateRequestStatus(item, "Cancel")}
              onLongPress={()=> {
                getUserInfo(item.customerId.toString())
              }}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
      )}
      
      {!isOnActiveRequest && (
        <View style={{flex: 1, paddingTop: 36}}>
        <View>
          <TouchableOpacity onPress={showFlatListNoProcessing}>
                        <Text             style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>Cần chờ được thực hiện</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={dataNoProcessing}
          renderItem={({item}) => (
            <Item_NoProcessing
              id={item.id}
              vehicle={item.vehicle}
              status={item.status}
              xLocation={item.xLocation}
              yLocation={item.yLocation}
              day={item.day}
              notes={item.notes}
              onPressAccept={()=>updateRequestStatus(item, "Accept")}
              onLongPress={()=>{
                getUserInfo(item.customerId.toString())
              }}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
      )}
      


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
    flex: 0.5,
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
    flex: 0.5,
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
  }
});
