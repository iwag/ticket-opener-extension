import { browser } from "webextension-polyfill-ts";

// Provide help text to the user.
browser.omnibox.setDefaultSuggestion({
  description: `Open the ticket by No
    (e.g. "1234")`
});

function onError(e: any) {
    console.error(e);
}

browser.omnibox.onInputChanged.addListener((text: string, addSuggestions: (arg0: { description: string; content: string; }[]) => void) => {
    browser.storage.local.get().then((settings)=> {
  
        if (!text || text === "") {
            browser.omnibox.setDefaultSuggestion({description: "Type No."});
          } else {  
            browser.omnibox.setDefaultSuggestion({description: "?"});
            const keys = settings.settings.keys
            const baseUrl = settings.settings.baseurl
            for (const key of keys.trim().split(",")) {
              const url =  (new URL(`${key}-${text}`, baseUrl)).toString()
              const suggestResults = [{
                description: url,
                content: url,
              }];
              addSuggestions(suggestResults);
            }
          }
    }, onError)
});

browser.omnibox.onInputEntered.addListener((text: any, disposition: any) => {
  let url = text;
  switch (disposition) {
    case "currentTab":
      browser.tabs.update({url});
      break;
    case "newForegroundTab":
      browser.tabs.create({url});
      break;
    case "newBackgroundTab":
      browser.tabs.create({url, active: false});
      break;
  }
});
