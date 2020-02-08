# react-native-hash

## Getting started

`$ npm install react-native-hash --save`

## Usage

### Constants
```
HashAlgorithms : Record<string, string>;
```
```
HmacAlgorithms : Record<string, string>;
```

#### Example

```javascript
import { CONSTSNTS } from from 'react-native-hash';

const hashAlgorithm = CONSTSNTS.HashAlgorithms.sha256;

const hmacAlgorithm = CONSTSNTS.HmacAlgorithms.HmacSHA512;

```

### Android

#### Hash Algorithm : 
`"md2" | "md5" | "sha1" | "sha224" | "sha256" | "sha384" | "sha512"`

#### HMAC Algorithm : 

`"HmacMD5" | "HmacSHA1" | "HmacSHA224" | "HmacSHA256" | "HmacSHA384" | "HmacSHA512" | "PBEwithHmacSHA"`
`"PBEwithHmacSHA1" | "PBEwithHmacSHA224" | "PBEwithHmacSHA256" | "PBEwithHmacSHA384" | "PBEwithHmacSHA512"`

#### API
```
hashFile(uri: string, algorithm: string):Promise<string>;
```
```
hashUrl(url: string, HTTPMethod: string, headers: Record<string, string>, algorithm: string):Promise<string>;
```
```
hashString(message: string, algorithm: string):Promise<string>;
```
```
generateHmac(message: string, key: string, algorithm: string):Promise<string>;
```

#### Example

```javascript
import RnHash, { CONSTSNTS } from 'react-native-hash';

RnHash.hashFile("uri", CONSTSNTS.HashAlgorithms.sha256)
  .then(hash=>console.log(hash))
  .catch(e=>console.log(e));

RnHash.hashUrl("url", "HTTPMethod", {'Content-type': 'application/json'},
CONSTSNTS.HashAlgorithms.sha256)
  .then(hash=>console.log(hash))
  .catch(e=>console.log(e));

RnHash.hashString("message", CONSTSNTS.HashAlgorithms.sha256)
  .then(hash=>console.log(hash))
  .catch(e=>console.log(e));
  
RNHash.generateHmac(
            "message",
            "secretKey",
            CONSTSNTS.HmacAlgorithms.HmacSHA512,
          )
            .then(HMAC => console.log(HMAC))
            .catch(er => console.log(er))
```

check out the [example](https://github.com/Drazail/react-native-hash/blob/6548c12f61d968aa4c647a1c98f06ca31e591381/example/App.js#L47-L54) for more information.

### Other Platforms

Native hashing is only implemented on Android, however, until I get around writing native modules for other platforms ( or if some kind soul makes a PR), you can use `JSHash`:

#### Hash Algorithm : 

`"md5" | "sha1" | "sha256" | "sha224" | "sha512" | "sha384" | "keccak"`

#### API:

```
JSHash(message: string, algorithm: string):Promise<string>;
```

#### Example :

```javascript

import { JSHash, CONSTSNTS } from 'react-native-hash';

JSHash("message", CONSTSNTS.HashAlgorithms.keccak)
  .then(hash=>console.log(hash))
  .catch(e=>console.log(e));
```
* keccak implementation defaults to 512 and is not tested against all attack vectors.

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
|HMAC|:x:|:heavy_check_mark:|:x:|



* all PRs are welcome

[![Package Quality](https://npm.packagequality.com/badge/react-native-hash.png)](https://packagequality.com/#?package=react-native-hash)
