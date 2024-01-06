import './../pages/index.css'
import { createCard } from './card.js';
import {
  closeModal,
  openModal,
  closePopupWithButton,
  closePopupWithClickOutside
} from './modal.js';
import { enableValidation, clearValidation } from "./validation";
import {
  getUserData,
  getCards,
  updateUserData,
  addNewCard,
  deleteCard,
  likeCard,
  updateUserAvatar
} from './api.js';

// DOM узлы
const cardsListElement = document.querySelector('.places__list');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const popups = document.querySelectorAll('.popup');

const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const fullImagePopup = document.querySelector('.popup_type_image');

const editProfileButton = document.querySelector('.profile__edit-button');
const addProfileButton = document.querySelector('.profile__add-button');

const photoFullImagePopup = document.querySelector('.popup__image');
const cardPopupImageName = document.querySelector('.popup__caption');

const editProfileForm = document.forms['edit-profile'];
const profilePopupName = editProfileForm.elements.name;
const profilePopupDescription = editProfileForm.elements.description;

const addCardForm = document.forms['new-place'];
const cardPopupName = addCardForm.elements['place-name'];
const cardPopupLink = addCardForm.elements.link;

const editProfileAvatarForm = document.forms['edit-avatar'];
const newAvatarUrl = editProfileAvatarForm.elements['new-avatar-link'];
const editProfileAvatarPopup = document.querySelector('.popup_type_edit-avatar');

// Настройки валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

let userId;

// Слушатели событий
editProfileButton.addEventListener('click', () => {
  profilePopupName.value = profileName.textContent;
  profilePopupDescription.value = profileDescription.textContent;

  clearValidation(editProfileForm, validationConfig);

  openModal(editProfilePopup);
});

addProfileButton.addEventListener('click', () => {
  clearValidation(addCardForm, validationConfig);

  openModal(addCardPopup);
});

popups.forEach(el => {
  const closeButton = el.querySelector('.popup__close');

  el.addEventListener('mousedown', closePopupWithClickOutside);
  closeButton.addEventListener('click', closePopupWithButton);
})

profileImage.addEventListener('click', () => {
  clearValidation(editProfileAvatarPopup, validationConfig);

  openModal(editProfileAvatarPopup);
});

editProfileForm.addEventListener('submit', editProfileHandler);
addCardForm.addEventListener('submit', addCardHandler);
editProfileAvatarForm.addEventListener('submit', changeAvatarHandle);

// Функции обработчики событий
function openImageHandler(evt) {
  photoFullImagePopup.src = evt.target.src;
  photoFullImagePopup.alt = evt.target.alt;
  cardPopupImageName.textContent = evt.target.alt;
  
  openModal(fullImagePopup);
}

async function editProfileHandler(evt) {
  evt.preventDefault();
  whileLoading(true, editProfilePopup.querySelector('.popup__button'));

  updateUserData({
    name: profilePopupName.value,
    about: profilePopupDescription.value
  }).then(userData => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;

    closeModal(editProfilePopup);

    editProfileForm.reset();
  }).catch(err => console.error(err))
    .finally(() => {
      whileLoading(false, editProfilePopup.querySelector('.popup__button'));
    });
}

function addCardHandler(evt) {
  evt.preventDefault();
  whileLoading(true, addCardPopup.querySelector('.popup__button'));

  addNewCard({
    name: cardPopupName.value,
    link: cardPopupLink.value
  }).then(card => {
    renderCard(cardsListElement, card);

    addCardForm.reset();

    closeModal(addCardPopup);
  }).catch(err => console.error(err))
    .finally(() => {
      whileLoading(false, addCardPopup.querySelector('.popup__button'));
    });
}

function changeAvatarHandle(evt) {
  evt.preventDefault();
  whileLoading(true, editProfileAvatarPopup.querySelector('.popup__button'));

  updateUserAvatar(newAvatarUrl.value)
    .then(data => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;

      editProfileAvatarForm.reset();

      closeModal(editProfileAvatarPopup);
    }).catch(err => console.error(err))
      .finally(() => {
        whileLoading(false, editProfileAvatarPopup.querySelector('.popup__button'));
      });
}

/**
 * Функция отрисовки карточки в элементе
 * @param {*} rootElement корневой элемент, в который рендерится карточка
 * @param {*} data данные о карточке
 */
function renderCard(rootElement, data, userId) {
  const cardElement = createCard(data, deleteCard, openImageHandler, likeCard, userId);
  rootElement.prepend(cardElement);
}

/**
 * Функция улучшения UI/UX
 * @param {Boolean} isLoading 
 * @param {*} button 
 */
function whileLoading(isLoading, button) {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
};

Promise.all([getUserData(), getCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;

    cards.reverse().forEach(card => {
      renderCard(cardsListElement, card, userId);
    });
  })
  .catch(err => console.error(err));

enableValidation(validationConfig);
