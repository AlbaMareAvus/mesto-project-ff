import './../pages/index.css'
import initialCards from './cards.js'
import { createCard, deleteCard, likeCard } from '../components/card.js';
import { closeModal, openModal } from '../components/modal.js';

// DOM узлы
const cardsListElement = document.querySelector('.places__list');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const openFullImagePopup = document.querySelector('.popup_type_image');

const editProfileButton = document.querySelector('.profile__edit-button');
const addProfileButton = document.querySelector('.profile__add-button');

const cardPopupImage = document.querySelector('.popup__image');
const cardPopupImageName = document.querySelector('.popup__caption');

const editProfileForm = document.forms['edit-profile'];
const profilePopupName = editProfileForm.elements.name;
const profilePopupDescription = editProfileForm.elements.description;

const addCardForm = document.forms['new-place'];
const cardPopupName = addCardForm.elements['place-name'];
const cardPopupLink = addCardForm.elements.link;

// Вывод карточки на страницу
initialCards.forEach((card) => {
  renderCard(cardsListElement, card);
});

// Слушатели событий
editProfileButton.addEventListener('click', () => {
  profilePopupName.value = profileName.textContent;
  profilePopupDescription.value = profileDescription.textContent;

  editProfileForm.addEventListener('submit', editProfileHandler);

  openModal(editProfilePopup);
});

addProfileButton.addEventListener('click', () => {
  addCardForm.addEventListener('submit', addCardHandler);

  openModal(addCardPopup);
});

// Функции обработчики событий
function openImageHandler(evt) {
  cardPopupImage.src = evt.target.src;
  cardPopupImage.alt = evt.target.alt;
  cardPopupImageName.textContent = evt.target.alt;
  
  openModal(openFullImagePopup);
}

function editProfileHandler(evt) {
  evt.preventDefault();

  profileName.textContent = profilePopupName.value;
  profileDescription.textContent = profilePopupDescription.value;

  closeModal(editProfilePopup);

  editProfileForm.removeEventListener('submit', editProfileHandler);
  editProfileForm.reset();
}

function addCardHandler(evt) {
  evt.preventDefault();

  const newCardData = {
    name: cardPopupName.value,
    link: cardPopupLink.value
  }

  renderCard(cardsListElement, newCardData);

  addCardForm.removeEventListener('submit', addCardHandler);
  addCardForm.reset();

  closeModal(addCardPopup);
}

/**
 * Функция отрисовки карточки в элементе
 * @param {*} rootElement корневой элемент, в который рендерится карточка
 * @param {*} data данные о карточке
 */
function renderCard(rootElement, data) {
  const cardElement = createCard(data, deleteCard, openImageHandler, likeCard);
  rootElement.prepend(cardElement);
}
