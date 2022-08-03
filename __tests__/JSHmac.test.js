/* eslint linebreak-style: ["error", "windows"] */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

import CONSTANTS from '../Constants.js';

import {
  TestStrings,
  HmacMD5s,
  HmacSHA1s,
  HmacSHA224s,
  HmacSHA256s,
  HmacSHA384s,
  HmacSHA512s,
} from './C.js';
import hmacString from '../JSHash/JSHmac.js';

describe('JSHash hasString Function', () => {
  test('HmacMD5', async () => {
    const iterator = TestStrings.entries();
    for (const [index, value] of iterator) {
      await expect(
        hmacString(value, 'SecretKey', CONSTANTS.HmacAlgorithms.HmacMD5),
      ).resolves.toEqual(HmacMD5s[index]);
    }
  });

  test('HmacSHA1', async () => {
    const iterator = TestStrings.entries();
    for (const [index, value] of iterator) {
      await expect(
        hmacString(value, 'SecretKey', CONSTANTS.HmacAlgorithms.HmacSHA1),
      ).resolves.toEqual(HmacSHA1s[index]);
    }
  });

  test('HmacSHA224', async () => {
    const iterator = TestStrings.entries();
    for (const [index, value] of iterator) {
      await expect(
        hmacString(value, 'SecretKey', CONSTANTS.HmacAlgorithms.HmacSHA224),
      ).resolves.toEqual(HmacSHA224s[index]);
    }
  });

  test('HmacSHA256', async () => {
    const iterator = TestStrings.entries();
    for (const [index, value] of iterator) {
      await expect(
        hmacString(value, 'SecretKey', CONSTANTS.HmacAlgorithms.HmacSHA256),
      ).resolves.toEqual(HmacSHA256s[index]);
    }
  });

  test('HmacSHA384', async () => {
    const iterator = TestStrings.entries();
    for (const [index, value] of iterator) {
      await expect(
        hmacString(value, 'SecretKey', CONSTANTS.HmacAlgorithms.HmacSHA384),
      ).resolves.toEqual(HmacSHA384s[index]);
    }
  });

  test('HmacSHA512', async () => {
    const iterator = TestStrings.entries();
    for (const [index, value] of iterator) {
      await expect(
        hmacString(value, 'SecretKey', CONSTANTS.HmacAlgorithms.HmacSHA512),
      ).resolves.toEqual(HmacSHA512s[index]);
    }
  });

  test('badHmac', async () => {
    await expect(
      hmacString('value', 'SecretKey', 'badHmacAlgo'),
    ).rejects.toEqual(new Error('badHmacAlgo algorithm is not suported'));
  });
});
