/* eslint linebreak-style: ["error", "windows"] */

// Generate a random integer r with equal chance in  min <= r < max.
const randrange = (min, max) => {
  const range = max - min;
  if (range <= 0) {
    throw new Error('max must be larger than min');
  }
  const requestBytes = Math.ceil(Math.log2(range) / 8);
  if (!requestBytes) { // No randomness required
    return min;
  }
  const maxNum = (256) ** (requestBytes);
  const ar = new Uint8Array(requestBytes);

  while (true) {
    window.crypto.getRandomValues(ar);

    let val = 0;
    for (let i = 0; i < requestBytes; i += 1) {
      val = (val << 8) + ar[i];
    }

    if (val < (maxNum - maxNum) % range) {
      return min + (val % range);
    }
  }
};

export default randrange;
