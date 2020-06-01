'use strict';

import './index.css';

import FormValidator from '../../js/FormValidator.js';
import Popup from '../../js/Popup.js';
import UserInfo from '../../js/UserInfo.js';
import Button from '../../js/Button.js';
import PlaceCard from '../../js/PlaceCard.js';
import PlacesList from '../../js/PlaceList.js';
import Api from '../../js/Api.js';

(async () => {
  const popupImage = document.querySelector('.popup__image');

  const serverUrl = (NODE_ENV === 'development') ? 'http://praktikum.tk' : 'https://praktikum.tk';
  const api = new Api(serverUrl, 'cohort10', '0b019abe-929d-4e9c-a772-71fefc318b80');

  const newForm = new FormValidator(document.forms.new);
  const editProfileForm = new FormValidator(document.forms.editProfile);
  const editAvatarForm = new FormValidator(document.forms.editAvatar);

  const magnifyPopup = new Popup({ container: document.querySelector('#imageMagnifier') });
  const newCardPopup = new Popup({ container: document.querySelector('#newCard') });
  const editProfilePopup = new Popup({ container: document.querySelector('#editProfile') });
  const editAvatarFormPopup = new Popup({ container: document.querySelector('#editAvatar') });

  const userData = await api.getMe();

  const userInfo = new UserInfo({
    container: document.querySelector('.user-info'),
    ...userData,
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
      }),
      new Button({
        container: document.querySelector('.user-info__photo'),
        onClick: () => {
          editAvatarForm.reset();
          editAvatarForm.setValues(userInfo.profile);
          editAvatarFormPopup.open();
        }
      })
    ]
  });

  if (!userData) {
    userInfo.render();
    userInfo.remove();
    alert('Упси-вупси, байтики не смогли получиться с сервера, к сожалению на этом наши полномочия все');
    return;
  }

  const placesList = new PlacesList({
    container: document.querySelector('.places-list'),
    myId: userInfo.id,
    cards: await api.getCards(),
    defaultChildClass: PlaceCard,
    magnify: (url) => {
      popupImage.src = url;
      magnifyPopup.open();
    },
    onChildRemove: async (card, cb) => {
      const rData = await api.deleteCard(card.id);
      cb(typeof(rData) !== 'object' || rData.message !== 'Пост удалён');
    },
    onChangeCardLike: (card, isLiked, cb) => (isLiked) ? api.putCardLike(card.id, cb) : api.deleteCardLike(card.id, cb)
  });

  newForm.onSubmit = async (data) => {
    await api.postCard(data, placesList.addCard);
    newCardPopup.close();
  };

  editProfileForm.onSubmit = async (data) => {
    userInfo.setUserInfo(await api.patchMe(data));
    userInfo.updateUserInfo();
    editProfilePopup.close();
  };

  editAvatarForm.onSubmit = async (data) => {
    userInfo.setUserInfo(await api.patchMeAvatar(data));
    userInfo.updateUserInfo();
    editAvatarFormPopup.close();
  }

  [magnifyPopup, newCardPopup, editProfilePopup, editAvatarFormPopup, userInfo, placesList].forEach((el) => el.render());
})();