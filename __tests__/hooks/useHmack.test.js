/* eslint-disable no-plusplus */
/* eslint linebreak-style: ["error", "windows"] */

import { act, renderHook, waitFor } from '@testing-library/react-native';
import useHmac from '../../JSHash/Hooks/useHmac.js';
import CONSTANTS from '../../Constants.js';
import {
  TestStrings,
  HmacMD5s,
  HmacSHA1s,
  HmacSHA224s,
  HmacSHA256s,
  HmacSHA384s,
  HmacSHA512s,
} from '../C.js';
/**
 * hmacedMessage == result.current[0]
 * SetAlgo == result.current[1]
 * setMessage == result.current[2]
 * setSecret == result.current[3]
 */
test('should use hook', async () => {
  const { result } = renderHook(() => useHmac());

  expect(typeof result.current[1]).toBe('function');
  expect(typeof result.current[2]).toBe('function');
  expect(typeof result.current[3]).toBe('function');
  waitFor(() => expect(result.current[0]).toBe('12d7d6f9dc80359d60f1cdbae4502535'));
});

test('should use initial message', async () => {
  const { result } = renderHook(() => useHmac(CONSTANTS.HmacAlgorithms.HmacMD5, 'testMessage'));
  waitFor(() => expect(result.current[0]).toBe('7b216128808b283b9a88dd453f480e0c'));
});

test('should use initial secret', async () => {
  const { result } = renderHook(() => useHmac(CONSTANTS.HmacAlgorithms.HmacMD5, 'testMessage', 'SecretKey-2'));
  waitFor(() => expect(result.current[0]).toBe('d5b755795cdf69b1b320ba2cf00e6bb3'));
});

test('should update message', async () => {
  const { result } = renderHook(() => useHmac(CONSTANTS.HmacAlgorithms.HmacMD5));

  waitFor(() => expect(result.current[0]).toBe('12d7d6f9dc80359d60f1cdbae4502535'));
  act(() => result.current[2]('testMessage1'));
  waitFor(() => expect(result.current[0]).toBe('4f58bb5dd9d2b692b0c6764c6447e34f'));
  act(() => result.current[2]('testMessage2'));
  waitFor(() => expect(result.current[0]).toBe('0cc80d81ca954657d77cfd055fbe5bec'));
});

test('should update secret', async () => {
  const { result } = renderHook(() => useHmac(CONSTANTS.HmacAlgorithms.HmacMD5));

  waitFor(() => expect(result.current[0]).toBe('12d7d6f9dc80359d60f1cdbae4502535'));
  act(() => result.current[3]('SecretKey-1'));
  waitFor(() => expect(result.current[0]).toBe('35ae1a8865638f584ded5de3862b019e'));
  act(() => result.current[3]('SecretKey-2'));
  waitFor(() => expect(result.current[0]).toBe('81cbda2898ad9fa5c7fe7de1aa451c23'));
});

test('should update algo', async () => {
  const { result } = renderHook(() => useHmac(CONSTANTS.HmacAlgorithms.HmacMD5, 'testMessage'));

  waitFor(() => expect(result.current[0]).toBe('7b216128808b283b9a88dd453f480e0c'));
  act(() => result.current[1](CONSTANTS.HmacAlgorithms.HmacSHA1));
  waitFor(() => expect(result.current[0]).toBe('b039ebfa8c171945745f265b349d6b9058683add'));
});

test('should pass all test strings for MD5', async () => {
  const { result } = renderHook(() => useHmac(CONSTANTS.HmacAlgorithms.HmacMD5, 'testMessage'));

  waitFor(() => expect(result.current[0]).toBe('7b216128808b283b9a88dd453f480e0c'));

  for (let index = 0; index < TestStrings.length; index++) {
    process.stdout.write(`processing TestString[${index}]  on HMAC-MD5 algo`);
    act(() => result.current[2](TestStrings[index]));
    waitFor(() => expect(result.current[0]).toBe(HmacMD5s[index]));
  }
});

test('should pass all test strings for HMAC-SHA-1', async () => {
  const { result } = renderHook(() => useHmac(CONSTANTS.HmacAlgorithms.HmacMD5, 'testMessage'));

  waitFor(() => expect(result.current[0]).toBe('7b216128808b283b9a88dd453f480e0c'));

  act(() => result.current[1](CONSTANTS.HmacAlgorithms.HmacSHA1));
  waitFor(() => expect(result.current[0]).toBe('b039ebfa8c171945745f265b349d6b9058683add'));

  for (let index = 0; index < TestStrings.length; index++) {
    process.stdout.write(`processing TestString[${index}]  on HMAC-SHA-1 algo`);
    act(() => result.current[2](TestStrings[index]));
    waitFor(() => expect(result.current[0]).toBe(HmacSHA1s[index]));
  }
});

test('should pass all test strings for HMAC-SHA-224', async () => {
  const { result } = renderHook(() => useHmac(CONSTANTS.HmacAlgorithms.HmacMD5, 'testMessage'));

  waitFor(() => expect(result.current[0]).toBe('7b216128808b283b9a88dd453f480e0c'));

  act(() => result.current[1](CONSTANTS.HmacAlgorithms.HmacSHA224));
  waitFor(() => expect(result.current[0]).toBe(
    'c020f4a07df71faff9d7c4e27d2d23870f913b0728dd609598aec3af',
  ));

  for (let index = 0; index < TestStrings.length; index++) {
    process.stdout.write(
      `processing TestString[${index}]  on HMAC-SHA-224 algo`,
    );
    act(() => result.current[2](TestStrings[index]));
    waitFor(() => expect(result.current[0]).toBe(HmacSHA224s[index]));
  }
});

test('should pass all test strings for HMAC-SHA-256', async () => {
  const { result } = renderHook(() => useHmac(CONSTANTS.HmacAlgorithms.HmacMD5, 'testMessage'));

  waitFor(() => expect(result.current[0]).toBe('7b216128808b283b9a88dd453f480e0c'));

  act(() => result.current[1](CONSTANTS.HmacAlgorithms.HmacSHA256));
  waitFor(() => expect(result.current[0]).toBe(
    '57fec5525b413ee9760223f72b90b1602f87bff9ff81355ccd96b19358c14d9d',
  ));

  for (let index = 0; index < TestStrings.length; index++) {
    process.stdout.write(
      `processing TestString[${index}]  on HMAC-SHA-256 algo`,
    );
    act(() => result.current[2](TestStrings[index]));
    waitFor(() => expect(result.current[0]).toBe(HmacSHA256s[index]));
  }
});

test('should pass all test strings for HMAC-SHA-384', async () => {
  const { result } = renderHook(() => useHmac(CONSTANTS.HmacAlgorithms.HmacMD5, 'testMessage'));

  waitFor(() => expect(result.current[0]).toBe('7b216128808b283b9a88dd453f480e0c'));

  act(() => result.current[1](CONSTANTS.HmacAlgorithms.HmacSHA384));
  waitFor(() => expect(result.current[0]).toBe(
    'ace53da255a7dec8bb60906943bef6077c2ff7fef492f12e1a3bdac2c650fef9089b71f98bb4dbdedbb8db328d9dec1b',
  ));

  for (let index = 0; index < TestStrings.length; index++) {
    process.stdout.write(
      `processing TestString[${index}]  on HMAC-SHA-384 algo`,
    );
    act(() => result.current[2](TestStrings[index]));
    waitFor(() => expect(result.current[0]).toBe(HmacSHA384s[index]));
  }
});

test('should pass all test strings for HMAC-SHA-512', async () => {
  const { result } = renderHook(() => useHmac(CONSTANTS.HmacAlgorithms.HmacMD5, 'testMessage'));

  waitFor(() => expect(result.current[0]).toBe('7b216128808b283b9a88dd453f480e0c'));

  act(() => result.current[1](CONSTANTS.HmacAlgorithms.HmacSHA512));
  waitFor(() => expect(result.current[0]).toBe(
    '54fb61eee2b321956d3fdb36f1fd4f8582094906ca03ed5ac583e4caf750ca65f74d15c4c6502322212315b7a0e1e71b329565f5111eb43a8015cae929d67640',
  ));

  for (let index = 0; index < TestStrings.length; index++) {
    process.stdout.write(
      `processing TestString[${index}]  on HMAC-SHA-512 algo`,
    );
    act(() => result.current[2](TestStrings[index]));
    waitFor(() => expect(result.current[0]).toBe(HmacSHA512s[index]));
  }
});
