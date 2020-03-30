package com.drazail.RNHash.Utils;

import java.io.File;
import java.util.List;

public class FS {

    public static void listFilesForFolder(File folder, int minFileSize, int maxFileSize, String extensionFilter, List<String> list) {

        for (final File fileEntry : folder.listFiles()) {
            if (fileEntry.isDirectory()) {
                listFilesForFolder(fileEntry, minFileSize, maxFileSize, extensionFilter, list);
            } else {

                long fileSize = fileEntry.length();
                if (
                        fileSize < maxFileSize && fileSize > minFileSize &&
                                fileEntry.toString().toLowerCase().endsWith(extensionFilter)
                )
                    list.add(fileEntry.getAbsolutePath());
            }
        }
    }
}
