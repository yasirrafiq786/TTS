import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import PhraseInput from '../components/PhraseInput';
import {googleRequest} from '../functions/createRequest';
import createAudioFile from '../functions/createAudioFile';
import playPhrase from '../functions/playPhrase';

const GoogleScreen = ({navigation}) => {
  const [phrase, setPhrase] = useState('');

  const handlePhrase = async (phrase) => {
    const RNFS = require('react-native-fs');
    const path = RNFS.DocumentDirectoryPath + '/voice.mp3';
    console.log(path);
    const data = await googleRequest(phrase);
    await createAudioFile(path, data);
    playPhrase(path);
    setPhrase('');
  };

  return (
    <>
      <PhraseInput
        handlePhrase={handlePhrase}
        phrase={phrase}
        onPhraseChange={(phrase) => setPhrase(phrase)}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default GoogleScreen;
