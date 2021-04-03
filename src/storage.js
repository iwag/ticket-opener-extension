var browser = require("webextension-polyfill");

var authCredentials = {
    username: "user",
    password: "passwd"
  }
  
  /*
  Generic error logger.
  */
  function onError(e) {
    console.error(e);
  }
  
  /*
  On startup, check whether we have stored settings.
  If we don't, then store the default settings.
  */
  function checkStoredSettings(storedSettings) {
    if (!storedSettings.settings) {
      browser.storage.local.set({authCredentials});
    }
  }
  
  const gettingStoredSettings = browser.storage.local.get();
  gettingStoredSettings.then(checkStoredSettings, onError);