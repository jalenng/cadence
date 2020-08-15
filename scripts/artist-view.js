// write main header text
document.getElementById('main-header').innerText = 'Artists';

//populate artists
let mainContainer = document.querySelector('.main-container');
for (var i = 0; i < 26; i++) {
    let letter = (i+10).toString(36);

    let indexContainer = document.createElement('div');
    indexContainer.className = 'container';
    indexContainer.id = letter;
    mainContainer.appendChild(indexContainer);

    let containerHeader = document.createElement('h6');
    containerHeader.innerText = letter.toUpperCase();
    indexContainer.appendChild(containerHeader);

    let flexbox = document.createElement('div');
    flexbox.className = 'flexbox';
    indexContainer.appendChild(flexbox);

    for (var j = 0; j < 7; j++) {
        let albumEntry = document.createElement('a');
        albumEntry.className = 'artist-entry grid-item selectable';
        flexbox.appendChild(albumEntry);

        let frame = document.createElement('div'); 
        frame.className = 'artist-frame';
        albumEntry.appendChild(frame);

        let img = document.createElement('img'); 
        img.className = 'artist-img';
        img.setAttribute('src', '../media/AlbumDefault.png');
        frame.appendChild(img);

        let albumEntryTitle = document.createElement('div');
        albumEntryTitle.className = 'artist-name';
        albumEntryTitle.innerHTML = 'Album';
        albumEntry.appendChild(albumEntryTitle);
    }
}

//populate indexed list
// let indices = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let indexedList = document.getElementById('indexed-list');
for (var i = 0; i < 26; i++) {
    let letter = (i+10).toString(36);
    let indexButton = document.createElement('a');
    indexButton.className = 'selectable grayed';
    indexButton.href = '#' + letter;
    indexButton.innerText = letter.toUpperCase();
    indexedList.appendChild(indexButton);
}