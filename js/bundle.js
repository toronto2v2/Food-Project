/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator () {
        //  ================================================================
    // ==================CALCULATOR=====================================
    // =================================================================

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ration;

    if (localStorage.getItem('sex')){
        sex = localStorage.getItem('sex');
    }else{
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')){
        ration = localStorage.getItem('ratio');
    }else{
        ration = '1.375';
        localStorage.setItem('ratio', '1.375');
    }

    function initLocalSettings (selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);

            if (elem.getAttribute('id') === localStorage.getItem('sex')){
                elem.classList.add(activeClass);
            }

            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal () {
        if (!sex || !height || !weight || !age || !ration){
            result.textContent = '____';
            return;
        }

        if (sex === 'female'){
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ration);
        }else{
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ration);
        }
    }
    calcTotal ();

    function getStaticInformation (selector, activeClass){
        const elements = document.querySelectorAll(selector );

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')){
                    ration = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                }else{
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
                calcTotal ();
            });
        });
   
    }

    getStaticInformation ('#gender div', 'calculating__choose-item_active');
    getStaticInformation ('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation (selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if(input.value.match(/\D/g)){
                input.style.border = `1px solid red`;
            }else{
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')){
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal ();
        });
    }

    getDynamicInformation ('#height');
    getDynamicInformation ('#weight');
    getDynamicInformation ('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards (){
//  ================================================================
    // ==================Cards By classes===============================
    // =================================================================


    

    class MenuCards {
        constructor(src, alt, title, descr, price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = descr;
            this.price = price;
            this.transfer = 27;
            this.classes = classes;
            this.spaceForRender = document.querySelector(parentSelector);
            this.convertToUAH();
        }

        convertToUAH(){
            this.price = this.price * this.transfer;
        }

        render (){
            const element = document.createElement('div');
            if(this.classes.length == 0){
                this.element = 'menu__item';
                element.classList.add(this.element);
            }else{
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

            this.spaceForRender.append(element);

        }


    }



    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCards(img, altimg, title, descr, price,'.menu__field .container', 'menu__item').render();
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/formSending.js":
/*!***********************************!*\
  !*** ./js/modules/formSending.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function formSending(formSelector, modalTimerId) {
       //  ================================================================
    // ==================Form Sending AJAX==============================
    // =================================================================


    const contactForms = document.querySelectorAll(formSelector);

    const statuses = {
        loading: 'img/spinner.svg',
        finish: 'Спасибо, оператор скоро с вами свяжется',
        fail: 'Опа, произошла ошибка'
    };



    function requestSending (form) {
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const requestStatus = document.createElement('img');
            requestStatus.src = statuses.loading;
            requestStatus.style.cssText = `
                display:block;
                margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend', requestStatus);

            const formData = new FormData(form);
            const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', jsonData)
            .then(data => {
                console.log(data);
                requestStatus.textContent = statuses.finish;
                showThanksModal (statuses.finish);
                requestStatus.remove();
            }).catch(() => {
                showThanksModal (statuses.fail);
            }).finally(() => {
                form.reset();
            });

            

            // const request = new XMLHttpRequest();
            // request.open('POST', '/server.php');
            // request.setRequestHeader('Content-type', 'application/json');
            // request.send(formDataObjectToJSON);

            // request.addEventListener('load', () => {
            //     if (request.status == 200){
            //         requestStatus.textContent = statuses.finish;
            //         form.reset();
            //         showThanksModal (statuses.finish);
            //         requestStatus.remove();
            //     }else{
            //         showThanksModal (statuses.fail);
            //     }
            // });
            
        });
    }
    contactForms.forEach(form => requestSending(form));

    
            //  ================================================================
    // ==================Adding thnx modal==============================
    // =================================================================


    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

        const thankYouModal = document.createElement('div');
        thankYouModal.classList.add('modal__dialog');
        thankYouModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thankYouModal);

        setTimeout(() => {
            thankYouModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 2000);
    }   
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formSending);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function closeModal(modalSelector ) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = 'visible';
    document.body.style.paddingRight = '0';

    
}

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '16px';

    if (modalTimerId){
        clearInterval(modalTimerId);
    }
    
    
}

function modals (triggerSelector, modalSelector, modalTimerId){
      //  ================================================================
    // ==================MODAL==========================================
    // =================================================================


    const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });



    

    
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == ''){
            closeModal (modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')){
            closeModal (modalSelector);
        }
    });



    function showModalByScroll (){
        if(document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight){
            openModal (modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll );
        }
    }

    window.addEventListener('scroll', showModalByScroll );
 


    
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modals);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider ({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    //  ================================================================
    // ==================Slider=========================================
    // =================================================================

    
    const slides = document.querySelectorAll(slide);
    const slider = document.querySelector(container);
    const prev = document.querySelector(prevArrow);
    const next = document.querySelector(nextArrow);
    const totalSlides = document.querySelector(totalCounter);
    const currentSlide = document.querySelector(currentCounter);
    const slidesWrapper = document.querySelector(wrapper);
    const slidesField = document.querySelector(field);
    const width = window.getComputedStyle(slidesWrapper).width;




    // ============================================================
    // ПРОСТОЙ МЕТОД СОЗДАНИЯ СЛАЙДЕРА ПУТЕМ СКРЫТИЯ/ПОКАЗА СЛАЙДОВ
    // ============================================================

    // showSlides(slideIndex);
    // if (slides.length < 10){
    //     totalSlides.textContent = `0${slides.length}`;
    // }else{
    //     totalSlides.textContent = slides.length;
    // }
    // function showSlides (n) {
    //     if (n > slides.length){
    //         slideIndex = 1;
    //     }

    //     if(n < 1){
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => item.classList.add('hide'));
    //     slides[slideIndex - 1].classList.remove('hide');
    //     slides[slideIndex - 1].classList.add('show');

    //     if (slideIndex < 10){
    //         currentSlide.textContent = `0${slideIndex}`;
    //     }else{
    //         currentSlide.textContent = slideIndex;
    //     }
    // }

    // function plusSlides (n) {
    //     showSlides(slideIndex +=n );
    // }

    // prev.addEventListener('click', () =>{
    //     plusSlides (-1);
    // });
    // next.addEventListener('click', () =>{
    //     plusSlides (1);
    // });


    // =======================================================
    // УСЛОЖНЕННЫЙ СПОСОБ ПУТЕМ ПРОЛИСТЫВАНИЯ, TRANSLATEX И ТП
    // =======================================================
    function changeOppacityOfDots (dotsArr, slideIndex){
        dotsArr.forEach(dot => dot.style.opacity = '.5');
        dotsArr[slideIndex - 1].style.opacity = 1;
    }
    function addZeroToSlidesNumber(slideIndex, whatToEdit){
        if (slideIndex < 10){
            whatToEdit.textContent = `0${slideIndex}`;
        }else{
            whatToEdit.textContent = slideIndex;
        }
    }
    function getNumberWithoutPixels (toConvert, regExp){
        return +toConvert.replace(regExp, '');
    }
    
    let slideIndex = 1;
    let offset = 0;

    addZeroToSlidesNumber(slideIndex, currentSlide);
    addZeroToSlidesNumber(slides.length, totalSlides);

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';



    slides.forEach (slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for( let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i === 0 ){
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }
  

    next.addEventListener('click', () => {
        if (offset == getNumberWithoutPixels (width, /\D/g) * (slides.length - 1)){
            offset = 0;
        }else{
            offset +=getNumberWithoutPixels (width, /\D/g);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        slideIndex == slides.length ? slideIndex = 1 : slideIndex++;

        addZeroToSlidesNumber(slideIndex, currentSlide);
        changeOppacityOfDots (dots, slideIndex);


    });
    prev.addEventListener('click', () => {
        if (offset == 0){
            offset = getNumberWithoutPixels (width, /\D/g)* (slides.length - 1);
        }else{
            offset -= getNumberWithoutPixels (width, /\D/g);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        slideIndex == 1 ? slideIndex = slides.length : slideIndex-- ;
        addZeroToSlidesNumber(slideIndex, currentSlide);
        changeOppacityOfDots (dots, slideIndex);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = getNumberWithoutPixels(width, /\D/g) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            addZeroToSlidesNumber(slideIndex, currentSlide);
            changeOppacityOfDots (dots, slideIndex);

        });
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs (tabsSelector, tabsContentSelector, tabsParentSelector, activeClass){
    const tabsParent = document.querySelector(tabsParentSelector);
    const tabsContent = document.querySelectorAll(tabsContentSelector);
    const tabs = document.querySelectorAll(tabsSelector);
    
    function removeEverything () {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showSwitchedContent (i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add(activeClass);
    }

    removeEverything();
    showSwitchedContent();

    tabsParent.addEventListener('click', (event) => {
        if(event.target && event.target.matches(tabsSelector)){
            tabs.forEach((item,i) => {
                if(event.target == item){
                    removeEverything();
                    showSwitchedContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer (id, deadline){
    
    //  ================================================================
    // ==================TIMER==========================================
    // =================================================================


   function calcData (string){
    let a = Date.parse(string) - Date.parse(new Date());
    if (a <= 0){
        const days = 0;
        const hours = 0;
        const minutes = 0;
        const seconds = 0;
        return {
            total: a,
            days : days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    }else{
        const days = Math.floor ( a / (1000 * 60 * 60 * 24) );
        const hours = Math.floor( a / (1000 * 60 * 60) % 24 );
        const minutes = Math.floor (  a / (1000 * 60 ) % 60 );
        const seconds = Math.floor ( (a / 1000) % 60 );
        
        return {
            total: a,
            days : days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    }

   }

   function addZero (num){
    if (num >= 0 && num < 10){
        return `0${num}`;
    }else {
        return num;
    }
   }

   function setClock (selector, endtime) {
    const timer = document.querySelector(selector),
          days  = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds');
    
     let counter = setInterval (updateClocks, 1000);
     updateClocks ();

        function updateClocks () {
            let q = calcData (endtime);
            
            days.innerHTML = addZero(q.days) ;
            hours.innerHTML = addZero(q.hours);
            minutes.innerHTML = addZero(q.minutes);
            seconds.innerHTML = addZero(q.seconds);
            
            if (q.total <= 0){
                clearInterval(counter);
            }
        }
   }

   setClock (id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_formSending__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/formSending */ "./js/modules/formSending.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");

        
        
        
        
        
        
        
        

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout( () => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 50000);
          

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2022-12-30');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_formSending__WEBPACK_IMPORTED_MODULE_4__["default"])('form', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current', 
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_6__["default"])();

});


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map