'use strict';
// Можно лучше (минута делов):   перенесите  в отдельный файл, меньше строк, больше понимание, 
// Правильная организация кода, это важная часть разработки. Ведь код надо постоянно поддерживать
// подключить его можно через  <script src="js/initialCards.js"></script> 
// Плюс мы выносим данные отдельно, а логика останется в этом файле 
const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
        name: 'Нургуш',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
    },
    {
        name: 'Тулиновка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
    },
    {
        name: 'Остров Желтухина',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
    },
    {
        name: 'Владивосток',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
    }
];

const cardList = document.querySelector('.places-list');
const profileName = document.querySelector('.user-info__name');
const profileJob = document.querySelector('.user-info__job');
const popupImage = document.querySelector('.popup__image');
const newCardPopup = document.querySelector('#newCard');
const editProfilePopup = document.querySelector('#editProfile');
const magnifyPopup = document.querySelector('#imageMagnifier');
const newCardBtn = document.querySelector('.user-info__add-card');
const editProfileBtn = document.querySelector('.user-info__edit-profile');
const popupCloseBtns = document.querySelectorAll('.popup__close');
const newForm = document.forms.new;
const editProfileForm = document.forms.editProfile;

let currentPopup = null;
let currentForm = null;

const createCard = ({name, link}) => {
    const cardTpl = document.querySelector('#cardTpl');
    const cardDOM = cardTpl.content.cloneNode(true);
    cardDOM.querySelector('.place-card__image').style.backgroundImage = `url(${link})`;
    cardDOM.querySelector('.place-card__name').textContent = name;
    cardList.appendChild(cardDOM);
};

const updateProfile = ({name, job}) => {
    profileName.textContent = name;
    profileJob.textContent = job;
};

const checkInputValidity = (el, errEl) => {
    // Можно лучше: обычно названия, для примера 'Должно быть от 2 до 30 символов' 
    // выносят в отдельный объект. Допустим может появится задача сделать многоязычный сайт
    // Для примера : const words = { validationLenght: 'Должно быть от 2 до 30 символов'	} 
    // Далее words передаётся в функцию и используется.
    if (el.validity.valueMissing) errEl.textContent = 'Это обязательное поле';
    /* Можно лучше: удалите else а внутри условия добавьте return
         например было: 
         if(условие){  
             // ваш код 
         } else if(условие2){ 
             // ваш код 
         } 
         стало : 
         if(условие){  
                 // ваш код 
            return; 
        } 
     
         if(условие2){ 
            // ваш код 
            return; 
        } 
     
    */
    else if (el.validity.tooShort || el.validity.tooLong) errEl.textContent = `Должно быть от ${el.getAttribute('minlength')} до ${el.getAttribute('maxlength')} символов`;
    else if (el.type === 'url' && (el.validity.typeMismatch || el.validity.patternMismatch)) errEl.textContent = 'Здесь должна быть ссылка';
    else errEl.textContent = '';
    return el.checkValidity();
};

const setSubmitButtonState = (btn, enabled) => btn.disabled = !enabled;

const setEventListeners = (form) => {
    const inputs = [...form.elements].filter((el) => el.tagName === 'INPUT');
    /* Надо исправить : Не правильно использовать индексы и обращаться по индексу [0] к элементу
     Если перед элементом который вы получаете поставить такой же элемент, то логика нарушится
     Обращайтесь лучше на прямую к элементу например по ID или же переберите все элементы и найдите тот который вам нужен
     Про перебор лучше делать наверное так, если мы например перебираем форму
     const forms = document.getElementById("myForm");
      for (const myForm of forms.elements) { 
     // здесь мы получаем доступ ко всем элементам
        console.log(myForm.value);  
      } 
     */ 
    const submitBtn = ([...form.elements].filter((el) => el.tagName === 'BUTTON'))[0];
    const submitDefaultState = submitBtn.disabled;
    inputs.forEach((el) => el.addEventListener('input', () => setSubmitButtonState(submitBtn, inputs.reduce((acc, el) => checkInputValidity(el, document.querySelector(el.dataset.errfield)) && acc, true))));
    form.addEventListener('reset', () => {
        setSubmitButtonState(submitBtn, !submitDefaultState);
        inputs.forEach((el) => document.querySelector(el.dataset.errfield).textContent = '');
    });
};

const openPopup = (popup) => {
    popup.classList.add('popup_is-opened');
    currentPopup = popup;
};
const closePopup = () => {
    currentPopup.classList.remove('popup_is-opened');
    (currentForm && currentForm.reset());
};
const escapePopup = (event) => (event.key === 'Escape' && currentPopup && currentPopup.classList.contains('popup_is-opened')) ? closePopup() : null;
const likeChange = (event) => (event.target.classList.contains('place-card__like-icon')) ? event.target.classList.toggle('place-card__like-icon_liked') : null;
const deleteCard = (event) => (event.target.classList.contains('place-card__delete-icon')) ? event.target.parentNode.parentNode.remove() : null;
const magnifyImage = (event) => event.target.classList.contains('place-card__image') ? (popupImage.src = event.target.style.backgroundImage.slice(5, -2)) && openPopup(magnifyPopup) : null;
const submitNewCard = (event) => {
    event.preventDefault();
    createCard({
        name: newForm.elements.name.value,
        link: newForm.elements.link.value
    });
    closePopup();
};
const submitProfileChange = (event) => {
    event.preventDefault();
    updateProfile({
        name: editProfileForm.name.value,
        job: editProfileForm.elements.job.value
    });
    closePopup();
};

cardList.addEventListener('click', likeChange);
cardList.addEventListener('click', deleteCard);
cardList.addEventListener('click', magnifyImage);
// Можно лучше:  Вынесите реализацию из слушателя в отдельную функцию.
newCardBtn.addEventListener('click', () => {
    openPopup(newCardPopup);
    currentForm = newForm;
});
 // Можно лучше:  Вынесите реализацию из слушателя в отдельную функцию.
editProfileBtn.addEventListener('click', () => {
    editProfileForm.name.value = profileName.textContent;
    editProfileForm.job.value = profileJob.textContent;
    openPopup(editProfilePopup);
    currentForm = editProfileForm;
});
// Можно лучше:  Вынесите реализацию из слушателя в отдельную функцию.
popupCloseBtns.forEach((btn) => btn.addEventListener('click', closePopup));
newForm.addEventListener('submit', submitNewCard);
editProfileForm.addEventListener('submit', submitProfileChange);
document.addEventListener('keydown', escapePopup);
setEventListeners(editProfileForm);
setEventListeners(newForm);

 // Надо исправить: Перебор и добавление карточек вне функции является результатом плохой организации кода
 // Уберите перебор карточек в функцию, а в качестве параметров для функции передайте место куда записывать и массив карточек
 // function addListCard(conteiner, initialCards){ /* реализация */ }
initialCards.forEach(createCard);

 /**
 * Здравствуйте. Короткий и сжатый код очень тяжело читать, ревьювить, поддерживать
 * 
 * --------------------------------------------------------------------
 * Весь функционал работает корректно 
 * Код чистый и хорошо читается 
 * Вы используете логические группировки операций 
 * У вас нет дублирование кода
 *  Вы не используете небезопасный innerHtml
 *  Вы используете делегирование
 * --------------------------------------------------------------------
 * Все проблемы в коде были помечены как нужно исправить 
    
    


  * можно лучше: избегайте сложных условий и большой вложенности в условии. Чем сложнее условие, чем больше
  * вложенности в условии, тем сложнее анализировать код, сложнее искать ошибки и поддерживать такой код
  * самый простой вариант это убирать условия или блок в условии в отдельную функцию
 *
 * можно лучше: Старайтесь не объявлять большое количество переменных. Чем больше переменных, тем сложнее понимать за что они 
 * отвечают и какую полезную нагрузку несут в коде. Лучше инкапсулировать(прятать) переменные в функциях. 
 * В будущем вам проще будет искать ошибки и разбираться в сложных взаимосвязях
 *
  можно лучше: Для валидации используйте кастомный метод validation
 https: //developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation#Constraint_API%27s_element.setCustomValidity() 
 на русском https: //msiter.ru/tutorials/javascript/js_validation 
 на русском https://htmlacademy.ru/blog/useful/html/form-validation-techniques 
 на английском очень хорошая статья с примерами https://css-tricks.com/form-validation-part-2-constraint-validation-api-javascript/ 
 
 как пример, если вы установите  <input type="text" min="10" max="100" >
 то сразу сможете определить что текст слишком короткий, например так: 
  
 if (validity.tooShort) { 
 // Значение слишком короткое 
 }
 if (validity.tooLong) { 
 // Значение слишком длинное 
 } 
 * 
 Надо исправить: Извиняюсь заранее, это видимо ревьювер на 6 спринте не заметил.
 Перебор и добавление карточек вне функции является результатом плохой организации кода
 Уберите перебор карточек в функцию, а в качестве параметров для функции передайте место куда записывать и массив карточек
 function addListCard(conteiner, initialCards){ 
     // реализация 
}

     Надо исправить : Не правильно использовать индексы и обращаться по индексу [0] к элементу
     Если перед элементом который вы получаете поставить такой же элемент, то логика нарушится
     Обращайтесь лучше на прямую к элементу например по ID или же переберите все элементы и найдите тот который вам нужен
     Про перебор лучше делать наверное так, если мы например перебираем форму
     const forms = document.getElementById("myForm");
      for (const myForm of forms.elements) { 
     // здесь мы получаем доступ ко всем элементам
        console.log(myForm.value);  
      } 
     
 * работа принимается только при исправлении всех "Надо исправить"
 */