
//initialize state
let isListening = isListening || false;
let clicksArray = clicksArray || [];

function startLogButtonPress(){
	isListening = true;
	//listen to event anywhere on document
	document.body.addEventListener("click", function (event) {
		console.dir(this);
		//note event.target can be a nested element, not the body element, resulting in misfires
		console.log(event.target);
		clicksArray.push(1);
	});
	console.log(clicksArray);
};

function endLogButtonPress(){
	isListening = false;
};


function saveHistorytoJson(){
	console.log("saveHistorytoJson() start");

	//copy code from download() function
	//download json file
};

// When the button is clicked, append the button html tag to an array
startRecordingBtn.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: startLogButtonPress,
    });
  });


endRecordingBtn.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: endLogButtonPress,
    });
  });

  saveRecordingBtn.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: saveHistorytoJson,
    });
  });
