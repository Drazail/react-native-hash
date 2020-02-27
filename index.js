/* eslint linebreak-style: ["error", "windows"] */
/* eslint-disable no-use-before-define */

import { NativeModules } from 'react-native';

const { RNHash } = NativeModules;

export default RNHash;
export { default as JSHash } from './JSHash/JSHash.js';
export { default as CONSTANTS } from './Constants.js';
