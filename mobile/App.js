import React,{useState} from 'react';

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';
import{ globalStyles} from './Pages/styles/global';




// Flat List
export default function Home({ navigation}) {

  // array of objects, need key for flat lists
  const [reviews, setReviews] = useState([
    {title: 'Log 1', rating: 5, body: 'lorem ipsum', key: '1'},
    {title: 'Log 2', rating: 4, body: 'lorem ipsum', key: '2'},
    {title: 'Log 3', rating: 3, body: 'lorem ipsum', key: '3'},
  ]);

return(
  <View style={globalStyles.container}>
  <FlatList
  data={reviews}
  renderItem={({item}) => (
    <TouchableOpacity onPress={() => navigation.navigate('ReviewDetails', item)}>
  <Text style={globalStyles.titleText}>{ item.title}</Text>
  </TouchableOpacity>
)}
  />
  </View>
)
  }

