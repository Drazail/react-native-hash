import RNHash from ".";

export as namespace RNHash;

export function hashFile(uri: string, algorithm: string):Promise<string>;
export function hashFilesForFolder(uri: string, algorithm: string):Promise<string[]>;
export function hashUrl(url: string, HTTPMethod: string, headers: Record<string, string>, algorithm: string):Promise<string>;
export function hashString(message: string, algorithm: string):Promise<string>;
export function generateHmac(message: string, key: string, algorithm: string):Promise<string>;

export namespace Constants {
    export const HashAlgorithms : Record<string, string>;
    export const HmacAlgorithms : Record<string, string>;
}

export namespace JSHash {
    export function hashString(message: string, algorithm: string):Promise<string>;
}