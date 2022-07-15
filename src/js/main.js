// ! Variables
const container = document.querySelector('.container');
const audio1 = document.querySelector('#audio1');
const audio2 = document.querySelector('#audio2');
const audio3 = document.querySelector('#audio3');
var timeControl;
var timeState = false;
var stateApp = false;
var volume = 1;

// ! Events Listeners
loadPage(); // TODO Poner en el body efecto de ***mix-blend-mode: multiply*** para generar efecto en los blancos (como screen en After Effects)
function loadPage() {
    document.addEventListener('DOMContentLoaded', eventsListeners);
}
function eventsListeners() {
    window.addEventListener('keypress', () => {
        startApp('click');
    })
    container.addEventListener('click', () => {
        startApp('click');
    });
    container.addEventListener('mouseleave', () => {
        startApp('leave');
    });
    document.querySelector('.speaker svg').addEventListener('click', () => {
        volumeControl('off');
    });
    document.querySelector('.speaker svg:nth-child(2)').addEventListener('click', () => {
        volumeControl('on');
    });
}
function initializingApp() {
    document.querySelector('.loader').remove();
    document.querySelector('.nav').classList.add('nav-on');
    if (volume !== 0 ){
        audio3.volume = volume-0.9;
    }
    document.querySelector('.home').classList.remove('hidden');
    document.querySelector('.projects').classList.remove('hidden');
    document.querySelector('.experiments').classList.remove('hidden');
    document.querySelector('.about-me').classList.remove('hidden');
    app();
}


// ! Functions
function app() {
    console.log('App Iniciada');
}

function startApp(e) {
    if (
        e === 'click' &&
        document.querySelector('.loader') !== null &&
        stateApp === false
    ) {
        stateApp = true;
        document.querySelector('.speaker').classList.add('speaker-on');
        audio1.play();
        audio1.currentTime = 0;
        if (volume !== 0 ){
            audio1.volume = volume-0.5;
        }
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
            if (volume !== 0 ){
                audio2.volume = volume-0.3;
            }
            setTimeout(() => {
                initializingApp();
                audio3.play();
            }, 1000);
        }, 5000);
    }
}

function timeOutControlStop() {
    clearTimeout(timeControl);
}

function volumeControl(e) {
    if (e === 'off') {
        // document.querySelector('.speaker').classList.add('speaker-off');
        document.querySelector('.speaker svg:nth-child(1)').classList.add('hidden');
        document.querySelector('.speaker svg:nth-child(2)').classList.remove('hidden');
        volume = 0;
        audio1.volume = 0;
        audio2.volume = 0;
        audio3.volume = 0;
    } else {
        // document.querySelector('.speaker').classList.remove('speaker-off');
        document.querySelector('.speaker svg:nth-child(1)').classList.remove('hidden');
        document.querySelector('.speaker svg:nth-child(2)').classList.add('hidden');
        volume = 1;
        audio1.volume = 0.5;
        audio2.volume = 0.7;
        audio3.volume = 0.1;
    }
}
