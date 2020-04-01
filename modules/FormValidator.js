class FormValidator {
    constructor(form) {
        this._form = form;
        this._inputs = [...form.elements].filter((el) => el.tagName === 'INPUT');
        this._submits = [...form.elements].filter((el) => el.tagName === 'BUTTON' && el.type === 'submit');
        this.validate = this.validate.bind(this);
        this._submitHandler = this._submitHandler.bind(this);
        this.setEventListeners();
    }

    checkInputValidity(el, errEl) {
        if (el.validity.valueMissing) errEl.textContent = 'Это обязательное поле';
        else if (el.validity.tooShort || el.validity.tooLong) errEl.textContent = `Должно быть от ${el.getAttribute('minlength')} до ${el.getAttribute('maxlength')} символов`;
        else if (el.type === 'url' && (el.validity.typeMismatch || el.validity.patternMismatch)) errEl.textContent = 'Здесь должна быть ссылка';
        else errEl.textContent = '';
        return el.checkValidity();
    }

    validate(showErrors = true) {
        const formIsValid = this._inputs.reduce((acc, el) => showErrors  ? this.checkInputValidity(el, document.querySelector(el.dataset.errfield)) && acc : acc && el.checkValidity(), true);
        this._submits.forEach((el) => el.disabled = !formIsValid);
    }

    _submitHandler(event) {
        event.preventDefault();
        const ret = {};
        this._inputs.forEach((el) => ret[el.name] = el.value);
        this.onSubmit(ret);
    }

    setEventListeners() {
        this._inputs.forEach((el) => el.addEventListener('input', this.validate));
        this._form.addEventListener('submit', this._submitHandler);
    }

    reset() {
        this._form.reset();
        this._inputs.forEach((el) => document.querySelector(el.dataset.errfield).textContent = '');
    }

    setValues(data) {
        for (const field in data) this._form.elements[field].value = data[field];
        this.validate(false);
    }

}