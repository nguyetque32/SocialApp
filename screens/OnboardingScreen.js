import React from 'react'
import { StyleSheet, Text, Image, View, TouchableOpacity, Button } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({navigation}) => {
  const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Bỏ qua</Text>
    </TouchableOpacity>
);

  const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Tiếp</Text>
    </TouchableOpacity>
);
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      onSkip = {() => navigation.replace("Login")}
      onDone = {() => navigation.replace("Login")}
      pages={[
        {
          backgroundColor: '#a6e4d0',
          image: <Image source={require('../assets/onboarding-img1.png')} />,
          title: 'Kết nối tới mọi người',
          subtitle: 'Một cách hoàn toàn mới để kết nối mọi người với nhau',
        },
        {
          backgroundColor: '#fdeb93',
          image: <Image source={require('../assets/onboarding-img2.png')} />,
          title: 'Chia sẻ khoản khắc',
          subtitle: 'Chia sẻ khoản khắc của bạn tới mọi người xung quanh',
        },
        {
          backgroundColor: '#e9bcbe',
          image: <Image source={require('../assets/onboarding-img3.png')} />,
          title: 'Trở nên nổi bật',
          subtitle: 'Hãy lan toả ánh sáng của bạn',
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});