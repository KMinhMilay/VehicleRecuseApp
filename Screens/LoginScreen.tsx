import {
    Alert,
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
  } from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {View, TextField, Text, Button} from 'react-native-ui-lib';
import SQLite from 'react-native-sqlite-storage';
import md5 from 'md5';
import { UserContext } from '../Contexts/UserContext';
  const db = SQLite.openDatabase(
    {
        name: 'VehicleRescue',
        location: 'default',
    },
    () => { },
    error => { console.log(error) }
  );

  function LoginScreen({navigation}: any): React.JSX.Element {
    const {updateUser,  showUser} = useContext(UserContext);

    const [typedUsername, setTypedUsername] = useState('');
    const [typedPassword, setTypedPassword] = useState('');
    const [md5Hash, setMd5Hash] = useState(''); 
    const [hide, setHide] = useState(true);

    useEffect(() => {
      if (typedPassword.length > 0) {
        convertToMd5();
      }
      else {
        setMd5Hash('');
      }
    }, [typedPassword]);
    const Hide = () => {
      setHide(!hide);
    };
  
    const convertToMd5 = () => { 
        const hash = md5(typedPassword); 
        setMd5Hash(hash); 
    };

    const Login = () => {
      if (typedUsername && typedUsername) {
        try {
          db.transaction((tx) => {
            tx.executeSql(
              "SELECT id, username, fullname, phone_number, birthdate, email, role, current_longitude, current_latitude FROM Accounts WHERE username = ? AND password = ?",
              [typedUsername, md5Hash],
              (tx, results) => {
                if (results.rows.length > 0) {
                  const userData = results.rows.item(0);
                  updateUser(userData)
                  navigation.navigate('HomeScreen');
                }
                else {
                  Alert.alert("Lỗi", "Tên đăng nhập hoặc mật khẩu không đúng");
                }
              }
            )
          })
        }
        catch (error) {

        }
      }
      else {
          Alert.alert("Hãy điền đầy đủ tên đăng nhập và mật khẩu");
      }
    }
    const BackTo = () => {
      navigation.goBack();
    };
    const ResetPass = () => {
      navigation.navigate('ResetPassScreen');
    };
    return (
      <KeyboardAvoidingView style={{flex: 1}}>
        <View style={styles.flex_img_back}>
            <TouchableOpacity onPress={BackTo}>
          <Image
            style={styles.panel_img}
            source={require('../Assets/Asset/icons8-back-48.png')}
          />
          </TouchableOpacity>
        </View>
        <View style={styles.flex_center_3}>
          <Text style={styles.title}>ĐĂNG NHẬP </Text>
          <Text style={styles.subtitle}>GIẢI CỨU CHIẾC XE CỦA BẠN</Text>
        </View>
        <View style={styles.containerInput}>
          <TextField
            placeholder={'Tên đăng nhập'}
            floatingPlaceholder
            label={'Tên đăng nhập'}
            onChangeText={input => setTypedUsername(input)}
            // value={}
            enableErrors
            validate={['required']}
            validationMessage={[
              'Field is required',
            ]}
            showCharCounter
            maxLength={30}
            floatingPlaceholderStyle={styles.floatingHolderStyle}
            containerStyle={styles.containerHolderStyle}
            fieldStyle={styles.fieldStyle}
            validateOnBlur
            
          />
          <View style={{flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
            <TextField
              placeholder={'Mật khẩu'}
              floatingPlaceholder
              label={'Mật khẩu'}
              onChangeText={input => setTypedPassword(input)}
              // value={}
              enableErrors
              validate={['required']}
              validationMessage={['Field is required']}
              showCharCounter
              maxLength={30}
              floatingPlaceholderStyle={styles.floatingHolderStyle}
              containerStyle={[styles.containerHolderStyle,{width:'80%'}]}
              fieldStyle={styles.fieldStyle}
              validateOnBlur
              secureTextEntry={hide}
            />
            <TouchableOpacity onPress={Hide}>
              <Image source={require('../Assets/Asset/icons8-show-48.png')} style={{height:30,width:30,marginLeft:-42,}}></Image>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.flex_top_6}>
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
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <Text>Bạn đã quên mật khẩu ?</Text>
            <TouchableOpacity onPress={ResetPass}>
              <Text style={{fontWeight: 'bold'}}> Đổi mật khẩu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
  
  export default LoginScreen
  
  const styles = StyleSheet.create({
    panel_img: {
      width:48,
      height:48
    },
    flex_img_back: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingLeft: 10,
    },
    flex_center_1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    flex_center_2: {
      flex: 2,
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
    flex_top_6: {
      flex: 6,
      justifyContent: 'flex-start',
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
      marginVertical: 4,
      // backgroundColor:'pink',
      fontSize: 16,
    },
    containerInput: {
      flex: 3,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    title: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 36,
    },
    subtitle: {
      color: 'black',
      fontSize: 18,
    },
    btnLogin: {
      borderRadius: 15,
      width: 120,
      height: 45,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 10,
      marginVertical: 16,
      marginTop:64
    },
  });
  