import './../pages/index.css'
import initialCards from './cards.js'

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const cardsListElement = document.querySelector('.places__list');

/**
 * Функция создания карточки
 * @param {object} cardInfo информация о карточке
 * @param {function} deleteCard функция удаления карточки
 * @returns {object} карточка
 */
function createCard(cardInfo, deleteCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__image').src = cardInfo.link;
  cardElement.querySelector('.card__title').textContent = cardInfo.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  return cardElement;
}

/**
 * Функция удаления карточки
 * @param {object} element карточка для удаления
 */
function deleteCard(element) {
  element.remove();
}

// Вывод карточки на страницу
initialCards.forEach((card) => {
  const temp = createCard(card, deleteCard)
  cardsListElement.append(temp);
});
