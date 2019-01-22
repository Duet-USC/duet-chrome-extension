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

chrome.tabs.query({
  active: true,
  currentWindow: true
}, function(tabs) {
  var tab = tabs[0];
  var url = tab.url;
  console.log('Updating state from URL: ', url);
  // updateStateFromURL(url);

  let isMatch = url.includes('amazon.com');
	if (isMatch) {
		chrome.storage.local.set({isMatch: 1});
	}
	else {
		chrome.storage.local.set({isMatch: 0});
	}
});