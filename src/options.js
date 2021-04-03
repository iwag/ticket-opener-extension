var browser = require("webextension-polyfill");

const baseUrlInput = document.querySelector("#username");
const keyInput = document.querySelector("#password");

/*
Store the currently selected settings using browser.storage.local.
*/
function storeSettings() {
  browser.storage.local.set({
    settings: {
      baseurl: baseUrlInput.value,
      keys: keyInput.value
    }
  });
}

/*
Update the options UI with the settings values retrieved from storage,
or the default settings if the stored settings are empty.
*/
function updateUI(restoredSettings) {
    baseUrlInput.value = restoredSettings.settings.baseurl || "";
    keyInput.value = restoredSettings.settings.keys || "";
}

function onError(e) {
  console.error(e);
}

/*
On opening the options page, fetch stored settings and update the UI with them.
*/
const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(updateUI, onError);

/*
On blur, save the currently selected settings.
*/
baseUrlInput.addEventListener("blur", storeSettings);
keyInput.addEventListener("blur", storeSettings);