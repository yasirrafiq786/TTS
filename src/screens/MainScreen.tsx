import React from 'react';
import {Text, StyleSheet, Button} from 'react-native';
import {NavigationStackScreenProps} from 'react-navigation-stack';

const MainScreen = ({navigation}: NavigationStackScreenProps) => {
  return (
    <>
      <Text></Text>
      <Button title="Google" onPress={() => navigation.navigate('Google')} />
      <Button title="AWS Polly" onPress={() => navigation.navigate('Aws')} />
    </>
  );
};

const styles = StyleSheet.create({});

export default MainScreen;
