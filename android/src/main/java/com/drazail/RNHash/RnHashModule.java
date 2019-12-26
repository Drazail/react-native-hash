package com.drazail.RNHash;

import com.drazail.RNHash.C.errorMessages;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.FileNotFoundException;

import static com.drazail.RNHash.Utils.Methods.hashByUri;
import static com.drazail.RNHash.Utils.RejectionExceptions.reject;
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
            hashByUri(uri,algorithm,callback);
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
}
