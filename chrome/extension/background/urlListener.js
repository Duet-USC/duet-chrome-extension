// check if current URL is a match
	// TODO: check seach query keywords,
	// look for a match in our database
function isMatch(url) {
	if (url.includes('amazon.com')) {
		return 1;
	} else {
		return 0;
	}
}

// Check current tab and...
	// update chrome.storage.local.[url, isMatch], update notification badge
function checkCurrentTab() {
	chrome.tabs.query({"active": true, "currentWindow": true, "windowType": "normal"}, tabs => {
		var tab = tabs[0];

		// popup/devTools windows ran result in null tab variable
		if (!tab) { return; }

		// get current URL
		var currentURL = tab.url; 
		console.log('Updating state from URL: ' + currentURL);
		chrome.storage.local.set({'url': currentURL});

		// check if URL matches a refugee need
		var match = isMatch(currentURL);
		// update chrome.storage.local.isMatch
		chrome.storage.local.set({'isMatch': match});
		// update notification badge
		chrome.browserAction.setBadgeText({ text: match ? '1' : ''});
	});
}

// update current tab listener
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	checkCurrentTab();
});

// switch active tab listener
chrome.tabs.onActivated.addListener(function(activeInfo) {
	checkCurrentTab();
});