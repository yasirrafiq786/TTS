const playPhrase = (phraseAudio) => {
  const Sound = require('react-native-sound');
  const speech = new Sound(phraseAudio, '', (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    speech.play((success) => {
      if (success) {
        console.log('Successfully finished playing');
      } else {
        console.log('playback failed');
      }
    });
    return null;
  });
};

export default playPhrase;
