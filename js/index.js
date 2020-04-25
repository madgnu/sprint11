'use strict';

(async () => {
  const popupImage = document.querySelector('.popup__image');

  const api = new Api('https://praktikum.tk', 'cohort10', '0b019abe-929d-4e9c-a772-71fefc318b80');

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


/*REVIEW. Резюме.

Проект продумывался и над ним много работали.

Но, надо, чтобы все функции проекта были в рабочем состоянии, либо в объёме обязательных требований, либо в полном объёме
дополнительных требований, а не в стадии отладки.

Что нужно исправить.
1. Привести проект в рабочее состояние в каком-либо из объёмов, указанных выше.

2. В случае неуспешного ответа сервера нужно возвращать не null,
  а объект с ошибкой, которая произошла. Нужно отладить этот момент, чтобы в консоли не появлялись
  uncought errors, если убрать return null, и другие ошибки (подробности в ревью в файле класса Api).

3. Продумать использование оператора await (не слишком ли его много) и какие именно функции должны быть async,
об await можно прочитать здесь https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/await .
.

*/

/*
1. Исправлена ошибка при удалении карточки.
2. Переделана логика обработки ошибок в Api._query
3. Все публичные функции Api сделаны async для унификации и удобства использования. Каждый из них допускает два варианта использования извне: через await или с передачей колбека,
   так что я считаю, что в данном случае все в порядке.
*/