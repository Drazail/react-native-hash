package com.drazail.RNHash.Utils;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;

import java.util.HashMap;

public class C {

    private String[] SecretKeys;
    private HashMap<String, String> hashAlgorithms;
    private HashMap<String, String> HmacAlgorithms;
    private String[] expectedSHA224Map;
    private String[] expectedSHA256Map;
    private String[] expectedSHA384Map;
    private String[] expectedSHA512Map;
    private String[] expectedHmacSha1Map;
    private String[] expectedHmacSha224Map;
    private String[] expectedHmacSha256Map;
    private String[] expectedHmacSha384Map;
    private String[] expectedHmacSha512Map;
    private String[] expectedHmacMD5Map;
    private String[] expectedSHA1Map;
    private String[] expectedMD5Map;
    private String[] inputArray;
    private Promise promise;
    private String[] result;

    public C() {

        this.SecretKeys = new String[]{
                "SecretKey"
        };

        this.hashAlgorithms = new HashMap<String, String>();
        this.hashAlgorithms.put("MD5", "MD5");
        this.hashAlgorithms.put("SHA1", "SHA-1");
        this.hashAlgorithms.put("SHA224", "SHA-224");
        this.hashAlgorithms.put("SHA256", "SHA-256");
        this.hashAlgorithms.put("SHA384", "SHA-384");
        this.hashAlgorithms.put("SHA512", "SHA-512");


        this.HmacAlgorithms = new HashMap<String, String>();
        this.HmacAlgorithms.put("HmacSha1", "HmacSha1");
        this.HmacAlgorithms.put("HmacSha224", "HmacSha224");
        this.HmacAlgorithms.put("HmacSha256", "HmacSha256");
        this.HmacAlgorithms.put("HmacSha384", "HmacSha384");
        this.HmacAlgorithms.put("HmacSha512", "HmacSha512");
        this.HmacAlgorithms.put("HmacMD5", "HmacMD5");


        this.inputArray = new String[]{
                "us9zV8OHDVBaQH479jDT",
                "jaTFoWMDx3r8Yqm7Cxgw",
                "Z6ISc5vJn8NESCNXwQKz",
        };
        this.expectedMD5Map = new String[]{
                "1fc961987882c62662dbc39f852ec865",
                "a29d1b726173cbfee272607e74d64f6e",
                "d95a4dba042c2b032de34cea9f9d0900",
        };
        this.expectedSHA1Map = new String[]{
                "3b13aaa4b9db23c447f5980ddb21edc728a2a1c7",
                "12a0c65edc236e265c7e0cd640b0a8f2122622b6",
                "646cdd03818d7e6d63303afd167855e77eb46dfb",
        };
        this.expectedSHA224Map = new String[]{
                "54a2e24de0cb2c6b72344b4b98b2a66f149b8c718ff4fb4b9f500776",
                "57f120c3587d539d6c6fc8d39e9cf20e47d2fdcb57e749f0563dc15d",
                "538f439a4f02a0406b1d5fb079f67e52fb4128cde5833f7c938f6ef8",
        };
        this.expectedSHA256Map = new String[]{
                "c5b228819cadb84f6942b2d6ba92f9c81216f9b134cb7ede7f5a80ab3a12d7c5",
                "2bc90ac81c7b2dcdf2e7ef0b7b8380992f90592fe6d695cd8f766f3fe6685475",
                "e68eb79005e1e83645f810d4c6a0629cc9ea646dec53c21f462d6c58c0633eb2",
        };
        this.expectedSHA384Map = new String[]{
                "5ea03fd45506de1ac5bd25579db9ddfe5b6ccc209c25b476f91ec0d1b559cda69207adac1a9bbbcd65016301c2343972",
                "135fa6735a17a9ffb19d34c857355356cfbc88d2196489444f43511d8ec4e9946b60dcf03220a7a27f36178a78c7ea07",
                "715d531c518cf721bf6621e8b138cd2cfe34ea0a5759c83835b8c11cb2314d7a8fe0cd0118af70583ed44a3fe0bbd42d",
        };
        this.expectedSHA512Map = new String[]{
                "74079d0ffcf78a71a028cf7fbf24ddf41917c970e1668cc996d7bc2e15df37477e9d2e92c23b675c251e037cac4fa85e9fb167472caba87bb171b4d0b41b286f",
                "79ea731298bb5c14183227a6c365b18f9537d0ab810dd2cb16a51987731a6c68e0278b12ccb46b846dda4ec6c432c526afd7d413913a393ff584fbada113d3dd",
                "2e5365915acae419f1e67acee8ae09b09305bc51454cbd06db9f51aa060c7b4025ea12581888e0a2967881be97451525b7812cb9dfa5a1121808bd5310fd1887",
        };

        /**
         * expected HMAC outPut maps
         */
        this.expectedHmacSha1Map = new String[]{
                "a10243addc246736db4789abcf43851678635d88",
                "83f6f2aa70502e442b68c81e8507a30520318505",
                "9b94353b9ce379a5b2fb00151ba234c4cf5b7b13",

        };
        this.expectedHmacSha224Map = new String[]{
                "53c806b54a6f27b31e7e7f0d5860837ef08992d4854c4f632113b8f8",
                "23d975ecbe4c45f9ecc7826f94494fb5b95d10d2e58ef422dd8a2fe7",
                "f0bcb13f422bedde9ac5b446cec301c34f35e2bab2791bb305c1ddd3",
        };
        this.expectedHmacSha256Map = new String[]{
                "4897d258ad80d91b937a512185a00286b6a7cdbb24d5f117266d25915d8352e7",
                "2104295906bb6b69722cd6350ebb7de47840da946830c9fdc8bf417be6efdefd",
                "374f1b9067bef2a7603528761ab6b122247edda8536b63212b337e8b0ec0ff09",
        };
        this.expectedHmacSha384Map = new String[]{
                "93348d6f3560dffd06447a2bf880fe22e7d32cf79a880611035a98bb3bbf435a3cc42222e8019c89395a87c6018d9a68",
                "fd2e7bb5ba0f7083f1efba8efadf5770f0d958d24ce41771e453f3c7c21727c01b3f5049c72e7511f5efe0803f985323",
                "c26ea7c941de3f619467cd612e3a0cf4ce067c2b44add8cf12605b41e0c403f72bd56d2cc37997ed2d8287441fd9d501",
        };
        this.expectedHmacSha512Map = new String[]{
                "8dee6c55848c26b97b2e6da2ed6bb62122818689e8827427d553858c98a1bab579dbcebadc2d44a28765cfdff3a136cd568ad4ce0593707c386dc358d7f22409",
                "fb0d56555bf6c366cfa4f6cf4f0487032cf32396bea5999498a739eb6c3058c833d5f0f2df00b24863060f8bbd710d02923815787fcc537eb791785b1d43618b",
                "97c1bb4b43ba62d387165b43e8f792ba38d7f9437528e80dcd6ef2acc3c0559fad85d499d53de5ebc8e107508a39ae0327ca2554b4f46d2b0d9c135838ef9cfa",
        };
        this.expectedHmacMD5Map = new String[]{
                "748889632936ea35596b7b168b091c46",
                "ea46c9997bbb207d708ebd3803a95c95",
                "a5b781d647c9c543bde19a8f72e66f78",

        };


    }

    public HashMap<String, String> getHmacAlgorithms() {
        return HmacAlgorithms;
    }

    public String[] getSecretKeys() {
        return SecretKeys;
    }

    public HashMap<String, String> getHashAlgorithms() {
        return hashAlgorithms;
    }

    public String[] getInputArray() {
        return inputArray;
    }

    public String[] getExpectedSHA224Map() {
        return expectedSHA224Map;
    }

    public String[] getExpectedSHA256Map() {
        return expectedSHA256Map;
    }

    public String[] getExpectedSHA384Map() {
        return expectedSHA384Map;
    }

    public String[] getExpectedSHA512Map() {
        return expectedSHA512Map;
    }

    public String[] getExpectedHmacSha1Map() {
        return expectedHmacSha1Map;
    }

    public String[] getExpectedHmacSha224Map() {
        return expectedHmacSha224Map;
    }

    public String[] getExpectedHmacSha256Map() {
        return expectedHmacSha256Map;
    }

    public String[] getExpectedHmacSha384Map() {
        return expectedHmacSha384Map;
    }

    public String[] getExpectedHmacSha512Map() {
        return expectedHmacSha512Map;
    }

    public String[] getExpectedHmacMD5Map() {
        return expectedHmacMD5Map;
    }

    public String[] getExpectedSHA1Map() {
        return expectedSHA1Map;
    }

    public String[] getExpectedMD5Map() {
        return expectedMD5Map;
    }

}
