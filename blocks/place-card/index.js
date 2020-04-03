class PlaceCard extends Component {
  constructor(props) {
    super(props);
    // Можно лучше
    // Элемент шаблона лучше передать как параметр в конструктор
    this._template = document.querySelector('#cardTpl');
    this.like = this.like.bind(this);
    this._magnify = this._magnify.bind(this);
    // Вызывать метод рендеринга в конструкторе достаточно рискованно
    // 1) Т.к. конструктор не переопределяется, то это метод будет всегда при наследовании вызываться
    // а это может быть совершенно не нужным
    // 2) Если что-то не так пойдет с DOM, то тут ошибка в конструкторе ничего хорошего не сулит
    this.render();
  }

  render() {
    const cardTpl = this._create();
    // Надо исправить
    // cardTpl это элемент типа Fragment, это как div без оболочки, если грубо, можно его сразу
    // добавлять в DOM, не нужен тут firstElementChild
    super.render(cardTpl.firstElementChild);
    this.props.container.appendChild(cardTpl);
  }

  _create() {
    const cardDOM = this._template.content.cloneNode(true);
    // Можно лучше
    // Деструктурировать необходимые данные из this.props, чтобы эту присказку за собой не тянуть
    cardDOM.querySelector('.place-card__image').style.backgroundImage = `url(${this.props.link})`;
    cardDOM.querySelector('.place-card__name').textContent = this.props.name;
    // Надо исправить
    // Установку слушателей лучще вынести в отдельный метод, его в случае наследования можно переопределять
    // А так придется весь метод создания карты переделывать
    cardDOM.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    cardDOM.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
    cardDOM.querySelector('.place-card__image').addEventListener('click', this._magnify);

    return cardDOM;
  }

  like() {
    this._dom.querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked');
  }

  _magnify(event) {
    if (event.target.classList.contains('place-card__image')) this.props.magnify(this.props.link);
  }
}