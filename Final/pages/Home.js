import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image, FlatList, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from '@rneui/themed';
import * as SQLite from 'expo-sqlite';
import { openDatabase } from 'expo-sqlite';

function Home({ Name, Email }) {
  const [image, setImage] = useState('');
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);


  const dbName = 'Lemon';

  const db = SQLite.openDatabase(dbName);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists menu (id  INTEGER PRIMARY KEY AUTOINCREMENT, description text, name text,category text,price integer)',
        [],
        () => {
          console.log('Table created');
        },
        (error) => {
          console.error(error);
        }
      );
    });
  }, []);



  const createTableAndInsertItems = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS menu (name TEXT, description TEXT, id INTEGER PRIMARY KEY AUTOINCREMENT, price REAL, category TEXT)',
        [],
        () => {
          console.log('Table created');
        },
        (error) => {
          console.error(error);
        }
      ); 
  
      tx.executeSql(
        'DELETE FROM menu',
        [],
        () => { 
          data.map((item) => {
            tx.executeSql(
              'INSERT INTO menu (name, description, id, price, category) VALUES (?, ?, ?, ?, ?)',
              [item.name, item.description, item.id, item.price, item.category],
              () => {
                console.log(`${item.name} inserted`);
              },
              (error) => {
                console.error(error);
              }
            );
          });
        },
        (error) => {
          console.error(error);
        }
      );
    });
  };
  

  useEffect(() => {
    createTableAndInsertItems();
  }, []);



  

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM menu',
        [],
        (_, { rows }) => {
          console.log('Retrieved data:', rows._array);
          setData(rows._array)
        },
        (error) => {
          console.error('Error while retrieving data:', error);
        }
      );
    });
  }, []);




 

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json')
      .then((response) => response.json())
      .then((data) => {
        setData(data.menu);
      });
  }, []);
  useEffect(() => { 
    const retrieveData = async () => {
      try {
        const IMAGE = await AsyncStorage.getItem('image');
        if (IMAGE !== null) {
          setImage(IMAGE);
        }
      } catch (e) {
        console.log(e);
      }
    };
    retrieveData();
  }, []);




  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.image} source={require('../assets/images/Logo.png')} resizeMode="contain" />
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ height: 100, marginLeft: 20, width: 50, borderRadius: 10, flex: 0.4 }}
          />
        ) : (
          <View style={styles.dummy}>
            <Text>
              {Name[0]}
              {Name[1]}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.intro}>
        <Text style={styles.title}>Little Lemon</Text>
        <Text style={styles.location}>Chicago</Text>

        <View style={styles.data}>
          <Text style={styles.paragraph}>
            We are a family owned mediterranean restaurant,focused on traditional recipes served with a modern twist
          </Text>
          <Image style={styles.image3} source={require('../assets/images/Pasta.png')} resizeMode="contain" />
        </View>
 
        <Icon name="search" size={30} color="black" />
      </View>
      <Text style={styles.Order}>Order For Delivery!</Text>

      <View style={styles.categroy}>        
        <Button title="All" buttonStyle={styles.buttons} titleStyle={{ color: 'black' }}       onPress={() => setSelectedCategory('All')}/>

        <Button title="starters" buttonStyle={styles.buttons} titleStyle={{ color: 'black' }}  onPress={() => setSelectedCategory('starters')} />
        <Button title="mains" buttonStyle={styles.buttons} titleStyle={{ color: 'black' }}     onPress={() => setSelectedCategory('mains')}/>
        <Button title="desserts" buttonStyle={styles.buttons} titleStyle={{ color: 'black' }}  onPress={() => setSelectedCategory('desserts')}/>
      </View>

      <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey', margin: 10 }} />
      {selectedCategory=='All'?
       <FlatList
        style={styles.list}    
        data={data} 
        renderItem={({ item }) => (
          <View style={styles.ItemContainer}>
            <View style={styles.desc}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description1}>{item.description}</Text>
            <Text style={styles.price}>$ {item.price}</Text>
            </View>
            <Image source={require("../assets/images/Bruschetta.png")} style={styles.image2}/>

          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
      />
      
      :

      <FlatList
        data={data.filter(item => item.category === selectedCategory)}
        renderItem={({ item }) => (
        <View style={styles.ItemContainer}>
        <View style={styles.desc}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description1}>{item.description}</Text>
        <Text style={styles.price}>$ {item.price}</Text>
        </View>
        <Image source={require("../assets/images/Bruschetta.png")} style={styles.image2}/>

        </View>
  )}
  keyExtractor={(item, index) => index.toString()}
  contentContainerStyle={{ flexGrow: 1 }}

/>
      
      
      
      
      }
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  name:{
    fontSize:15,
    fontWeight:'bold'

  },
  description1:{
    marginTop:5,
    color:'grey'

  },
  header: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flex: 0.2,
    marginBottom:20,
    marginTop:30,
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
    height:130 ,
    marginTop:-20,
    marginLeft:30
  },
  image3: {
    flex: 0.4,
    borderRadius:10,
    height:90 ,
    marginTop:-20,
    marginLeft:30
  },
  price:{
    marginTop:10,
    fontWeight:'bold',
  },
  dummy: {
    backgroundColor: 'gold',
    borderRadius: 20,
    height: 50,
    padding: 10,
    alignItems: 'center'
  },
  intro: {
    marginTop:20,
    flex:0.5,
    height:280,
    display:'flex',
    backgroundColor: 'darkcyan',
    padding: 10,
    display: 'flex',
  },
  title:{
    color:'gold',
    fontSize:30,
    fontWeight:'bold'
  },
  location:{
    marginBottom:10,
    color:'white',
    fontSize:25,
    fontWeight:'bold'
  },
  paragraph:{
    color:'white',
    fontSize:18,
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
  },
  list:{
    flex:0.1
  },
  ItemContainer:{
    padding:10,
    marginBottom:20,
    display:'flex',
    flexDirection:'row'
  },
  desc:{
    flex:0.7
  }


})

export default Home
