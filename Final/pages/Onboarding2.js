import React, { useState } from 'react';
import { Image, Text, StyleSheet, Pressable, TextInput, View, KeyboardAvoidingView } from 'react-native';

function OnBoarding2() {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [isValidEmail, setIsValidEmail] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
 

  const handleEmailChange = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(text)) {
      setEmail(text);
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }

  };
  const handlePress = () => {
    // Handle button press
    if ( isValidEmail) {
      // Valid inputs, do something here
      console.log("Name:", name);
      console.log("Email:", email);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.image} source={require("../assets/images/logo.jpg")} />
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
  onChangeText={text => setName(text)}

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
          onPress={handlePress}
          disabled={!isValidEmail}
        >
          <Text style={styles.text}>Next</Text>
        </Pressable>
      </View>
       
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    flex: 0.2,
    marginTop: 50
  },
  image: {
    flex: 1,
    height: 200,
    width: 200
  },
  keyboardContainer: {
    flex: 0.8,
  },
  body: {
    marginTop: 20,
    paddingTop: 20,
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'black',
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
    color: 'white',
    fontSize: 20,

  },
  input: {
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 30,
    height: 50,
    width: 200
  },
  buttonDisabled:{
    backgroundColor:'grey'
  },
  buttonEnabled:{
    backgroundColor:'black'
  }
})

export default OnBoarding2
