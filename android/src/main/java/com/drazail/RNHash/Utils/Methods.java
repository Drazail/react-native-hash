package com.drazail.RNHash.Utils;

import android.util.Log;

import com.facebook.react.bridge.Promise;

import java.io.InputStream;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import static javax.crypto.Mac.getInstance;

final public class Methods {

    // helpers

    private static final char[] HEX_ARRAY = "0123456789ABCDEF".toCharArray();

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

    public static void hash(InputStream inputStream, String algorithm, Promise promise) throws Exception {
        try {

            MessageDigest md = MessageDigest.getInstance(algorithm);


            byte[] buffer = new byte[1024 * 10]; // 10 KB Buffer

            int read;
            while ((read = inputStream.read(buffer)) != -1) {
                md.update(buffer, 0, read);
            }

            StringBuilder hexString = new StringBuilder();
            for (byte digestByte : md.digest())
                hexString.append(String.format("%02x", digestByte));

            promise.resolve(hexString.toString());
        } catch (Exception ex) {
            throw new Exception(ex);
        }
    }

    public static void hmac(String message, String key, String algorithm, Promise promise) {
        try {

            byte[] keyBytes = key.getBytes();
            byte[] messageBytes = message.getBytes();

            Mac mac = getInstance(algorithm);
            mac.init(new SecretKeySpec(keyBytes, algorithm));
            byte[] finalBytes = mac.doFinal(messageBytes);

            final String messageDigest = bytesToHex(finalBytes);

            Log.i("RNHASH", "message digest: " + messageDigest);
            promise.resolve(messageDigest);

        } catch (Exception e) {
            e.printStackTrace();
            promise.reject(e);
        }
    }

}
