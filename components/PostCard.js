import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card, Container, Divider, Interaction, InteractionText, InteractionWrapper, PostImg, PostText, PostTime, UserImg, UserInfo, UserInfoText, UserName } from '../styles/FeedStyles';
import { AuthContext } from '../navigation/AuthProvider';
import { auth, firebase } from '../firebase';
import moment from 'moment/moment';
import { TouchableOpacity } from 'react-native';

const PostCard = ({item, onDelete, onPress, navigation, onLike}) => {
  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [onLikeClick, setOnLikeClick] = useState(false);
  let status = false;

    Time = moment(item.postTime).fromNow()

    if(item.likes.length == 1){
      likeText = '1 Thích';
    } else if (item.likes.length > 1){
      likeText = item.likes + ' Thích'
    } else {
      likeText = 'Thích';
    }

    if(item.comments == 1){
      commentsText = '1 Bình luận';
    } else if (item.likes > 1){
      commentsText = item.likes + ' Bình luận'
    } else {
      commentsText = 'Bình luận';
    }

    const getLikeStatus = (likes) => {
      likes.map(item => {
        if(item === auth.currentUser.uid){
          status = true;
        } else {
          status = false;
        }
      });
      return status;
    }

    const getUserData = () => {
      const userRef = firebase.firestore().collection('user');
      userRef
      .doc(item.userId)
      .get()
      .then((DocumentSnapshot) => {
        if( DocumentSnapshot.exists ) {
          console.log('User Data: ', DocumentSnapshot.data());
          setUserData(DocumentSnapshot.data());
        }
      })
    }

    useEffect(() => {
      getUserData();
    }, []);


  return (
    <Card key={item.id}>
    <UserInfo>
      <UserImg source={{uri: userData ? userData.userImg || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}}/>
      <UserInfoText>
        <TouchableOpacity onPress={onPress}>
          <UserName>{userData ? userData.name : ''}</UserName>
        </TouchableOpacity>
        <PostTime>{Time}</PostTime>
      </UserInfoText>
    </UserInfo>
    <PostText>{item.post}</PostText>
    {item.postImg != '' ? <PostImg source={{uri: `${item.postImg}`}} /> : <Divider />}

    <InteractionWrapper>
      {getLikeStatus(item.likes) ? (
        <>
        <Interaction onPress={() => onLike(item)}>
          <Ionicons name='heart' size={25} color='#2e64e5'/>
          <InteractionText>{likeText}</InteractionText>
        </Interaction>
        </>
      ) : (
        <>
        <Interaction onPress={() => onLike(item)}>
          <Ionicons name='heart-outline' size={25} color='#333'/>
          <InteractionText>{likeText}</InteractionText>
        </Interaction>
        </>
      )}
      
      <Interaction>
        <Ionicons name="chatbox-outline" size={25} />
        <InteractionText>{commentsText}</InteractionText>
      </Interaction>
      {user.uid == item.userId ?
      <Interaction onPress={() => onDelete(item.id)}>
        <Ionicons name="md-trash-bin" size={25} />
      </Interaction>
      : null}
    </InteractionWrapper>
  </Card>
  )
}

export default PostCard;