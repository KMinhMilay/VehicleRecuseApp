import {
    Alert,
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState} from 'react';
  import {View, TextField, Text, Button} from 'react-native-ui-lib';
 
  function LoginScreen({navigation}: any): React.JSX.Element {
    const [hide, setHide] = useState(true);
    const Hide = () => {
      setHide(!hide);
    };
    const Login = () => {
      navigation.navigate('HomeScreen');
    };
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
            onChangeText={() => {
              console.log('Text have changed');
            }}
            // value={}
            enableErrors
            validate={['required', 'email', (value: string) => value.length > 6]}
            validationMessage={[
              'Field is required',
              'Email is invalid',
              'Username is too short',
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
              onChangeText={() => {
                console.log('Text have changed');
              }}
              // value={}
              enableErrors
              validate={['required', (value: string) => value.length > 6]}
              validationMessage={['Field is required', 'Password is too short']}
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
  