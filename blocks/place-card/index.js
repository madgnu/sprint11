class PlaceCard extends Component {
  constructor(props) {
    super(props);
    // Можно лучше
    // Элемент шаблона лучше передать как параметр в конструктор
    // ANSWER: я исхожу из принципа инкапсуляции ООП - внутрення реализация должна оставаться внутри
    // ANSWER: так как мы используем БЭМ, и данный класс называется PlaceCard (что достаточно четко указывает на предметную область и на конкретный блок в БЭМ)
    // ANSWER: то я считаю оправданным заключить контракт - инкапсуляция в обмен на наличие темплейта с соответствующим селектором в DOM
    this._template = document.querySelector('#cardTpl');
    this.like = this.like.bind(this);
    this._magnify = this._magnify.bind(this);
    // Вызывать метод рендеринга в конструкторе достаточно рискованно
    // 1) Т.к. конструктор не переопределяется, то это метод будет всегда при наследовании вызываться
    // а это может быть совершенно не нужным
    // 2) Если что-то не так пойдет с DOM, то тут ошибка в конструкторе ничего хорошего не сулит
  }

  render() {
    const cardTpl = this._create();
    // Надо исправить
    // cardTpl это элемент типа Fragment, это как div без оболочки, если грубо, можно его сразу
    // добавлять в DOM, не нужен тут firstElementChild
    // ANSWER: мне нужно получить Element, который находится в темплейте, так как он участвует в деструкторе (Component.remove)
    // ANSWER: к сожалению appendChild при добавлении конкретно DocumentFragment возвращает не Element, а пустой DocumentFragment
    // ANSWER: я бы мог получить нужный мне dom через селектор, но зачем, если есть более дешевый способ
    // ANSWER: btw, в скринкасте, посвященном этому спринту использован именно такой прием выдергивания Element
    // ANSWER: https://yadi.sk/i/Tubh_dObPeJf6g 3:43, line 16
    super.render(cardTpl.firstElementChild);
    this.props.container.appendChild(cardTpl);
  }

  _create() {
    const cardDOM = this._template.content.cloneNode(true);
    // Можно лучше
    // Деструктурировать необходимые данные из this.props, чтобы эту присказку за собой не тянуть
    // ANSWER: принято
    const {link, name} = this.props;
    cardDOM.querySelector('.place-card__image').style.backgroundImage = `url(${link})`;
    cardDOM.querySelector('.place-card__name').textContent = name;
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