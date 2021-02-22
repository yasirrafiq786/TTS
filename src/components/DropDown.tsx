import React from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {StyleSheet} from 'react-native';
import DropDown from 'react-native-dropdown-picker';

type ItemType = {
  label: any; // required
  value: any; // required
  icon?: () => JSX.Element;
  hidden?: boolean;
  untouchable?: boolean;
  parent?: any;
  disabled?: boolean;
  selected?: boolean;
  viewStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

type OptionType = {
  name: string;
  ssmlGender: string;
  languageCode: string;
};

type DropDownPickerProps = {
  options: [];
};

const DropDownPicker = ({options}: DropDownPickerProps) => {
  const items = options.map(
    (option: OptionType): ItemType => {
      return {
        label: option.name + '-' + option.ssmlGender,
        value: option.languageCode,
      };
    },
  );

  return (
    <DropDown
      containerStyle={{height: 50, width: 300, padding: 10}}
      style={{backgroundColor: '#fafafa'}}
      items={items}
      dropDownMaxHeight={1500}
      dropDownStyle={{marginTop: 10, overflow: 'scroll'}}
    />
  );
};

const styles = StyleSheet.create({
  container: {height: 40, backgroundColor: '#fafafa'},
});

export default DropDown;
