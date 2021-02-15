import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';
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
  const [time, setTime] = useState(0);

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
    const startTime = Date.now();
    const data = await googleRequest(phrase, voice);
    await createAudioFile(path, data);
    playPhrase(path);
    const endTime = Date.now();
    setTime(endTime - startTime);
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
      {(loaded && createDropDownPicker()) || <Text>Loading Options</Text>}
      {time > 0 && (
        <Text style={{margin: 10, fontSize: 24}}>
          This took {time} ms to play.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default GoogleScreen;
