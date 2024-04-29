import { StyleSheet, Text, View } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import React, {useState}  from 'react';
import type { PropsWithChildren } from 'react';
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <View>
      <Text>Tabs</Text>
    </View>
  )
}

export default Tabs

const styles = StyleSheet.create({})