'use strict';

let popupContainer = document.getElementById('popupContainer');
chrome.storage.sync.get('colors', (data) => {
	for (const val of data.colors) {
		let button = document.createElement('button');
		button.style.backgroundColor = val;

		button.onclick = () => {
			chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
				chrome.tabs.executeScript(
					tabs[0].id,
					{ code: 'document.body.style.backgroundColor = "' + val + '";' });
			});
			window.close();
		}

		popupContainer.appendChild(button);
	}
});
