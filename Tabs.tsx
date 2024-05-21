import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomerScreen from './Screens/CustomerScreen';
import EngineerScreen from './Screens/EngineerScreen';
import TripListScreen from './Screens/TripListScreen';
import ServiceScreen from './Screens/ServiceScreen';
import UserScreen from './Screens/UserScreen';
import 'react-native-gesture-handler';
import React, { useContext, useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import { UserContext } from './Contexts/UserContext';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { List } from 'react-native-paper';
const Tab = createBottomTabNavigator();

const Tabs = () => {
  const {role} = useContext(UserContext);
  const [isEngineer,setIsEngineer] = useState(false);
  useEffect(() => {
    setIsEngineer(role == 'engineer');
  },[])
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'white',
          height: 80,
          borderTopWidth: 2,
          ...styles.shadow,
        },
        tabBarHideOnKeyboard: true,
      }}>
      {!isEngineer && (<Tab.Screen
        name="CustomerScreen"
        component={CustomerScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 60,
                height: 85,
                borderTopWidth: 5,
                borderColor: focused ? 'black' : 'transparent',
              }}>
              <Image
                source={require('./Assets/Asset/icons8-user-location-48.png')}
                resizeMode="contain"
                style={{
                  width: 50,
                  height: 50,
                }}
              />
              <Text
                style={{
                  color: focused ? 'black' : 'transparent',
                  fontSize: 13,
                  fontWeight: 'bold',
                }}>
                Trang chủ
              </Text>
            </View>
          ),
        }}
      />)}
      {isEngineer && (<Tab.Screen
        name="EngineerScreen"
        component={EngineerScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 60,
                height: 85,
                borderTopWidth: 5,
                borderColor: focused ? 'black' : 'transparent',
              }}>
              <Image
                source={require('./Assets/Asset/icons8-tools-48.png')}
                resizeMode="contain"
                style={{
                  width: 50,
                  height: 50,
                }}
              />
              <Text
                style={{
                  color: focused ? 'black' : 'transparent',
                  fontSize: 13,
                  fontWeight: 'bold',
                }}>
                Sửa chữa
              </Text>
            </View>
          ),
        }}
      />)}
      <Tab.Screen
        name="TripListScreen"
        component={TripListScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 60,
                height: 85,
                borderTopWidth: 5,
                borderColor: focused ? 'black' : 'transparent',
              }}>
              <Image
                source={require('./Assets/Asset/icons8-list-48.png')}
                resizeMode="contain"
                style={{
                  width: 50,
                  height: 50,
                }}
              />
              <Text
                style={{
                  color: focused ? 'black' : 'transparent',
                  fontSize: 13,
                  fontWeight: 'bold',
                  width:64
                }}>
                Danh sách
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ServiceScreen"
        component={ServiceScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 60,
                height: 85,
                borderTopWidth: 5,
                borderColor: focused ? 'black' : 'transparent',
              }}>
              <Image
                source={require('./Assets/Asset/icons8-technical-support-48.png')}
                resizeMode="contain"
                style={{
                  width: 48,
                  height: 48,
                }}
              />
              <Text
                style={{
                  color: focused ? 'black' : 'transparent',
                  fontSize: 13,
                  fontWeight: 'bold',
                }}>
                Dịch vụ
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="UserScreen"
        component={UserScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 60,
                height: 85,
                borderTopWidth: 5,
                borderColor: focused ? 'black' : 'transparent',
              }}>
              <Image
                source={require('./Assets/Asset/icons8-edit-user-48.png')}
                resizeMode="contain"
                style={{
                  width: 48,
                  height: 48,
                }}
              />
              <Text
                style={{
                  color: focused ? 'black' : 'transparent',
                  fontSize: 13,
                  fontWeight: 'bold',
                }}>
                Tài khoản
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  containerSelect: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  shadow: {
    shadowColor: 'black',
    textShadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
