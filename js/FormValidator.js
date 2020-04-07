class FormValidator {
  constructor(form) {
    this._form = form;
    this._inputs = [...form.elements].filter((el) => el.tagName === 'INPUT');
    // Не встречал формы где две кнопки сабмита, стоит ли тут массив прям создавать,
    // а потом перебирать массив из одного элемента?
    // ANSWER: в прошлом спринте в секции надо исправить было сказано, что нельзя полагаться на [...form.elements].filter((el) => el.tagName === 'BUTTON' && el.type ==='submit')[0]
    // ANSWER: так как разметку могут поменять. Я тоже не особо видел примеры с более, чем одним сабмитом (может несколько раз, но это точно не мейнстрим)
    // ANSWER: а как-то извне передавать элемент сабмита я не хочу

    // Ну вот вообще лучше может и извне, таким образом класс не заморачивается на тонкости верстки и реализации чего-то еще
    // а просто получил кнопку и ее включает-выключает, максимально отвязан от реализации формы
    // А представьте не нашел кнопку?
    this._submits = [...form.elements].filter((el) => el.tagName === 'BUTTON' && el.type === 'submit');
    this.setSubmitButtonState = this.setSubmitButtonState.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this.setEventListeners();
  }

  checkInputValidity(el, errEl) {
    if (el.validity.valueMissing) {
      errEl.textContent = 'Это обязательное поле';
      return false;
    }
    if (el.validity.tooShort || el.validity.tooLong) {
      errEl.textContent = `Должно быть от ${el.getAttribute('minlength')} до ${el.getAttribute('maxlength')} символов`;
      return false;
    }
    if (el.type === 'url' && (el.validity.typeMismatch || el.validity.patternMismatch)) {
      errEl.textContent = 'Здесь должна быть ссылка';
      return false;
    }

    errEl.textContent = '';
    return el.checkValidity();
  }

  setSubmitButtonState(showErrors = true) {
    const formIsValid = this._inputs.reduce((acc, el) => showErrors ? this.checkInputValidity(el, document.querySelector(el.dataset.errfield)) && acc : acc && el.checkValidity(), true);
    this._submits.forEach((el) => el.disabled = !formIsValid);
  }

  _submitHandler(event) {
    event.preventDefault();
    const ret = {};
    this._inputs.forEach((el) => ret[el.name] = el.value);
    this.onSubmit(ret);
  }

  setEventListeners() {
    this._inputs.forEach((el) => el.addEventListener('input', () => this.setSubmitButtonState()));
    this._form.addEventListener('submit', this._submitHandler);
  }

  reset() {
    this._form.reset();
    this._inputs.forEach((el) => document.querySelector(el.dataset.errfield).textContent = '');
    this.setSubmitButtonState(false);
  }

  setValues(data) {
    for (const field in data) this._form.elements[field].value = data[field];
    this.setSubmitButtonState(false);
  }

}