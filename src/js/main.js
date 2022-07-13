// ! Variables
const container = document.querySelector('.container');
const audio1 = document.querySelector('#audio1');
const audio2 = document.querySelector('#audio2');
const audio3 = document.querySelector('#audio3');
var timeControl;
var timeState = false;
var stateApp = false;

// ! Events Listeners
loadPage(); // TODO Poner en el body efecto de ***mix-blend-mode: multiply*** para generar efecto en los blancos (como screen en After Effects)
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
    if (
        e === 'click' &&
        document.querySelector('.loader') !== null &&
        stateApp === false
    ) {
        stateApp = true;
        audio1.play();
        audio1.currentTime = 0;
        audio1.volume = 0.5;
        container.classList.add('containerClick');
        container.classList.add('startApp');
        container.classList.remove('containerHover');
        document.querySelector('.loader').classList.add('startAppBg');
        timeOutControl();
    }
    if (
        e === 'leave' &&
        document.querySelector('.loader') !== null &&
        stateApp && stateApp !== 'initialized'
    ) {
        container.classList.add('containerHover');
        container.classList.remove('containerClick');
        container.classList.remove('containerOut');
        container.classList.remove('startApp');
        document.querySelector('.loader').classList.remove('startAppBg');
        if (audio1.volume >= 0.5) {
            const timeInterval = setInterval(() => {
                if (audio1.volume > 0) {
                    audio1.volume -= 0.05;
                }
            }, 50);
            setTimeout(() => {
                clearInterval(timeInterval);
                audio1.pause();
            }, 500);
        }
        if (timeState) {
            timeOutControlStop();
        }
        stateApp = false;
        timeState = false;
    }
}

function timeOutControl() {
    if (stateApp && timeState === false) {
        timeState = true;
        timeControl = setTimeout(() => {
            container.classList.remove('containerClick');
            container.classList.add('containerOut');
            stateApp = 'initialized';
            audio2.play();
            audio2.volume = 0.7;
            setTimeout(() => {
                document.querySelector('.loader').remove();
                audio3.play();
                audio3.volume = 0.2;
            }, 1000);
        }, 5000);
    }
}

function timeOutControlStop() {
    clearTimeout(timeControl);
}
