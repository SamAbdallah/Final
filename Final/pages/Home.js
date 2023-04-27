import React from 'react'
import { Text } from 'react-native'

function Home({Name,Email}) {
  console.log(Name)
  return (
    <Text>Name is:{Name}</Text>
  )
}

export default Home