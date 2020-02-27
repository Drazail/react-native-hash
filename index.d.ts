import RNHash from ".";

export as namespace RNHash;

export function hashFile(uri: string, algorithm: string): Promise<string>;
export function hashFilesForFolder(
    uri: string, algorithm: string, minFileSize: number, maxFileSize: number, extensionFilter: string
): Promise<string[]>;
export function hashUrl(url: string, HTTPMethod: string, headers: Record<string, string>, algorithm: string): Promise<string>;
export function hashString(message: string, algorithm: string): Promise<string>;
export function generateHmac(message: string, key: string, algorithm: string): Promise<string>;

export namespace CONSTANTS {
    export namespace HashAlgorithms {
        export const md2: string;
        export const md5: String;
        export const sha1: String;
        export const sha224: String;
        export const sha256: String;
        export const sha384: String;
        export const sha512: String;
        export const keccak: String;
    };
    export namespace HmacAlgorithms {
        export const HmacMD5: String;
        export const HmacSHA1: String;
        export const HmacSHA224: String;
        export const HmacSHA256: String;
        export const HmacSHA384: String;
        export const HmacSHA512: String;
        export const PBEwithHmacSHA: String;
        export const PBEwithHmacSHA1: String;
        export const PBEwithHmacSHA224: String;
        export const PBEwithHmacSHA256: String;
        export const PBEwithHmacSHA384: String;
        export const PBEwithHmacSHA512: String;
    };
}

export namespace JSHash {
    export function hashString(message: string, algorithm: string): Promise<string>;
}