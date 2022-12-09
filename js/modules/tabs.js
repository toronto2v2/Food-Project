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

export default tabs;