import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  View,
  TextField,
  Text,
  Button,
  Checkbox,
  CheckboxRef,
} from 'react-native-ui-lib';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AccountController from '../Controller/AccountController';

function UserInfoScreen({ navigation }: any): React.JSX.Element {
  const [check, setCheck] = useState(false);
  const [hide, setHide] = useState(false);
  //const [hideContainer, setHideContainer] = useState(true);
  const [datetime, setDateTime] = React.useState(new Date());
  const [textDate, setTextDate] = React.useState(
    new Date().toLocaleDateString(),
  );
  const [show, setShow] = React.useState(false);

  function Hide() {
    setHide(!hide);
  }

  const Update = () => {
    validateFields();
    if (hasError) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ và đúng thông tin');
      return;
    }
    controller.updateAccount({
      fullname: fullname,
      phone_number: number_phone,
      birthdate: birthdate,
      email: email,
      password: password,
      id: 1, // Thay bằng id của người dùng đang đăng nhập
    })
      .then(success => {
        if (success) {
          console.log('Tài khoản đã được cập nhật thành công');
          Alert.alert('Cập nhật thành công');
        } else {
          console.log('Không có tài khoản nào được cập nhật');
        }
      })
      .catch(error => {
        console.error('Có lỗi trong quá trình cập nhật', error);
      });
  };

  const Logout = () => {
    navigation.popToTop();
  };
  const onChangeDate = ({ event, selectedDate }: any) => {

    const curDate = selectedDate || datetime;

    console.log(curDate)

    setDateTime(curDate);
    let tempDate = new Date(curDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();

    console.log(fDate);
    
    setTextDate(fDate);
    setShow(!show);
  };
  const showDateTime = () => {
    setShow(true);
  };


  const controller = new AccountController('VehicleRescue')

  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('')
  const [number_phone, setNumberPhone] = useState('')
  const [birthdate, setBirthday] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    loadInfoUser()
  }, []);
  
  const loadInfoUser = () => {
    controller.getAccountById(1) // Ngay đây sẽ thay thế bằng id của người đăng nhập vào
      .then(account => {
        setFullname(account.fullname)
        setUsername(account.username)
        setNumberPhone(account.phone_number)
        setBirthday(account.birthdate)
        setEmail(account.email)
        setPassword(account.password)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateFields = () => {
    let hasError = false;

    // Kiểm tra fullname
    if (fullname.trim() === '') {
      hasError = true;
    } else if (fullname.length <= 8) {
      hasError = true;
    }

    // Kiểm tra số điện thoại
    if (number_phone.trim() === '') {
      hasError = true;
    } else if (number_phone.length < 10) {
      hasError = true;
    } else if (number_phone.length > 10) {
      hasError = true;
    }

    // Kiểm tra email
    if (email.trim() === '') {
      hasError = true;
    } else if (email.length <= 8) {
      hasError = true;
    } else if (!isValidEmail(email)) {
      hasError = true;
    }

    if (password.trim() === '') {
      hasError = true;
    } else if (password.length <= 8) {
      hasError = true;
    }

    setHasError(hasError);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={styles.flex_img_back}>
        <Text style={{ fontSize: 32, color: 'black', textAlign: 'center' }}>THÔNG TIN CỦA BẠN</Text>
      </View>

      <KeyboardAwareScrollView>

        <View style={styles.containerInput}>

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
              value={fullname}
              enableErrors
              validate={['required', (value: string) => value.length > 8]}
              validationMessage={[
                'Không được để trống này',
                'Họ và tên không được dưới 8 kí tự',
              ]}
              onChangeText={text => {
                setFullname(text);
              }}
              showCharCounter
              maxLength={30}
              floatingPlaceholderStyle={styles.floatingHolderStyle}
              containerStyle={styles.containerHolderStyle}
              fieldStyle={styles.fieldStyle}
              validateOnBlur
            />
          </View>


          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextField
              placeholder={'Tên đăng nhập ( Không thể sửa )'}
              floatingPlaceholder
              label={'Tên đăng nhập'}
              onChangeText={() => {
                console.log('Text have changed');
              }}
              readOnly={true}
              value={username}
              enableErrors
              validate={['required', (value: string) => value.length > 6]}
              validationMessage={[
                'Không được để trống này',
                'Tên đăng nhập không được dưới 8 kí tự',
              ]}
              showCharCounter
              maxLength={30}
              floatingPlaceholderStyle={styles.floatingHolderStyle}
              containerStyle={styles.containerHolderStyle}
              fieldStyle={[styles.fieldStyle, { backgroundColor: 'rgb(206,206,206)' }]}
              validateOnBlur
            />
          </View>


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
              label={'Tên đăng nhập'}
              onChangeText={(text) => {
                setHasError(!text || text.length !== 10)
                setNumberPhone(text)
              }}
              value={number_phone}
              enableErrors
              validate={[
                'required',
                'number',
                (value: string) => value.length === 10,
              ]}
              validationMessage={[
                'Không được để trống này',
                'Không được chứa chữ hay kí tự đặc biệt',
                'Số điện thoại không hợp lệ',
              ]}
              showCharCounter
              maxLength={30}
              floatingPlaceholderStyle={styles.floatingHolderStyle}
              containerStyle={styles.containerHolderStyle}
              fieldStyle={styles.fieldStyle}
              validateOnBlur
            />
          </View>

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
              onChangeText={(text) => {
                //setBirthday(text)
                setBirthday(textDate)
              }}
              value={birthdate}
              enableErrors
              validate={['required', (value: string) => value.length > 6]}
              validationMessage={['Field is required', 'Password is too short']}
              maxLength={30}
              floatingPlaceholderStyle={styles.floatingHolderStyle}
              containerStyle={[styles.containerHolderStyle, { width: '80%' }]}
              fieldStyle={styles.fieldStyle}
              validateOnBlur
            />
            <TouchableOpacity onPress={showDateTime}>
              <Image
                source={require('../Assets/Asset/icons8-date-48.png')}
                style={{ height: 30, width: 30, marginLeft: -42 }}></Image>
            </TouchableOpacity>
          </View>
          <TextField
            placeholder={'Gmail'}
            floatingPlaceholder
            label={'Tên đăng nhập'}
            onChangeText={(text) => {
              setEmail(text)
            }}

            //onPressIn={() => setHideContainer(false)}
            //onEndEditing={() => setHideContainer(true)}
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
              placeholder={'Nhập lại mật khẩu mới'}
              floatingPlaceholder
              label={'Mật khẩu mới'}
              onChangeText={(text) => {
                setPassword(text)
              }}
              //onPressIn={() => setHideContainer(false)}
              //onEndEditing={() => setHideContainer(true)}
              value={password}
              enableErrors
              validate={['required', (value: string) => value.length > 8]}
              validationMessage={[
                'Không được để trống này',
                'Mật khẩu không được dưới 8 kí tự',
              ]}
              maxLength={30}
              floatingPlaceholderStyle={styles.floatingHolderStyle}
              containerStyle={[styles.containerHolderStyle, { width: '80%' }]}
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
                style={{ height: 30, width: 30 }}></Image>
            </TouchableOpacity>
          </View>
          <View style={[styles.flex_top_1, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <TouchableOpacity style={styles.btnUpdate} onPress={Update}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                CẬP NHẬT
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnLogout} onPress={Logout}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                ĐĂNG XUẤT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>


      {show && (
        <View>
          <DateTimePicker
            testID="dateTimePicker"
            value={datetime}
            mode={'date'}
            display="spinner"
            onChange={onChangeDate}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

export default UserInfoScreen;

const styles = StyleSheet.create({
  panel_img: {
    width: 48,
    height: 48,
  },
  flex_img_back: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5
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
  btnUpdate: {
    borderRadius: 15,
    width: 140,
    height: 45,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    marginVertical: 16,
    marginHorizontal: 12
  },
  btnLogout: {
    borderRadius: 15,
    width: 140,
    height: 45,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    marginVertical: 16,
    marginHorizontal: 12
  },
});
