import axios from 'axios';
import AWS from 'aws-sdk';
import {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, KEY} from '@env';

export interface OptionProps {
  languageCodes: [string];
  name: string;
  ssmlGender: string;
}

export const createVoice = async () => {
  const response = await axios.get(
    `https://texttospeech.googleapis.com/v1/voices?key=${KEY}&languageCode=en-AU`,
  );

  const optionsArray = response.data.voices;
  const options = optionsArray.map((option: OptionProps) => {
    return {
      languageCode: option.languageCodes[0],
      name: option.name,
      ssmlGender: option.ssmlGender,
    };
  });
  return options;
};

export const createPollyVoices = async () => {
  // const extractEnglishLanguageVoices = (arrayOfVoices: any[]) => {
  //   const englishVoices = arrayOfVoices.filter(
  //     (voice: {LanguageName: string}) => voice.LanguageName.includes('English'),
  //   );
  //   return englishVoices;
  // };

  AWS.config.update({
    region: AWS_REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  });
  var polly = new AWS.Polly();
  const response = await polly.describeVoices({}).promise();
  if (!response.Voices) {
    throw new Error('No voices');
  }
  const childrenVoices = response.Voices.filter(
    (voice) => voice.Name && ['Justin', 'Kevin', 'Ivy'].includes(voice.Name),
  );
  return childrenVoices;
};
