var headerTexts = {
    morning: {
        main: "Good morning",
        splash: [
            "Let's play some music",
            "Let's start the day off right"
        ]
    },
    afternoon: {
        main: "Good afternoon",
        splash: [
            "Let's play some music",
            "Relax to some tunes",
        ]
    },
    evening: {
        main: "Good evening",
        splash: [
            "Let's play some music",
            "Put on some beats",
            "Set the mood"
        ]
    },
    night: {
        main: "Good night",
        splash: [
            "Let's play some music",
            "Time to wind down for the night",
            "Relax to some tunes"
        ]
    }
}    

// write main header text according to time
let hour = new Date().getHours();
let selectedHeaderTexts = 
      hour >= 5 && hour < 12 ? headerTexts.morning
    : hour >= 12 && hour < 17 ? headerTexts.afternoon
    : hour >= 17 && hour < 21 ? headerTexts.evening
    : headerTexts.night;
document.getElementById('main-header').innerText = selectedHeaderTexts.main;
      

// write splash text randomly
document.getElementById('splash-text').innerText = selectedHeaderTexts.splash[Math.floor(Math.random() * selectedHeaderTexts.splash.length)];

//populate recently played list
let recentlyPlayedCarousel = document.getElementById('recently-played');
recentlyPlayedCarousel.className = 'main-carousel';
recentlyPlayedCarousel.setAttribute('data-flickity', '{"pageDots": false, "freeScroll": true, "cellAlign": "left", "contain": true, "prevNextButtons": false}');
for (var i = 0; i < 20; i++) {
    let div = document.createElement('div'); 
    div.className = 'carousel-cell';

    let frame = document.createElement('div'); 
    frame.className = 'tile-frame';
    div.appendChild(frame);

    let img = document.createElement('img'); 
    img.className = 'tile-img';
    img.setAttribute('src', 'media/AlbumDefault.png');
    frame.appendChild(img);

    let caption = document.createElement('div');
    caption.innerText = 'Album';
    div.appendChild(caption);

    recentlyPlayedCarousel.appendChild(div);
}

//populate most played list
let mostPlayedCarousel = document.getElementById('most-played');
mostPlayedCarousel.className = 'main-carousel';
mostPlayedCarousel.setAttribute('data-flickity', '{"pageDots": false, "freeScroll": true, "cellAlign": "left", "contain": true, "prevNextButtons": false}');
for (var i = 0; i < 20; i++) {
    let div = document.createElement('div'); 
    div.className = 'carousel-cell';

    let frame = document.createElement('div'); 
    frame.className = 'tile-frame';
    div.appendChild(frame);

    let img = document.createElement('img'); 
    img.className = 'tile-img';
    img.setAttribute('src', 'media/AlbumDefault.png');
    frame.appendChild(img);

    let caption = document.createElement('div');
    caption.innerText = 'Album';
    div.appendChild(caption);

    mostPlayedCarousel.appendChild(div);
}