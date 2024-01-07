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

const profileEditPopup = document.querySelector('.popup_type_edit');
const cardAddPopup = document.querySelector('.popup_type_new-card');
const fullImagePopup = document.querySelector('.popup_type_image');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const photoFullImagePopup = document.querySelector('.popup__image');
const cardPopupImageName = document.querySelector('.popup__caption');

const profileEditForm = document.forms['edit-profile'];
const profilePopupName = profileEditForm.elements.name;
const profilePopupDescription = profileEditForm.elements.description;

const cardAddForm = document.forms['new-place'];
const cardPopupName = cardAddForm.elements['place-name'];
const cardPopupLink = cardAddForm.elements.link;

const profileEditAvatarForm = document.forms['edit-avatar'];
const newAvatarUrl = profileEditAvatarForm.elements['new-avatar-link'];
const profileEditAvatarPopup = document.querySelector('.popup_type_edit-avatar');

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
profileEditButton.addEventListener('click', () => {
  profilePopupName.value = profileName.textContent;
  profilePopupDescription.value = profileDescription.textContent;

  clearValidation(profileEditForm, validationConfig);

  openModal(profileEditPopup);
});

profileAddButton.addEventListener('click', () => {
  clearValidation(cardAddForm, validationConfig);

  openModal(cardAddPopup);
});

popups.forEach(el => {
  const buttonClosePopup = el.querySelector('.popup__close');

  el.addEventListener('mousedown', closePopupWithClickOutside);
  buttonClosePopup.addEventListener('click', closePopupWithButton);
})

profileImage.addEventListener('click', () => {
  clearValidation(profileEditAvatarPopup, validationConfig);

  openModal(profileEditAvatarPopup);
});

profileEditForm.addEventListener('submit', editProfileHandler);
cardAddForm.addEventListener('submit', addCardHandler);
profileEditAvatarForm.addEventListener('submit', changeAvatarHandle);

// Функции обработчики событий
function openImageHandler(evt) {
  photoFullImagePopup.src = evt.target.src;
  photoFullImagePopup.alt = evt.target.alt;
  cardPopupImageName.textContent = evt.target.alt;
  
  openModal(fullImagePopup);
}

function editProfileHandler(evt) {
  evt.preventDefault();
  whileLoading(true, profileEditPopup.querySelector('.popup__button'));

  updateUserData({
    name: profilePopupName.value,
    about: profilePopupDescription.value
  }).then(userData => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;

    closeModal(profileEditPopup);

    profileEditForm.reset();
  }).catch(err => console.error(err))
    .finally(() => {
      whileLoading(false, profileEditPopup.querySelector('.popup__button'));
    });
}

function addCardHandler(evt) {
  evt.preventDefault();
  whileLoading(true, cardAddPopup.querySelector('.popup__button'));

  addNewCard({
    name: cardPopupName.value,
    link: cardPopupLink.value
  }).then(card => {
    renderCard(cardsListElement, card);

    cardAddForm.reset();

    closeModal(cardAddPopup);
  }).catch(err => console.error(err))
    .finally(() => {
      whileLoading(false, cardAddPopup.querySelector('.popup__button'));
    });
}

function changeAvatarHandle(evt) {
  evt.preventDefault();
  whileLoading(true, profileEditAvatarPopup.querySelector('.popup__button'));

  updateUserAvatar(newAvatarUrl.value)
    .then(data => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;

      profileEditAvatarForm.reset();

      closeModal(profileEditAvatarPopup);
    }).catch(err => console.error(err))
      .finally(() => {
        whileLoading(false, profileEditAvatarPopup.querySelector('.popup__button'));
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
