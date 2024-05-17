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

const db = SQLite.openDatabase(
  {
      name: 'VehicleRescue',
      location: 'default',
  },
  () => { },
  error => { console.log(error) }
);

const DATA = [
  {
    id: '1',
    vehicle: 'Xe Ô Tô',
    status: 'Đang thực hiện',
    xLocation: '123',
    yLocation: '101',
    day: '10/4/2024',
    note: 'ádfafafaf',
    
  },
  {
    id: '2',
    vehicle: 'Xe Ô Tô',
    status: 'Đang thực hiện',
    xLocation: '123',
    yLocation: '101',
    day: '10/4/2024',
    note: 'ádfafafaf',
    
  }
  
];
const DATA_2 = [
  {
    id: '2',
    vehicle: 'Xe máy',
    status: 'Đang đợi thợ',
    xLocation: '123',
    yLocation: '101',
    day: '10/4/2024',
    note: 'ádfafafaf',
    
  },
  {
    id: '3',
    vehicle: 'Xe máy',
    status: 'Đang đợi thợ',
    xLocation: '123',
    yLocation: '101',
    day: '10/4/2024',
    note: 'ádfafafaf',
    
  }
  
]
type ItemProps = {
  id: string;
  vehicle: string;
  status: string;
  xLocation: string;
  yLocation: string;
  day: string;
  note: string;
}
type ItemProps_Processing = {
  id: string;
  vehicle: string;
  status: string;
  xLocation: string;
  yLocation: string;
  day: string;
  note: string;
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
  note: string;
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
  note,
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
  note,
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
  const {id} = useContext(UserContext);

  const [dataProcessing, setDataProcessing] = useState<ItemProps[]>([]);
  const [dataNoProcessing, setDataNoProcessing] = useState<ItemProps[]>([]);

  const [showListProcessing,setShowListProcessing] = useState(true);
  const [showListNoProcessing,setShowListNoProcessing] = useState(true);
  const [datetime, setDateTime] = React.useState(new Date());
  const [textDate, setTextDate] = React.useState(
    new Date().toLocaleDateString(),
  );

  // const [data, setData] = useState<Props[]>([]);
  
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    try {
      setDataProcessing([]);
      setDataNoProcessing([]);

      db.transaction(tx => {
        tx.executeSql(
        "SELECT Requests.id, is_bookmarked_by_engineer, show_on_engineer, vehicle_name, customer_id, longitude, latitude, status, create_at, engineer_id from Requests INNER JOIN Vehicles on Requests.vehicle_id = Vehicles.id WHERE engineer_id = ? or engineer_id is NULL ORDER by is_bookmarked_by_engineer DESC",
        [id],
        (tx, results) => {
          let tmpDataProcessing: ItemProps;
          let tmpDataNoProcessing: ItemProps;
          for (let i = 0; i < results.rows.length; i++) {
            if (results.rows.item(i).show_on_engineer) {
              if (results.rows.item(i).engineer_id == id) {
                tmpDataProcessing = {
                  id: results.rows.item(i).id,
                  vehicle: results.rows.item(i).vehicle_name,
                  xLocation: results.rows.item(i).longitude,
                  yLocation: results.rows.item(i).latitude,
                  status: results.rows.item(i).status,
                  day: results.rows.item(i).create_at,
                  note : results.rows.item(i).note,
                }

                // setDataProcessing((dataProcessing) => [
                //   ...dataProcessing,
                //   tmpDataProcessing,]);
                setDataProcessing((dataProcessing) => [
                  ...dataProcessing,
                  tmpDataProcessing,
                ]);
              } else {
                tmpDataNoProcessing = {
                  id: results.rows.item(i).id,
                  vehicle: results.rows.item(i).vehicle_name,
                  xLocation: results.rows.item(i).longitude,
                  yLocation: results.rows.item(i).latitude,
                  status: results.rows.item(i).status,
                  day: results.rows.item(i).create_at,
                  note : results.rows.item(i).note,
                }
                setDataNoProcessing((dataNoProcessing) => [
                  ...dataNoProcessing,
                  tmpDataNoProcessing,
                ]);
              }
            }
          }
          console.log(" ")
          console.log("-------------Data received--------------")
          dataProcessing.forEach(element => {
            console.log(element)
          });
          console.log(" ")
          console.log("^^^^^-----processing // no processing-----vvvvv")
          console.log(" ")
          dataNoProcessing.forEach(element => {
            console.log(element)
          });
          console.log("-------------End of data-------------->")
          

        });
      })
    } catch (error) {
      
    }
  },[])

  const createData = () => {
    
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
        {/* type ItemProps = {id: string, vehicle: string, status: string, xLocation:string,yLocation: string,day: string,note:string,bookmark: boolean}; */}
        {showListProcessing && (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={DATA}
          renderItem={({item}) => (
            <Item_Processing
              id={item.id}
              vehicle={item.vehicle}
              status={item.status}
              xLocation={item.xLocation}
              yLocation={item.yLocation}
              day={item.day}
              note={item.note}
              onPressDone={()=>console.log("Done")}
              onPressCancel={()=>console.log("Cancel")}
              onLongPress={()=>Alert.alert("Details")}
            />
          )}
          keyExtractor={item => item.id}
        />)}
      </View>
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
        {/* type ItemProps = {id: string, vehicle: string, status: string, xLocation:string,yLocation: string,day: string,note:string,bookmark: boolean}; */}
        {showListNoProcessing && (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={DATA_2}
          renderItem={({item}) => (
            <Item_NoProcessing
              id={item.id}
              vehicle={item.vehicle}
              status={item.status}
              xLocation={item.xLocation}
              yLocation={item.yLocation}
              day={item.day}
              note={item.note}
              onPressAccept={()=>console.log("Accpect")}
              onLongPress={()=>Alert.alert("Details")}
            />
          )}
          keyExtractor={item => item.id}
        />
      )}
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
