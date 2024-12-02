import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TextInput } from 'react-native';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../styles/MessageStyles';
import FormInput from '../components/FormInput';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { windowHeight, windowWidth } from '../utils/Dimentions'
import { TouchableOpacity } from 'react-native';
import { auth, firebase } from '../firebase';

const FindScreen = ({navigation}) => {
  const db = firebase.firestore();
  const [data, setData] = useState([]);
  const [findName, setFindName] = useState(null);

  const findUser = () => {
    const unsubscribe = db.collection('user').where('name', '==' ,findName).orderBy('createAt', 'desc').onSnapshot(snapshot => {
      const updatedData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(updatedData);
    });

    // Hủy đăng ký lắng nghe khi component bị unmount
    return () => unsubscribe();
  }

  return (
    

    <Container>
      <View style={styles.inputContainer}>
        <TextInput 
            onChangeText={(Findname) => setFindName(Findname)}
            style={styles.input}
            numberOfLines={1}
            placeholder="Nhập tên cần tìm"
            placeholderTextColor="#666"
         />
          <TouchableOpacity style={styles.iconStyle}>
            <Ionicons
              name="search-outline"
              color="#666"
              size={25}
              onPress={() => findUser()}
            />
          </TouchableOpacity>
    </View>
      <FlatList 
        data={data}
        keyExtractor={item=>item.id}
        renderItem={({item}) => (
          <Card onPress={() => navigation.navigate('HomeProfile', {userId: item.id})}>
            <UserInfo>
              <UserImgWrapper>
                <UserImg source={{uri: item.userImg}} />
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName>{item.name}</UserName>
                </UserInfoText>
              </TextSection>
            </UserInfo>
          </Card>
        )}
      />
    </Container>
  );
};

export default FindScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  inputContainer:{
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: windowHeight / 15,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
},
iconStyle:{
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems:'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
},
input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
},
inputField:{
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
},
});