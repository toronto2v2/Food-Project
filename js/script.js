
        import tabs from './modules/tabs';
        import modals from './modules/modal';
        import timer from './modules/timer';
        import cards from './modules/cards';
        import formSending from './modules/formSending';
        import slider from './modules/slider';
        import calculator from './modules/calculator';
        import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout( () => openModal('.modal', modalTimerId), 50000);
          

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modals('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2022-12-30');
    cards();
    formSending('form', modalTimerId);
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current', 
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    calculator();

});

