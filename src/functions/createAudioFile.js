const createFile = async (path, data) => {
  const RNFS = require('react-native-fs');
  return await RNFS.writeFile(path, data, 'base64');
};

export default createFile;
