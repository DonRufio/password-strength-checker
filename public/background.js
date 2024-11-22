chrome.commands.onCommand.addListener((command) => {
    if (command === "open-extension") {
      chrome.action.openPopup(); // Triggers the extension popup
    }
  });