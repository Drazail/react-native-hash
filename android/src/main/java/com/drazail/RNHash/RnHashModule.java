package com.drazail.RNHash;

import androidx.annotation.NonNull;

import com.drazail.RNHash.C.errorMessages;
import com.drazail.RNHash.Utils.EventEmitter;
import com.drazail.RNHash.Utils.FS;
import com.drazail.RNHash.Utils.ToRunnable;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
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

    @NonNull
    @Override
    public String getName() {
        return "RNHash";
    }

    @ReactMethod
    public void hashFilesForFolder(
            String uri, String algorithm, int minFileSize, int maxFileSize, String extensionFilter, int batchSize, int delay, final Promise callback) {

        try {
            ToRunnable runnable = new ToRunnable(() -> {
                try {

                    File file = new File(uri);

                    if (file.isDirectory()) {
                        WritableNativeMap hashMap = new WritableNativeMap();
                        List<String> filesPaths = new ArrayList<>();
                        int batchNumber = 0;
                        int totalFiles;
                        int batchedFiles = 0;
                        FS.listFilesForFolder(
                                new File(uri), minFileSize, maxFileSize, extensionFilter, filesPaths);
                        totalFiles = filesPaths.size();
                        for (String s : filesPaths) {
                            FileInputStream inputStream = new FileInputStream(s);
                            hashMap.putString(s, hash(inputStream, algorithm));
                            batchedFiles += 1;
                            if (batchSize != -1 && batchedFiles >= batchSize && (batchNumber * batchSize) + batchedFiles < totalFiles) {
                                Thread.sleep(delay);
                                WritableNativeMap batch = new WritableNativeMap();
                                batch.putInt("FilesCount", totalFiles);
                                batch.putBoolean("isFinalBatch", false);
                                batch.putInt("batchNumber", batchNumber);
                                batch.putMap("results", hashMap);
                                EventEmitter.emit(RnHashModule.super.getReactApplicationContext(), C.eventName, batch);
                                batchedFiles = 0;
                                batchNumber += 1;
                                hashMap = new WritableNativeMap();
                            }
                            if (batchSize != -1 && (batchNumber * batchSize) + batchedFiles >= totalFiles) {
                                Thread.sleep(delay);
                                WritableNativeMap finalBatch = new WritableNativeMap();
                                finalBatch.putInt("FilesCount", totalFiles);
                                finalBatch.putBoolean("isFinalBatch", true);
                                finalBatch.putInt("batchNumber", batchNumber);
                                finalBatch.putMap("results", hashMap);
                                EventEmitter.emit(RnHashModule.super.getReactApplicationContext(), C.eventName, finalBatch);
                                callback.resolve(null);
                            }
                        }

                        if (batchSize == -1) {
                            WritableNativeMap batch = new WritableNativeMap();
                            batch.putInt("FilesCount", totalFiles);
                            batch.putBoolean("isFinalBatch", true);
                            batch.putInt("batchNumber", 0);
                            batch.putMap("results", hashMap);
                            callback.resolve(batch);
                        }


                    }

                    if (!file.exists()) {
                        String message = C.errorMessages.FileNotFound.name();
                        rejectFileNotFound(callback, message);
                    }

                    if (file.exists() && !file.isDirectory()) {
                        FileInputStream inputStream = new FileInputStream(uri);
                        String hash = hash(inputStream, algorithm);
                        WritableNativeMap hashMap = new WritableNativeMap();
                        hashMap.putString("results", hash);
                        WritableNativeMap batch = new WritableNativeMap();
                        batch.putInt("FilesCount", 1);
                        batch.putBoolean("isFinalBatch", true);
                        batch.putInt("batchNumber", 0);
                        batch.putMap("results", hashMap);
                        callback.resolve(batch);
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
    public void hashFilesForFolders(
            ReadableArray uris, String algorithm, int minFileSize, int maxFileSize, String extensionFilter, int batchSize, int delay, final Promise callback) {

        ToRunnable runnable = new ToRunnable(() -> {
            try {
                List<String> filesPaths = new ArrayList<>();
                int totalFiles;
                int batchNumber = 0;
                int batchedFiles = 0;
                WritableNativeMap hashMap = new WritableNativeMap();

                for (int i = 0; i < uris.size(); i++) {
                    String uri = uris.getString(i);
                    FS.listFilesForFolder(
                            new File(uri), minFileSize, maxFileSize, extensionFilter, filesPaths);
                }

                totalFiles = filesPaths.size();
                if (batchSize != -1 && totalFiles == 0) {
                    WritableNativeMap finalBatch = new WritableNativeMap();
                    finalBatch.putInt("FilesCount", totalFiles);
                    finalBatch.putBoolean("isFinalBatch", true);
                    finalBatch.putInt("batchNumber", batchNumber);
                    finalBatch.putMap("results", hashMap);
                    EventEmitter.emit(RnHashModule.super.getReactApplicationContext(), C.eventName, finalBatch);
                    callback.resolve(null);
                    return;
                }
                for (int i = 0; i < totalFiles; i++) {


                    String uri = filesPaths.get(i);
                    FileInputStream inputStream = new FileInputStream(uri);
                    hashMap.putString(uri, hash(inputStream, algorithm));
                    batchedFiles += 1;


                    if (batchSize != -1 && batchedFiles >= batchSize && (batchNumber * batchSize) + batchedFiles < totalFiles) {
                        Thread.sleep(delay);
                        WritableNativeMap batch = new WritableNativeMap();
                        batch.putInt("FilesCount", totalFiles);
                        batch.putBoolean("isFinalBatch", false);
                        batch.putInt("batchNumber", batchNumber);
                        batch.putMap("results", hashMap);
                        EventEmitter.emit(RnHashModule.super.getReactApplicationContext(), C.eventName, batch);
                        batchedFiles = 0;
                        batchNumber += 1;
                        hashMap = new WritableNativeMap();
                    }

                    if (batchSize != -1 && (batchNumber * batchSize) + batchedFiles >= totalFiles) {
                        Thread.sleep(delay);
                        WritableNativeMap finalBatch = new WritableNativeMap();
                        finalBatch.putInt("FilesCount", totalFiles);
                        finalBatch.putBoolean("isFinalBatch", true);
                        finalBatch.putInt("batchNumber", batchNumber);
                        finalBatch.putMap("results", hashMap);
                        EventEmitter.emit(RnHashModule.super.getReactApplicationContext(), C.eventName, finalBatch);
                        callback.resolve(null);
                    }

                    if (batchSize == -1) {
                        WritableNativeMap batch = new WritableNativeMap();
                        batch.putInt("FilesCount", totalFiles);
                        batch.putBoolean("isFinalBatch", true);
                        batch.putInt("batchNumber", 0);
                        batch.putMap("results", hashMap);
                        callback.resolve(batch);
                    }


                }
            } catch (Exception e) {
                e.printStackTrace();
                callback.reject(e);
            }
        });

        runnable.run();
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
