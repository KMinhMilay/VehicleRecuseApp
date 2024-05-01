import 'react-native-gesture-handler';
import React, {Component} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  KeyboardAvoidingView,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function LoginScreen({navigation}: any): React.JSX.Element {
  //Navigation
  const Login = () => {
    navigation.navigate('HomeScreen');
  };
  const Register = () => {
    navigation.navigate('RegisterScreen');
  };
  const ResetPass = () => {
    navigation.push('ResetPassScreen');
  };
  //UI
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <View style={styles.flex_5}>
        <Image
          style={styles.panel_img_1}
          source={require('../Assets/Asset/Background.png')}></Image>
        <Text style={styles.header}>VEHICLE RECUSE</Text>
      </View>
      <View style={{flex: 1, backgroundColor: 'gray'}}>
        <TouchableOpacity style={styles.btnLogin} onPress={Login}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            ĐĂNG NHẬP
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnRegister} onPress={Register}>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            ĐĂNG NHẬP
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  panel_img_1: {
    flex: 1,
    paddingBottom: 180,
    width: '100%',
  },
  header: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 38,
    backgroundColor: 'white',
    marginBottom: 20,
    textShadowColor: 'white',
    textShadowOffset: {width: 1, height: 3},
    textShadowRadius: 25,
  },
  flex_center_05: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex_center_1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex_center_3: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex_center_6: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex_5: {
    flex: 5,
    padding: 10,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 30,
  },
  btnLogin: {
    borderRadius: 15,
    width: 120,
    height: 45,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 120,
    marginTop: 10,
    elevation: 10,
  },
  btnRegister: {
    borderRadius: 15,
    width: 120,
    height: 45,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 120,
    marginTop: 10,
    elevation: 10,
  },
});
