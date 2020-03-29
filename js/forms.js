'use strict';
const checkInputValidity = (el, errEl) => {
    // Можно лучше: обычно названия, для примера 'Должно быть от 2 до 30 символов' 
    // выносят в отдельный объект. Допустим может появится задача сделать многоязычный сайт
    // Для примера : const words = { validationLenght: 'Должно быть от 2 до 30 символов'	} 
    // Далее words передаётся в функцию и используется.
    if (el.validity.valueMissing) errEl.textContent = 'Это обязательное поле';
    /* Можно лучше: удалите else а внутри условия добавьте return
         например было: 
         if(условие){  
             // ваш код 
         } else if(условие2){ 
             // ваш код 
         } 
         стало : 
         if(условие){  
                 // ваш код 
            return; 
        } 
     
         if(условие2){ 
            // ваш код 
            return; 
        } 
     
    */
    else if (el.validity.tooShort || el.validity.tooLong) errEl.textContent = `Должно быть от ${el.getAttribute('minlength')} до ${el.getAttribute('maxlength')} символов`;
    else if (el.type === 'url' && (el.validity.typeMismatch || el.validity.patternMismatch)) errEl.textContent = 'Здесь должна быть ссылка';
    else errEl.textContent = '';
    return el.checkValidity();
};

const setSubmitButtonsState = (btns, btnDisabled) => {
    const disType = typeof(btnDisabled);
    btns.forEach((el, i) => el.disabled = (disType === 'boolean') ? btnDisabled : btnDisabled[i]);
};

const setEventListeners = (form) => {
    const inputs = [...form.elements].filter((el) => el.tagName === 'INPUT');
    /* Надо исправить : Не правильно использовать индексы и обращаться по индексу [0] к элементу
     Если перед элементом который вы получаете поставить такой же элемент, то логика нарушится
     Обращайтесь лучше на прямую к элементу например по ID или же переберите все элементы и найдите тот который вам нужен
     Про перебор лучше делать наверное так, если мы например перебираем форму
     const forms = document.getElementById("myForm");
      for (const myForm of forms.elements) { 
     // здесь мы получаем доступ ко всем элементам
        console.log(myForm.value);  
      } 
     */ 
    const submits = ([...form.elements].filter((el) => el.tagName === 'BUTTON' && el.type === 'submit'));
    const submitDefaultStates = submits.map((el) => el.disabled);
    inputs.forEach((el) => el.addEventListener('input', () => setSubmitButtonsState(submits, !inputs.reduce((acc, el) => checkInputValidity(el, document.querySelector(el.dataset.errfield)) && acc, true))));
    form.addEventListener('reset', () => {
        setSubmitButtonsState(submits, submitDefaultStates);
        inputs.forEach((el) => document.querySelector(el.dataset.errfield).textContent = '');
    });
};