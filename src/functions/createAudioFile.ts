import RNFS from 'react-native-fs';

const createFile = async (path: string, data: string) => {
  await RNFS.writeFile(path, data, 'base64');
};

export default createFile;
