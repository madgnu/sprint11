'use strict';

const initialCards = [
    { name: 'Архыз', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg' },
    { name: 'Челябинская область', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg' },
    { name: 'Иваново', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg' },
    { name: 'Камчатка', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg' },
    { name: 'Холмогорский район', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg' },
    { name: 'Байкал', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg' },
    { name: 'Нургуш', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg' },
    { name: 'Тулиновка', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg' },
    { name: 'Остров Желтухина', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg' },
    { name: 'Владивосток', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg' }
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
}

const updateProfile = ({name, job}) => {
    profileName.textContent = name;
    profileJob.textContent = job;
}

const checkInputValidity = (el, errEl) => {
    if (el.validity.valueMissing) errEl.textContent = 'Это обязательное поле';
    else if (el.validity.tooShort || el.validity.tooLong) errEl.textContent = `Должно быть от ${el.getAttribute('minlength')} до ${el.getAttribute('maxlength')} символов`;
    else if (el.type === 'url' && (el.validity.typeMismatch || el.validity.patternMismatch)) errEl.textContent = 'Здесь должна быть ссылка';
    else errEl.textContent = '';
    return el.checkValidity();
}

const setSubmitButtonState = (btn, enabled) => btn.disabled = !enabled;

const setEventListeners = (form) => {
    const inputs = [...form.elements].filter((el) => el.tagName === 'INPUT');
    const submitBtn = ([...form.elements].filter((el) => el.tagName === 'BUTTON'))[0];
    const submitDefaultState = submitBtn.disabled;
    inputs.forEach((el) => el.addEventListener('input', () => setSubmitButtonState(submitBtn, inputs.reduce((acc, el) => checkInputValidity(el, document.querySelector(el.dataset.errfield)) && acc, true))));
    form.addEventListener('reset', () => { setSubmitButtonState(submitBtn, !submitDefaultState); inputs.forEach((el) => document.querySelector(el.dataset.errfield).textContent = ''); });
}

const openPopup = (popup) => { popup.classList.add('popup_is-opened'); (currentPopup = popup) };
const closePopup = () => { currentPopup.classList.remove('popup_is-opened'); (currentForm && currentForm.reset()) };
const escapePopup = (event) => (event.key === 'Escape' && currentPopup && currentPopup.classList.contains('popup_is-opened')) ? closePopup() : null;
const likeChange = (event) => (event.target.classList.contains('place-card__like-icon')) ? event.target.classList.toggle('place-card__like-icon_liked') : null;
const deleteCard = (event) => (event.target.classList.contains('place-card__delete-icon')) ? event.target.parentNode.parentNode.remove() : null;
const magnifyImage = (event) => event.target.classList.contains('place-card__image') ? (popupImage.src = event.target.style.backgroundImage.slice(5, -2)) && openPopup(magnifyPopup) : null;
const submitNewCard = (event) => { event.preventDefault(); createCard({ name: newForm.elements.name.value, link: newForm.elements.link.value }); closePopup(); };
const submitProfileChange = (event) => { event.preventDefault(); updateProfile({ name: editProfileForm.name.value, job: editProfileForm.elements.job.value }); closePopup(); };

cardList.addEventListener('click', likeChange);
cardList.addEventListener('click', deleteCard);
cardList.addEventListener('click', magnifyImage);
newCardBtn.addEventListener('click', () => { openPopup(newCardPopup); currentForm = newForm; });
editProfileBtn.addEventListener('click', () => {  editProfileForm.name.value = profileName.textContent; editProfileForm.job.value = profileJob.textContent; openPopup(editProfilePopup); currentForm = editProfileForm; });
popupCloseBtns.forEach((btn) => btn.addEventListener('click', closePopup));
newForm.addEventListener('submit', submitNewCard);
editProfileForm.addEventListener('submit', submitProfileChange);
document.addEventListener('keydown', escapePopup);
setEventListeners(editProfileForm);
setEventListeners(newForm);

initialCards.forEach(createCard);