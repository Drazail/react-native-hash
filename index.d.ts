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
        export const md2: string;
        export const md5: string;
        export const sha1: string;
        export const sha224: string;
        export const sha256: string;
        export const sha384: string;
        export const sha512: string;
        export const keccak: string;
    }
    export namespace HmacAlgorithms {
        export const HmacMD5: string;
        export const HmacSHA1: string;
        export const HmacSHA224: string;
        export const HmacSHA256: string;
        export const HmacSHA384: string;
        export const HmacSHA512: string;
        export const PBEwithHmacSHA: string;
        export const PBEwithHmacSHA1: string;
        export const PBEwithHmacSHA224: string;
        export const PBEwithHmacSHA256: string;
        export const PBEwithHmacSHA384: string;
        export const PBEwithHmacSHA512: string;
    }
    export namespace Events {
        export const onBatchReccieved: string;
    }
}


export default RNHash;

export function JSHash(message: string, algorithm: string): Promise<string>;

export function JSHmac(message: string, secret: string, algorithm: string): Promise<string>;