const filterCategoryList = document.querySelector('.filter__category-list');
const filterItemHeight = 40; //высота одной строчки фильтра с учётом верхнего отступа

//объявление функций для блока Filter
function heightCalc(container) {
    const childrenNumber = container.children.length;
    return childrenNumber*filterItemHeight;
}

function openFilters(wrapper, toggleButton) {
    toggleButton.classList.add('filter__toggle_opened');
    if(wrapper) {
        wrapper.classList.add('filter__item-wrapper_opened');
        wrapper.style.height = `${heightCalc(wrapper)}px`;
    }
}

function closeFilters(wrapper, toggleButton) {
    toggleButton.classList.remove('filter__toggle_opened');
    if(wrapper) {
        wrapper.classList.remove('filter__item-wrapper_opened');
        wrapper.style.height = `0px`;
    }
}

function toggleFilters(toggleButton){
    const wrapper = toggleButton.closest('.filter__category').querySelector('.filter__item-wrapper');
    if (toggleButton.classList.contains('filter__toggle_opened')) {
        closeFilters(wrapper, toggleButton);
    }
    else {
        openFilters(wrapper, toggleButton);
    }
}

//обработка событий блока Filter

//делегирование события всему меню
//и выбор действия в соответствии с тем, на каком элементе произошло событие
filterCategoryList.addEventListener('click', elem => {
    if (elem.target.classList.contains('filter__toggle')) {
        toggleFilters(elem.target);
    }
});