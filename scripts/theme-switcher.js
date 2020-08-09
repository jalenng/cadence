// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

// Immediately invoked function to set the theme on initial load
(function () {
    if (localStorage.getItem('theme') == null) 
        setTheme('theme-dark');
    else 
        setTheme(localStorage.getItem('theme'));

    //use this to test theme
    setTheme('theme-dark');
})();