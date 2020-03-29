'use strict';
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

const updateProfile = ({name, job}) => {
    profileName.textContent = name;
    profileJob.textContent = job;
};

const submitNewCard = (event) => {
    event.preventDefault();
    createCard({ name: newForm.elements.name.value, link: newForm.elements.link.value }, cardList);
    closePopup();
};

const submitProfileChange = (event) => {
    event.preventDefault();
    updateProfile({ name: editProfileForm.name.value, job: editProfileForm.elements.job.value });
    closePopup();
};

const clickNewCard = () => openPopup(newCardPopup, newForm);

const clickEditProfile =  () => {
    editProfileForm.name.value = profileName.textContent;
    editProfileForm.job.value = profileJob.textContent;
    openPopup(editProfilePopup, editProfileForm);
};

const magnifyImage = (event) => {
    if (event.target.classList.contains('place-card__image')) {
        popupImage.src = event.target.style.backgroundImage.slice(5, -2);
        openPopup(magnifyPopup);
    }
};

cardList.addEventListener('click', likeChange);
cardList.addEventListener('click', deleteCard);
cardList.addEventListener('click', magnifyImage);
// Можно лучше:  Вынесите реализацию из слушателя в отдельную функцию.
newCardBtn.addEventListener('click', clickNewCard);
 // Можно лучше:  Вынесите реализацию из слушателя в отдельную функцию.
editProfileBtn.addEventListener('click', clickEditProfile);
newForm.addEventListener('submit', submitNewCard);
editProfileForm.addEventListener('submit', submitProfileChange);
document.addEventListener('keydown', escapePopup);
// Можно лучше:  Вынесите реализацию из слушателя в отдельную функцию.
initCloseBtns(popupCloseBtns);
setEventListeners(editProfileForm);
setEventListeners(newForm);
 // Надо исправить: Перебор и добавление карточек вне функции является результатом плохой организации кода
 // Уберите перебор карточек в функцию, а в качестве параметров для функции передайте место куда записывать и массив карточек
 // function addListCard(conteiner, initialCards){ /* реализация */ }
addListCard(initialCards, cardList);

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