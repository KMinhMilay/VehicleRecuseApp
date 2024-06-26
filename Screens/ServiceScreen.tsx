import { StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid, Platform, Linking, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';



const questions = [
  {
    "question": "Mô tả quy trình cứu hộ của bạn như thế nào?",
    "answer": "Chúng tôi có một quy trình cứu hộ được thiết kế chuyên biệt để đảm bảo an toàn và hiệu quả. Quy trình này bao gồm đánh giá tình hình, lập kế hoạch cứu hộ, triển khai tài nguyên và thiết bị cần thiết, thực hiện cứu hộ và sau đó đảm bảo sự an toàn cho mọi người tham gia."
  },
  {
    "question": "Bạn có sẵn sàng cứu hộ 24/7 không?",
    "answer": "Chúng tôi hoạt động 24/7 và sẵn sàng đáp ứng mọi cuộc gọi cứu hộ trong thời gian ngắn nhất có thể."
  },
  {
    "question": "Dịch vụ của bạn bao gồm những loại cứu hộ nào?",
    "answer": "Chúng tôi cung cấp các dịch vụ cứu hộ đa dạng, bao gồm cứu hộ đường bộ, cứu hộ đường sắt, cứu hộ dưới nước và cứu hộ hàng không."
  },
  {
    "question": "Bạn có kinh nghiệm trong việc cứu hộ ở những điều kiện thời tiết khắc nghiệt không?",
    "answer": "Đúng, chúng tôi có kinh nghiệm trong việc cứu hộ dưới mọi điều kiện thời tiết, bao gồm cả thời tiết khắc nghiệt như bão, tuyết lở, lũ lụt và nhiệt đới."
  },
  {
    "question": "Làm thế nào tôi có thể liên lạc với bạn khi cần sự giúp đỡ?",
    "answer": "Bạn có thể liên lạc với chúng tôi qua số điện thoại cứu hộ 24/7 hoặc qua email. Thông tin liên lạc chi tiết sẽ được cung cấp khi cần."
  },
  {
    "question": "Bạn có phương tiện và trang thiết bị cần thiết để cứu hộ mọi tình huống không?",
    "answer": "Chúng tôi được trang bị đầy đủ các phương tiện và trang thiết bị cần thiết để thực hiện cứu hộ mọi tình huống."
  },
  {
    "question": "Bạn có đội ngũ nhân viên được đào tạo chuyên nghiệp không?",
    "answer": "Đúng, đội ngũ cứu hộ của chúng tôi được đào tạo chuyên nghiệp và có kinh nghiệm trong việc xử lý mọi tình huống cứu hộ."
  },
  {
    "question": "Bạn có thể cung cấp thông tin về giá cả và chi phí dịch vụ của bạn không?",
    "answer": "Chúng tôi có thể cung cấp thông tin về giá cả và chi phí dịch vụ cụ thể dựa trên loại hình cứu hộ và yêu cầu cụ thể của khách hàng."
  },
  {
    "question": "Bạn có bất kỳ yêu cầu nào đặc biệt nào trước khi thực hiện một cuộc cứu hộ không?",
    "answer": "Chúng tôi luôn lắng nghe và đáp ứng mọi yêu cầu đặc biệt từ phía khách hàng trước khi thực hiện một cuộc cứu hộ."
  },
  {
    "question": "Bạn có thể cung cấp bất kỳ dịch vụ bổ sung nào sau khi cuộc cứu hộ hoàn tất không?",
    "answer": "Sau khi cứu hộ hoàn tất, chúng tôi có thể cung cấp các dịch vụ bổ sung như sửa chữa, bảo dưỡng hoặc hỗ trợ tư vấn để ngăn chặn các sự cố tương lai."
  }
]


function ServiceScreen({ navigation }: any): React.JSX.Element {

  const phoneNumber1 = '0702337630'; // Thay bằng số điện thoại của bạn
  const phoneNumber2 = '0302342630'; 
  useEffect(() => {
    if (Platform.OS === 'android') {
      requestPhonePermission();
    }
  }, []);
  const requestPhonePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
        {
          title: 'Phone Call Service Permission',
          message: 'This app needs access to your phone calls to make a call.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the phone call');
      } else {
        console.log('Phone call permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const makeCallService = () => {
    let phoneNumberUrl = `tel:${phoneNumber1}`;
    Linking.openURL(phoneNumberUrl)
      .catch(err => console.error('Error:', err));
  };
  const makeCallJob = () => {
    let phoneNumberUrl = `tel:${phoneNumber2}`;
    Linking.openURL(phoneNumberUrl)
      .catch(err => console.error('Error:', err));
  };

  const QuestionItemView = ({ question, answer }: any) => {
    const [hide, setHide] = useState(false);
    const [hideContent, setHideContent] = useState(false);
    return (
      <View>
        <TouchableOpacity style={[styles.btnInfo, hide ? { backgroundColor: 'white' } : { backgroundColor: 'black' }]} onPress={() => { setHideContent(!hideContent); setHide(!hide) }}>
          <Text style={[styles.title, hide ? { color: 'black' } : { color: 'white' }]}>{question}</Text>
        </TouchableOpacity>
        {hideContent && (
          <View style={styles.containerContent}>
            <Text style={{ fontSize: 20 ,color:'white'}}>
              {answer}
            </Text>
          </View>
        )}
      </View>
    )
  }

  return (
    <ScrollView style={styles.containerService}>
      <View style={{justifyContent:'center',alignItems:'center',flexDirection:"row"}}>
      <TouchableOpacity style={styles.btnCall} onPress={makeCallService}>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: 'bold',
                textAlign:'center'
              }}>
                SỐ ĐT HỖ TRỢ DỊCH VỤ
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnCall} onPress={makeCallJob}>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: 'bold',
                textAlign:'center'
              }}>
                SỐ ĐT HỖ TRỢ ĐĂNG KÍ 
            </Text>
        </TouchableOpacity>
      </View>
      <View >
        <Text style={{fontSize:16,fontWeight:"bold",color:'black',marginVertical:8}}>Câu hỏi thường gặp</Text>
        {questions.map(item => (
          <QuestionItemView {...item} />
        ))
        }
      </View>
    </ScrollView>
  );
}

export default ServiceScreen;

const styles = StyleSheet.create({
  containerService: {
    flex: 1,
    backgroundColor: 'white',
    padding: 48,
    flexWrap: 'wrap',
    flexDirection: 'row',
    //justifyContent: 'jus',

  },
  btnInfo: {
    borderRadius: 15,
    width: 300,
    height: 144,

    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderWidth: 1,
    elevation: 10,
    marginVertical: 16,
  },
  containerContent: {

    backgroundColor: 'black',
    padding: 16,
    fontSize: 1,
    textAlign: 'center',
    width: 300,
    height: 288,
    borderRadius:15
    
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnCall: {
    borderRadius: 15,
    width: 128,
    height: 64,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    borderWidth:2,
    marginHorizontal:8
    
  },
});
