package com.drazail.RNHash.Utils;

import com.drazail.RNHash.C;
import com.facebook.react.bridge.Promise;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.security.MessageDigest;
import java.util.HashMap;
import java.util.Map;

final public class Methods {
    public static void hashByUri(String filepath, String algorithm, Promise promise) throws Exception {
        try {
            Map<String, String> algorithms = new HashMap<>();

            algorithms.put("md2", "MD2");
            algorithms.put("md5", "MD5");
            algorithms.put("sha1", "SHA-1");
            algorithms.put("sha224", "SHA-224");
            algorithms.put("sha256", "SHA-256");
            algorithms.put("sha384", "SHA-384");
            algorithms.put("sha512", "SHA-512");

            if (!algorithms.containsKey(algorithm)) throw new Exception("Invalid hash algorithm");

            File file = new File(filepath);

            if (file.isDirectory()) {
                String message = C.errorMessages.isDirectory.name();
                throw new FileNotFoundException(message);
            }

            if (!file.exists()) {
                String message = C.errorMessages.FileNotFound.name();
                throw new FileNotFoundException(message);
            }

            MessageDigest md = MessageDigest.getInstance(algorithms.get(algorithm));

            FileInputStream inputStream = new FileInputStream(filepath);
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

    }
