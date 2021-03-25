var browser = require("webextension-polyfill");

// Provide help text to the user.
browser.omnibox.setDefaultSuggestion({
  description: `Search the firefox codebase
    (e.g. "hello world" | "path:omnibox.js onInputChanged")`
});

function onError(e) {
    console.error(e);
}

browser.omnibox.onInputChanged.addListener((text, addSuggestions) => {
    browser.storage.local.get().then((settings)=> {
  
        if (!text || text === "") {
            browser.omnibox.setDefaultSuggestion({description: "Type key."});
          } else {  
            browser.omnibox.setDefaultSuggestion({description: "?"});
            const key = settings.settings.keys
            const baseUrl = settings.settings.baseurl
            const url =  (new URL(`/view/${key}-${text}`, baseUrl)).toString()
            const suggestResults = [{
              description: url,
              content: url,
            }];
            addSuggestions(suggestResults);
          }
    }, onError)
});

browser.omnibox.onInputEntered.addListener((text, disposition) => {
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
