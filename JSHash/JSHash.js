/* eslint linebreak-style: ["error", "windows"] */
/* eslint-disable no-use-before-define */

import Hash from './lib/index.js';

const {
  MD5,
  SHA1,
  SHA224,
  SHA256,
  SHA384,
  SHA512,
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
      const hash = await MD5(string);
      return Hex.stringify(hash);
    }
    case 'SHA-1': {
      const hash = await SHA1(string);
      return Hex.stringify(hash);
    }
    case 'SHA-256': {
      const hash = await SHA256(string);
      return Hex.stringify(hash);
    }
    case 'SHA-224': {
      const hash = await SHA224(string);
      return Hex.stringify(hash);
    }
    case 'SHA-512': {
      const hash = await SHA512(string);
      return Hex.stringify(hash);
    }
    case 'SHA-384': {
      const hash = await SHA384(string);
      return Hex.stringify(hash);
    }
    case 'keccak': {
      const hash = await SHA3(string);
      return Hex.stringify(hash);
    }
    default:
      throw new Error(`${algorithm} algorithm is not suported`);
  }
};

export default hashString;
