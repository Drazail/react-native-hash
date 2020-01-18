/* eslint linebreak-style: ["error", "windows"] */
/* eslint-disable no-use-before-define */

import Hash from './lib/index.js';

const {
  MD5,
  SHA1,
  SHA256,
  SHA224,
  SHA512,
  SHA384,
  SHA3,
  format: { Hex },
} = Hash;

/**
 *
 * @param {string} string
 * @param {string} algorithm
 */
const hashString = async (string, algorithm) => {
  switch (algorithm) {
    case 'md5': {
      const md5hash = await MD5(string);
      return Hex.stringify(md5hash);
    }
    case 'sha1': {
      const sha1hash = await SHA1(string);
      return Hex.stringify(sha1hash);
    }
    case 'sha256': {
      const sha256hash = await SHA256(string);
      return Hex.stringify(sha256hash);
    }
    case 'sha224': {
      const sha224hash = await SHA224(string);
      return Hex.stringify(sha224hash);
    }
    case 'sha512': {
      const sha512hash = await SHA512(string);
      return Hex.stringify(sha512hash);
    }
    case 'sha384': {
      const sha384hash = await SHA384(string);
      return Hex.stringify(sha384hash);
    }
    case 'sha3': {
      const sha3hash = await SHA3(string);
      return Hex.stringify(sha3hash);
    }
    default:
      throw new Error(`${algorithm} algorithm is not suported`);
  }
};

export default hashString;
