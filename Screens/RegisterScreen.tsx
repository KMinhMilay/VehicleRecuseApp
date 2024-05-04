import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  View,
  TextField,
  Text,
  Button,
  Checkbox,
  CheckboxRef,
} from 'react-native-ui-lib';
import DateTimePicker from '@react-native-community/datetimepicker';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';

function RegisterScreen({navigation}: any): React.JSX.Element {
  const [fullname, setFullname] = useState('');
  const [check, setCheck] = useState(false);
  const [hide, setHide] = useState(false);
  const [hideContainer, setHideContainer] = useState(true);
  const [datetime, setDateTime] = React.useState(new Date());
  const [textDate, setTextDate] = React.useState(
    new Date().toLocaleDateString(),
  );
  const [show, setShow] = React.useState(false);
  function Check() {
    setCheck(!check);
    return true;
  }
  function Hide() {
    setHide(!hide);
  }
  const Register = () => {
    navigation.goBack();
  };
  const BackTo = () => {
    navigation.goBack();
  };
  const onChangeDate = ({event, selectedDate}: any) => {
    const curDate = selectedDate || datetime;

    setDateTime(curDate);
    let tempDate = new Date(curDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();
    setTextDate(fDate);
    setShow(!show);
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
                'Không được để trống này',
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
              onChangeText={() => {
                console.log('Text have changed');
              }}
              // value={}
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
              label={'Tên đăng nhập'}
              onChangeText={() => {
                console.log('Text have changed');
              }}
              // value={}
              enableErrors
              validate={[
                'required',
                'number',
                (value: string) => value.length >= 10,
              ]}
              validationMessage={[
                'Không được để trống này',
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
            onChangeText={() => {
              console.log('Text have changed');
            }}
            value={textDate}
            enableErrors
            validate={['required', (value: string) => value.length > 6]}
            validationMessage={['Field is required', 'Password is too short']}
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
          placeholder={'Gmail'}
          floatingPlaceholder
          label={'Tên đăng nhập'}
          onChangeText={() => {
            console.log('Text have changed');
          }}
          onPressIn={() => setHideContainer(false)}
          onEndEditing={() => setHideContainer(true)}
          // value={}
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
            placeholder={'Mật khẩu'}
            floatingPlaceholder
            label={'Mật khẩu'}
            onChangeText={() => {
              console.log('Text have changed');
            }}
            onPressIn={() => setHideContainer(false)}
            onEndEditing={() => setHideContainer(true)}
            // value={}
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
          <TouchableOpacity style={styles.btnRegister} onPress={Register}>
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
            onChange={onChangeDate}
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
});
