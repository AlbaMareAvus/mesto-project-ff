/**
 * Функция создания карточки
 * @param {object} cardInfo информация о карточке
 * @param {function} deleteCard функция удаления карточки
 * @returns {object} карточка
 */
export function createCard(cardData, deleteCard, openImageHandler, likeCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', (evt) => {
    evt.stopPropagation();
    deleteCard(cardElement);
  });

  cardImage.addEventListener('click', openImageHandler);

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', likeCard);

  return cardElement;
}

/**
 * Функция удаления карточки
 * @param {object} element карточка для удаления
 */
export function deleteCard(element) {
  element.remove();
}

/**
 * Функция лайка карточки
 */
export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}
