declare namespace RNHash {

    function hashFile(uri: string, algorithm: string): Promise<string>;
    /**
     * 
     * @param uri uri pointing to File or directory
     * @param algorithm algorithm to be used for hashing
     * @param minFileSize minimum file size to be hashed in bytes
     * @param maxFileSize maximum file size to be hashed in bytes
     * @param extensionFilter extension of files to be hashed, pass "" to ignore this option
     * @param batchSize event batch size, pass -1 to retrieve all results on .then instead of events
     * @returns Promise -- if batchSize is set to -1, the promise.resolve contains all the hashes, otherwise, it resolves to null.
     */
    function hashFilesForFolder(
        uri: string, algorithm: string, minFileSize: number, maxFileSize: number, extensionFilter: string, batchSize: number, delay: number
    ): Promise<{ FilesCount: number, isFinalBatch: boolean, batchNumber: number, results: Record<string, string> }>;

    function hashFilesForFolders(
        uri: Array<string>, algorithm: string, minFileSize: number, maxFileSize: number, extensionFilter: string, batchSize: number, delay: number
    ): Promise<{ FilesCount: number, isFinalBatch: boolean, batchNumber: number, results: Record<string, string> }>;


    function hashUrl(url: string, HTTPMethod: string, headers: Record<string, string>, algorithm: string): Promise<string>;
    function hashString(message: string, algorithm: string): Promise<string>;
    function generateHmac(message: string, key: string, algorithm: string): Promise<string>;
}



export namespace CONSTANTS {
    export namespace HashAlgorithms {
        export const md2: 'MD2';
        export const md5: 'MD5';
        export const sha1: 'SHA-1';
        export const sha224: 'SHA-224';
        export const sha256: 'SHA-256';
        export const sha384: 'SHA-384';
        export const sha512: 'SHA-512';
        export const keccak: 'keccak';
    }
    export namespace HmacAlgorithms {
        export const HmacMD5: 'HmacMD5';
        export const HmacSHA1: 'HmacSHA1';
        export const HmacSHA224: 'HmacSHA224';
        export const HmacSHA256: 'HmacSHA256';
        export const HmacSHA384: 'HmacSHA384';
        export const HmacSHA512: 'HmacSHA512';
        export const PBEwithHmacSHA: 'PBEwithHmacSHA';
        export const PBEwithHmacSHA1: 'PBEwithHmacSHA1';
        export const PBEwithHmacSHA224: 'PBEwithHmacSHA224';
        export const PBEwithHmacSHA256: 'PBEwithHmacSHA256';
        export const PBEwithHmacSHA384: 'PBEwithHmacSHA384';
        export const PBEwithHmacSHA512: 'PBEwithHmacSHA512';
    }
    export namespace Events {
        export const onBatchReccieved: string;
    }
}


export default RNHash;

export function JSHash(message: string, algorithm: string): Promise<string>;

export function JSHmac(message: string, secret: string, algorithm: string): Promise<string>;

export function useHash(
  hmacAlgo?: typeof CONSTANTS.HashAlgorithms[keyof typeof CONSTANTS.HashAlgorithms],
  initialMessage?: string
): [string, (message: string) => Promise<void>, (algo: string) => Promise<void>];

export function useHmac(
  hmacAlgo?: typeof CONSTANTS.HashAlgorithms[keyof typeof CONSTANTS.HashAlgorithms],
  initialMessage?: string,
  initialSecret?: string
): [string, (message: string) => Promise<void>, (algo: string) => Promise<void>, (secret: string) => Promise<void>];
