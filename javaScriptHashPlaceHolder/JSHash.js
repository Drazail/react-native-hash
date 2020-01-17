import md5 from 'crypto-js/md5';
import sha1 from 'crypto-js/sha1';
import sha256 from 'crypto-js/sha256';
import sha224 from 'crypto-js/sha224';
import sha512 from 'crypto-js/sha512';
import sha384 from 'crypto-js/sha384';
import sha3 from 'crypto-js/sha3';
import hex from 'crypto-js/enc-hex';

const hashString = async (string, algorithm)=> {
    switch (algorithm) {
        case 'md5':
            const md5hash = await md5(string);
            return hex.stringify(md5hash);
            break;
        case 'sha1':
            const sha1hash = await  sha1(string);
            return hex.stringify(sha1hash);
            break;
        case 'sha256':
            const sha256hash = await  sha256(string);
            return hex.stringify(sha256hash);
            break;
        case 'sha224':
            const sha224hash = await  sha224(string);
            return hex.stringify(sha224hash);
            break;
        case 'sha512':
            const sha512hash = await  sha512(string);
            return hex.stringify(sha512hash);
            break;
        case 'sha384':
            const sha384hash = await  sha384(string);
            return hex.stringify(sha384hash);
            break;
        case 'sha3':
            const sha3hash = await  sha3(string);
            return hex.stringify(sha3hash);
            break;
        default:
            throw new Error (`${algorithm} algorithm is not suported`);
            break;
    }
}

export default hashString;