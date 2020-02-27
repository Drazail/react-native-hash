package com.drazail.RNHash;

import com.drazail.RNHash.C.errorMessages;
import com.drazail.RNHash.Utils.FS;
import com.drazail.RNHash.Utils.ToRunnable;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.WritableNativeMap;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import static com.drazail.RNHash.Utils.Methods.hash;
import static com.drazail.RNHash.Utils.Methods.hmac;
import static com.drazail.RNHash.Utils.RejectionExceptions.rejectFileIsDirectory;
import static com.drazail.RNHash.Utils.RejectionExceptions.rejectFileNotFound;

public class RnHashModule extends ReactContextBaseJavaModule {


    public RnHashModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RNHash";
    }

    @ReactMethod
    public void hashFilesForFolder(
            String uri, String algorithm, int minFileSize, int maxFileSize, String extensionFilter, final Promise callback) {

        try {
            ToRunnable runnable = new ToRunnable(() -> {
                try {

                    File file = new File(uri);

                    if (file.isDirectory()) {
                        WritableNativeMap hashMap = new WritableNativeMap();
                        List<String> filesPaths = new ArrayList<>();
                        filesPaths = FS.listFilesForFolder(
                                new File(uri), minFileSize, maxFileSize, extensionFilter, filesPaths);
                        for (String s : filesPaths) {
                            FileInputStream inputStream = new FileInputStream(s);
                            hashMap.putString(s, hash(inputStream, algorithm));
                        }
                        callback.resolve(hashMap);
                    }

                    if (!file.exists()) {
                        String message = C.errorMessages.FileNotFound.name();
                        callback.reject(new FileNotFoundException());
                    }

                    if (file.exists() && !file.isDirectory()) {
                        FileInputStream inputStream = new FileInputStream(uri);
                        callback.resolve(hash(inputStream, algorithm));
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    callback.reject(e);
                }
            });

            runnable.run();

        } catch (Exception e) {
            e.printStackTrace();
            callback.reject(e);
        }
    }

    @ReactMethod
    public void hashFile(String uri, String algorithm, final Promise callback) {

        try {
            File file = new File(uri);

            if (file.isDirectory()) {
                String message = C.errorMessages.isDirectory.name();
                throw new FileNotFoundException(message);
            }

            if (!file.exists()) {
                String message = C.errorMessages.FileNotFound.name();
                throw new FileNotFoundException(message);
            }
            FileInputStream inputStream = new FileInputStream(uri);

            callback.resolve(hash(inputStream, algorithm));
        } catch (FileNotFoundException e) {
            String message = e.getMessage();

            if (message.equals(errorMessages.isDirectory.name())) {
                rejectFileIsDirectory(callback);
            } else {
                rejectFileNotFound(callback, uri);
            }
        } catch (Exception e) {
            e.printStackTrace();
            callback.reject(e);
        }
    }

    @ReactMethod
    public void hashUrl(String url, String method, ReadableMap headers, String algorithm, final Promise callback) {


        try {
            ToRunnable runnable = new ToRunnable(() -> {
                try {
                    HttpURLConnection connection;
                    URL target = new URL(url);
                    connection = (HttpURLConnection) target.openConnection();
                    connection.setRequestMethod(method);
                    for (
                            ReadableMapKeySetIterator keyIterator = headers.keySetIterator();
                            keyIterator.hasNextKey();
                    ) {
                        String key = keyIterator.nextKey();
                        connection.setRequestProperty(key, headers.getString(key));
                    }

                    InputStream inputStream = connection.getInputStream();
                    callback.resolve(hash(inputStream, algorithm));
                } catch (Exception e) {
                    callback.reject(e);
                }
            });
            runnable.run();
        } catch (Exception e) {
            e.printStackTrace();
            callback.reject(e);
        }
    }

    @ReactMethod
    public void hashString(String string, String algorithm, final Promise callback) {

        try {
            InputStream inputStream = new ByteArrayInputStream(string.getBytes());
            callback.resolve(hash(inputStream, algorithm));
        } catch (Exception e) {
            e.printStackTrace();
            callback.reject(e);
        }
    }

    @ReactMethod
    public void generateHmac(String message, String key, String algorithm, final Promise callback) {

        try {
            callback.resolve(hmac(message, key, algorithm));
        } catch (Exception e) {
            e.printStackTrace();
            callback.reject(e);
        }
    }
}
