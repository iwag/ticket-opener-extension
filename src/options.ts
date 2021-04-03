import { browser } from "webextension-polyfill-ts";


const baseUrlInput = document.querySelector("#base_url");
const keyInput = document.querySelector("#keys");

/*
Store the currently selected settings using browser.storage.local.
*/
function storeSettings() {
  browser.storage.local.set({
    settings: {
      baseurl: baseUrlInput?.nodeValue,
      keys: keyInput?.nodeValue
    }
  });
}

function updateUI(restoredSettings) {
  if (baseUrlInput)
    baseUrlInput.nodeValue = restoredSettings.settings.baseurl || "";
  if (keyInput)
    keyInput.nodeValue = restoredSettings.settings.keys || "";
}

const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(updateUI);
// gettingStoredSettings.then(updateUI, (e: any) => {console.error(e)});


baseUrlInput?.addEventListener("blur", storeSettings);
keyInput?.addEventListener("blur", storeSettings);