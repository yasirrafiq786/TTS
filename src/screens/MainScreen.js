import React from 'react';
import { Text, StyleSheet, Button } from 'react-native';
import { KEY } from '@env';

const MainScreen = ({ navigation }) => {
  return (
    <>
      <Text></Text>
      <Button title="Google" onPress={() => navigation.navigate('Google')} />
    </>
  );
};

const styles = StyleSheet.create({});

export default MainScreen;
