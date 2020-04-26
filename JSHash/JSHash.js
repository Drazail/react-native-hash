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
    case 'MD5': {
      const md5hash = await MD5(string);
      return Hex.stringify(md5hash);
    }
    case 'SHA-1': {
      const sha1hash = await SHA1(string);
      return Hex.stringify(sha1hash);
    }
    case 'SHA-256': {
      const sha256hash = await SHA256(string);
      return Hex.stringify(sha256hash);
    }
    case 'SHA-224': {
      const sha224hash = await SHA224(string);
      return Hex.stringify(sha224hash);
    }
    case 'SHA-512': {
      const sha512hash = await SHA512(string);
      return Hex.stringify(sha512hash);
    }
    case 'SHA-384': {
      const sha384hash = await SHA384(string);
      return Hex.stringify(sha384hash);
    }
    case 'keccak': {
      const keccakhash = await SHA3(string);
      return Hex.stringify(keccakhash);
    }
    default:
      throw new Error(`${algorithm} algorithm is not suported`);
  }
};

export default hashString;
