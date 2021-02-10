import axios from 'axios';
import {KEY} from '@env';

export const googleRequest = async (text) => {
  const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${KEY}`;
  const response = await axios({
    method: 'post',
    url,
    headers: {'Content-Type': 'application/json'},
    data: {
      input: {
        text,
      },
      voice: {
        languageCode: 'en-gb',
        name: 'en-GB-Standard-A',
        ssmlGender: 'FEMALE',
      },
      audioConfig: {
        audioEncoding: 'MP3',
      },
    },
  });
  return response.data.audioContent;
};
