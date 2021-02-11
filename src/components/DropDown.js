import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import DropDown from 'react-native-dropdown-picker';

const DropDownPicker = ({options}) => {
  const createItems = () => {
    const items = options.map((option) => {
      return {
        label: option.name + '-' + option.ssmlGender,
        value: option.languageCode,
      };
    });
    return items;
  };

  return (
    <DropDownPicker
      containerStyle={{height: 50, width: 300, padding: 10}}
      style={{backgroundColor: '#fafafa'}}
      items={createItems()}
      dropDownMaxHeight={1500}
      dropDownStyle={{marginTop: 10, overflow: 'scroll'}}
    />
  );
};

const styles = StyleSheet.create({
  container: {height: 40, backgroundColor: '#fafafa'},
});

export default DropDown;
