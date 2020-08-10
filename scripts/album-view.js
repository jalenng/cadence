// write main header text
document.getElementById('main-header').innerText = 'Albums';

//populate songs list
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
        albumEntry.className = 'album-entry grid-item selectable';
        flexbox.appendChild(albumEntry);

        let frame = document.createElement('div'); 
        frame.className = 'tile-frame';
        albumEntry.appendChild(frame);

        let img = document.createElement('img'); 
        img.className = 'tile-img';
        img.setAttribute('src', '../media/AlbumDefault.png');
        frame.appendChild(img);

        let albumEntryTitle = document.createElement('div');
        albumEntryTitle.className = 'album-entry-title';
        albumEntryTitle.innerHTML = 'Album';
        albumEntry.appendChild(albumEntryTitle);

        let albumEntryArtist = document.createElement('div');
        albumEntryArtist.className = 'album-entry-artist';
        albumEntryArtist.innerHTML = 'Artist';
        albumEntry.appendChild(albumEntryArtist);
    }
}

//populate indexed list
// let indices = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let indexedList = document.getElementById('indexed-list');
for (var i = 0; i < 26; i++) {
    let letter = (i+10).toString(36);
    let indexButton = document.createElement('a');
    indexButton.classList = 'selectable grayed';
    indexButton.href = '#' + letter;
    indexButton.innerText = letter.toUpperCase();
    indexedList.appendChild(indexButton);
}