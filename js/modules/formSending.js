import {closeModal, openModal} from './modal';
import {postData} from '../services/services';
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

            postData('http://localhost:3000/requests', jsonData)
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
        openModal('.modal', modalTimerId);

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
            closeModal('.modal');
        }, 2000);
    }   
}

export default formSending;