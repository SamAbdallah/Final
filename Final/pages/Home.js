import React from 'react'
import { Text, StyleSheet, View, Image,ScrollView } from 'react-native'
import { useEffect, useState } from 'react'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from '@rneui/themed';


function Home({ Name, Email }) {
  const [image, setImage] = useState('')
  const [data, setData] = useState([]);

  
useEffect(() => {
   fetch('https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/greekSalad.jpg?raw=true')
  .then((response) => response.json())
  .then((data) => {
  setData(data);
   });
   }, []);

   console.log(data)

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const IMAGE = await AsyncStorage.getItem('image');
        if (IMAGE !== null) {
          setImage(IMAGE)
        }
      } catch (e) {
        console.log(e);
      }
    };
    retrieveData();
  }, []);

  return ( 
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.image} source={require("../assets/images/Logo.png")} resizeMode='contain' />
        {image ?
          <Image source={{ uri: image }} style={{ height: 100, marginLeft: 20, width: 50, borderRadius: 10,flex:0.4 }} />
          :
          <View style={styles.dummy}><Text>{Name[0]}{Name[1]}</Text></View>
        } 
      </View>  

 <View style={styles.intro}>
  <Text style={styles.title}>Little Lemon</Text> 
  <Text style={styles.location}>Chicago</Text>

  <View style={styles.data}>
    <Text style={styles.paragraph}>We are a family owned mediterranean restaurant,focused  on traditional recipes served with a modern twist</Text>
    <Image style={styles.image2} source={require("../assets/images/Grilledfish.png")} resizeMode='contain' />
  </View>

  <Icon name="search" size={30} color="black" />
 </View>
 <Text style={styles.Order}>Order For Delivery!</Text>

 <View style={styles.categroy}>
  <Button title="Starters" buttonStyle={styles.buttons} titleStyle={{ color: 'black' }}/>
  <Button title="Main"     buttonStyle={styles.buttons} titleStyle={{ color: 'black' }}/>
  <Button title="Desserts" buttonStyle={styles.buttons} titleStyle={{ color: 'black' }}/>
  <Button title="Drinks"   buttonStyle={styles.buttons} titleStyle={{ color: 'black' }}/>
 </View>

 <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey',margin:10 }} />



</View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flex: 0.2,
    marginBottom:20,
    marginTop:20,
  },
  image: {
    flex: 0.5,
    width: 150,
    marginLeft:50,
    marginRight:30
  },
  image2: {
    flex: 0.4,
    borderRadius:10,
    width:100,
    height:180 
  },
  dummy: {
    backgroundColor: 'gold',
    borderRadius: 20,
    height: 50,
    padding: 10,
    alignItems: 'center'
  },
  intro: {
    flex:0.5,
    display:'flex',
    backgroundColor: 'darkcyan',
    padding: 20,
    display: 'flex',
  },
  title:{
    color:'gold',
    fontSize:40,
    fontWeight:'bold'
  },
  location:{
    marginBottom:30,
    color:'white',
    fontSize:30,
    fontWeight:'bold'
  },
  paragraph:{
    marginTop:10,
    color:'white',
    fontSize:20,
    fontWeight:'bold',
    flex: 0.6,
    marginRight:10,

  },
  data:{
    display:'flex',
    flexDirection:'row',
    flex: 1
  },
  Order:{
    fontWeight:'bold',
    margin:20,
    fontSize:30
  },
  categroy:{
    display:'flex',
    flexDirection:'row',
    flex:0.3
  },
  buttons:{
    backgroundColor:'grey',
    margin:10,
    borderRadius:20,
  }


})

export default Home;
