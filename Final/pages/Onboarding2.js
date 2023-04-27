import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Image, Text, StyleSheet, Pressable, TextInput, View, KeyboardAvoidingView} from 'react-native';
import { useEffect } from 'react';

function OnBoarding2({isLoggedin,setIsLoggedIn}) {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [keyboardOpen, setKeyboardOpen] = useState(false);

    
    const handleNext=async (name1,email1)=>{
      try{

    await AsyncStorage.setItem('name', name1);
    await AsyncStorage.setItem('email', email1);
    // console.log("name is:",name1,"email is:",email1)

    setIsLoggedIn(true);
     } 

      catch(e){
        console.log(e)
      }

    }

   

 

  const handleEmailChange = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(text)) {
      setEmail(text);
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }

  };
  // const handlePress = () => {
  //   // Handle button press
  //   if ( isValidEmail) {
  //     // Valid inputs, do something here
  //     console.log("Name:", name);
  //     console.log("Email:", email);
  //   }
  // };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.image} source={require("../assets/images/Logo.png")} resizeMode='contain' />
      </View>
      <KeyboardAvoidingView behavior="padding" style={styles.keyboardContainer}>
        <View style={[styles.body, keyboardOpen && { marginBottom: 50 }]}>
          <Text style={styles.text2}>Let us Get to Know You!!!</Text>

          <TextInput
            style={styles.input}
            value={name}            
            placeholder='Enter Name'
            onFocus={() => setKeyboardOpen(true)}
            onBlur={() => setKeyboardOpen(false)}
            onChangeText={text => setName(text)
            } 


          />
          <TextInput
            style={styles.input}
            defaultValue={email} 
            onChangeText={handleEmailChange}
            placeholder='Enter Email'
            onFocus={() => setKeyboardOpen(true)}
            onBlur={() => setKeyboardOpen(false)}
            onChange={handleEmailChange}
          />
        </View>
        <View>
        <Pressable 
          style={[styles.button, (isValidEmail) ? styles.buttonEnabled : styles.buttonDisabled]} 
          onPress={()=>handleNext(name,email)}
          disabled={!isValidEmail}
        >
          <Text style={styles.text}>Next</Text>
        </Pressable>
      </View>
      {/* <Pressable onPress={()=>{
        console.log(name)
      }}><Text>Name</Text></Pressable> */}
       
      </KeyboardAvoidingView>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  header: {
    alignItems: 'center',
    flex: 0.2,

  },
  image: {
    flex: 1,

  },
  keyboardContainer: {
    flex: 0.8,
  },
  body: {
    marginTop: 20,
    paddingTop: 20,
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'gold',
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    minHeight: 300,
    paddingBottom: 20
  },
  button: {
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    width: 300,
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: 'black',
  },
  button2: {
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    width: 300,
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: 'grey',
  },
  text: {
    color: 'white',
    fontSize: 50,

  },
  text2: {
    color: 'grey',
    fontSize: 25,
    fontWeight:'bold'

  },
  input: {
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 30,
    height: 50,
    width: 200,
    color:'green'
  },
  buttonDisabled:{
    backgroundColor:'grey'
  },
  buttonEnabled:{
    backgroundColor:'gold'
  }
})

export default OnBoarding2
