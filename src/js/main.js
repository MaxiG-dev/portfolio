// ! Variables
const container = document.querySelector('.container');
let stateApp = false;

// ! Events Listeners
loadPage();
function loadPage() {
    document.addEventListener('DOMContentLoaded', eventsListeners);
}
function eventsListeners() { // TODO comprobar si existe el loader
    container.addEventListener('click', () => {
        startApp('click');
    });
    container.addEventListener('mouseout', () => {
        startApp('leave');
    });
}

// ! Functions

function startApp(e) {
    const audio1 = document.querySelector('#audio1');
    const audio2 = document.querySelector('#audio2');
    const audio3 = document.querySelector('#audio3');
    if (e === 'click') {
        stateApp = true;
        audio1.play();
        audio1.volume = 0.5;
        container.classList.add('containerClick');
        container.classList.add('startApp')
        container.classList.remove('containerHover');
        document.querySelector('.loader').classList.add('startAppBg')
        setTimeout(() => { // TODO Comprobar si existe el loader
            if (stateApp) {
                container.classList.remove('containerClick');
                container.classList.add('containerOut')
                audio2.play();
                audio2.volume = 0.7;
                setInterval(() => { // TODO Cmprobar si existe el loader
                document.querySelector('.loader').remove(); // TODO Cmprobar si existe el loader
                audio3.play();
                audio3.volume = 0.2;
                }, 1000);
            }
        }, 5000);
    }
    if (e === 'leave') {
        if (document.querySelector('.loader') !== null) {
            audio1.setAttribute('loop', false);
            container.classList.add('containerHover');
            container.classList.remove('containerClick');
            container.classList.remove('containerOut');
            container.classList.remove('startApp');
            document.querySelector('.loader').classList.remove('startAppBg')
    
            if (stateApp) {
                const timeInterval = setInterval(() => {
                    audio1.volume -= 0.1;
                }, 100);
                setTimeout(() => {
                    clearInterval(timeInterval);
                }, 500);
            }
            stateApp = false;
        }

    }
}
