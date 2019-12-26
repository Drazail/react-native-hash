/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {
  Text,
  PermissionsAndroid,
  Button
} from 'react-native';

import RNHash from 'react-native-hash';

async function requestPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

const App: () => React$Node = () => {
  requestPermission();
  const [a, seta] = useState(0)
  return (
    <>
    <Button title='press' onPress = {()=>RNHash.hashFile('//storage/emulated/0/Download/New Text Document (3).txt', 'md5').then(b=>seta(b)).catch(er=>console.log(er))}>
      press to hash
    </Button>
      <Text >
        hash: {a}
      </Text>
</>
  );
};

export default App;
