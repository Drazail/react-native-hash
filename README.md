# react-native-hash

## Getting started

`$ npm install react-native-hash --save`

## Usage

#### algorithm : 
`"md2" | "md5" | "sha1" | "sha224" | "sha256" | "sha384" | "sha512"`

```javascript
import RnHash from 'react-native-hash';

RnHash.hashFile(uri, algorithm).then(hash=>console.log(hash)).catch(e=>console.log(e));
RnHash.hashUrl(url, algorithm).then(hash=>console.log(hash)).catch(e=>console.log(e));
RnHash.hashString(string, algorithm).then(hash=>console.log(hash)).catch(e=>console.log(e));
```


* only supports android at this point


### Todo
|  |iOS |Android|windows|
|--|----|-------|-------|
|hash local files|:x:|:heavy_check_mark: |:x:|
|hash network assets|:x:|:heavy_check_mark: |:x:|
|hash network responses|:x:|:heavy_check_mark:|:x:|
|hash bundle assets|:x:|:x:|:x:|
|hash strings|:x:|:heavy_check_mark:|:x:|


* all PRs are welcome

[![Package Quality](https://npm.packagequality.com/badge/react-native-hash.png)](https://packagequality.com/#?package=react-native-hash)
