// ! Variables
const $ = selector => document.querySelector(selector);
const container = $('.loader__container');
const audio1 = $('#audio1');
const audio2 = $('#audio2');
const audio3 = $('#audio3');
const audio4 = $('#audio4');
var timeControl;
var stateAnimation = false;
var stateTime = false;
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
    });
    container.addEventListener('click', () => {
        startApp('click');
    });
    container.addEventListener('mouseleave', () => {
        startApp('leave');
    });
    $('.speaker svg').addEventListener('click', () => {
        volumeControl('off');
    });
    document
        .querySelector('.speaker svg:nth-child(2)')
        .addEventListener('click', () => {
            volumeControl('on');
        });
}
function skipLoader() {
    $('.loader').classList.add('loader__skip');
    $('.loader__skip_button').classList.add('hidden');
    audio2.play();
    if (volume !== 0) {
        audio2.volume = volume - 0.4;
    }
    setTimeout(() => {
        initializingApp();
        audio3.play();
        $('.speaker').classList.add('speaker-on');
    }, 1000);
}
function initializingApp() {
    $('.loader').remove();
    $('.nav').classList.add('nav-on');
    if (volume !== 0) {
        audio3.volume = volume - 0.9;
    }
    $('.home').classList.remove('hidden');
    $('.projects').classList.remove('hidden');
    $('.experiments').classList.remove('hidden');
    $('.about-me').classList.remove('hidden');
    app();
}

// ! Functions
function app() {
    scrollEvents();
    audio4.volume = 0.2;
}

function startApp(e) {
    if (
        e === 'click' &&
        $('.loader') !== null &&
        stateApp === false
    ) {
        stateApp = true;
        $('.speaker').classList.add('speaker-on');
        audio1.play();
        audio1.currentTime = 0;
        if (volume !== 0) {
            audio1.volume = volume - 0.5;
        }
        container.classList.add('loader__container-click');
        container.classList.add('startApp');
        container.classList.remove('loader__container-hover');
        $('.loader').classList.add('startAppBg');
        timeOutControl();
    }
    if (
        e === 'leave' &&
        $('.loader') !== null &&
        stateApp &&
        stateApp !== 'initialized'
    ) {
        container.classList.add('loader__container-hover');
        container.classList.remove('loader__container-click');
        container.classList.remove('loader__container-out');
        container.classList.remove('startApp');
        $('.loader').classList.remove('startAppBg');
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
        if (stateTime) {
            timeOutControlStop();
        }
        stateApp = false;
        stateTime = false;
    }
}

function timeOutControl() {
    if (stateApp && stateTime === false) {
        stateTime = true;
        timeControl = setTimeout(() => {
            container.classList.remove('loader__container-click');
            container.classList.add('loader__container-out');
            document
                .querySelector('.loader__skip_button')
                .classList.add('hidden');
            stateApp = 'initialized';
            audio2.play();
            if (volume !== 0) {
                audio2.volume = volume - 0.4;
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
        document
            .querySelector('.speaker svg:nth-child(1)')
            .classList.add('hidden');
        document
            .querySelector('.speaker svg:nth-child(2)')
            .classList.remove('hidden');
        volume = 0;
        audio1.volume = 0;
        audio2.volume = 0;
        audio3.volume = 0;
        audio4.volume = 0;
    } else {
        document
            .querySelector('.speaker svg:nth-child(1)')
            .classList.remove('hidden');
        document
            .querySelector('.speaker svg:nth-child(2)')
            .classList.add('hidden');
        volume = 1;
        audio1.volume = 0.5;
        audio2.volume = 0.6;
        audio3.volume = 0.1;
        audio4.volume = 0.2;
    }
}

function scrollEvents() {
    window.scrollTo(0, 15);
    $('.nav .section1').addEventListener('click', () => {
        scrollWin(0);
    });
    $('.nav .section2').addEventListener('click', () => {
        scrollWin(1);
    });
    $('.nav .section3').addEventListener('click', () => {
        scrollWin(2);
    });
    $('.nav .section4').addEventListener('click', () => {
        scrollWin(3);
    });
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20 && stateAnimation === false) {
            stateAnimation = true;
            setTimeout(() => {
                window.scrollTo(0, 15);
                stateAnimation = false;
            }, 500);
            if (
                document
                    .querySelector('.home')
                    .classList.contains('section-active')
            ) {
                scrollWin(1);
                return;
            }
            if (
                document
                    .querySelector('.projects')
                    .classList.contains('section-active')
            ) {
                scrollWin(2);
                return;
            }
            if (
                document
                    .querySelector('.experiments')
                    .classList.contains('section-active')
            ) {
                scrollWin(3);
                return;
            }
            if (
                document
                    .querySelector('.about-me')
                    .classList.contains('section-active')
            ) {
                window.scrollTo(0, 15);
                return;
            }
        }
        if (window.scrollY < 10 && stateAnimation === false) {
            stateAnimation = true;
            setTimeout(() => {
                window.scrollTo(0, 15);
                stateAnimation = false;
            }, 500);
            if (
                document
                    .querySelector('.home')
                    .classList.contains('section-active')
            ) {
                window.scrollTo(0, 15);
                return;
            }
            if (
                document
                    .querySelector('.projects')
                    .classList.contains('section-active')
            ) {
                scrollWin(0);
                return;
            }
            if (
                document
                    .querySelector('.experiments')
                    .classList.contains('section-active')
            ) {
                scrollWin(1);
                return;
            }
            if (
                document
                    .querySelector('.about-me')
                    .classList.contains('section-active')
            ) {
                scrollWin(2);
                return;
            }
        }
    });
}

function scrollWin(e) {
    window.scrollTo(0, 15);
    audio4.currentTime = 0;
    audio4.play();
    function translateUp() {
        $('.home').classList.remove('section-active');
        $('.projects').classList.remove('section-active');
        document
            .querySelector('.experiments')
            .classList.remove('section-active');
        $('.about-me').classList.remove('section-active');
        $('.nav .section1').classList.remove('nav-active');
        $('.nav .section2').classList.remove('nav-active');
        $('.nav .section3').classList.remove('nav-active');
        $('.nav .section4').classList.remove('nav-active');
    }
    if (e === 0) {
        translateUp();
        $('.home').classList.add('section-active');
        $('.nav .section1').classList.add('nav-active');
    }
    if (e === 1) {
        translateUp();
        $('.projects').classList.add('section-active');
        $('.nav .section2').classList.add('nav-active');
    }
    if (e === 2) {
        translateUp();
        $('.experiments').classList.add('section-active');
        $('.nav .section3').classList.add('nav-active');
    }
    if (e === 3) {
        translateUp();
        $('.about-me').classList.add('section-active');
        $('.nav .section4').classList.add('nav-active');
    }
}
