import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View, Button, Alert } from 'react-native'
import { auth } from '../firebase';
import { AuthContext } from '../navigation/AuthProvider';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { firebase } from '../firebase';


const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const {register} = useContext(AuthContext);
  const [name, setName] = useState();

  return (
    <View style={styles.container}>

      <Text style={styles.text}>Tạo tài khoản</Text>

      <FormInput
        labelValue={name}
        onChangeText={(userName) => setName(userName)}
        placeHolderText="Nhập tên"
        iconType="user"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeHolderText="Nhập Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeHolderText="nhập Password"
        iconType="lock"
        secureTextEntry={true}
      />

      {/* <FormInput
        labelValue={confirmPassword}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeHolderText="xác nhận lại Password"
        iconType="lock"
        secureTextEntry={true}
      /> */}

      <FormButton 
        buttonTitle="Đăng kí"
        onPress={() => register(name, email, password)}
      />

        <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
            Bằng cách đăng ký, bạn xác nhận rằng bạn chấp nhận{' '}
        </Text>
        <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
          <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
          Điều khoản dịch vụ
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> và </Text>
        <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
         Chính sách bảo mật
        </Text>
      </View>

      <TouchableOpacity 
        style={styles.navButton} 
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>
          Đã có tài khoản? Đăng nhập
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      text: {
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
      },
      navButton: {
        marginTop: 15,
      },
      navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
      },
      textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 35,
        justifyContent: 'center',
      },
      color_textPrivate: {
        fontSize: 13,
        fontWeight: '400',
        color: 'grey',
      },
});
