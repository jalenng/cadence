//populate indexed list
let indexedList = document.getElementById('indexed-list');
for (var i = 0; i < 26; i++) {
    let letter = (i+10).toString(36);
    let indexButton = document.createElement('a');
    indexButton.className = 'selectable grayed';
    indexButton.href = '#' + letter;
    indexButton.innerText = letter.toUpperCase();
    indexedList.appendChild(indexButton);
}