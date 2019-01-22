// // note: todos state is stored in chrome.storage.local
// chrome.storage.local.get('todos', (obj) => {
//   let todos = obj.todos;
//   if (todos) {
//     todos = JSON.parse(todos);
//     const len = todos.filter(todo => !todo.marked).length;
//     if (len > 0) {
//       chrome.browserAction.setBadgeText({ text: len.toString() });
//     }
//   } else {
//     // Initial
//     // chrome.browserAction.setBadgeText({ text: '1' });
//   }
// });

chrome.storage.local.get(['isMatch'], (result) => {
  let isMatch = result.isMatch;
  if (isMatch) {
    chrome.browserAction.setBadgeText({ text: '1' });
  } else {
    chrome.browserAction.setBadgeText({ text: '' });
  }
});