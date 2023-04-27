import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import OnBoarding2 from './pages/Onboarding2';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState,useEffect } from 'react';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function App() {
 
  const [isLoggedIn,setIsLoggedIn]=useState(false)
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const nameValue = await AsyncStorage.getItem('name');
        const emailValue = await AsyncStorage.getItem('email');
        if (nameValue !== null && emailValue!==null) {
          setName(nameValue)
          setEmail(emailValue)

          setIsLoggedIn(true)

        }

      } catch (e) {
        console.log(e);
      }
    };
    retrieveData();
  }, []);
  const Stack=createNativeStackNavigator()
  return ( 
    <NavigationContainer>  
      <Stack.Navigator> 
        {!isLoggedIn?
        <Stack.Screen
        name='onBoarding'
        component={OnBoarding2}
        options={{ title: 'OnBoarding2' }}
        initialParams={{ Name: name, Email: email }}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      /> :
        <Stack.Screen name='Home'>
         {(props) => <Home {...props} Name={name} Email={email} />}
        </Stack.Screen>      
}
      {/* <Stack.Screen name="Profile" component={Profile}/> */}
      </Stack.Navigator> 
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
