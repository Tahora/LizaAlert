const filter = document.querySelector('.filter');
const filterCategoryList = filter.querySelector('.filter__category-list');
const filterTagsContainer = filter.querySelector('.filter__tags');
const filterClearButton = filter.querySelector('.filter__clear-btn');
let filterActiveList = [];
const filterItemHeight = 40; //высота одной строчки фильтра с учётом верхнего отступа

//Filter functions start
//список функций, отвечающих за фильтрацию
function returnTitle(id) {
    switch (id) {
        case "level_beginner":
            return 'Новичок';

        case "level_veteran":
            return "Бывалый";

        case "level_pro":
            return "Профессионал";

        case "status_inactive":
            return "Не активный";

        case "status_registered":
            return "Вы записаны";

        case "status_active":
            return "Активный";

        case "status_completed":
            return "Пройден";
    }
}


function removeFilterFromActiveList(id) {
    filterActiveList = filterActiveList.filter(elem => elem !== id);
}

function insertFilterToActiveList(id) {
    filterActiveList.push(id);
}

function resetCheckBox(id) {
    const checkbox = filter.querySelector(`#${id}`);
    checkbox.checked = false;
}

function removeTag(id) {
    const tag = filterTagsContainer.querySelector(`#${id}`);
    tag.remove();
}

function renderCards() {
    console.log ('Потрясающе, что дошёл сюда. Нарисую карточки');
}

function checkClearButton() {
    if (!filterActiveList.length && filterClearButton.classList.contains('filter__clear-btn_show')) {
        filterClearButton.classList.remove('filter__clear-btn_show');
    }
    else if(filterActiveList.length && !filterClearButton.classList.contains('filter__clear-btn_show')) {
        filterClearButton.classList.add('filter__clear-btn_show');
    }
}

function cancelFilter(filterId) {
    resetCheckBox(filterId);
    removeTag(filterId);
    removeFilterFromActiveList(filterId);
}

function createTag(checkboxId) {
    const tagTemplate = document.querySelector('#tag-template').content;
    const tag = tagTemplate.querySelector('.filter__tag').cloneNode(true);
    const tagTitle = tag.querySelector('.filter__tag-title');
    const title = returnTitle(checkboxId);
    tagTitle.textContent = title;
    tag.id = checkboxId;
    tag.addEventListener('click', () => {
        cancelFilter(tag.id);
        renderCards();
        checkClearButton();
    });
    return tag;
  }

function renderTag(checkboxId) {
    const newTag = createTag(checkboxId);
    filterTagsContainer.append(newTag);
}

function addFilter(checkboxId){
    insertFilterToActiveList(checkboxId);
    renderTag(checkboxId);
}

function switchFilter(checkbox){
    if(checkbox.checked) {
        addFilter(checkbox.id);
    }
    if(!checkbox.checked) {
        cancelFilter(checkbox.id);
    }
    renderCards();
    checkClearButton();
}

function resetFilter() {
    filterActiveList.forEach(activeFilter => {
        cancelFilter(activeFilter);
    });
    renderCards();
    checkClearButton();
}
//конец списка функций, отвечающих за фильтрацию

//функции для разворачивания/сворачивания секции фильтра
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

function toggleFiltersSection(toggleButton){
    const wrapper = toggleButton.closest('.filter__category').querySelector('.filter__item-wrapper');
    if (toggleButton.classList.contains('filter__toggle_opened')) {
        closeFilters(wrapper, toggleButton);
    }
    else {
        openFilters(wrapper, toggleButton);
    }
}
//конец списка функций раскрывающих/закрывающих фильтры 


//обработка событий блока Filter

//делегирование события всему меню

//и выбор действия в соответствии с тем, на каком элементе произошло событие
filterCategoryList.addEventListener('click', elem => {
    if (elem.target.classList.contains('filter__toggle')) {
        toggleFiltersSection(elem.target);
    }
    if (elem.target.classList.contains('filter__checkbox')) {
        switchFilter(elem.target);
    }
});

filterClearButton.addEventListener('click', resetFilter);
//Filter functions end