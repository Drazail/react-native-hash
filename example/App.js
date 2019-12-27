/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {Text, PermissionsAndroid, Button} from 'react-native';

import RNHash from 'react-native-hash';

async function requestPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'RNHash READ_EXTERNAL_STORAGE Permission',
        message:
          'RNHash needs READ_EXTERNAL_STORAGE permision to hash local files ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Hash away!');
    } else {
      console.log('YOU SHALL NOT HASH!');
    }
  } catch (err) {
    console.warn(err);
  }
}

const App: () => React$Node = () => {
  requestPermission();
  const [urlHash, setUrlHash] = useState('NA');
  const [fileHash, setFileHash] = useState('NA');
  const [stringlHash, setStringHash] = useState('NA');
  return (
    <>
      <Button
        title="press to hash URL"
        onPress={() =>
          RNHash.hashUrl(
            'https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.doc',
            'md5',
          )
            .then(b => setUrlHash(b))
            .catch(er => console.log(er))
        }>
        press to hash URL
      </Button>
      <Text>hash: {urlHash}</Text>
      <Button
        title="press to hash File"
        onPress={() =>
          RNHash.hashFile(
            '//storage/emulated/0/Download/New Text Document (3).txt',
            'md5',
          )
            .then(b => setFileHash(b))
            .catch(er => console.log(er))
        }>
        press to hash File
      </Button>
      <Text>hash: {fileHash}</Text>
      <Button
        title="press to hash String"
        onPress={() =>
          RNHash.hashString('the brown fox jumped over the lazy dog', 'md5')
            .then(b => setStringHash(b))
            .catch(er => console.log(er))
        }>
        press to hash String
      </Button>
      <Text>hash: {stringlHash}</Text>
    </>
  );
};

export default App;
