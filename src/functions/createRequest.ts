import axios from 'axios';
import AWS from 'aws-sdk';
import {arrayBufferToBase64} from '../functions/arrayBufferToBase64';
import {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, KEY} from '@env';

type Language = {
  languageCode: string;
  name: string;
  ssmlGender: string;
};

export const googleRequest = async (text: string, voice: Language) => {
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

export const awsPollyRequest = async (Text: string, VoiceId: string) => {
  AWS.config.update({
    region: AWS_REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  });
  var polly = new AWS.Polly();
  const response = await polly
    .synthesizeSpeech({
      Engine: 'neural',
      OutputFormat: 'mp3',
      Text,
      VoiceId,
    })
    .promise();

  const audioBuffer = <Uint8Array>response.AudioStream;

  return arrayBufferToBase64(audioBuffer);
};
