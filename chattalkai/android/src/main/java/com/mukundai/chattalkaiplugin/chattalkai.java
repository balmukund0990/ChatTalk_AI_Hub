package com.mukundai.chattalkaiplugin;

import com.getcapacitor.Logger;

public class chattalkai {

    public String echo(String value) {
        Logger.info("Echo", value);
        return value;
    }
}
