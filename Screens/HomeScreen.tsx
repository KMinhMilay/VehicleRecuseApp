import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserContext } from '../Contexts/UserContext';
const Tab = createBottomTabNavigator();
import Tabs from '../Tabs';
function HomeScreen({navigation}: any) : React.JSX.Element{
  return (
    <Tabs/>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})