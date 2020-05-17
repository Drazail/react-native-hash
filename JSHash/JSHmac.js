/* eslint linebreak-style: ["error", "windows"] */
/* eslint-disable no-use-before-define */

import Hash from './lib/index.js';

const {
  HmacMD5,
  HmacSHA1,
  HmacSHA224,
  HmacSHA256,
  HmacSHA384,
  HmacSHA512,
  format: { Hex },
} = Hash;

/**
 *
 * @param {string} string
 * @param {string} algorithm
 */
const hmacString = async (string, key, algorithm) => {
  switch (algorithm) {
    case 'HmacMD5': {
      const HMac = await HmacMD5(string, key);
      return Hex.stringify(HMac);
    }

    case 'HmacSHA1': {
      const HMac = await HmacSHA1(string, key);
      return Hex.stringify(HMac);
    }

    case 'HmacSHA224': {
      const HMac = await HmacSHA224(string, key);
      return Hex.stringify(HMac);
    }

    case 'HmacSHA256': {
      const HMac = await HmacSHA256(string, key);
      return Hex.stringify(HMac);
    }
    case 'HmacSHA384': {
      const HMac = await HmacSHA384(string, key);
      return Hex.stringify(HMac);
    }
    case 'HmacSHA512': {
      const HMac = await HmacSHA512(string, key);
      return Hex.stringify(HMac);
    }
    default:
      throw new Error(`${algorithm} algorithm is not suported`);
  }
};

export default hmacString;
