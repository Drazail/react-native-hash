/* eslint linebreak-style: ["error", "windows"] */

const CONSTANTS = {
  HashAlgorithms: {
    md2: 'MD2',
    md5: 'MD5',
    sha1: 'SHA-1',
    sha224: 'SHA-224',
    sha256: 'SHA-256',
    sha384: 'SHA-384',
    sha512: 'SHA-512',
    keccak: 'keccak',
  },

  HmacAlgorithms: {
    HmacMD5: 'HmacMD5',
    HmacSHA1: 'HmacSHA1',
    HmacSHA224: 'HmacSHA224',
    HmacSHA256: 'HmacSHA256',
    HmacSHA384: 'HmacSHA384',
    HmacSHA512: 'HmacSHA512',
    PBEwithHmacSHA: 'PBEwithHmacSHA',
    PBEwithHmacSHA1: 'PBEwithHmacSHA1',
    PBEwithHmacSHA224: 'PBEwithHmacSHA224',
    PBEwithHmacSHA256: 'PBEwithHmacSHA256',
    PBEwithHmacSHA384: 'PBEwithHmacSHA384',
    PBEwithHmacSHA512: 'PBEwithHmacSHA512',
  },

  Events: {
    onBatchReccieved: 'RNHashBatch',
  },
};

export default CONSTANTS;
