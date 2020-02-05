# react-native-hash

## Getting started

`$ npm install react-native-hash --save`

## Usage

### Android

#### algorithm : 
`"md2" | "md5" | "sha1" | "sha224" | "sha256" | "sha384" | "sha512"`

```javascript
import RnHash from 'react-native-hash';

RnHash.hashFile(uri: string, algorithm: string).then(hash=>console.log(hash)).catch(e=>console.log(e));
RnHash.hashUrl(url: string, HTTPMethod: string, headers: Record<string, string>, algorithm: string).then(hash=>console.log(hash)).catch(e=>console.log(e));
RnHash.hashString(string: string, algorithm: string).then(hash=>console.log(hash)).catch(e=>console.log(e));
```
check out the [example](https://github.com/Drazail/react-native-hash/blob/6548c12f61d968aa4c647a1c98f06ca31e591381/example/App.js#L47-L54) for more information.

### Other Platforms

Native hashing is only implemented on Android, however, until I get around writing native modules for other platforms ( or if some kind soal makes a PR), you can use `JSHash`:

#### algorithm : 

`"md5" | "sha1" | "sha256" | "sha224" | "sha512" | "sha384" | "keccak[512]"`

```javascript

import { JSHash } from 'react-native-hash';

JSHash(string: string, algorithm: string).then(hash=>console.log(hash)).catch(e=>console.log(e));
```
check out the [example](https://github.com/Drazail/react-native-hash/blob/f992bdb09b1df5652a3b1590ca6e903a077ad4e6/example/App.js#L88-L90) for more information.


## Topics

* [documentation](https://github.com/Drazail/react-native-hash/wiki/Documentation)
* [to do](https://github.com/Drazail/react-native-hash/wiki/To-Do)
* [contribution guide](https://github.com/Drazail/react-native-hash/wiki/Contribution-Guide)
* [code of conduct](https://github.com/Drazail/react-native-hash/wiki/Code-of-Conduct)


#### Hashing files and urls are only supported on android at this point

### Todo

* SHA-3
* other Keccak lengths
* fully implementing HMAC

### Status

|  |iOS |Android|windows|
|--|----|-------|-------|
|hash local files|:x:|:heavy_check_mark: |:x:|
|hash network assets|:x:|:heavy_check_mark: |:x:|
|hash network responses|:x:|:heavy_check_mark:|:x:|
|hash bundle assets|:x:|:x:|:x:|
|hash strings|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|



* all PRs are welcome

[![Package Quality](https://npm.packagequality.com/badge/react-native-hash.png)](https://packagequality.com/#?package=react-native-hash)
