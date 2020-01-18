/* eslint linebreak-style: ["error", "windows"] */
/* eslint-disable no-use-before-define */


import {
  Base,
  WordArray,
  Hex,
  Latin1,
  Utf8,
  BufferedBlockAlgorithm,
  Hasher,
  X64Word,
  X64WordArray,
  HMAC,
} from './core/core.js';

import { MD5Algo, MD5, HmacMD5 } from './md5.js';
import { SHA1Algo, SHA1, HmacSHA1 } from './sha1.js';
import { SHA224Algo, SHA224, HmacSHA224 } from './sha224.js';
import { SHA256Algo, SHA256, HmacSHA256 } from './sha256.js';
import { SHA384Algo, SHA384, HmacSHA384 } from './sha384.js';
import { SHA512Algo, SHA512, HmacSHA512 } from './sha512.js';
import { SHA3Algo, SHA3, HmacSHA3 } from './sha3.js';

import { HexFormatter } from './format-hex.js';

export default {
  lib: {
    Base,
    WordArray,
    BufferedBlockAlgorithm,
    Hasher,
  },

  x64: {
    Word: X64Word,
    WordArray: X64WordArray,
  },

  enc: {
    Hex,
    Latin1,
    Utf8,
  },

  algo: {
    HMAC,
    MD5: MD5Algo,
    SHA1: SHA1Algo,
    SHA224: SHA224Algo,
    SHA256: SHA256Algo,
    SHA384: SHA384Algo,
    SHA512: SHA512Algo,
    SHA3: SHA3Algo,
  },

  format: {
    Hex: HexFormatter,
  },

  MD5,
  HmacMD5,
  SHA1,
  HmacSHA1,
  SHA224,
  HmacSHA224,
  SHA256,
  HmacSHA256,
  SHA384,
  HmacSHA384,
  SHA512,
  HmacSHA512,
  SHA3,
  HmacSHA3,
};
