'use strict';
const createCard = ({name, link}, container) => {
    const cardTpl = document.querySelector('#cardTpl');
    const cardDOM = cardTpl.content.cloneNode(true);
    cardDOM.querySelector('.place-card__image').style.backgroundImage = `url(${link})`;
    cardDOM.querySelector('.place-card__name').textContent = name;
    container.appendChild(cardDOM);
};

const addListCard = (cards, container) => cards.forEach((card) => createCard(card, container));
const likeChange = (event) => (event.target.classList.contains('place-card__like-icon')) ? event.target.classList.toggle('place-card__like-icon_liked') : null;
const deleteCard = (event) => (event.target.classList.contains('place-card__delete-icon')) ? event.target.parentNode.parentNode.remove() : null;