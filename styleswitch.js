// For Style Switching
const head = document.getElementById('header')
const lightBtn = document.querySelector("#lights");
const dark_theme = document.createElement("link");
const light_theme = document.createElement("link");
let toggleLight = true;


dark_theme.setAttribute('rel', 'stylesheet');
dark_theme.setAttribute('href', './stylesheet/style_dark.css')
dark_theme.setAttribute('id', 'dark')
light_theme.setAttribute('rel','stylesheet');
light_theme.setAttribute('href','./stylesheet/style_light.css')
light_theme.setAttribute('id', 'light')

// head.appendChild(light_theme)



//LightButton Toggle
lightBtn.addEventListener('click', () => {
    toggleLight ? toggleLight = false: toggleLight = true;
    switchTheme()
})

function switchTheme() {
    setTimeout(() => {
        switch (toggleLight) {
            case true:
                document.getElementById('dark').setAttribute('media', 'all');
                document.getElementById('light').setAttribute('media', 'print');
                break
            case false:
                document.getElementById('dark').setAttribute('media', 'print');
                document.getElementById('light').setAttribute('media', 'all');
                break
        }
    }, 50)
    
}