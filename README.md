# react-native-hash

## Getting started

`$ npm install react-native-hash --save`

## Usage
```javascript
import RnHash from 'react-native-hash';

RnHash.hashFile(url, algorithm).then(hash=>console.log(hash)).catch(e=>console.log(e));
```
