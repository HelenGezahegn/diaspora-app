import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { auth } from '../api/firebase';
import Home from '../components/Home';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* <Text>Welcome to Diaspora app</Text>

      <TouchableOpacity
        style={{ marginVertical: 50 }}
        onPress={() => auth().signOut()}
      >
        <Text>Sign Out</Text>
      </TouchableOpacity> */}
      <Home />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
