import axios from 'axios';
import AWS from 'aws-sdk';
import {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, KEY} from '@env';
import createAudioFile from '../functions/createAudioFile';
import playPhrase from '../functions/playPhrase';

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

export const awsPollyRequest = async (Text, VoiceId) => {
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

  const ToBase64 = (u8) => {
    return btoa(String.fromCharCode.apply(null, u8));
  };
  return ToBase64(response.AudioStream);
};
