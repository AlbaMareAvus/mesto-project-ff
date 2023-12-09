/**
 * Функция открытия попапа
 * @param {*} popupElement попап
 */
export function openModal(popupElement) {
  popupElement.classList.add('popup_is-opened');

  document.addEventListener('keydown', closePopupWithEsc);
}

/**
 * Функция закрытия попапа
 * @param {*} popupElement попап
 */
export function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');

  document.removeEventListener('keydown', closePopupWithEsc);
}

/**
 * Функция закрытия попапа при помощи кнопки
 * @param {*} evt событие
 */
export function closePopupWithButton(evt) {
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
export function closePopupWithClickOutside(evt) {
  if (evt.currentTarget === evt.target) closeModal(evt.target);
}
