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
const popup = document.querySelector('.popup');
const popupOpenBtn = document.querySelector('.user-info__add-card');
const popupCloseBtn = document.querySelector('.popup__close');
const newForm = document.forms.new;

const createCard = ({name, link}) => {
    const el = document.createElement('div');
    const tpl = `
        <div class="place-card__image" style="background-image: url(${link})">
            <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
            <h3 class="place-card__name">${name}</h3>
            <button class="place-card__like-icon"></button>
        </div>`;
    el.classList = 'place-card';
    el.insertAdjacentHTML('beforeend', tpl);
    cardList.appendChild(el);
};

const openForm = () => popup.classList.add('popup_is-opened');
const closeForm = () => popup.classList.remove('popup_is-opened') || newForm.reset();
const escapeForm = (event) => (popup.classList.contains('popup_is-opened') && event.key === 'Escape') ? closeForm() : null;
const likeChange = (event) => (event.target.classList.contains('place-card__like-icon')) ? event.target.classList.toggle('place-card__like-icon_liked') : null;
const deleteCard = (event) => (event.target.classList.contains('place-card__delete-icon')) ? event.target.parentNode.parentNode.remove() : null;
const submitForm = (event) => { event.preventDefault(); createCard({ name: newForm.elements.name.value, link: newForm.elements.link.value }); closeForm(); };

cardList.addEventListener('click', likeChange);
cardList.addEventListener('click', deleteCard);
popupOpenBtn.addEventListener('click', openForm);
popupCloseBtn.addEventListener('click', closeForm);
newForm.addEventListener('submit', submitForm);
document.addEventListener('keydown', escapeForm);

initialCards.forEach(createCard);