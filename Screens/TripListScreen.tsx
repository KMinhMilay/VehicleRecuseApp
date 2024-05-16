import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Drawer, TextField } from 'react-native-ui-lib';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const DATA = [
  {
    id: '1',
    vehicle: 'Xe Ô Tô',
    status: 'Đang đợi thợ',
    xLocation: '123',
    yLocation: '101',
    day: '10/4/2024',
    note: 'ádfafafaf',
    id_engineer: '1a12',
    bookmark: false,
  },
  {
    id: '2',
    vehicle: 'Xe tải',
    status: 'Đã hoàn thành',
    xLocation: '123',
    yLocation: '1211',
    day: '10/4/2024',
    note: 'ádfafafaf',
    id_engineer: '2a12',
    bookmark: true,
  },
  {
    id: '3',
    vehicle: 'Xe Đạp',
    status: 'Hủy',
    xLocation: '123',
    yLocation: '101',
    day: '10/4/2024',
    note: 'ádfafafaf',
    id_engineer: 'null',
    bookmark: true,
  },
  {
    id: '4',
    vehicle: 'Xe máy',
    status: 'Đang thực hiện',
    xLocation: '123',
    yLocation: '101',
    day: '10/4/2024',
    note: 'ádfafafaf',
    id_engineer: '2a12',
    bookmark: false,
  },
  {
    id: '5',
    vehicle: 'Xe Ô Tô',
    status: 'Đã hoàn thành',
    xLocation: '123',
    yLocation: '101',
    day: '15/5/2024',
    note: 'ádfafafaf',
    id_engineer: '2a12',
    bookmark: false,
  },
  {
    id: '6',
    vehicle: 'Xe Ô Tô',
    status: 'Đã hoàn thành',
    xLocation: '123',
    yLocation: '101',
    day: '10/4/2024',
    note: 'ádfafafaf',
    id_engineer: '2a12',
    bookmark: false,
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
  bookmark: boolean;
  id_engineer: string;
  onBookmarked: () => void;
  onRemoved: () => void;
  onPressRead: () => void;
};

const Item = ({
  id,
  vehicle,
  status,
  xLocation,
  yLocation,
  day,
  note,
  bookmark,
  id_engineer,
  onBookmarked,
  onRemoved,
  onPressRead
}: ItemProps) => {
  const [isBookmark, setIsBookmark] = React.useState<boolean>(bookmark);

  // useEffect(() => {
  //   setIsBookmark(bookmark);
  // }, [bookmark]);

  return (
    <Drawer
      rightItems={[
        {
          text: 'Ưa thích',
          background: Colors.yellow10,
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
            <View style={{
              borderRightWidth: 0.5, width: 64, height: 32, justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>ID: {id} </Text>
            </View>
            {/* <View style={{borderRightWidth: 0.5, width: 64, height: 32,              justifyContent:'center',
              alignItems:'center',}}>
            <Text style={{fontSize: 16, textAlign: 'center',fontWeight:'bold'}}>ID Tài xế: {id_engineer} </Text>
          </View> */}
            <View
              style={{
                borderRightWidth: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
                width: 64,
                height: 32,
              }}>
              <Text style={{ fontSize: 16, textAlign: 'center' }}>{vehicle}</Text>
            </View>
            <View style={{ width: 128, justifyContent: 'center', alignItems: 'center', }}>
              <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>
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
            <View style={{
              borderRightWidth: 0.5, width: 96, justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={{ fontSize: 16, textAlign: 'center' }}>Ngày: {day}</Text>
            </View>
            <View style={{
              borderRightWidth: 0.5, width: 96, justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={{ fontSize: 16, textAlign: 'center' }}>
                X: {xLocation}
              </Text>
            </View>
            <View style={{
              width: 96, justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={{ fontSize: 16, textAlign: 'center' }}>
                Y: {yLocation}
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
            }} onPress={() => {


              setIsBookmark(!isBookmark);
              isBookmark ? onBookmarked() : onRemoved();
            }}>
            <Image
              source={
                isBookmark
                  ? require('../Assets/Asset/icons8-bookmark-48.png')
                  : require('../Assets/Asset/icons8-unbookmark-48.png')
              }
              style={{ height: 32, width: 32 }}></Image>
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
              style={{ height: 32, width: 32 }}></Image>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Drawer>
  )
}
function TripList(): React.JSX.Element {
  const [datetime, setDateTime] = React.useState<Date | undefined | null>(null);
  const [show, setShow] = React.useState(false);
  const [sortType, setSortType] = useState<String | null | undefined>(null);
  const [currentVehicle, setCurrentVehicle] = useState<String | null | undefined>(undefined);

  const onChangeDate = (e: any) => {


    // if (e.type === "dismissed") {
    //   setShow(false);
    //   setDateTime(undefined);

    // } else {
    var selectedDate = moment
      .utc(e.nativeEvent.timestamp)
      .utcOffset(e.nativeEvent.utcOffset);
    selectedDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    setDateTime(selectedDate.toDate());



    setShow(false);


  };

  const getAvailableTrips = (vehicleType?: String, sortBy?: String = "day") => {
    const list = DATA
      .filter(x =>
        (Boolean(datetime) ? moment(x.day, 'DD/MM/YYYY').isSame(moment(datetime, 'DD/MM/YYYY')) : true) &&
        (vehicleType ? x.vehicle === vehicleType : true)
      );

    if (sortBy === 'status') {
      list.sort((a, b) => {
        if (a.status < b.status) {
          return 1;
        }
        if (a.status > b.status) {
          return -1;
        }
        return 0;
      });
    }
    else if (sortBy === 'day') {
      list.sort((a, b) => {
        return new Date(moment(a.day, 'DD/MM/YYYY').toISOString()) - new Date(moment(b.day, 'DD/MM/YYYY').toISOString())
      });
    }


    return list;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.flex_img_back, { borderBottomWidth: 0.5 }]}>
        <Text style={{ fontSize: 32, color: 'black', textAlign: 'center' }}>
          DANH SÁCH CÁC CHUYẾN
        </Text>
      </View>
      <View style={[styles.flex_img_back, { paddingTop: 16 }]}>
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
            value={datetime ? moment(datetime).format('DD/MM/YYYY') : "Lọc theo ngày"}
            enableErrors
            validate={['required']}
            validationMessage={['Field is required']}
            maxLength={30}
            floatingPlaceholderStyle={styles.floatingHolderStyle}
            containerStyle={[styles.containerHolderStyle, { width: '80%' }]}
            fieldStyle={styles.fieldStyle}
            validateOnBlur
          />
          <TouchableOpacity onPress={() => setShow(true)}>
            <Image
              source={require('../Assets/Asset/icons8-date-48.png')}
              style={{ height: 30, width: 30, marginLeft: -42 }}></Image>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',

          }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Phương tiện: </Text>
          <TouchableOpacity
            onPress={() => setCurrentVehicle(currentVehicle === 'Xe máy' ? null : 'Xe máy')}
            style={{
              marginHorizontal: 2,
              borderWidth: 1,
              borderRadius: 10,
              width: 64,
              height: 32,
              justifyContent: 'center',
              alignItems: 'center',
              ...(currentVehicle === 'Xe máy' ? {
                backgroundColor: 'black',
              } : {
                backgroundColor: 'white',
              })
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                ...(currentVehicle === 'Xe máy' ? {
                  color: 'white',
                } : {
                  color: 'black',
                })
              }}>
              XE MÁY
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCurrentVehicle(currentVehicle === 'Xe Ô Tô' ? null : 'Xe Ô Tô')}
            style={{
              marginHorizontal: 2,
              borderWidth: 1,
              borderRadius: 10,
              width: 64,
              height: 32,
              justifyContent: 'center',
              alignItems: 'center',
              ...(currentVehicle === 'Xe Ô Tô' ? {
                backgroundColor: 'black',
              } : {
                backgroundColor: 'white',
              })
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                ...(currentVehicle === 'Xe Ô Tô' ? {
                  color: 'white',
                } : {
                  color: 'black',
                })
              }}>
              XE Ô TÔ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCurrentVehicle(currentVehicle === 'Xe tải' ? null : 'Xe tải')}
            style={{
              marginHorizontal: 2,
              borderWidth: 1,
              borderRadius: 10,
              width: 64,
              height: 32,
              justifyContent: 'center',
              alignItems: 'center',
              ...(currentVehicle === 'Xe tải' ? {
                backgroundColor: 'black',
              } : {
                backgroundColor: 'white',
              })
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                ...(currentVehicle === 'Xe tải' ? {
                  color: 'white',
                } : {
                  color: 'black',
                })
              }}>
              XE TẢI
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCurrentVehicle(currentVehicle === 'Xe Đạp' ? null : 'Xe Đạp')}
            style={{
              marginHorizontal: 2,
              borderWidth: 1,
              borderRadius: 10,
              width: 64,
              height: 32,
              justifyContent: 'center',
              alignItems: 'center',
              ...(currentVehicle === 'Xe Đạp' ? {
                backgroundColor: 'black',
              } : {
                backgroundColor: 'white',
              })
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',

                ...(currentVehicle === 'Xe Đạp' ? {
                  color: 'white',
                } : {
                  color: 'black',
                })
              }}>
              XE ĐẠP
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.flex_top_1, { flexDirection: 'row', paddingTop: 24 }]}>
        <TouchableOpacity
          onPress={() => setSortType(sortType === 'day' ? null : 'day')}
          style={sortType === 'day' ? styles.btnFavorites : styles.btnCurrentLocation}>
          <Text
            style={{
              color: sortType === 'day' ? 'white' : 'black',
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            SẮP XẾP THEO NGÀY/THÁNG/NĂM
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSortType(sortType === 'status' ? null : 'status')
          }}
          style={sortType === 'status' ? styles.btnFavorites : styles.btnCurrentLocation}>
          <Text
            style={{
              color: sortType === 'status' ? 'white' : 'black',
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            SẮP XẾP THEO TÌNH TRẠNG
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, paddingTop: 36 }}>
        {/* type ItemProps = {id: string, vehicle: string, status: string, xLocation:string,yLocation: string,day: string,note:string,bookmark: boolean}; */}
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={getAvailableTrips(currentVehicle, sortType)}
          renderItem={({ item }) => (
            <Item
              id={item.id}
              vehicle={item.vehicle}
              status={item.status}
              xLocation={item.xLocation}
              yLocation={item.yLocation}
              day={item.day}
              note={item.note}
              bookmark={item.bookmark}
              id_engineer={item.id_engineer}
              onRemoved={() => console.log("Đã xoa bookmark")}
              onBookmarked={() => console.log("Đã thêm bookmark")}
              onPressRead={() => console.log("Details")}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>

      {
        show && (
          <View>
            <RNDateTimePicker

              testID="dateTimePicker"
              value={datetime || new Date()}
              mode={'date'}
              display="spinner"
              // onCa
              // onTouchCancel={() => {
              //   setShow(false);
              //   console.log("Cancle pick");
              //   setDateTime(undefined);
              // }}
              onChange={onChangeDate}
            />
          </View>
        )
      }
    </View >
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
