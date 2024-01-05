/**
 * Функция инициализации валидации
 * @param {Object} validationConfig
 */
export function enableValidation(validationConfig) {
  const formsList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formsList.forEach(formElement => {
    formElement.addEventListener('submit', evt => evt.preventDefault());

    setEventListeners(
      formElement,
      validationConfig
    );
  });
}

/**
 * Функция очистки валидации
 * @param {Object} validationConfig 
 */
export function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((inputElement) => hideError(formElement, inputElement, validationConfig));
  buttonElement.setAttribute("disabled", true);
}

/**
 * Функция установки слушателей на ввод данных в поля
 * @param {*} formElement 
 * @param {Object} validationConfig 
 */
function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

/**
 * Функция проверки валидации
 * @param {*} formElement 
 * @param {*} inputElement 
 * @param {Object} validationConfig 
 */
function checkValidity(formElement, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideError(
      formElement,
      inputElement,
      validationConfig
    );
  }
}

/**
 * Функция показа ошибки
 * @param {*} formElement 
 * @param {*} inputElement 
 * @param {String} errorMessage 
 * @param {Object} validationConfig 
 */
function showError(
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) {
  inputElement.classList.add(validationConfig.inputErrorClass);

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
}

/**
 * Функция скрытия ошибки
 * @param {*} formElement 
 * @param {*} inputElement 
 * @param {Object} validationConfig 
 */
function hideError(
  formElement,
  inputElement,
  validationConfig
) {
  inputElement.classList.remove(validationConfig.inputErrorClass);

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(validationConfig.errorClass);
}

/**
 * Функция переключения состояния кнопки отправки формы
 * @param {*} inputList 
 * @param {*} submitButtonElement
 */
function toggleButtonState(inputList, submitButtonElement) {
  if (hasError(inputList)) {
    submitButtonElement.setAttribute('disabled', true);
  } else {
    submitButtonElement.removeAttribute('disabled');
  }
}

/**
 * Функция проверки на наличие ошибки при вводе данных
 * @param {Array} inputList 
 * @returns true если присутствуют ошибки и false в ином случае
 */
function hasError(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
}
