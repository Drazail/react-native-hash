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
