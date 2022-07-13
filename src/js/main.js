// ! Variables
const container = document.querySelector('.container');
let stateApp = false;

// ! Events Listeners
loadPage();
function loadPage() {
    document.addEventListener('DOMContentLoaded', eventsListeners);
}
function eventsListeners() {
    container.addEventListener('click', () => {
        startApp('click');
    });
    container.addEventListener('mouseout', () => {
        startApp('leave');
    });
}

// ! Functions
function startApp(e) {
    const audio = document.querySelector('audio');
    if (e === 'click') {
        stateApp = true;
        audio.play();
        audio.volume = 0.5;
        container.classList.add('containerClick');
        container.classList.remove('containerHover');
        setTimeout(() => {
            if (stateApp) {
                console.log('Eventos cancelados');
            }
        }, 5000);
    }
    if (e === 'leave') {
        audio.setAttribute('loop', false);
        container.classList.add('containerHover');
        container.classList.remove('containerClick');
        if (stateApp) {
            const timeInterval = setInterval(() => {
                audio.volume -= 0.1;
            }, 100);
            setTimeout(() => {
                clearInterval(timeInterval);
            }, 500);
        }
        stateApp = false;
    }
}
