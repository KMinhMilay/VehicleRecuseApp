import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import 'react-native-gesture-handler';      


function CustomerScreen({navigation}: any): React.JSX.Element {
  const Navigation = () => {
    navigation.navigate('AddTripScreen');
  };
  return (
    <View>
      <Text>CustomerScreen</Text>
      <TouchableOpacity onPress={Navigation}>
        <Text>Navigation to AddTrip</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CustomerScreen

const styles = StyleSheet.create({})