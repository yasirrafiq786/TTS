import React from 'react';
import {Text, View} from 'react-native';

const Information = ({title, details}) => {
  return (
    <View style={{margin: 10}}>
      <Text style={{fontSize: 32}}>{title}</Text>
      <Text style={{fontSize: 24}}>{details}</Text>
    </View>
  );
};

export default Information;
