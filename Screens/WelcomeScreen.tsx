import 'react-native-gesture-handler';
import React, {Component} from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
} from 'react-native';


function WelcomeScreen({navigation}: any): React.JSX.Element{
  //Navigation
  const Login = () => {
    navigation.navigate('LoginScreen');
  };
  const Register = () => {
    navigation.navigate('RegisterScreen');
  };

  //UI
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <View style={styles.flex_5}>
        <Image
          style={styles.panel_img}
          source={require('../Assets/Asset/Background.png')}></Image>
        <Text style={styles.title}>VEHICLE RECUSE</Text>
        <Text style={styles.subtitle}>Ứng dụng cứu hộ xe nhanh</Text>
      </View>
      <View style={[styles.flex_center_1,{flexDirection:'row'}]}>
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
        <Text style={{marginHorizontal:5}}>
          hoặc
        </Text>
        <TouchableOpacity style={styles.btnRegister} onPress={Register}>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            TẠO TÀI KHOẢN
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  panel_img: {
    flex: 1,

  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 38,
    backgroundColor: 'white',
    
  },
  subtitle: {
    color: 'black',
    fontSize: 18,
    backgroundColor: 'white',
  },
  flex_center_05: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex_center_1: {
    flex: 1,
    justifyContent: 'space-evenly',
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
  btnLogin: {
    borderRadius: 15,
    width: 120,
    height: 45,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  btnRegister: {
    borderRadius: 15,
    width: 120,
    height: 45,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
});
