import axios from 'axios';
import {KEY} from '@env';

export const createVoice = async () => {
  const response = await axios.get(
    `https://texttospeech.googleapis.com/v1/voices?key=${KEY}&languageCode=en-AU`,
  );
  const optionsArray = response.data.voices;
  const options = optionsArray.map((option) => {
    return {
      languageCode: option.languageCodes[0],
      name: option.name,
      ssmlGender: option.ssmlGender,
    };
  });
  return options;
};
