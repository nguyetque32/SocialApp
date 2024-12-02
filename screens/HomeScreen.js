import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth, firebase } from '../firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card, Container, Divider, Interaction, InteractionText, InteractionWrapper, PostImg, PostText, PostTime, UserImg, UserInfo, UserInfoText, UserName } from '../styles/FeedStyles';
import PostCard from '../components/PostCard';
import 'firebase/firestore'
import { Alert } from 'react-native';

const HomeScreen = ({navigation}) => {
  const {posts, setPosts} = useState([]);
  const db = firebase.firestore();
  const [data, setData] = useState([]);

  
  useEffect(() => {
    // Đăng ký lắng nghe sự thay đổi của dữ liệu trên Cloud Firestore
    const unsubscribe = db.collection('SocialApp').orderBy('postTime', 'desc').onSnapshot(snapshot => {
      const updatedData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(updatedData);
    });

    // Hủy đăng ký lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  const onLike = (item) => {
    let tempLikes = item.likes;
    if(tempLikes.length > 0){
      tempLikes.map(item1 => {
        if(item1 == auth.currentUser.uid){
          const index = tempLikes.indexOf(item1);
          if(index > -1) {
            tempLikes.splice(index, 1);
          }
        } else {
          tempLikes.push(auth.currentUser.uid);
        }
      });
    } else {
      tempLikes.push(auth.currentUser.uid);
    }

    const likeRef = firebase.firestore().collection('SocialApp');
    likeRef
    .doc(item.id)
    .update({
      likes: tempLikes,
    })
    .then(() => {
      console.log('update like')
    })
    .catch(error => {});
  }

  const handleDelete = (postId) => {
    Alert.alert(
      'Xoá bài',
      'Bạn có muốn xoá bài không?',
      [
        {
          text: 'Không',
          onPress: () => console.log('Không xoá!'),
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: () => deletePost(postId),
        },
      ],
      {cancelable: false},
    );
  };

  const deletePost = (postId) => {
    console.log(postId);
    const postRef = firebase.firestore().collection('SocialApp');

    postRef
      .doc(postId)
      .get()
      .then(documentSnapshot => {
        if(documentSnapshot.exists){
          const {postImg} = documentSnapshot.data();

          if(postImg != ''){
            const storageRef = firebase.storage().refFromURL(postImg);
            const imageRef = firebase.storage().ref(storageRef.fullPath);

            imageRef
            .delete()
            .then(() => {
              console.log(`${postImg} đã bị xoá`)
              deletePostInFirebase(postId)
            }).catch((e) => {
              console.log(e);
            })
          } else {
            deletePostInFirebase(postId)
          }
        }
      })
      .catch((error) => {
        alert(error);
      })
  }

  const deletePostInFirebase = (postId) => {
    const postRef = firebase.firestore().collection('SocialApp');
    postRef
    .doc(postId)
    .delete()
    .then(() => {
      Alert.alert("Đã xoá bài")
    }).catch((e) => {
      console.log(e);
    })

  }

  return (
    <Container>
    <FlatList
      data={data}
      renderItem={({ item }) => <PostCard item={item} onLike={onLike} onDelete={handleDelete} onPress={() => navigation.navigate('HomeProfile', {userId: item.userId})}/>}
      keyExtractor={(item) => item.id}
    />
    </Container>
  )
}
export default HomeScreen;