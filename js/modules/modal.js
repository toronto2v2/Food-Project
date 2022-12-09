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

export default modals;
export {closeModal};
export {openModal};