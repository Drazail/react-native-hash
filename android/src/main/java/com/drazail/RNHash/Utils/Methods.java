package com.drazail.RNHash.Utils;

import java.io.InputStream;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import static javax.crypto.Mac.getInstance;

final public class Methods {

    // helpers

    private static final char[] HEX_ARRAY = "0123456789abcdef".toCharArray();

    private static String bytesToHex(byte[] bytes) {
        char[] hexChars = new char[bytes.length * 2];
        for (int j = 0; j < bytes.length; j++) {
            int v = bytes[j] & 0xFF;
            hexChars[j * 2] = HEX_ARRAY[v >>> 4];
            hexChars[j * 2 + 1] = HEX_ARRAY[v & 0x0F];
        }
        return new String(hexChars);
    }


    // main methods

    public static String hash(InputStream inputStream, String algorithm) throws Exception {

        MessageDigest md = MessageDigest.getInstance(algorithm);

        byte[] buffer = new byte[1024 * 10]; // 10 KB Buffer

        int read;
        while ((read = inputStream.read(buffer)) != -1) {
            md.update(buffer, 0, read);
        }

        StringBuilder hexString = new StringBuilder();
        for (byte digestByte : md.digest())
            hexString.append(String.format("%02x", digestByte));

        return (hexString.toString());
    }


    public static String hmac(String message, String key, String algorithm) throws NoSuchAlgorithmException, InvalidKeyException {


        byte[] keyBytes = key.getBytes();
        byte[] messageBytes = message.getBytes();

        Mac mac = getInstance(algorithm);
        mac.init(new SecretKeySpec(keyBytes, algorithm));
        byte[] finalBytes = mac.doFinal(messageBytes);

        final String messageDigest = bytesToHex(finalBytes);

        //Log.i("RNHASH", "message digest: " + messageDigest);
        return (messageDigest);


    }

}
