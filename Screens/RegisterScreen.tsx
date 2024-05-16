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
  Icon,
} from 'react-native-ui-lib';
import DateTimePicker from '@react-native-community/datetimepicker';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
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
function RegisterScreen({navigation}: any): React.JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const [check, setCheck] = useState(false);
  const [hide, setHide] = useState(false);
  const [hideContainer, setHideContainer] = useState(true);
  const [datetime, setDateTime] = React.useState(new Date());
  const [show, setShow] = React.useState(false);
  const [md5Hash, setMd5Hash] = useState('');

  useEffect(() => {
    if (password.length > 0) {
      convertToMd5();
    }
    else {
      setMd5Hash('');
    }
  }, [password]);
  useEffect(() => {
    console.log(md5Hash);
  }, [md5Hash]);
  useEffect(() => {
    console.log(birthdate);
  }, [birthdate])
  function Check() {
    setCheck(!check);
  }
  function Hide() {
    setHide(!hide);
  }
  const convertToMd5 = () => { 
    const hash = md5(password); 
    setMd5Hash(hash); 
  };
  const areAllFieldsFilled = (fields: any[]) => {
    return fields.every((field: string | null) => field !== null && field.trim() !== '');
  };
  
  const Register = () => {
    if (!areAllFieldsFilled([username, password, fullname, phoneNumber, email, birthdate])) {
      Alert.alert('Lỗi', 'Vui lòng điền tất cả thông tin cần thiết');
      return;
    }
    else {
      try {
        db.transaction((tx) => {
          tx.executeSql(
              "INSERT INTO Accounts (username, fullname, phone_number, birthdate, email, password, role) VALUES (?,?,?,?,?,?,?)",
              [username, fullname, phoneNumber, birthdate, email, md5Hash, 'customer'],
              (tx, results) => {
                if (results.rowsAffected > 0) {
                  Alert.alert('Thông báo', 'Tạo tài khoản thành công')
                  navigation.goBack();
  
                } else {
                  Alert.alert('Thông báo', 'Tạo tài khoản không thành công. Có vẻ thông tin đăng tài khoản chưa hợp lệ. Vui lòng kiểm tra lại thông tin đã điền.');
                }
              }
          );
      });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const BackTo = () => {
    navigation.goBack();
  };
  const onChangeDate = ({event, selectedDate}: any) => {
    const curDate = selectedDate;

    setDateTime(curDate);
    let tempDate = new Date(curDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();
    
    setShow(!show);
    setBirthdate(fDate);
  };
  const showDateTime = () => {
    setShow(true);
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
      <View style={styles.flex_center_1}>
        <Text style={styles.title}>ĐĂNG KÍ TÀI KHOẢN MỚI </Text>
      </View>
      <View style={styles.containerInput}>
        {hideContainer && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextField
              showSoftInputOnFocus={false}
              placeholder={'Họ và tên bạn'}
              floatingPlaceholder
              label={'Họ và tên'}
              onChangeText={setFullname}
              value={fullname}
              enableErrors
              validate={['required', (value: string) => value.length > 8]}
              validationMessage={[
                'Không được để trống',
                'Họ và tên không được dưới 8 kí tự',
              ]}
              showCharCounter
              maxLength={30}
              floatingPlaceholderStyle={styles.floatingHolderStyle}
              containerStyle={styles.containerHolderStyle}
              fieldStyle={styles.fieldStyle}
              validateOnBlur
            />
          </View>
        )}
        {hideContainer && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextField
              placeholder={'Tên đăng nhập'}
              floatingPlaceholder
              label={'Tên đăng nhập'}
              onChangeText={setUsername}
              value={username}
              enableErrors
              validate={['required', (value: string) => value.length >= 6]}
              validationMessage={[
                'Không được để trống',
                'Tên đăng nhập không được dưới 6 kí tự',
              ]}
              showCharCounter
              maxLength={30}
              floatingPlaceholderStyle={styles.floatingHolderStyle}
              containerStyle={styles.containerHolderStyle}
              fieldStyle={styles.fieldStyle}
              validateOnBlur
            />
          </View>
        )}
        {hideContainer && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextField
              placeholder={'Số điện thoại'}
              inputMode="numeric"
              floatingPlaceholder
              label={'Số điện thoại'}
              onChangeText={setPhoneNumber}
              value={phoneNumber}
              enableErrors
              validate={[
                'required',
                'number',
                (value: string) => value.length >= 10,
              ]}
              validationMessage={[
                'Không được để trống',
                'Không được chứa chữ hay kí tự đặc biệt',
                'Số điện thoại không được dưới 10 chữ số',
              ]}
              showCharCounter
              maxLength={30}
              floatingPlaceholderStyle={styles.floatingHolderStyle}
              containerStyle={styles.containerHolderStyle}
              fieldStyle={styles.fieldStyle}
              validateOnBlur
            />
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextField
            placeholder={'Ngày-tháng-năm'}
            floatingPlaceholder
            readOnly={true}
            label={'Ngày-tháng-năm'}
            onChangeText={setBirthdate}
            value={birthdate}
            enableErrors
            validate={['required']}
            validationMessage={['Không được để trống']}
            maxLength={30}
            floatingPlaceholderStyle={styles.floatingHolderStyle}
            containerStyle={[styles.containerHolderStyle, {width: '80%'}]}
            fieldStyle={styles.fieldStyle}
            validateOnBlur
          />
          <TouchableOpacity onPress={showDateTime}>
            <Image
              source={require('../Assets/Asset/icons8-date-48.png')}
              style={{height: 30, width: 30, marginLeft: -42}}></Image>
          </TouchableOpacity>
        </View>
        <TextField
          placeholder={'Email'}
          floatingPlaceholder
          label={'Email'}
          onChangeText={setEmail}
          onPressIn={() => setHideContainer(false)}
          onEndEditing={() => setHideContainer(true)}
          value={email}
          enableErrors
          validate={['required', 'email', (value: string) => value.length >= 8]}
          validationMessage={[
            'Không được để trống',
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
            placeholder={'Mật khẩu'}
            floatingPlaceholder
            label={'Mật khẩu'}
            onChangeText={setPassword}
            onPressIn={() => setHideContainer(false)}
            onEndEditing={() => setHideContainer(true)}
            value={password}
            enableErrors
            validate={['required', (value: string) => value.length > 8]}
            validationMessage={[
              'Không được để trống',
              'Mật khẩu không được dưới 8 kí tự',
            ]}
            maxLength={30}
            floatingPlaceholderStyle={styles.floatingHolderStyle}
            containerStyle={[styles.containerHolderStyle, {width: '80%'}]}
            fieldStyle={styles.fieldStyle}
            validateOnBlur
            secureTextEntry={hide}
          />
          <TouchableOpacity
            style={{
              height: 48,
              width: 48,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: -48,
            }}
            onPress={Hide}>
            <Image
              source={
                hide
                  ? require('../Assets/Asset/icons8-hide-48.png')
                  : require('../Assets/Asset/icons8-show-48.png')
              }
              style={{height: 30, width: 30}}></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.flex_top_1}>
          <TouchableOpacity style={[styles.btnRegister, !check && styles.disabledBtn]} onPress={Register} disabled={!check}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              TẠO TÀI KHOẢN
            </Text>
          </TouchableOpacity>
          <Checkbox
            color="black"
            value={check}
            onValueChange={Check}
            label="Bạn đồng ý và thỏa thuận với các điều khoản và điều kiện"
          />
        </View>
      </View>

      {show && (
        <View>
          <DateTimePicker
            testID="dateTimePicker"
            value={datetime}
            mode={'date'}
            display="spinner"
            onChange={(event, selectedDate) => {
              onChangeDate({event, selectedDate});
            }}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

export default RegisterScreen;

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
    marginTop: 18,
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
  btnRegister: {
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

});
