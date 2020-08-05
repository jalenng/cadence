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
var hour = new Date().getHours();
var selectedHeaderTexts = 
      hour >= 5 && hour < 12 ? headerTexts.morning
    : hour >= 12 && hour < 17 ? headerTexts.afternoon
    : hour >= 17 && hour < 21 ? headerTexts.evening
    : headerTexts.night;
document.getElementById("main-header").innerText = selectedHeaderTexts.main
      

// write splash text randomly
document.getElementById("splash-text").innerText = 
    selectedHeaderTexts.splash[Math.floor(Math.random() * selectedHeaderTexts.splash.length)];