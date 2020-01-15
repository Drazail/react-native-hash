package com.drazail.RNHash.Utils;

import com.facebook.react.bridge.Promise;

public class RejectionExceptions extends Exception {

    private String code;

    public RejectionExceptions(String code, String message) {
        super(message);
        this.code = code;
    }

    public static void rejectFileIsDirectory(Promise promise) {
        promise.reject("RNH", "RNH: illegal operation on a directory, read");
    }

    public static void rejectFileNotFound(Promise promise, String filepath) {
        promise.reject("RNH", "RNH: no such file or directory, open '" + filepath + "'");
    }
}
