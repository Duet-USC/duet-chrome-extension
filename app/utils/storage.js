function saveState(state) {
  chrome.storage.local.set({ state: JSON.stringify(state) });
}

// todos unmarked count
// function setBadge(todos) {
//   if (chrome.browserAction) {
//     const count = todos.filter(todo => !todo.marked).length;
//     chrome.browserAction.setBadgeText({ text: count > 0 ? count.toString() : '' });
//   }
// }


// todos unmarked count
function setBadge(isMatch) {
  if (chrome.browserAction) {
    chrome.browserAction.setBadgeText({ text: isMatch ? '1' : '' });
  }
}

export default function () {
  return next => (reducer, initialState) => {
    const store = next(reducer, initialState);
    console.log(store);
    store.subscribe(() => {
      const state = store.getState();
      saveState(state);
      setBadge(state.isMatch);
    });
    return store;
  };
}
