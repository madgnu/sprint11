export default class FormValidator {
  constructor(form) {
    this._form = form;
    this._inputs = [...form.elements].filter((el) => el.tagName === 'INPUT');
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
    if (el.type === 'url' && el.validity.typeMismatch) {
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

  async _submitHandler(event) {
    event.preventDefault();
    const ret = {};
    this._inputs.forEach((el) => ret[el.name] = el.value);
    this._submits.forEach((el) => {
      el.dataset.originText = el.textContent;
      el.textContent = 'Загрузка...';
      el.disabled = true;
    })
    await this.onSubmit(ret);
    this._submits.forEach((el) => {
      el.textContent = el.dataset.originText;
    })
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
    for (const field in data)
      if (field in this._form.elements) this._form.elements[field].value = data[field];
    this.setSubmitButtonState(false);
  }

}