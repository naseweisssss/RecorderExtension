// Initialize buttons
let changeColor = document.getElementById("changeColor");
let startRecordingBtn = document.getElementById("startRecordingBtn");
let endRecordingBtn = document.getElementById("endRecordingBtn");
let saveRecordingBtn = document.getElementById("saveRecordingBtn");

// initial state
chrome.storage.local.set({isRecording: false}, function(){});
chrome.storage.local.set({btnArray : [4,5,6]}, function(){})

// ============================================
chrome.storage.sync.get("color", ({ color }) => {
	changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: setPageBackgroundColor,
	});
});
  
// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
	chrome.storage.sync.get("color", ({ color }) => {
		document.body.style.backgroundColor = color;
	});
}
// ============================================


startRecordingBtn.addEventListener("click", async() => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: startRecording,
	});
})

function startRecording () {
	console.log("starting recording")
	document.body.addEventListener("click", function (evt) {
		// console.dir(this);
		// const buttonArray = [123];
		//note evt.target can be a nested element, not the body element, resulting in misfires
		// console.log(evt.target);
		chrome.storage.local.get(['btnArray'], function (result) {
			result.btnArray.push(evt.target);
			// alert("body clicked");
			console.log(result.btnArray);
			chrome.storage.local.set({btnArray: result.btnArray}, function(){});
		});
	});
}