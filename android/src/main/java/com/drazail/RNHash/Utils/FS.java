package com.drazail.RNHash.Utils;

import java.io.File;
import java.util.HashSet;
import java.util.Set;

public class FS {

    public static Set<String> listFilesForFolder(File folder){
        Set<String> pathSet = new HashSet<>();
        for (final File fileEntry : folder.listFiles()) {
            if (fileEntry.isDirectory()) {
                listFilesForFolder(fileEntry);
            } else {
                pathSet.add(fileEntry.getAbsolutePath());
            }
        }
        return pathSet;
    }
}
