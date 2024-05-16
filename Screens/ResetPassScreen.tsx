import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  View,
  TextField,
  Text,
  Button,
  Checkbox,
  CheckboxRef,
} from 'react-native-ui-lib';
import SQLite from 'react-native-sqlite-storage';
import md5 from 'md5';


const db = SQLite.openDatabase(
  {
      name: 'VehicleRescue',
      location: 'default',
  },
  () => { },
  error => { console.log(error) }
);

function ResetPassScreen({navigation}: any) : React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [md5Hash, setMd5Hash] = useState('');

  const [check, setCheck] = useState(false);
  const [hide, setHide] = useState(false);
  const [passwordMatched, setPasswordMatched] = useState(false);

  useEffect(() => {
    if (password.length > 0) {
      convertToMd5();
    }
    else {
      setMd5Hash('');
    }
  }, [password]);

  useEffect(() => {
    if (password && confirmPassword) {
      setPasswordMatched(password == confirmPassword);
    }
    else {
      setPasswordMatched(false);
    }
  },[password, confirmPassword])
  function Check() {
    setCheck(!check);
    return true;
  }
  function Hide() {
    setHide(!hide);
  }
  const BackTo = () => {
    navigation.goBack();
  }
  const convertToMd5 = () => { 
    const hash = md5(password); 
    setMd5Hash(hash); 
  };
  const areAllFieldsFilled = (fields: any[]) => {
    return fields.every((field: string | null) => field !== null && field.trim() !== '');
  };
  const ResetPass = () => {
    if (!areAllFieldsFilled([email, password, confirmPassword])) {
      Alert.alert('Lỗi', 'Vui lòng điền tất cả thông tin cần thiết');
      return;
    }
    else {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE Accounts set password = ? where email = ?",
          [md5Hash, email],
          (tx, results) => {
            if (results.rowsAffected > 0){
              Alert.alert('Thông báo', 'Đặt lại mật khẩu thành công');
              navigation.goBack();
            }
            else {
              Alert.alert('Thông báo', 'Đặt lại mật khẩu không thành công. Hãy kiểm tra lại email');
            } 
          }
        );
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex:1}}
      >
      <View style={styles.flex_img_back}>
        <TouchableOpacity onPress={BackTo}>
          <Image
            style={styles.panel_img}
            source={require('../Assets/Asset/icons8-back-48.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.flex_center_1}>
        <Text style={styles.title}>ĐỔI MẬT KHẨU MỚI</Text>
      </View>
      <View style={styles.containerInput}>
      <TextField
          placeholder={'Email'}
          floatingPlaceholder
          label={'Email'}
          onChangeText={setEmail}
          value={email}
          enableErrors
          validate={['required', 'email', (value: string) => value.length >= 8]}
          validationMessage={[
            'Không được để trống này',
            'Không đúng định dạng email',
            'Email không được dưới 8 kí tự',
          ]}
          showCharCounter
          maxLength={30}
          floatingPlaceholderStyle={styles.floatingHolderStyle}
          containerStyle={styles.containerHolderStyle}
          fieldStyle={styles.fieldStyle}
          validateOnBlur
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextField
            placeholder={'Nhập mật khẩu mới'}
            floatingPlaceholder
            label={'Mật khẩu'}
            onChangeText={setPassword}
            value={password}
            enableErrors
            validate={['required', (value: string) => value.length > 8]}
            validationMessage={[
              'Không được để trống này',
              'Mật khẩu không được dưới 8 kí tự',
            ]}
            maxLength={30}
            floatingPlaceholderStyle={styles.floatingHolderStyle}
            containerStyle={[styles.containerHolderStyle, {width: '80%'}]}
            fieldStyle={styles.fieldStyle}
            validateOnBlur
            secureTextEntry={hide}
          />
          <TouchableOpacity style={{height:48,width:48,justifyContent:'center',alignItems:'center',marginLeft: -48}} onPress={Hide}>
            <Image
              source={
                hide
                  ? require('../Assets/Asset/icons8-hide-48.png')
                  : require('../Assets/Asset/icons8-show-48.png')
              }
              style={{height: 30, width: 30}}></Image>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextField
            placeholder={'Nhập lại mật khẩu mới'}
            floatingPlaceholder
            label={'Mật khẩu mới'}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            enableErrors
            validate={['required', (value: string) => value.length > 8]}
            validationMessage={[
              'Không được để trống này',
              'Mật khẩu không được dưới 8 kí tự',
            ]}
            maxLength={30}
            floatingPlaceholderStyle={styles.floatingHolderStyle}
            containerStyle={[styles.containerHolderStyle, {width: '80%'}]}
            fieldStyle={styles.fieldStyle}
            validateOnBlur
            secureTextEntry={hide}
          />
          <TouchableOpacity style={{height:48,width:48,justifyContent:'center',alignItems:'center',marginLeft: -48}} onPress={Hide}>
            <Image
              source={
                hide
                  ? require('../Assets/Asset/icons8-hide-48.png')
                  : require('../Assets/Asset/icons8-show-48.png')
              }
              style={{height: 30, width: 30}}></Image>
          </TouchableOpacity>
        </View>
        {!passwordMatched && password && confirmPassword && (
            <Text style={{ color: 'red' }}>Mật khẩu không khớp. Vui lòng thử lại.</Text>
          )}
        <View style={styles.flex_top_1}>
          <TouchableOpacity style={[styles.btnReset, !check && styles.disabledBtn || !passwordMatched && styles.disabledBtn]} onPress={ResetPass} disabled={!check || !passwordMatched}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              ĐỔI
            </Text>
          </TouchableOpacity>
          <Checkbox
            color="black"
            value={check}
            onValueChange={Check}
            label="Bạn xác nhận là mật khẩu mới của bạn"
          />
        </View>
      </View>
      
    </KeyboardAvoidingView>
  );
}

export default ResetPassScreen

const styles = StyleSheet.create({
  panel_img: {
    width: 48,
    height: 48,
  },
  flex_img_back: {
    flex: 1.5,
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
  flex_top_1: {
    flex: 1,
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
    fontSize: 16,
  },
  containerInput: {
    flex: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop:18
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  subtitle: {
    color: 'black',
    fontSize: 18,
    backgroundColor: 'white',
  },
  btnReset: {
    borderRadius: 15,
    width: 140,
    height: 45,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    marginVertical: 16,
  },
  disabledBtn: {
    backgroundColor: 'gray',
  },
})