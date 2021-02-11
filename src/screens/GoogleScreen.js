import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';
import PhraseInput from '../components/PhraseInput';
import {googleRequest} from '../functions/createRequest';
import createAudioFile from '../functions/createAudioFile';
import playPhrase from '../functions/playPhrase';
import {createVoice} from '../functions/createOptions';
import DropDownPicker from 'react-native-dropdown-picker';

const GoogleScreen = ({navigation}) => {
  const [phrase, setPhrase] = useState('');
  const [options, setOptions] = useState([]);
  const [voice, setVoice] = useState({
    languageCode: 'en-gb',
    name: 'en-GB-Standard-A',
    ssmlGender: 'FEMALE',
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await createVoice();
      setOptions(response);
      setLoaded(true);
    };
    fetchData();
  }, []);

  const handlePhrase = async (phrase) => {
    const RNFS = require('react-native-fs');
    const path = RNFS.DocumentDirectoryPath + '/voice.mp3';
    console.log(path);
    const data = await googleRequest(phrase, voice);
    await createAudioFile(path, data);
    playPhrase(path);
    setPhrase('');
  };

  const createItems = () => {
    const items = options.map((option) => {
      return {
        label: option.name + '-' + option.ssmlGender,
        value: option,
      };
    });
    return items;
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

  return (
    <View>
      <PhraseInput
        handlePhrase={handlePhrase}
        phrase={phrase}
        onPhraseChange={(phrase) => setPhrase(phrase)}
      />
      {loaded && createDropDownPicker()}
    </View>
  );
};

const styles = StyleSheet.create({});

export default GoogleScreen;
