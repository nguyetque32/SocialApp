import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorageStatic from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import LoginSceen from '../screens/LoginScreen';
import OnboardingScreen from '../screens/OnboardingScreen'
import SignupScreen from '../screens/SignupScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorageStatic.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorageStatic.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if(isFirstLaunch === null){
    return null;
  } else if( isFirstLaunch == true ) {
      routeName = 'Onboarding'
  } else {
    routeName = 'Login';
  }
  
  return (
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Login"
        component={LoginSceen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={({navigation}) => ({
          title: '',
          headerStyle:{
            backgroundColor:"#f9fafd",
            shadowColor: "#f9fafd",
            elevation: 0,
          },
          headerLeft: () => (
            <View >
              <FontAwesome.Button 
                name='long-arrow-left'
                size={25}
                backgroundColor="#f9fafd"
                color="#333"
                onPress={() => navigation.navigate("Login")}
              />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;