import axios from 'axios';
import {KEY} from '@env';

export const googleRequest = async (text, voice) => {
  const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${KEY}`;
  const response = await axios({
    method: 'post',
    url,
    headers: {'Content-Type': 'application/json'},
    data: {
      input: {
        text,
      },
      voice,
      audioConfig: {
        audioEncoding: 'MP3',
      },
    },
  });
  return response.data.audioContent;
};
