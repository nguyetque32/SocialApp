import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
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
import { auth, firebase } from '../firebase';


const MessagesScreen = ({navigation}) => {
  const db = firebase.firestore();
  const [data, setData] = useState([]);

  useEffect(() => {
    // Đăng ký lắng nghe sự thay đổi của dữ liệu trên Cloud Firestore
    const unsubscribe = db.collection('user').where('uid', '!=' , auth.currentUser.uid).onSnapshot(snapshot => {
      const updatedData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(updatedData);
    });
    console.log(data)

    // Hủy đăng ký lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, [])


    return (
      <Container>
        <FlatList 
          data={data}
          keyExtractor={item=>item.id}
          renderItem={({item}) => (
            <Card onPress={() => navigation.navigate('Chat', {userName: item.name, uid: item.uid})}>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg source={{uri: data ? item.userImg || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.name}</UserName>
                  </UserInfoText>
                  <MessageText>{auth.currentUser.email}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
      </Container>
    );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});