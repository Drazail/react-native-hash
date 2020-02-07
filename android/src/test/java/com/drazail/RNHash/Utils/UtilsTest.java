package com.drazail.RNHash.Utils;

import com.facebook.react.bridge.Promise;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;

import static com.drazail.RNHash.Utils.Methods.hash;
import static com.drazail.RNHash.Utils.Methods.hmac;
import static org.junit.jupiter.api.Assertions.fail;

class UtilsTest {

    private C constants = new C();

    private String[] keys = constants.getSecretKeys();
    private String[] messages = constants.getInputArray();
    private HashMap<String,String> hashAlgorithms = constants.getHashAlgorithms();
    private HashMap<String,String> HmacAlgorithms = constants.getHmacAlgorithms();
    private Promise promise = constants.getPromise();


    private Method aGgetter(String methodName) {
        try {
            return constants.getClass().getMethod(methodName);
        } catch (NoSuchMethodException e) {
            fail(e);
        }
        return null;
    }

    @Test
    void testHmac() {
        for (String key: keys) {
            HmacAlgorithms.forEach((k,v)->{
                int n = 0;
                for (String message : messages) {
                    hmac(message, key, v, promise);
                    Method getter = aGgetter("getExpected" + k + "Map");
                    assert getter != null;
                    String[] expected = new String[0];
                    try {
                        expected = (String[]) getter.invoke(constants);
                    } catch (IllegalAccessException e) {
                        fail(e);
                    } catch (InvocationTargetException e) {
                        fail(e);
                    }
                    Assertions.assertEquals(constants.getResult()[0], expected[n]);
                    n ++;
                }
            });
        }
    }

    @Test
    void testHash() {
        for (String key: keys) {
            hashAlgorithms.forEach((k, v) -> {
                int n = 0;
                for (String message : messages) {
                    InputStream inputStream = new ByteArrayInputStream(message.getBytes());
                    try {
                        hash(inputStream, v, promise);
                    } catch (Exception e) {
                        fail(e);
                    }
                    Method getter = aGgetter("getExpected" + k + "Map");
                    assert getter != null;
                    String[] expected = new String[0];
                    try {
                        expected = (String[]) getter.invoke(constants);
                    } catch (IllegalAccessException e) {
                        fail(e);
                    } catch (InvocationTargetException e) {
                        fail(e);
                    }
                    Assertions.assertEquals(constants.getResult()[0], expected[n]);
                    n++;
                }
            });
        }
    }
}
