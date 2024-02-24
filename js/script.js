window.addEventListener('DOMContentLoaded', function () {
    'use strict'

    window.addEventListener('scroll', function () {
        fadeButtonUp();
    });


    //timer
    /*
        let endDate = "11/08/2023".split(''),
            deadline = '';

        for (let i = 0; i < endDate.length; i++) {
            if (i != 8 || endDate[8] != 0) {
                deadline += endDate[i];
                
            }

        }

        function getTimerRemaining(deadline) {
            let t = Date.parse(deadline) - Date.parse(new Date()),
                seconds = Math.floor((t / 1000) % 60),
                minutes = Math.floor((t / 1000 / 60) % 60),
                hours = Math.floor((t / (1000 * 60 * 60)%24)),
                day = Math.floor(t / (1000 * 60 * 60 * 24))

            return {
                'total': t,
                'day': day,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }

        function setClock(id, deadline) {
            let timer = document.getElementById(id),
                day = document.querySelector('.day'),
                hours = timer.querySelector('.hours'),
                minutes = timer.querySelector('.minutes'),
                seconds = timer.querySelector('.seconds'),
                timeInterval = setInterval(updateClock, 1000);

            function updateClock() {

                function createLabel(number, titles) {
                    const cases = [2, 0, 1, 1, 1, 2];
                    return `${titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]]}`;
                }
               
                let t = getTimerRemaining(deadline);
                if(t.day==0){
                    day.style.display="none";
                   
                }
                
                day.textContent = `${t.day}`.padStart(2, '0') + createLabel(t.day, [' День', ' Дня', ' Дней']);
                hours.textContent = `${t.hours}`.padStart(2, '0') + createLabel(t.hours, [' Час', ' Часа', ' Часов']);
                minutes.textContent = `${t.minutes}`.padStart(2, '0')+ createLabel(t.minutes, [' Минута', ' Минуты', ' Минут']);
                seconds.textContent = `${t.seconds}`.padStart(2, '0');

                if (t.total <= 0) {
                    day.textContent = '0';
                    hours.textContent = '0'.padStart(2, '0');
                    minutes.textContent = '0'.padStart(2, '0');
                    seconds.textContent = '0'.padStart(2, '0');
                    clearInterval(timeInterval);
                }
            }
        }
        setClock('discountTimer', deadline);

    */


    //buttonUp
    let scrollUp = this.document.querySelector('.scrollUp');

    function fadeButtonUp() {
        if (scrollY >= 1000) {
            scrollUp.style.transition = '1s';
            scrollUp.style.opacity = 1;
            scrollUp.style.visibility = 'visible';
        } else {
            scrollUp.style.opacity = 0;
            scrollUp.style.visibility = 'hidden';
        }
    }

    scrollUp.addEventListener('click', function () {
        let scrolled = window.pageYOffset;
        scrollTop(scrolled, 1);
    });

    function scrollTop(endPos, i) {
        setTimeout(function () {
            if (parseInt(endPos) > 0) {
                let y = parseInt(endPos) - 30 * parseInt(i);
                window.scroll(0, y); //Устанавливаем новую позицию вертикального скрола
                scrollTop(y, parseInt(i) + 2); //Рекурсивный вызов функции
            }
        }, 10);
    }

    //Animation
    function onEntry(entry) {
        entry.forEach(change => {
            if (change.isIntersecting) {
                change.target.classList.add('element-show');
            } else {
                change.target.classList.remove('element-show');
            }
        });
    }
    let options = {
        threshold: [0.08]
    };
    let observer = new IntersectionObserver(onEntry, options),
        elements = document.querySelectorAll('.element-animation');
    for (let elm of elements) {
        observer.observe(elm);
    }

    //loginModalPage
    let loginBtn = this.document.querySelectorAll('li'),
        logincloseBtn = this.document.querySelector('#logincloseBtn'),
        modal = this.document.querySelector('.modal');


    function loginModalOpen(formName) {
        let form = document.querySelector(`${formName}`),
            input = form.getElementsByTagName('input'),
            saveFormCheckBox = document.getElementById('saveFormCheckBox');
        input[0].value = localStorage.getItem("userLogin");
        input[1].value = localStorage.getItem("userPassword");
        saveFormCheckBox.checked = JSON.parse(localStorage.getItem("saveFormCheckBox"));
        modal.style.visibility = 'visible';
        modal.style.opacity = '1';
        document.body.style.overflow = 'hidden';
    }

    function loginModalClose() {
        modal.style.visibility = 'hidden';
        modal.style.opacity = '0';
        document.body.style.overflow = '';
    }

    function displaySize() {
        let numberBtn = 5;
        if (window.innerWidth < 1024) {
            numberBtn = 21;
        } else if (window.innerWidth > 1024) {
            numberBtn = 5;
        }

        loginBtn[numberBtn].addEventListener('click', function (event) {
            event.preventDefault();
            loginModalOpen('#loginForm');
        });
    }
    displaySize();

    this.window.addEventListener('resize', displaySize, false);

    logincloseBtn.addEventListener('click', function () {
        loginModalClose();
    });

    //Form
    function getForm(className) {
        let message = {
            loading: `Загрузка...`,
            success: `Cпасибо!Скоро мы с Вами свяжемся.`,
            failure: `Что-то пошло не так...`
        };
        let form = document.querySelector(`${className}`),
            input = form.getElementsByTagName('input'),
            statusMessage = document.createElement('div');

        statusMessage.classList.add('status');

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('content-Type', 'application/json; charset=utf-8');

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            if (statusMessage.textContent.length != 0) {
                statusMessage.remove();
            } else {
                form.appendChild(statusMessage);
            }

            let formData = new FormData(form);
            let obj = {};

            formData.forEach(function (value, key) {
                obj[key] = value;
            });

            request.send(JSON.stringify(obj));
            request.onreadystatechange = function () {
                let promise = new Promise(function (resolve, reject) {
                    if (request.readyState < 4 || request.readyState === 4 && request.status == 200) {
                        resolve()
                    } else {
                        reject()
                    }
                });

                let anim = (f, t) => {
                    let d = performance.now(),
                        from = f,
                        to = t,
                        duration = 3000;

                    requestAnimationFrame(function e(b) {
                        b = (b - d) / duration;
                        1 <= b && (b = 1);
                        let c = from + (to - from) * b;
                        promise
                            .then(() => statusMessage.textContent = message.loading)
                            .then(() => statusMessage.textContent = message.success)
                            .catch(() => statusMessage.textContent = message.failure)
                        statusMessage.style.opacity = c.toFixed(2);
                        1 > b && requestAnimationFrame(e)
                    })
                }

                function go() {
                    let f = 0,
                        t = 1;
                    for (var i = 0; i <= 1; i++) {
                        setTimeout((function (index) {
                            return function () {
                                anim(f, t);
                                f = 1, t = 0;
                            };
                        })(i), 1500 * (i + 0.25))
                    }
                }
                go();

            };

            for (let i = 0; i < input.length - 1; i++) {
                input[i].value = '';
            }
        });

    }

    //checkFormLogin
    function saveInfoForm(formName) {
        let form = document.querySelector(`${formName}`),
            loginFormInput = form.getElementsByTagName('input'),
            saveFormCheckBox = document.querySelector('#saveFormCheckBox');

        if (saveFormCheckBox.checked) {
            localStorage.setItem('userLogin', `${loginFormInput[0].value}`);
            localStorage.setItem('userPassword', `${loginFormInput[1].value}`);
            localStorage.setItem('saveFormCheckBox', true);

        } else {
            localStorage.removeItem('userLogin');
            localStorage.removeItem('userPassword');
            localStorage.setItem('saveFormCheckBox', false);
        }

    }

    let loginAuthBtn = this.document.querySelector('#loginAuthBtn'),
        subscribeBtn = this.document.querySelector('#subscribeFormBtn');

    loginAuthBtn.addEventListener('click', function () {
        getForm('#loginForm');
        saveInfoForm('#loginForm');
    });

    subscribeBtn.addEventListener('click', function () {
        getForm('#subscribeForm');
    });

    //MobileNav


    function openMobileNav() {
        let mobileMenuOpenBtn = document.querySelector('#mobileMenuOpenBtn'),
            mobileNavPanel = document.querySelector('.mobileNavPanel');

        mobileNavPanel.style.opacity = 1;
        mobileNavPanel.style.visibility = 'visible';
        mobileMenuOpenBtn.style.opacity = 0;
        mobileMenuOpenBtn.style.transition = ' all 1s';
        mobileMenuOpenBtn.style.visibility = 'hidden';
        setTimeout(function () {
            let mobileMenuCloseBtn = document.querySelector('#mobileMenuCloseBtn');
            mobileMenuCloseBtn.style.opacity = 1;
            mobileMenuCloseBtn.style.transition = ' all 1s';
            mobileMenuCloseBtn.style.visibility = 'visible'

        }, 500);

    }



    function closeMobileNav() {
        let mobileNavPanel = document.querySelector('.mobileNavPanel');
        mobileNavPanel.style.opacity = 0;
        mobileNavPanel.style.visibility = 'hidden';
        mobileMenuCloseBtn.style.opacity = 0;
        mobileMenuCloseBtn.style.transition = ' all 1s';
        mobileMenuCloseBtn.style.visibility = 'hidden';
        setTimeout(function () {
            mobileMenuOpenBtn.style.opacity = 1;
            mobileMenuOpenBtn.style.transition = ' all 1s';
            mobileMenuOpenBtn.style.visibility = 'visible';
        }, 500);

    }



    mobileMenuOpenBtn.addEventListener('click', function () {
        openMobileNav();
    });

    mobileMenuCloseBtn.addEventListener('click', function () {
        closeMobileNav();
    });



    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY;
        changeMobileMenuBackColor(scrollPosition);
    });


    function changeMobileMenuBackColor(scrollPosition) {
        let mobileNav = document.querySelector('.mobileNav'),
            mobileNavOpenLine = document.querySelectorAll('.mobileNavOpenLine'),
            mobileNavCloseLine = document.querySelectorAll('.mobileNavCloseLine');

        if (scrollPosition >= 8350) {
            mobileNav.style.backgroundColor = "#ffffff7e";

            mobileNav.onmouseout = function () {
                mobileNav.style.backgroundColor = ' #ffffff7e';
            }

            mobileNav.onmouseover = function () {
                mobileNav.style.backgroundColor = '#ffffff';
            }

            for (let i = 0; i < 3; i++) {
                mobileNavOpenLine[i].style.backgroundColor = "#42424291";
                mobileNavCloseLine[i].style.backgroundColor = "#42424291";
            }


        } else if (scrollPosition <= 8349) {

            mobileNav.style.backgroundColor = "#4242425e";

            mobileNav.onmouseout = function () {
                mobileNav.style.backgroundColor = '#4242425e';
            }

            mobileNav.onmouseover = function () {
                mobileNav.style.backgroundColor = '#424242';
            }

            for (let i = 0; i < 3; i++) {
                mobileNavOpenLine[i].style.backgroundColor = "#ffffff7e";
                mobileNavCloseLine[i].style.backgroundColor = "#ffffff7e";
            }

        }

    }


    //Date create Site

    (function () {


        document.querySelector('#copyrightText').innerHTML = '&copy; 2024 - ' + new Date().getFullYear() + ' Верстка сайта &nbsp; <a href="">AKoders</a>. Дизайн взят из сети интернет.';
    }());



});