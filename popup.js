// Initialize buttons
let changeColor = document.getElementById("changeColor");
let startRecordingBtn = document.getElementById("startRecordingBtn");
let endRecordingBtn = document.getElementById("endRecordingBtn");
let saveRecordingBtn = document.getElementById("saveRecordingBtn");

// Initialize state
let isRecording = false;
console.log("isRecording: " + isRecording);
const buttonArray = []; // tag key value pairs for url

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
		console.dir(this);
		//note evt.target can be a nested element, not the body element, resulting in misfires
		console.log(evt.target);
		buttonArray.push(evt.target);
		alert("body clicked");
	});	
}