const filter = document.querySelector('.filter');
const filterCategoryList = filter.querySelector('.filter__category-list');
const filterCheckboxList = Array.from(filterCategoryList.querySelectorAll('.filter__checkbox'));
const filterTagsContainer = filter.querySelector('.filter__tags');
const filterClearButton = filter.querySelector('.filter__clear-btn');
const filterItemHeight = 40; //высота одной строчки фильтра с учётом верхнего отступа
const courseList = document.querySelector('.course-list');
const courseListArray = Array.from(courseList.querySelectorAll('.course-list__item'));
let filterActiveList = [];

//список конфликтующих между собой фильтров:
//например, при активации фильтра 'status_inactive'
//'status_active' станет disable
const conflictFiltersList = {
    status_inactive: ['status_active'],
    status_active: ['status_inactive']
}

//Filter functions start
//отрисовка карточек
const courseObjects = {
    cynology: {
        level: 'level_veteran',
        status: 'status_registered',
        visibility: true
    },
    operational_duty: {
        level: 'level_pro',
        status: 'status_active',
        visibility: true
    },
    aircrafts: {
        level: 'level_veteran',
        status: 'status_active',
        visibility: true
    },
    first_aid: {
        level: 'level_veteran',
        status: 'status_active',
        visibility: true
    },
    infogroup: {
        level: 'level_beginner',
        status: 'status_completed',
        visibility: true
    },
    operators: {
        level: 'level_beginner',
        status: 'status_active',
        visibility: true
    },
    short_calls_group: {
        level: 'level_beginner',
        status: 'status_active',
        visibility: true
    },
    beginner_search_group: {
        level: 'level_beginner',
        status: 'status_completed',
        visibility: true
    }
};

function showCourse(courseItem) {
    courseItem.classList.remove('course-list__item_hide');
}

function hideCourse(courseItem) {
    courseItem.classList.add('course-list__item_hide');
}

function getActiveLevelFiltres () {
    return filterActiveList.filter(filter => filter.includes('level_'));
}

function getActiveStatusFiltres () {
    return filterActiveList.filter(filter => filter.includes('status_'));
}

function compareCourseWithFilter (courseObject) {
    if (!filterActiveList.length) {
        return true;
    }
    else {
        const statusFiltres = getActiveStatusFiltres();
        const levelFiltres = getActiveLevelFiltres();
        let statusCheck = false;
        let levelCheck = false;
        if(!statusFiltres.length) {
            statusCheck = true;
        }
        else {
            statusCheck = statusFiltres.some(statusFilter => statusFilter === courseObject.status);
        }
        if(!levelFiltres.length) {
            levelCheck = true;
        }
        else {
            levelCheck = levelFiltres.some(levelFilter => levelFilter === courseObject.level);
        }
        return statusCheck && levelCheck;
    }
}

function switchCourseVisible(courseObjectName) {
    const courseObject = courseObjects[courseObjectName];
    courseObject.visibility = compareCourseWithFilter(courseObject);
    const courseItem = courseListArray.find(courseItem => courseItem.id === courseObjectName);
    if (courseObject.visibility) {
        showCourse(courseItem);
    }
    else {
        hideCourse(courseItem);
    }
}

function renderCards() {
    for (let courseObject in courseObjects) {
        switchCourseVisible(courseObject);
    }
}
//конец отрисовки карточек

//Раздел взаимоисключения фильтров
function disableCheckbox(checkboxId) {
    const conflictFilter = filterCheckboxList.find(checkbox => checkbox.id === checkboxId);
    conflictFilter.closest('.filter__label').classList.remove('filter__hover-reaction');
    conflictFilter.disabled = true;
};

function enableCheckbox(checkboxId) {
    const conflictFilter = filterCheckboxList.find(checkbox => checkbox.id === checkboxId);
    conflictFilter.closest('.filter__label').classList.add('filter__hover-reaction');
    conflictFilter.disabled = false;
};

function checkСompatibility(checkboxId) {
    if (conflictFiltersList[checkboxId]) {
        conflictFiltersList[checkboxId].forEach(filter => disableCheckbox(filter));
    }
}

function resetСompatibility(checkboxId) {
    if (conflictFiltersList[checkboxId]) {
        conflictFiltersList[checkboxId].forEach(filter => enableCheckbox(filter));
    }
}
//Конец раздела взаимоисключения фильтров

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
    if (id === 'status_inactive') {
        id = 'status_completed';
    }
    filterActiveList = filterActiveList.filter(elem => elem !== id);
}

function insertFilterToActiveList(id) {
    if (id === 'status_inactive') {
        id = 'status_completed';
    }
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
    resetСompatibility(filterId);
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
    checkСompatibility(checkboxId);
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
    filterCheckboxList.find(checkbox => {
        if (checkbox.checked) {
            cancelFilter(checkbox.id);
        }});
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

//изменение состояния курса при нажатии на его кнопку
function changeCourseStatus(courseItem) {
    courseObjects[courseItem.id].status = 'status_registered';
}

function changeCourseButton(courseButton) {
    courseButton.classList.add('btn_active');
    courseButton.textContent = 'Продолжить';
}

function handleCourseButton(courseButton) {
    changeCourseStatus(courseButton.closest('.course-list__item'));
    changeCourseButton(courseButton);
}
//конец изменения состояния курса при нажатии на его кнопку


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

//обработка событий в списке курсов
courseList.addEventListener('click', elem => {
    if (elem.target.classList.contains('course-list__button')) {
        handleCourseButton(elem.target);
    }
})
//конец обработки событий в списке курсов