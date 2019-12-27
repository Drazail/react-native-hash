package com.drazail.RNHash;

import com.drazail.RNHash.C.errorMessages;
import com.drazail.RNHash.Utils.ToRunnable;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.net.URL;

import static com.drazail.RNHash.Utils.Methods.hash;
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
    public void hashFile(String uri, String algorithm,  final Promise callback) {

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

            hash(inputStream,algorithm,callback);
        } catch (FileNotFoundException e) {
            String message = e.getMessage();

            if (message.equals(errorMessages.isDirectory.name())){
                rejectFileIsDirectory(callback);
            }
            else {
                rejectFileNotFound(callback, uri);
            }
        } catch (Exception e) {
            callback.reject(e);
        }
    }

    @ReactMethod
    public void hashUrl(String url, String algorithm,  final Promise callback) {

        try {
            InputStream inputStream = new URL(url).openStream();
            ToRunnable runnable = new ToRunnable(()->{
                try {
                    hash(inputStream,algorithm,callback);
                } catch (Exception e) {
                    callback.reject(e);
                }
            });
            runnable.run();

        } catch (Exception e) {
            callback.reject(e);
        }
    }

    @ReactMethod
    public void hashString(String string, String algorithm,  final Promise callback) {

        try {
            InputStream inputStream = new ByteArrayInputStream(string.getBytes());
            hash(inputStream,algorithm,callback);
        } catch (Exception e) {
            callback.reject(e);
        }
    }
}
