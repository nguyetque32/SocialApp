import React, {useState, useContext, useEffect} from 'react';
import {View, Text,TouchableOpacity, Platform, StyleSheet, Alert, ActivityIndicator, Keyboard} from 'react-native';
import {InputField, InputWrapper, AddImage, SubmitBtn, SubmitBtnText, StatusWrapper} from '../styles/AddPost';
import ActionButton from 'react-native-action-button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../navigation/AuthProvider';
import { firebase } from '../firebase';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const AddPostScreen = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const {user, logout} = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [Url, setUrl] = useState('');
  const todoRef = firebase.firestore().collection('SocialApp');
  const [addData, setAddData] = useState('');


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const scoure = { uri: result.assets[0].uri };
      console.log(scoure);
      setImage(scoure);
    }
  };

  const openCamera = async () => {
    const {status} = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted"){
      const result = await ImagePicker.launchCameraAsync();
      if(!result.canceled){
        const scoure = { uri: result.assets[0].uri };
      console.log(scoure);
      setImage(scoure);
      }
    }else{
      console.log("Bạn chưa cho phép truy cập camera")
    }
  };

  const deleteImg = () => {
    setImage(null);
  };


  const uploadImage = async () => {
    if(image != null){
    setUploading(true);
    const response = await fetch(image.uri)
    const blob = await response.blob();
    const filename = image.uri.substring(image.uri.lastIndexOf('/')+1);
    var ref = firebase.storage().ref().child(filename).put(blob);
      await ref;
      const storage = firebase.storage();
      const link = String(filename);
  
      storage.ref(`${link}`).getDownloadURL()
        .then((url) => {
          console.log(url);
          setUploading(false);
          Alert.alert(
            'Đã up hình'
          );
          const timestamp = firebase.firestore.FieldValue.serverTimestamp();
          console.log("imageURL: ", url)
          const data = {
            userId: user.uid,
            post: post,
            postImg: url,
            postTime: timestamp,
            likes: [],
            comments: [],
          };
          todoRef
            .add(data)
            .then(() => {
              setAddData('');
              Keyboard.dismiss();
              setImage(null);
              setPost('');
            })
            .catch((error) => {
              alert(error);
            })
        })
    }else{
          const timestamp = firebase.firestore.FieldValue.serverTimestamp();
          const data = {
            userId: user.uid,
            post: post,
            postImg: '',
            postTime: timestamp,
            likes: [],
            comments: [],
          };
          todoRef
            .add(data)
            .then(() => {
              setAddData('');
              Keyboard.dismiss();
              setImage(null);
              setPost('');
            })
            .catch((error) => {
              alert(error);
            })
    }
  }

  return (
    <View style={styles.container}>
        <InputWrapper>
            {image && <AddImage source={{uri: image.uri}} /> } 
            <InputField
                placeholder = "Nhập vào"
                multiline
                numberOfLines={4}
                value={post}
                onChangeText={(content) => setPost(content)}
            />
              {/* <StatusWrapper>
                <Text>{transferred} % Completed!</Text>
                <ActivityIndicator size="large" color="#0000ff" />
              </StatusWrapper> */}
              <SubmitBtn onPress={uploadImage}>
                <SubmitBtnText>Đăng</SubmitBtnText>
              </SubmitBtn>
        </InputWrapper>
        <ActionButton buttonColor="#2e64e5">
            <ActionButton.Item
            buttonColor="#9b59b6"
            title="Chụp ảnh"
            onPress={() => openCamera()}>
            <Ionicons name="camera-outline" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
            buttonColor="#3498db"
            title="chọn hình"
            onPress={() => pickImage()}>
            <Ionicons name="md-images-outline" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            {/* {image &&
            <ActionButton.Item buttonColor="#3498db" title="xoá hình" onPress={deleteImg}>
            <Ionicons name="md-images-outline" style={styles.actionButtonIcon} />
            </ActionButton.Item> 
            } */}
      </ActionButton>  
    </View>
    
      
  )
}
export default AddPostScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
      },
})