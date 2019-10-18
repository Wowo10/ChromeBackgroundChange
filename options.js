'use strict';

const kButtonColors = ['#fff', '#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

function constructOptions(kButtonColors) {
  let buttonContainer = document.getElementById('buttonDiv');
  for (let item of kButtonColors) {
    let button = document.createElement('button');
    button.style.backgroundColor = item;
    button.addEventListener('click', function () {
      chrome.storage.sync.set({ color: item }, function () {
        console.log('color is ' + item);
      })
    });
    buttonContainer.appendChild(button);
  }
}
constructOptions(kButtonColors);
