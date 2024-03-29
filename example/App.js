/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  PermissionsAndroid,
  Button,
  TextInput,
  DeviceEventEmitter,
} from 'react-native';

import RNHash, {
  JSHash,
  JSHmac,
  useHash,
  useHmac,
  CONSTANTS,
} from 'react-native-hash';

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

const App = () => {
  requestPermission();

  const [textToHash, onHashTextChange] = React.useState('textToHash');
  const [textToHmac, onHmacTextChange] = React.useState('textToHmac');

  const [urlHash, setUrlHash] = useState('NA');
  const [fileHash, setFileHash] = useState('NA');
  const [stringlHash, setStringHash] = useState('NA');
  const [jsStringlHash, setJsStringHash] = useState('NA');
  const [HMACString, setHMACString] = useState('NA');
  const [folderString, setFolderString] = useState('NA');
  const [eventsString, setEventsString] = useState('NA');
  const [hashed, algo, setHashMessage] = useHash();
  const [hmac, setHmacAlgo, setHmacMessage, setHmacSecret] = useHmac();

  useEffect(() => {
    DeviceEventEmitter.addListener(
      CONSTANTS.Events.onBatchReccieved,
      (data) => {
        console.log(Object.keys(data.results).length);
        setEventsString(JSON.stringify(data));
      },
    );
  }, []);

  return (
    <ScrollView>
      <View style={{padding: 10}}>
        <TextInput
          style={{borderColor: 'black', borderWidth: 1, borderRadius: 5}}
          onChangeText={(text) => {
            onHashTextChange(text);
            setHashMessage(text);
          }}
          value={textToHash}
        />
        <Text>hash : {hashed}</Text>
        <TextInput
          style={{borderColor: 'black', borderWidth: 1, borderRadius: 5}}
          onChangeText={(text) => {
            onHmacTextChange(text);
            setHmacMessage(text);
          }}
          value={textToHmac}
        />
        <Text>hmac : {hmac}</Text>
      </View>
      <Button
        title="press to hash URL"
        onPress={() => {
          setUrlHash('fetching ...');
          RNHash.hashUrl(
            'https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.doc',
            'GET',
            {'Content-type': 'application/json'},
            CONSTANTS.HashAlgorithms.sha256,
          )
            .then((b) => setUrlHash(b))
            .catch((er) => console.log(er));
        }}>
        press to hash URL
      </Button>
      <Text>hash: {urlHash}</Text>
      <Button
        title="press to hash File"
        onPress={() =>
          RNHash.hashFile(
            '//storage/emulated/0/Download/k.mp3',
            CONSTANTS.HashAlgorithms.sha256,
          )
            .then((b) => setFileHash(b))
            .catch((er) => console.log(er))
        }>
        press to hash File
      </Button>
      <Text>hash: {fileHash}</Text>

      <Button
        title="press to hash Folder"
        onPress={() =>
          RNHash.hashFilesForFolder(
            '//storage/emulated/0/Music',
            CONSTANTS.HashAlgorithms.sha256,
            0,
            104857000,
            '.mp3',
            -1,
            0,
          )
            .then((b) => setFolderString(JSON.stringify(b)))
            .catch((er) => console.log(er))
        }>
        press to hash Folder
      </Button>
      <Text>hash: {folderString}</Text>

      <Button
        title="press to hash Folder with events"
        onPress={() =>
          RNHash.hashFilesForFolders(
            ['//storage/emulated/0/Music', '//storage/emulated/0/Download'],
            CONSTANTS.HashAlgorithms.sha256,
            0,
            104857000,
            '.mp3',
            3,
            1000,
          )
            .then((b) => {
              setFolderString(JSON.stringify(b));
            })
            .catch((er) => console.log(er))
        }>
        press to hash Folder with events
      </Button>
      <Text>hash: {eventsString}</Text>

      <Button
        title="press to hash String"
        onPress={() =>
          RNHash.hashString(
            'The quick brown fox jumps over the lazy dog',
            CONSTANTS.HashAlgorithms.sha256,
          )
            .then((b) => setStringHash(b))
            .catch((er) => console.log(er))
        }>
        press to hash String
      </Button>
      <Text>hash: {stringlHash}</Text>

      <Button
        title="press to hash String using JS (keccak[512])"
        onPress={() =>
          JSHash(
            'The quick brown fox jumps over the lazy dog',
            CONSTANTS.HashAlgorithms.keccak,
          )
            .then((b) => setJsStringHash(b))
            .catch((er) => console.log(er))
        }>
        press to hash String
      </Button>
      <Text>hash: {jsStringlHash}</Text>

      <Button
        title="press to generate HMAC"
        onPress={() =>
          RNHash.generateHmac(
            'The quick brown fox jumps over the lazy dog',
            'SecretKey',
            CONSTANTS.HmacAlgorithms.HmacSHA512,
          )
            .then((b) => setHMACString(b))
            .catch((er) => console.log(er))
        }>
        press to hash String
      </Button>
      <Text>hmac: {HMACString}</Text>
    </ScrollView>
  );
};

export default App;
