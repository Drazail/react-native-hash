package com.drazail.RNHash.Utils;

import com.facebook.react.bridge.Promise;

public class ToRunnable implements Runnable {

    private Runnable task;

    public ToRunnable(Runnable task) {
        this.task = task;

    }

    public void run() {
        new Thread(task).start();
    }
}