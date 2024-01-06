/**
 * Функция создания карточки
 * @param {object} cardData информация о карточке
 * @param {function} deleteCard функция удаления карточки с сервера
 * @returns {object} карточка
 */
export function createCard(cardData, deleteCard, openImageHandler, likeCard, userId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  cardElement.querySelector('.card__like-count').textContent = cardData.likes.length;

  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const isLiked = cardData.likes.some(like => like._id === userId);
  
  if (isLiked) cardLikeButton.classList.add('card__like-button_is-active');

  const deleteButton = cardElement.querySelector('.card__delete-button');
  
  if (cardData.owner._id === userId) {
    deleteButton.addEventListener('click', (evt) => {
      evt.stopPropagation();
      deleteCard(cardData._id)
        .then(() => removeCardFromScreen(cardElement));
    });
  } else {
    deleteButton.remove();
  }

  cardImage.addEventListener('click', openImageHandler);

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => likeCardHandle(likeButton, likeCard, cardData._id));

  return cardElement;
}

/**
 * Функция удаления карточки у пользователя
 * @param {object} element карточка для удаления
 */
function removeCardFromScreen(element) {
  element.remove();
}

/**
 * Функция лайка карточки
 */
export function likeCardHandle(likeButton, likeCard, cardId) {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    likeCard(cardId, 'DELETE')
      .then(data => {
        likeButton.classList.toggle('card__like-button_is-active');
        likeButton.nextElementSibling.textContent = data.likes.length;
      })
      .catch(err => console.error(err));
  } else {
    likeCard(cardId, 'PUT')
      .then(data => {
        likeButton.classList.toggle('card__like-button_is-active');
        likeButton.nextElementSibling.textContent = data.likes.length;
      })
      .catch(err => console.error(err));
  }
}
