import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import {  TextField } from 'react-native-ui-lib';
import DateTimePicker from '@react-native-community/datetimepicker';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '5814a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '3ac683fc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58623a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '3a38afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '2694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];
type ItemProps = {title: string};

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);


function TripList() : React.JSX.Element{
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
      <View style={[styles.flex_img_back,{borderBottomWidth:0.5}]}>
        <Text style={{fontSize:32,color:'black',textAlign:'center'}}>DANH SÁCH CÁC CHUYẾN</Text>
      </View>
      <View style={[styles.flex_img_back]}>
      <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop:16
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
      </View>
      <View style={[styles.flex_top_1,{flexDirection:'row'}]}>
          <TouchableOpacity style={styles.btnFavorites} >
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
                textAlign:'center'
              }}>
              SẮP XẾP THEO NGÀY/THÁNG/NĂM
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnCurrentLocation} >
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
                textAlign:'center'
              }}>
              SẮP XẾP THEO TÊN PHƯƠNG TIỆN
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1,paddingTop:36,}}>
          <FlatList
            data={DATA}
            renderItem={({item}) => <Item title={item.title} />}
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
  )
}

export default TripList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
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
    flex: 0.25,
    justifyContent:'center',
    alignItems:'center',
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
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
})