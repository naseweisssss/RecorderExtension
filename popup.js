// Initialize buttons
// let changeColor = document.getElementById("changeColor");
let startRecordingBtn = document.getElementById("startRecordingBtn");
let endRecordingBtn = document.getElementById("endRecordingBtn");
let saveRecordingBtn = document.getElementById("saveRecordingBtn");

// initial state
chrome.storage.local.set({isRecording: false}, function(){});
chrome.storage.local.set({btnArray : []}, function(){});
chrome.storage.local.set({currentURL: ""}, function(){});

// ============================================
// styling
// chrome.storage.sync.get("color", ({ color }) => {
// 	changeColor.style.backgroundColor = color;
// });

// // When the button is clicked, inject setPageBackgroundColor into current page
// changeColor.addEventListener("click", async () => {
// 	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
// 	chrome.scripting.executeScript({
// 		target: { tabId: tab.id },
// 		function: setPageBackgroundColor,
// 	});
// });
  
// // The body of this function will be executed as a content script inside the
// // current page
// function setPageBackgroundColor() {
// 	chrome.storage.sync.get("color", ({ color }) => {
// 		document.body.style.backgroundColor = color;
// 	});
// }
// END IGNORE
// ============================================

//when demonstrator presses start recording button
startRecordingBtn.addEventListener("click", async() => {
	chrome.storage.local.get(['isRecording'], function(result){
		if(!result.isRecording){
			console.log("not recording yet.")
			//start recording
			let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
			//reset button array
			chrome.storage.local.set({btnArray : []}, function(){});
			chrome.scripting.executeScript({
				target: { tabId: tab.id },
				function: recordOneStep,
				args: [tab.url],
			});
		} else {
			console.log("already recording")
		}
	})
});

//when demonstrator navigates to a different page
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	// if (request.action == 'record_next_step') {
	// 	alert("Record next step!");
	// }
	console.log("Message from background script:")
	console.log(request.action);
})

//when demonstrator presses end recording button
endRecordingBtn.addEventListener("click", async() => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	console.log("ending recording");
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: endRecording,
	});
});

//when demonstrator presses save recording button
saveRecordingBtn.addEventListener("click", async() => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	console.log("saving recording");
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: saveRecording,
	});
});


// function called on initial page and subsequent pages
function recordOneStep(taburl) {
	
	console.log("starting recording"); //being logged to tab box
	console.log("taburl: " + taburl); //being logged to tab box

	chrome.storage.local.set({currentURL: taburl});

	document.body.addEventListener("click", function (evt) {
		let btnSpecifier = evt.target.innerHTML;

		chrome.storage.local.get(['btnArray','currentURL'], function (result) {
			result.btnArray.push({url: result.currentURL, name: btnSpecifier});
			chrome.storage.local.set({btnArray: result.btnArray}, function(){});
			console.log(result.btnArray); //logged to tab box
		});
	});
}

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}

function endRecording(){

	chrome.storage.local.get(['isRecording'], function (result){
		if (result.isRecording){
			chrome.storage.local.set({isRecording: false}, function(){updateRecordingStatus(result.isRecording)})
		} else {
			console.log("no recording was started.")
		}
	})
}

function saveRecording(){

	//write btnArray to a file - local file for now 
	console.log("ending recording. saving navigation history");

	chrome.storage.local.get(['btnArray'], function(result){
		download('outfile.txt', JSON.stringify(result.btnArray));
	})

}

function updateRecordingStatus(stopRecording){
	//change the innerHTML of the div id=recordingStatus 
	let statusDiv = document.getElementById("recordingStatus");
	if (stopRecording) {
		statusDiv.style.textContent = 'Recording...';
	} else {
		statusDiv.style.textContent = '';
	}
	
}