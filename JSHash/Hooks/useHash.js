/* eslint linebreak-style: ["error", "windows"] */
/* eslint-disable no-use-before-define */

import React, { useState, useEffect } from 'react';
import hashString from '../JSHash.js';
import CONSTANTS from '../../Constants.js';

const useHash = (
  hashAlgo = CONSTANTS.HashAlgorithms.md5,
  initialMessage = 'hello World',
) => {
  const [Algo, setAlgo] = useState(hashAlgo);
  const [message, setMessage] = useState(initialMessage);
  const [hashed, setHashed] = useState();
  useEffect(() => {
    const hash = () => hashString(message, Algo)
      .then((a) => setHashed(a))
      .catch((er) => {
        console.error(er);
      });
    hash();
  }, [message, Algo]);

  return [hashed, setAlgo, setMessage];
};

export default useHash;
