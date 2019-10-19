'use strict';

(function () {

	(function () {
		document.getElementById('colorAddButton').onclick = addColor;
		renderColors();
		let colorElement = document.getElementById('colorAdd');
		colorElement.addEventListener("keyup", (ev) => {
			if (ev.keyCode == 13) {
				addColor();
			}
		});
	})();

	function renderColors() {
		chrome.storage.sync.get('colors', (data) => {
			let activeColorsContainer = document.getElementById('activeColorsContainer');
			activeColorsContainer.innerHTML = '';

			for (const val of data.colors) {
				let row = document.createElement('div');
				let title = document.createElement('span');
				let deleteButton = document.createElement('button');

				title.textContent = val;
				deleteButton.textContent = 'X';
				deleteButton.onclick = () => {
					chrome.storage.sync.get('colors', (data) => {
						let colors = data.colors;

						const index = colors.findIndex((n) => n == val);
						colors.splice(index, 1);

						chrome.storage.sync.set({ colors: colors });
						renderColors();
					});
				};

				row.appendChild(title);
				row.appendChild(deleteButton);

				row.style.backgroundColor = val;

				activeColorsContainer.appendChild(row);
			}
		});
	}

	//https://stackoverflow.com/questions/48484767/javascript-check-if-string-is-valid-css-color
	function isColor(colorStr) {
		const s = new Option().style;
		s.color = colorStr;
		return s.color !== '';
	}

	function addColor() {
		let colorElement = document.getElementById('colorAdd');
		let colorStr = colorElement.value;

		if (!colorStr) return;

		if (colorStr[0] != '#') {
			colorStr = '#' + colorStr;
		}

		if (!isColor(colorStr)) return;

		chrome.storage.sync.get('colors', (data) => {
			let colors = data.colors;

			const index = colors.findIndex((n) => n == colorStr);
			if (index != -1) return;

			colors.push(colorStr);
			chrome.storage.sync.set({ colors: colors });
			renderColors();
			colorElement.value = '';
		});
	}
})();
