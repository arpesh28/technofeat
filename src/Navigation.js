import React, {useContext, useState} from 'react';
import {Image, TouchableOpacity,View, ActivityIndicator, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';

//  navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//  Screens
import SplashScreen from './screens/SplashScreen';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import NotificationScreen from './screens/NotificationScreen';
import PhotoScreen from './screens/PhotoScreen';
import TextScreen from './screens/TextScreen';
import CalculatorScreen from './screens/CalculatorScreen';

//  Icons
import notificationActive from './images/notification-active.png';
import photoActive from './images/photo-Active.png';
import calculatorActive from './images/calculator-Active.png';
import textActive from './images/text-Active.png';
import notificationInActive from './images/notification-inactive.png';
import photoInActive from './images/photo-InActive.png';
import calculatorInActive from './images/calculator-Inactive.png';
import textInActive from './images/text-InActive.png';
import logoutIcon from './images/logout.png';

//  navigation initializers
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabRoutes() {
  const {user, logout} = useContext(AuthContext);
  const [loader, setLoader] = useState(false);

  const renderlogout = props => (
    <TouchableOpacity
      onPress={async () => {
        setLoader(true);
        await logout();
        setTimeout(() => {
          setLoader(false);
        }, 1000);
      }}
      style={[{paddingHorizontal: 20, paddingVertical: 10}]}>
      <Text style={[{color: '#f25c05', fontWeight: '800', fontSize: 20}]}>
        Logout
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      {loader && (
        <View
          style={{
            position: 'absolute',
            alignSelf: 'center',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.2)',
            zIndex:22
          }}>
          <ActivityIndicator size="large" color="#6C63FF" />
        </View>
      )}
      <Tab.Navigator
      
        screenOptions={({route}) => ({
          tabBarActiveTintColor: '#6C63FF',
          tabBarInactiveTintColor: '#9e9e9e',
          tabBarInactiveBackgroundColor: '#fff',
          tabBarActiveBackgroundColor: '#fff',
          tabBarShowLabel: true,
          tabBarStyle: [
            {
              display: 'flex',
            },
            null,
          ],
          tabBarIcon: ({focused, color}) => {
            let iconName;
            if (route.name === 'NOTIFICATIONSCREEN') {
              iconName = focused ? notificationActive : notificationInActive;
            } else if (route.name === 'PHOTOSCREEN') {
              iconName = focused ? photoActive : photoInActive;
            } else if (route.name === 'TEXTSCREEN') {
              iconName = focused ? textActive : textInActive;
            } else if (route.name === 'CALCULATORSCREEN') {
              iconName = focused ? calculatorActive : calculatorInActive;
            }
            return (
              <Image
                source={iconName}
                style={{width: 24, height: 24}}
                resizeMode="contain"
              />
            );
          },
        })}
        initialRouteName="NOTIFICATIONSCREEN">
        <Tab.Screen
          name="NOTIFICATIONSCREEN"
          component={NotificationScreen}
          options={{
            title: 'Notification',
            headerRight: props => renderlogout(props),
          }}
        />
        <Tab.Screen
          name="PHOTOSCREEN"
          component={PhotoScreen}
          options={{
            title: 'Photo',
            headerRight: props => renderlogout(props),
          }}
        />
        <Tab.Screen
          name="TEXTSCREEN"
          component={TextScreen}
          options={{
            title: 'Text',
            headerRight: props => renderlogout(props),
          }}
        />
        <Tab.Screen
          name="CALCULATORSCREEN"
          component={CalculatorScreen}
          options={{
            title: 'Calculator',
            headerRight: props => renderlogout(props),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SPLASHSCREEN"
        screenOptions={({route}) => ({
          headerShown: false,
        })}>
        <Stack.Screen name="SPLASHSCREEN" component={SplashScreen} />
        <Stack.Screen name="MAINAPP" component={TabRoutes} />
        <Stack.Screen name="SIGNUP" component={SignUp} />
        <Stack.Screen name="SIGNIN" component={SignIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
