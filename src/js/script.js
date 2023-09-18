function fcarousel_timer() {
    if (position <= -end) {
        position = 0 + width * count
    }
    position = Math.max(position - width * count, -end);
    change_progress_bar();
}

function change_progress_bar() {
    carousel.querySelector('ul').style.marginLeft = position + 'px';
    startwidth = (-position / width) / listElems.length * 100 + '%';
    endwidth = (listElems.length + position / width - count) / listElems.length * 100 + '%';
    if (position == -end) {
        endwidth = '0%';
        startwidth = 100 - count / listElems.length * 100 + '%'
    }
    carousel.querySelector('#progress-bar-1').style.width = startwidth;
    carousel.querySelector('#progress-bar-3').style.width = endwidth;
    clearInterval(carousel_timer);
    carousel_timer = setInterval(fcarousel_timer, 3500);

}

function change_background_nav() {
    if (document.querySelector('.navbar-toggler').ariaExpanded == 'true') {
        document.querySelector('nav').style.background = '#001134'
    } else {
        document.body.querySelector('nav').style.background = (window.pageYOffset > 50) ? 'rgba(0, 17, 52,0.6)' : 'none';
    }
}

function start_carousel2() {
    if_show2 = true;
    setInterval(function () {
        if (position2 <= -end2) {
            position2 = width2 * count2;
        }
        position2 = Math.max(position2 - width2 * count2, -end2);

        carousel2.querySelector('ul').style.marginLeft = position2 + 'px';
    }, 3000);
}

function onEntry(entry) {
    entry.forEach(change => {
        if (change.isIntersecting) {
            change.target.classList.add('element-show');
        }
    });
}

// change_background_nav
change_background_nav();
document.querySelector('.navbar-toggler').onclick = change_background_nav;
window.addEventListener('scroll', () => {
    change_background_nav();
    // start carousel
    if (!if_show2 && document.querySelector('#carousel2 .gallery').classList.contains('element-show')) {
        if (listElems2[listElems2.length - 1].getBoundingClientRect().right > window.innerWidth) {
            start_carousel2();
        }
    }
    if (!if_show && document.querySelector('#carousel .gallery').classList.contains('element-show')) {
        if_show = true;
        if (listElems[listElems.length - 1].getBoundingClientRect().right > window.innerWidth) {
            carousel.querySelector('#progress-bar-2').style.width = count / listElems.length * 100 + '%';
            change_progress_bar();
        }
    }
});
// animation
let observer = new IntersectionObserver(onEntry, {threshold: [0.15]});
document.querySelectorAll('.element-animation').forEach(elm => {
    observer.observe(elm);
});
// carousel
var if_show = false;
var listElems = carousel.querySelectorAll('li');
var width = listElems[1].getBoundingClientRect().left;
var count = Math.floor(window.innerWidth / width);
var position = 0;
var end = listElems[listElems.length - 1].getBoundingClientRect().right - width * count - (window.innerWidth % width);
console.log(listElems[listElems.length - 1].getBoundingClientRect().right, window.innerWidth)

if (listElems[listElems.length - 1].getBoundingClientRect().right > window.innerWidth) {
    carousel.querySelector('.prev').onclick = function () {
        position = Math.min(position + width * count, 0)
        change_progress_bar();
    };
    carousel.querySelector('.next').onclick = function () {
        position = Math.max(position - width * count, -end);
        change_progress_bar();
    };
}
// carousel2
var carousel_timer = '';
var if_show2 = false;
var listElems2 = carousel2.querySelectorAll('li');
var width2 = listElems2[1].getBoundingClientRect().left;
var count2 = Math.floor(window.innerWidth / width2);
var position2 = 0;
var end2 = listElems2[listElems2.length - 1].getBoundingClientRect().right - width2 * count2 - (window.innerWidth % width2);
carousel2.querySelectorAll('li').forEach(element => {
    if (!element.querySelector('img[src="src/images/Ellipse%202.png"]')) {
        element.querySelector('.carousel-item-ftml').setAttribute('yesimg', '')
    }
});