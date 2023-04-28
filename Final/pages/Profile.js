import React from 'react'
import { useState,useEffect } from 'react';
import { StyleSheet,View,Image,Text, Pressable, TextInput, ScrollView} from 'react-native'
// import { Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import CheckBox from 'react-native-check-box'
import { CheckBox } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '@rneui/themed';


 
function Profile({Name,Email}) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false)
  const [checked1, setChecked1] = React.useState(true);
  const [checked2, setChecked2] = React.useState(true);
  const [checked3, setChecked3] = React.useState(true);
  const [checked4, setChecked4] = React.useState(true);
  const [image, setImage] = useState(null);


  const toggleCheckbox = () => setChecked1(!checked1);
  const toggleCheckbox2 = () => setChecked2(!checked2);
  const toggleCheckbox3= () => setChecked3(!checked3);
  const toggleCheckbox4 = () => setChecked4(!checked4);

  

  function isValidLebaneseNumber(number) {
    const numericNumber = number.replace(/\D/g, '');

    return /^(\+961)?(7\d{7})$/.test(numericNumber);
  }


  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    setIsValidPhoneNumber(isValidLebaneseNumber(value));
    console.log(isValidPhoneNumber)
  };


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
<ScrollView>  
<View style={styles.container}>    
    <View style={styles.header1}>
     <Pressable style={styles.arrow}><Icon name="arrow-left" size={30} color="white" /></Pressable>
     <Image style={styles.image} source={require("../assets/images/Logo.png")} resizeMode='contain' />
     {image && <Image source={{ uri: image }} style={{ height: 70,marginLeft:20,flex:0.4,width:100,borderRadius:10}} />}
    </View>

    <Text style={styles.title}>Personal Information</Text>


    <View style={styles.header}>
      {image && <Image source={{ uri: image }} style={{ height: 70,marginLeft:20,marginRight:20,flex:0.7,width:100,borderRadius:20}} />}
      <Button title="Change" onPress={pickImage} buttonStyle={styles.buttons}/>
      
      <Button title="Remove" buttonStyle={styles.buttons}/>

    </View>

    
    <View style={styles.form}>
      <Text>First Name:</Text>
      <TextInput style={styles.input}/>
      <Text>Last Name:</Text>
      <TextInput style={styles.input} />
      <Text>Email:</Text>
      <TextInput style={styles.input} keyboardType='email-address'/>
      <Text>Phone Number:</Text>
      <TextInput style={styles.input} keyboardType='phone-pad'  onChangeText={handlePhoneNumberChange} value={phoneNumber}/>

    </View>


    <View>
      <Text style={styles.title}>Email Notifications</Text>
    <View style={styles.checkbox1}> 
      <CheckBox
           checked={checked1}
           onPress={toggleCheckbox}
           // Use ThemeProvider to make change for all checkbox
           iconType="material-community"
           checkedIcon="checkbox-marked"
           uncheckedIcon="checkbox-blank-outline"
           checkedColor="lightgrey"
      />
      <Text style={styles.txt}>Order statuses</Text>       
    </View>  

    <View style={styles.checkbox1}> 
      <CheckBox
           checked={checked2}
           onPress={toggleCheckbox2}
           // Use ThemeProvider to make change for all checkbox
           iconType="material-community"
           checkedIcon="checkbox-marked"
           uncheckedIcon="checkbox-blank-outline"
           checkedColor="lightgrey"
      />
      <Text style={styles.txt}>Password Changes</Text>       
    </View>  

    <View style={styles.checkbox1}> 
      <CheckBox
           checked={checked3}
           onPress={toggleCheckbox3}
           // Use ThemeProvider to make change for all checkbox
           iconType="material-community"
           checkedIcon="checkbox-marked"
           uncheckedIcon="checkbox-blank-outline"
           checkedColor="lightgrey"
      />
      <Text style={styles.txt}>Special Offers</Text>       
    </View>  


    <View style={styles.checkbox1}> 
      <CheckBox
           checked={checked4}
           onPress={toggleCheckbox4}
           // Use ThemeProvider to make change for all checkbox
           iconType="material-community"
           checkedIcon="checkbox-marked"
           uncheckedIcon="checkbox-blank-outline"
           checkedColor="lightgrey"
      />
      <Text style={styles.txt}>Newsletter</Text>       
    </View>  
   
    </View>

    <Pressable style={styles.logOut}><Text style={styles.txt2}>Log Out</Text></Pressable>

    <View style={styles.final}> 
      
    <Pressable style={styles.discard}><Text style={styles.txt3}>Discard Changes</Text></Pressable>

    <Pressable style={styles.save}><Text  style={styles.txt4}>Save Changes</Text></Pressable>
    
    
    </View>

   



  
    </View>
</ScrollView>  

  )
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'

  },

  header1: {
        marginTop:20,
        alignItems: 'center',
        display:'flex',
        height:80,
        flexDirection:'row'
    
      },
      header: {
        alignItems: 'center',
        display:'flex',
        height:80,
        flexDirection:'row'
    
      },
      arrow: {
        backgroundColor:'lightgrey',
        marginLeft:20,
        flex: 0.1,
        borderRadius:40,
        padding:7,
        marginRight:20
        
    
      },
  image: {
        flex: 0.3,
        width:150,
        marginRight:20
    
      },
  image2: {
        flex: 0.2,
        width:10,
        marginRight:-100
    
      },
  image3: {
        marginLeft:20,
        flex:0.6,
        width:50,
    
      },
  title:{
    fontSize:20,
    marginLeft:10,
    color:'grey',
    fontWeight:'bold',
    marginBottom:10
  }   ,
  buttons:{
    marginLeft:30,
    marginRight:10,
    borderRadius:15,
    padding:10,
    fontWeight:'bold',
    color:'white',
    backgroundColor:'lightgrey'
  },
  form:{
    display:'flex',
    padding:20
  },
  input:{
    marginBottom:10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    paddingHorizontal: 20,
    borderRadius: 5
  },
  checkbox1:{
    display:'flex',
    flexDirection:'row'
  },
  txt:{
    marginTop:16
  },
  txt2:{
    fontWeight:'bold',
    fontSize:20
  },
  txt3:{
    fontSize:15
  },
  txt4:{
    fontSize:15,
    color:'white'
  },
  logOut:{
    backgroundColor:'gold',
    alignItems:'center',
    padding:10,
    borderRadius:20,
    margin:10
  },
  final:{ 
    textAlign:'center',
    display:'flex',
    flexDirection:'row'
  },


  save:{
    backgroundColor:'grey',
    padding:10,
    borderRadius:10,
    margin:10,
  },

  discard:{
    padding:10,
    borderRadius:10,
    margin:10,
    marginLeft:40,
    borderWidth:2,
    borderColor:'grey'
  },

})
export default Profile