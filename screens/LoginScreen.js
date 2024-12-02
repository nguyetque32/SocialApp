import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View, Button, Alert } from 'react-native'
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { auth } from '../firebase';
import { AuthContext } from '../navigation/AuthProvider';



const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const {login} = useContext(AuthContext);
  return (
    <View style={styles.container}>

      <Image 
        source={require('../assets/favicon.png')} 
        style={styles.logo} 
      />
      <Text style={styles.text}>Social App</Text>

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

      <FormButton 
        buttonTitle="Đăng nhập"
        onPress={() => login(email, password)}
      />

      <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>Quên mật khẩu?</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.forgotButton} 
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.navButtonText}>
          Không có tài khoản? Tạo tài khoản
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
  },
});