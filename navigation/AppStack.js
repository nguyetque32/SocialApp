import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import MessagesScreen from '../screens/MessagesScreen';
import AddPostScreen from '../screens/AddPostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ChatScreen from '../screens/ChatScreen';
import FindScreen from '../screens/FindScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MessageStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen name="Messages" component={MessagesScreen} 
    options={{
      headerTitle: "Tin nhắn",
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: '#2e64e5',
        fontSize: 18,
      },
      headerStyle: {
        shadowColor: '#fff',
        elevation: 0,
      },
    }}
    />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={({route}) => ({
        title: route.params.userName,
        headerBackTitleVisible: false,
      })}
    />
  </Stack.Navigator>
);

const HomeStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Trang chủ"
      component={HomeScreen}
      options={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#2e64e5',
          fontSize: 18,
        },
        headerStyle: {
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
    <Stack.Screen
      name="HomeProfile"
      component={ProfileScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />
  </Stack.Navigator>
);

const ProfileStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerTitle: "Trang cá nhân",
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#2e64e5',
          fontSize: 18,
        },
        headerStyle: {
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        title: 'Sửa thông tin',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        
      }}
    />
  </Stack.Navigator>
);

// const CustomTabBarButton = ({children})

const AppStack = () => {
  return (
    <Tab.Navigator 
      screenOptions={{
        tabBarActiveTintColor: "#2e64e5",
        tabBarShowLabel: false,
      }}
      >
        <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Find"
        component={FindScreen}
        options={{
          headerTitle: "Tìm kiếm",
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name="search-outline"
              color={color}
              size={size}
            />
          ),
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#2e64e5',
            fontSize: 18,
          },
          headerStyle: {
            shadowColor: '#fff',
            elevation: 0,
          },
        }}
      />
      <Tab.Screen
        name={"AddPost"}
        component={AddPostScreen}
        options={{
          headerTitle: "Đăng bài",
          tabBarIcon: ({focused}) => (
            <View style={styles.addPostBttn}>
              <Ionicons
                name="add-outline"
                size={30}
                color="#fff"
              />
            </View> 
          ),
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#2e64e5',
            fontSize: 18,
          },
          headerStyle: {
            shadowColor: '#fff',
            elevation: 0,
          },
        }}
      />
      <Tab.Screen
        name="Tin nhắn"
        component={MessageStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="chatbox-ellipses-outline" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Thông tin"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default AppStack;

const styles = StyleSheet.create({
  addPostBttn: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#2e64e5',
  }
})
