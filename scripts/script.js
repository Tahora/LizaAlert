const filter = document.querySelector('.filter');
const filterCategoryList = filter.querySelector('.filter__category-list');
const filterTagsContainer = filter.querySelector('.filter__tags');
const filterClearButton = filter.querySelector('.filter__clear-btn');
const filterItemHeight = 40; //высота одной строчки фильтра с учётом верхнего отступа
const courseListArray = Array.from(document.querySelectorAll('.course-list__item'));
let filterActiveList = [];
//Filter functions start
//список функций, отвечающих за работу с фильтрами


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

//отрисовка карточек
function showCourse(courseItem) {
    if (courseItem.classList.contains('course-list__item_hide')) {
        courseItem.classList.remove('course-list__item_hide');
    }
}

function hideCourse(courseItem) {
    if (!courseItem.classList.contains('course-list__item_hide')) {
        courseItem.classList.add('course-list__item_hide');
    }
}

/*function getCourseStatus(courseItem) {
    return courseItem.querySelector('.course-list__parameter_type_status').innerText;
}*/

function getCourseLevel(courseItem) {
    const parametrItem = courseItem.querySelector('.course-list__parameter_type_level');
    return parametrItem.innerText;
}

function compareCourseWithFilter (courseParam) {
    if (!filterActiveList.length) {
        return true;
    }
    else {
        if (filterActiveList.every(activeFilter => {
            return returnTitle(activeFilter) === courseParam;
        })) {
            return true;
        }
        else {
            return false;
        }
    }
}

function courseSwitchVisible(courseItem) {
    /*const courseStatus = getCourseStatus(courseItem);*/
    const courseLevel = getCourseLevel(courseItem);
    if (/*compareCourseWithFilter(courseStatus) &&*/ compareCourseWithFilter(courseLevel)) {
        showCourse(courseItem);
    }
    else {
        /*!compareCourseWithFilter(courseStatus) &&*/
        hideCourse(courseItem);
    }
}

function renderCards() {
    courseListArray.forEach(courseItem => courseSwitchVisible(courseItem));
}
//конец отрисовки карточек

function checkClearButton() {
    if (!filterActiveList.length && filterClearButton.classList.contains('filter__clear-btn_show')) {
        filterClearButton.classList.remove('filter__clear-btn_show');
    }
    else if(filterActiveList.length && !filterClearButton.classList.contains('filter__clear-btn_show')) {
        filterClearButton.classList.add('filter__clear-btn_show');
    }
}

function updateDisplayItems() {
    renderCards();
    checkClearButton();
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
        updateDisplayItems();
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
    updateDisplayItems();
}

function resetFilter() {
    filterActiveList.forEach(activeFilter => {
        cancelFilter(activeFilter);
    });
    updateDisplayItems();
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