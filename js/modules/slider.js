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
export default slider;