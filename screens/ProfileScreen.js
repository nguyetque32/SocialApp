import { SafeAreaView, ScrollView, Alert, StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native'
import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import PostCard from '../components/PostCard';
import { auth, firebase } from '../firebase';
import 'firebase/firestore';
import { Container } from '../styles/FeedStyles';

const ProfileScreen = ({navigation, route}) => {
  const {user, logout} = useContext(AuthContext);
  const db = firebase.firestore();
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getData = () => {
    // Đăng ký lắng nghe sự thay đổi của dữ liệu trên Cloud Firestore
    const unsubscribe = db.collection('SocialApp').where('userId', '==' ,route.params ? route.params.userId : user.uid).orderBy('postTime', 'desc').onSnapshot(snapshot => {
      const updatedData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(updatedData);
    });

    // Hủy đăng ký lắng nghe khi component bị unmount
    return () => unsubscribe();
  }

  const getUserData = () => {
    const userRef = firebase.firestore().collection('user');
    userRef
    .doc(route.params ? route.params.userId : user.uid)
    .get()
    .then((DocumentSnapshot) => {
      if( DocumentSnapshot.exists ) {
        setUserData(DocumentSnapshot.data());
      }
    })
  }

  useEffect(() => {
    getData();
    getUserData();
    navigation.addListener("focus", () => setLoading(!loading));
  }, [navigation, loading]);

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
    <SafeAreaView style={{flex:1, backgroundColor: '#fff'}}>
      <Container>
      <ScrollView 
      style={styles.container}
      contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
      showVerticalScrollIndicator={false}
      >
        <Image style={styles.userImg} source={{uri: userData ? userData.userImg || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}} />
        <Text style={styles.userName}>{ userData ? userData.name : ''}</Text>
        <Text style={styles.aboutUser}>{ userData ? userData.about || '' : ''}</Text>
        <View style={styles.userBtnWrapper}>
          {route.params && route.params.userId != user.uid ? (
            <>
            <TouchableOpacity style={styles.userBtn} onPress={() => navigation.navigate('Chat', {userName: userData ? userData.name : ''})}>
              <Text style={styles.userBtnTxt}>Tin nhắn</Text>
            </TouchableOpacity>
            </>
          ):(
            <>
            <TouchableOpacity style={styles.userBtn} onPress={() => navigation.navigate('EditProfile')}>
              <Text style={styles.userBtnTxt}>Chỉnh sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.userBtn} onPress={() => logout()}>
              <Text style={styles.userBtnTxt}>Đăng xuất</Text>
            </TouchableOpacity>
            </>
          )} 
        </View>

        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{data.length}</Text>
            <Text style={styles.userInfoSubTitle}>Bài viết</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>10,000</Text>
            <Text style={styles.userInfoSubTitle}>Người theo dõi</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>100</Text>
            <Text style={styles.userInfoSubTitle}>Đang theo dõi</Text>
          </View>
        </View>

        {data.map((item) => (
          <PostCard key={item.id} item={item} onDelete={handleDelete} />
        ))}
      </ScrollView>
      </Container>
    </SafeAreaView>
  )
}
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    width: 400,
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#2e64e5',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});