import { getResource } from "../services/services";

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



    getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCards(img, altimg, title, descr, price,'.menu__field .container', 'menu__item').render();
        });
    });
}

export default cards;