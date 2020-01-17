/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {Text, PermissionsAndroid, Button} from 'react-native';

import RNHash, { JSHash } from 'react-native-hash';

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
  const [jsStringlHash, setJsStringHash] = useState('NA');
  return (
    <>
      <Button
        title="press to hash URL"
        onPress={() =>
          RNHash.hashUrl(
            'https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.doc',
            'GET',
            {'Content-type': 'application/json'},
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
            '//storage/emulated/0/Download/k.mp3',
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
          RNHash.hashString('The quick brown fox jumps over the lazy dog', 'md5')
            .then(b => setStringHash(b))
            .catch(er => console.log(er))
        }>
        press to hash String
      </Button>
      <Text>hash: {stringlHash}</Text>

      <Button
        title="press to hash String using JS"
        onPress={() =>
          JSHash('The quick brown fox jumps over the lazy dog', 'md5')
            .then(b => setJsStringHash(b))
            .catch(er => console.log(er))
        }>
        press to hash String
      </Button>
      <Text>hash: {jsStringlHash}</Text>
    </>
  );
};

export default App;
