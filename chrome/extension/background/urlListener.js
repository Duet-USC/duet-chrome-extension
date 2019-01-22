// check if current URL is a match
// function checkURLForMatch(urlString) {
// 	console.log('checkURLForMatch() called: ' + urlString);
// 	// TODO: compare url string to database entries
// 	if (urlString.includes('amazon.com')) {
// 		return 1;
// 	}
// 	else {
// 		return 0;
// 	}
// }

// function updateStateFromURL(urlString) {
// 	console.log('updateStateFromURL() called: ' + urlString);
// 	let isMatch = checkURLForMatch(urlString);
// 	if (isMatch) {
// 		chrome.storage.local.set({isMatch: 1});
// 	}
// 	else {
// 		chrome.storage.local.set({isMatch: 0});
// 	}
// }

// update current tab listener
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	checkCurrentTab();
});

// switch active tab listener
chrome.tabs.onActivated.addListener(function(activeInfo) {
	checkCurrentTab();
});

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

// Check current tab and udpate notification badge
function checkCurrentTab() {
	chrome.tabs.query({
	  active: true,
	  currentWindow: true
	}, function(tabs) {
	  var tab = tabs[0];
	  var url = tab.url;
	  console.log('Updating state from URL: ', url);
	  // updateStateFromURL(url);

	  let match = isMatch(url);

		if (match) {
			chrome.storage.local.set({isMatch: 1});
			chrome.browserAction.setBadgeText({ text: '1' });
		}
		else {
			chrome.storage.local.set({isMatch: 0});
			chrome.browserAction.setBadgeText({ text: '' });
		}
	});
}
