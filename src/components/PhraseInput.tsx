import React, {FC} from 'react';
import {TextInput, View, Text, StyleSheet} from 'react-native';

interface PhraseInputProps {
  handlePhrase(arg0: string): void;
  phrase: string;
  onPhraseChange(arg0: string): void;
}

const PhraseInput = ({
  handlePhrase,
  phrase,
  onPhraseChange,
}: PhraseInputProps) => (
  <TextInput
    style={styles.container}
    clearButtonMode="always"
    placeholder="write something..."
    multiline={true}
    value={phrase}
    onChangeText={onPhraseChange}
    onSubmitEditing={() => {
      handlePhrase(phrase);
    }}
  />
);

const styles = StyleSheet.create({
  container: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    fontSize: 24,
  },
});

export default PhraseInput;
