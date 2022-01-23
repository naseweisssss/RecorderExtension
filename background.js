// let color = '#3aa757';

function getActiveTab() {
  return chrome.tabs.query({active: true, currentWindow: true});
}

//when extension is reloaded or installed
// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.sync.set({ color });
//   console.log('Default background color set to %cgreen', `color: ${color}`);
// });

//when demonstrator navigates from one url to another
// chrome.tabs.onUpdated.addListener(getActiveTab().then((tabs) => {
//   console.log("navigated to new page");
//   chrome.tabs.sendMessage(tabs[0].id, {action: "record_next_step"});
// }));

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  if (changeInfo.status == 'complete'){
    console.log("navigated to new page");
    // getActiveTab().then((tabs)=>{
    //   console.log(tabs);
    //   chrome.tabs.sendMessage(tabs[0].id, {action: "record_next_step"});
    // });
    chrome.tabs.sendMessage(tabId, {action: "record_next_step"});
  }
})