const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-3',
  headers: {
    authorization: 'efc9a0ff-7f49-4de1-80a4-61822e4f9d1b',
    'Content-Type': 'application/json'
  }
}

/**
 * Функция обработки данных ответа
 */
function getResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

/**
 * Функция получения данных о пользователе
 */
export const getUserData = async () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  }).then((res) => getResponse(res));
};

/**
 * Функция получения карточек с сервера
 */
export const getCards = async () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  }).then((res) => getResponse(res));
};

/**
 * Функция редактирования данных профиля
 * @param {Object} user обновленные данные о пользователе
 */
export const updateUserData = async (user) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: user.name,
      about: user.about
    }),
  }).then((res) => getResponse(res));
};

/**
 * Функция редактирования аватара пользователя
 * @param {String} url ссылка на новый аватар
 */
export const updateUserAvatar = async url => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: url
    })
  }).then(res => getResponse(res));
};

/**
 * Функция добавления новой карточки
 * @param {Object} card данные карточки
 */
export const addNewCard = async (card) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link
    }),
  }).then((res) => getResponse(res));
};

/**
 * Функция удаления карточки
 * @param {*} cardId
 */
export const deleteCard = async (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  }).then((res) => getResponse(res));
};

/**
 * Функция лайка карточки
 * @param {*} cardId 
 * @param {String} method 
 */
export const likeCard = async (cardId, method) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method,
    headers: config.headers
  }).then(res => getResponse(res));
}
