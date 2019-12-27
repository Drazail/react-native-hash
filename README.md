# react-native-hash

## Getting started

`$ npm install react-native-hash --save`

## Usage
```javascript
import RnHash from 'react-native-hash';

RnHash.hashFile(uri, algorithm).then(hash=>console.log(hash)).catch(e=>console.log(e));
RnHash.hashUrl(url, algorithm).then(hash=>console.log(hash)).catch(e=>console.log(e));
RnHash.hashString(string, algorithm).then(hash=>console.log(hash)).catch(e=>console.log(e));
```
