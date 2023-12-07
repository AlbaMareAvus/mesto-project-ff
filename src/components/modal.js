/**
 * Функция открытия попапа
 * @param {*} popupElement попап
 */
export function openModal(popupElement) {
  const closeButton = popupElement.querySelector('.popup__close');

  switchClasses(popupElement);

  closeButton.addEventListener('click', closePopupWithButton);
  document.addEventListener('keydown', closePopupWithEsc);
  popupElement.addEventListener('mousedown', closePopupWithClickOutside);
}

/**
 * Функция закрытия попапа
 * @param {*} popupElement попап
 */
export function closeModal(popupElement) {
  switchClasses(popupElement);

  removePopupEventListeners(popupElement);
}

/**
 * Функция переключения классов
 * @param {*} popupElement попап
 */
function switchClasses(popupElement) {
  popupElement.classList.toggle('popup_is-animated');
  popupElement.classList.toggle('popup_is-opened');
}

/**
 * Функция закрытия попапа при помощи кнопки
 * @param {*} evt событие
 */
function closePopupWithButton(evt) {
  const popupElement = evt.target.closest('.popup_is-opened');

  closeModal(popupElement);
}

/**
 * Функция закрытия попапа при помощи нажатия на Esc
 * @param {*} evt событие
 */
function closePopupWithEsc(evt) {
  const popupElement = evt.currentTarget.querySelector('.popup_is-opened');

  if (evt.key === 'Escape') closeModal(popupElement);
}

/**
 * Функция закрытия попапа при помощи нажатия вне попапа
 * @param {*} evt событие
 */
function closePopupWithClickOutside(evt) {
  if (evt.currentTarget === evt.target) closeModal(evt.target);
}

/**
 * Функция удаления слушателей попапа
 * @param {*} popupElement попап 
 */
function removePopupEventListeners(popupElement) {
  const closeButton = popupElement.querySelector('.popup__close');

  closeButton.removeEventListener('click', closePopupWithButton);
  document.removeEventListener('keydown', closePopupWithEsc);
  popupElement.removeEventListener('mousedown', closePopupWithClickOutside);
}
