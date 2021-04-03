import { browser } from "webextension-polyfill-ts";

var authCredentials = {
    username: "user",
    password: "passwd"
  }
  
  /*
  On startup, check whether we have stored settings.
  If we don't, then store the default settings.
  */
  function checkStoredSettings(storedSettings: { settings: any; }) {
    if (!storedSettings.settings) {
      browser.storage.local.set({authCredentials});
    }
  }
  
//  const gettingStoredSettings = browser.storage.local.get();
//  gettingStoredSettings.then(checkStoredSettings, onError);