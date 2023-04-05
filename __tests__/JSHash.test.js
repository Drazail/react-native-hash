/* eslint linebreak-style: ["error", "windows"] */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

import CONSTANTS from '../Constants.js';

import hashString from '../JSHash/JSHash.js';
import {
  TestStrings,
  Md5Hashes,
  SHA256Hashes,
  SHA1Hashes,
  SHA512Hashes,
  SHA224Hashes,
  SHA384Hashes,
  KeccakHashes,
} from './C.js';

describe('JSHash hasString Function', () => {
  test('MD5', async () => {
    const iterator = TestStrings.entries();
    for (const [index, value] of iterator) {
      await expect(
        hashString(value, CONSTANTS.HashAlgorithms.md5),
      ).resolves.toEqual(Md5Hashes[index]);
    }
  });

  test('SHA1', async () => {
    const iterator = TestStrings.entries();
    for (const [index, value] of iterator) {
      await expect(
        hashString(value, CONSTANTS.HashAlgorithms.sha1),
      ).resolves.toEqual(SHA1Hashes[index]);
    }
  });

  test('SHA256', async () => {
    const iterator = TestStrings.entries();
    for (const [index, value] of iterator) {
      await expect(
        hashString(value, CONSTANTS.HashAlgorithms.sha256),
      ).resolves.toEqual(SHA256Hashes[index]);
    }
  });

  test('SHA224', async () => {
    const iterator = TestStrings.entries();
    for (const [index, value] of iterator) {
      await expect(
        hashString(value, CONSTANTS.HashAlgorithms.sha224),
      ).resolves.toEqual(SHA224Hashes[index]);
    }
  });

  test('SHA512', async () => {
    const iterator = TestStrings.entries();
    for (const [index, value] of iterator) {
      await expect(
        hashString(value, CONSTANTS.HashAlgorithms.sha512),
      ).resolves.toEqual(SHA512Hashes[index]);
    }
  });

  test('SHA384', async () => {
    const iterator = TestStrings.entries();
    for (const [index, value] of iterator) {
      await expect(
        hashString(value, CONSTANTS.HashAlgorithms.sha384),
      ).resolves.toEqual(SHA384Hashes[index]);
    }
  });

  test('Keccak', async () => {
    const iterator = TestStrings.entries();
    for (const [index, value] of iterator) {
      await expect(
        hashString(value, CONSTANTS.HashAlgorithms.keccak),
      ).resolves.toEqual(KeccakHashes[index]);
    }
  });

  test('badHash', async () => {
    await expect(
      hashString('value', 'badHashAlgo'),
    ).rejects.toEqual(new Error('badHashAlgo algorithm is not supported'));
  });
});
