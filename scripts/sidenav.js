let viewID = document.querySelector('html').id;
let sidenav = document.getElementById('sidenav');
let buttonProperties = [
    {
        viewName: 'home',
        title: 'Home',
        icon: 'home',
        href: 'home-view.html'
    },
    {
        viewName: 'song',
        title: 'Songs',
        icon: 'music_note',
        href: 'song-view.html'
    },
    {
        viewName: 'album',
        title: 'Album',
        icon: 'album',
        href: 'album-view.html'
    },
    {
        viewName: 'artist',
        title: 'Artist',
        icon: 'person',
        href: 'artist-view.html'
    },
    {
        viewName: 'now-playing',
        title: 'Now Playing',
        icon: 'music_video',
        href: 'now-playing-view.html'
    }
];

for (var i = 0; i < buttonProperties.length; i++) {
    let sidenavButton = document.createElement('a');
    sidenavButton.className = 'selectable';
    sidenavButton.className += 
        (viewID == buttonProperties[i].viewName) ? '' : ' grayed';

    sidenavButton.title = buttonProperties[i].title;
    sidenavButton.href = buttonProperties[i].href;
    sidenav.appendChild(sidenavButton);

    let sidenavIcon = document.createElement('i');
    sidenavIcon.className = 'material-icons small';
    sidenavIcon.innerText = buttonProperties[i].icon;
    sidenavButton.appendChild(sidenavIcon);
}