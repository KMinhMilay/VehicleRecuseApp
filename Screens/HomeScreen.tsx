import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import Tabs from '../Tabs';
function HomeScreen() : React.JSX.Element{
  return (
    <Tabs/>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})