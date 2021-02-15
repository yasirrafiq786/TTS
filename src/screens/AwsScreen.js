import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import PhraseInput from '../components/PhraseInput';
import {awsPollyRequest} from '../functions/createRequest';
import playPhrase from '../functions/playPhrase';
import createAudioFile from '../functions/createAudioFile';
import {createPollyVoices} from '../functions/createOptions';
import DropDownPicker from 'react-native-dropdown-picker';

const AwsScreen = () => {
  const [phrase, setPhrase] = useState('');
  const [options, setOptions] = useState([]);
  const [voice, setVoice] = useState('Kevin');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await createPollyVoices();
      setOptions(response);
      setLoaded(true);
      console.log(response);
    };
    fetchData();
  }, []);

  const handlePhrase = async (phrase) => {
    const RNFS = require('react-native-fs');
    const path = RNFS.DocumentDirectoryPath + '/voice.mp3';
    const startTime = Date.now();
    const data = await awsPollyRequest(phrase, voice);
    createAudioFile(path, data);
    playPhrase(path);
    const endTime = Date.now();
    setPhrase('');
  };

  const createDropDownPicker = () => {
    return (
      <DropDownPicker
        dropDownMaxHeight={1000}
        items={createItems()}
        style={{backgroundColor: '#fafafa'}}
        containerStyle={{height: 50, width: 300, margin: 10}}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownStyle={{backgroundColor: '#fafafa'}}
        onChangeItem={(item) => setVoice(item.value)}
      />
    );
  };

  const createItems = () => {
    const items = options.map((option) => {
      return {
        label: option.Name + '-' + option.Gender + '-' + option.LanguageName,
        value: option.Id,
      };
    });
    return items;
  };

  return (
    <>
      <PhraseInput
        phrase={phrase}
        onPhraseChange={(phrase) => setPhrase(phrase)}
        handlePhrase={handlePhrase}
      />
      {(loaded && createDropDownPicker()) || <Text>Loading Options</Text>}
    </>
  );
};

export default AwsScreen;
