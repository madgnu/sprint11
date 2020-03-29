'use strict';
let currentPopup = null;
let currentForm = null;

const openPopup = (popup, form = null) => {
    currentPopup = popup;
    currentForm = form;
    popup.classList.add('popup_is-opened');
};

const closePopup = () => {
    currentPopup.classList.remove('popup_is-opened');
    if (currentForm) currentForm.reset();
};

const escapePopup = (event) => {
    if (event.key === 'Escape' && currentPopup && currentPopup.classList.contains('popup_is-opened')) {
        closePopup();
    }
}

const initCloseBtns = (btns) => btns.forEach((el) => el.addEventListener('click', closePopup));