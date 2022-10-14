# react-native-hash

## Getting started

`$ npm install react-native-hash --save`

---
## compatibility

|           Criteria              | Release Version                |
| ---------------------- | ------------------ |
|  Android API < `16`       | unsupported                |
| `16` <= Android API < `21`       | 1.x                |
| Gradle >= `7`    | >= 2.0.1                |

---

## Usage

### Constants

```typescript
HashAlgorithms: Record<string, string>;
```

```typescript
HmacAlgorithms: Record<string, string>;
```

```typescript
Events: Record<string, string>;
```

#### Example

```javascript
import { CONSTANTS } from 'react-native-hash';

const hashAlgorithm = CONSTANTS.HashAlgorithms.sha256;

const hmacAlgorithm = CONSTANTS.HmacAlgorithms.HmacSHA512;

const EventName = CONSTANTS.Events.onBatchReccieved;

```
***
# Cross Platform API

[Native hashing](https://github.com/Drazail/react-native-hash/blob/master/README.md#android) is only implemented on Android, however, until I get around writing native modules for other platforms ( or if some kind soul makes a PR), you can use `JSHash` and `JSHmac`:

***
**NOTE**

if you are using expo, `JSHash` and `JSHmac` should work out of the box, native implementations however, will require you to eject the project.
***


#### Hash Algorithm :

`"MD2" | "MD5"| "SHA-1"| "SHA-224" | "SHA-256" | "SHA-384" | "SHA-512"| "keccak"`

#### HMac Algorithm :

`"HmacMD5" | "HmacSHA1" | "HmacSHA224" | "HmacSHA256" | "HmacSHA384" | "HmacSHA512"`

#### API:

```typescript
JSHash(message: string, algorithm: string):Promise<string>;
```
```typescript
JSHmac(message: string, secret: string, algorithm: string): Promise<string>;
```

#### Example :

```javascript
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";

JSHash("message", CONSTANTS.HashAlgorithms.sha256)
  .then(hash => console.log(hash))
  .catch(e => console.log(e));

JSHmac("message", "SecretKey", CONSTANTS.HmacAlgorithms.HmacSHA256)
  .then(hash => console.log(hash))
  .catch(e => console.log(e));
```

- keccak implementation defaults to 512 and is not tested against all attack vectors.

check out the [example](https://github.com/Drazail/react-native-hash/blob/f992bdb09b1df5652a3b1590ca6e903a077ad4e6/example/App.js#L88-L90) for more information.

# React Hooks

Following hooks are available:

```javascript
useHash(
  hashAlgo?: string = "MD5",
  initialMessage?: string = "hello World",
): [
  hashed: string,
  setMessage: (message: string) => Promise<void>,
  setAlgo: (algo: string) => Promise<void>
];
```

```javascript
useHmac(
  hmacAlgo?: string = "HmacMD5",
  initialMessage?: string = "hello World",
  initialSecret?: string = "SecretKey",
): [
  hashed: string,
  setMessage: (message: string) => Promise<void>,
  setAlgo: (algo: string) => Promise<void>,
  setSecret: (secret: string) => Promise<void>
];
```
## Usage

```javascript
const [hashedMessage, setHashAlgo, setHashMessage] = useHash();
const [hmac, setHmacAlgo, setHmacMessage, setHmacSecret] = useHmac();
```

`hashedMessage` and `hmac` will update after a call to one of the setters is resolved.

note that all the setter functions of these two hooks are async and will return a `promise`.

check out the [example] for more information.


***

# Android

#### Hash Algorithm :

`"md2" | "md5" | "sha1" | "sha224" | "sha256" | "sha384" | "sha512"`

#### HMAC Algorithm :

`"HmacMD5" | "HmacSHA1" | "HmacSHA224" | "HmacSHA256" | "HmacSHA384" | "HmacSHA512" | "PBEwithHmacSHA"`
`"PBEwithHmacSHA1" | "PBEwithHmacSHA224" | "PBEwithHmacSHA256" | "PBEwithHmacSHA384" | "PBEwithHmacSHA512"`

#### API

```typescript
hashFile(uri: string, algorithm: string): Promise<string>;
```

```typescript
hashFilesForFolder(uri: string, algorithm: string, minFileSize: number, maxFileSize: number, extensionFilter: string, batchSize: number, delay: number ):  Promise<{FilesCount:number, isFinalBatch: bool, batchNumber: number, results: Record<string, string>}>;
```

* pass an empty string `""` to the hashFilesForFolder as extensionFilter if you dont want to filter the results.
* if you pass -1 as batchSize, the function will return a promise which resolves into an object with all hashes
* if you pass any number other than -1 to batchSize, instead of returning the results, null will be returned, but when each batch is ready an event will be fired.
* the delay parameter determines how many ms should the native thread waits before sending the next batch.
* check `"press to hash Folder with events"` and `"press to hash Folder"` in the example app for more details

```typescript
hashFilesForFolders(uri: string, algorithm: string, minFileSize: number, maxFileSize: number, extensionFilter: string, batchSize: number, delay: number ):  Promise<{FilesCount:number, isFinalBatch: bool, batchNumber: number, results: Record<string, string>}>;
```

* behaves the same as the `hashFilesForFolder`, but reccieves an String array as first argument.

```typescript
hashUrl(url: string, HTTPMethod: string, headers: Record<string, string>, algorithm: string): Promise<string>;
```

```typescript
hashString(message: string, algorithm: string): Promise<string>;
```

```typescript
generateHmac(message: string, key: string, algorithm: string): Promise<string>;
```

#### Example

```javascript
import RnHash, { CONSTANTS } from "react-native-hash";

RnHash.hashFile("uri", CONSTANTS.HashAlgorithms.sha256)
  .then(hash => console.log(hash))
  .catch(e => console.log(e));

RNHash.hashFilesForFolders(
  ["uri", "anotherUri"],
  CONSTANTS.HashAlgorithms.sha256,
  0,
  1048576,
  ".mp3",
  -1,
  0
)
  .then(b => setFolderString(JSON.stringify(b)))
  .catch(er => console.log(er));

  RNHash.hashFilesForFolder(
  "uri",
  CONSTANTS.HashAlgorithms.sha256,
  0,
  1048576,
  ".mp3",
  -1,
  0
)
  .then(b => setFolderString(JSON.stringify(b)))
  .catch(er => console.log(er));

RnHash.hashUrl(
  "url",
  "HTTPMethod",
  { "Content-type": "application/json" },
  CONSTANTS.HashAlgorithms.sha256
)
  .then(hash => console.log(hash))
  .catch(e => console.log(e));

RnHash.hashString("message", CONSTANTS.HashAlgorithms.sha256)
  .then(hash => console.log(hash))
  .catch(e => console.log(e));

RNHash.generateHmac("message", "secretKey", CONSTANTS.HmacAlgorithms.HmacSHA512)
  .then(HMAC => console.log(HMAC))
  .catch(er => console.log(er));
```

check out the [example](https://github.com/Drazail/react-native-hash/blob/6548c12f61d968aa4c647a1c98f06ca31e591381/example/App.js#L47-L54) for more information.


## Topics

- [documentation](https://github.com/Drazail/react-native-hash/wiki/Documentation)
- [to do](https://github.com/Drazail/react-native-hash/wiki/To-Do)
- [contribution guide](https://github.com/Drazail/react-native-hash/wiki/Contribution-Guide)
- [code of conduct](https://github.com/Drazail/react-native-hash/wiki/Code-of-Conduct)

#### Hashing files and urls are only supported on android at this point

### Todo

- SHA-3
- other Keccak lengths

### Status

|                        | iOS                | Android            | windows            |
| ---------------------- | ------------------ | ------------------ | ------------------ |
| hash local files       | :x:                | :heavy_check_mark: | :x:                |
| hash network assets    | :x:                | :heavy_check_mark: | :x:                |
| hash network responses | :x:                | :heavy_check_mark: | :x:                |
| hash bundle assets     | :x:                | :x:                | :x:                |
| hash strings           | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| HMAC                   | :heavy_check_mark:                | :heavy_check_mark: | :heavy_check_mark:     |



- all PRs are welcome

[![Package Quality](https://npm.packagequality.com/badge/react-native-hash.png)](https://packagequality.com/#?package=react-native-hash)

---
#### Credits

JSHash and JSHMac functions use some Open Source code snippets. You can find the source code of their open source projects along with license information below. We acknowledge and are grateful to these developers for their contributions to open source.

- Project: crypto-es https://github.com/entronad/crypto-es

- License (MIT) https://github.com/entronad/crypto-es/blob/master/LICENSE

---
