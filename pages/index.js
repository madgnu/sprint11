'use strict';
const popupImage = document.querySelector('.popup__image');

const newForm = new FormValidator(document.forms.new);
const editProfileForm = new FormValidator(document.forms.editProfile);
const magnifyPopup = new Popup({ container: document.querySelector('#imageMagnifier') });
const newCardPopup = new Popup({ container: document.querySelector('#newCard') });
const editProfilePopup = new Popup({ container: document.querySelector('#editProfile') });
const userInfo = new UserInfo({
  container: document.querySelector('.user-info'),
  name: 'Jaques Causteau',
  job: 'Sailor, Researcher',
  children: [
    new Button({
      container: document.querySelector('.user-info__edit-profile'),
      onClick: () => {
        editProfileForm.reset();
        editProfileForm.setValues(userInfo.profile);
        editProfilePopup.open();
      }
    }),
    new Button({
      container: document.querySelector('.user-info__add-card'),
      onClick: () => {
        newForm.reset();
        newCardPopup.open();
      }
    })
  ]
});

const placesList = new PlacesList({
  container: document.querySelector('.places-list'),
  cards: initialCards,
  defaultChildClass: PlaceCard,
  magnify: (url) => {
    popupImage.src = url;
    magnifyPopup.open();
  }
});

newForm.onSubmit = (data) => {
  placesList.addCard(data);
  newCardPopup.close();
};

editProfileForm.onSubmit = (data) => {
  userInfo.setUserInfo(data);
  userInfo.updateUserInfo();
  editProfilePopup.close();
};

[magnifyPopup, newCardPopup, editProfilePopup, userInfo, placesList].forEach((el) => el.render());

// См. Review.md