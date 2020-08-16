// write main header text
document.getElementById('main-header').innerText = 'Songs';

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

    for (var j = 0; j < 5; j++) {
        let trackEntry = document.createElement('a');
        trackEntry.className = 'track-entry selectable';
        indexContainer.appendChild(trackEntry);

        let trackEntryTitle = document.createElement('div');
        trackEntryTitle.className = 'track-entry-title';
        trackEntryTitle.innerHTML = 'Track';
        trackEntry.appendChild(trackEntryTitle);

        let trackEntryAlbum = document.createElement('div');
        trackEntryAlbum.className = 'track-entry-album';
        trackEntryAlbum.innerHTML = 'Album';
        trackEntry.appendChild(trackEntryAlbum);

        let trackEntryArtist = document.createElement('div');
        trackEntryArtist.className = 'track-entry-artist';
        trackEntryArtist.innerHTML = 'Artist';
        trackEntry.appendChild(trackEntryArtist);

        let trackEntryDuration = document.createElement('div');
        trackEntryDuration.className = 'track-entry-duration';
        trackEntryDuration.innerHTML = '4:20';
        trackEntry.appendChild(trackEntryDuration);
    }
}