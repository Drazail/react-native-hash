package com.drazail.RNHash.Utils;

import com.facebook.react.bridge.Promise;
import java.io.FileNotFoundException;

public class RejectionExceptions extends Exception {

    private String code;

    public RejectionExceptions(String code, String message) {
        super(message);
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public static void rejectFileIsDirectory(Promise promise) {
        promise.reject("RNH", "RNH: illegal operation on a directory, read");
    }

    public static void rejectFileNotFound(Promise promise, String filepath) {
        promise.reject("RNH", "RNH: no such file or directory, open '" + filepath + "'");
    }

    public static void reject(Promise promise, String filepath, Exception ex) {
        if (ex instanceof FileNotFoundException) {
            rejectFileNotFound(promise, filepath);
            return;
        }
        if (ex instanceof RejectionExceptions) {
            RejectionExceptions ioRejectionException = (RejectionExceptions) ex;
            promise.reject(ioRejectionException.getCode(), ioRejectionException.getMessage());
            return;
        }
    }
}
