import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import { ScrollView } from 'react-native-gesture-handler';

function ServiceScreen({navigation}: any): React.JSX.Element {
  const [hideContent, setHideContent] = useState(false);
  const [hideContent1, setHideContent1] = useState(false);
  const [hideContent2, setHideContent2] = useState(false);
  const [hideContent3, setHideContent3] = useState(false);
  const [hide,setHide] = useState(true);
  const [hide1,setHide1] = useState(true);
  const [hide2,setHide2] = useState(true);
  const [hide3,setHide3] = useState(true);
  return (
    <View style={styles.containerService}>

      
      <TouchableOpacity style={[styles.btnInfo,hide ? {backgroundColor:'white'} : {backgroundColor:'black'}]} onPress={() => {setHideContent(!hideContent);setHide(!hide)}}>
        <Text style={[styles.title,hide ? {color:'black'} : {color:'white'}]}>Question 1</Text>
      </TouchableOpacity>
      {hideContent && (
        <View style={styles.containerContent}>
          <Text>
            Hi 1
          </Text>
        </View>
      )}
      <TouchableOpacity style={[styles.btnInfo,hide1 ? {backgroundColor:'white'} : {backgroundColor:'black'}]} onPress={() => {setHideContent1(!hideContent1);setHide1(!hide1)}}>
        <Text style={[styles.title,hide1 ? {color:'black'} : {color:'white'}]}>Question 2</Text>
      </TouchableOpacity>
      {hideContent1 && (
        <View style={styles.containerContent}>
          <Text>
            Hi 2
          </Text>
        </View>
      )}
      <TouchableOpacity style={[styles.btnInfo,hide2 ? {backgroundColor:'white'} : {backgroundColor:'black'}]} onPress={() => {setHideContent2(!hideContent2);setHide2(!hide2)}}>
        <Text style={[styles.title,hide2 ? {color:'black'} : {color:'white'}]}>Question 3</Text>
      </TouchableOpacity>
      {hideContent2 && (
        <View style={styles.containerContent}>
          <Text>
            Hi 3
          </Text>
        </View>
      )}
      <TouchableOpacity style={[styles.btnInfo,hide3 ? {backgroundColor:'white'} : {backgroundColor:'black'}]} onPress={() => {setHideContent3(!hideContent3);setHide3(!hide3)}}>
        <Text style={[styles.title,hide3 ? {color:'black'} : {color:'white'}]}>Question 4</Text>
      </TouchableOpacity>
      {hideContent3 && (
        <View style={styles.containerContent}>
          <Text>
            Hi 4
          </Text>
        </View>
      )}

      
      
    </View>
  );
}

export default ServiceScreen;

const styles = StyleSheet.create({
  containerService:{
    flex: 1,
    backgroundColor: 'white',
    padding: 48,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  btnInfo: {
    borderRadius: 15,
    width: 144,
    height: 144,
    
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderWidth:1,
    elevation: 10,
    marginVertical: 16,
  },
  containerContent:{
    
    backgroundColor: 'red',
    padding: 16,
    textAlign:'center',
    width: 312,
    height: 288,
    
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
