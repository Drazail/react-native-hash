/* eslint linebreak-style: ["error", "windows"] */

import Base from '../Base.js';


/**
   * A 64-bit word.
   */
export default class X64Word extends Base {
  /**
     * Initializes a newly created 64-bit word.
     *
     * @param {number} high The high 32 bits.
     * @param {number} low The low 32 bits.
     *
     * @example
     *
     *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
     */
  constructor(high, low) {
    super();

    this.high = high;
    this.low = low;
  }
}
