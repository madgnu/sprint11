class PlaceCard extends Component {
  constructor(props) {
    super(props);
    // Можно лучше
    // Элемент шаблона лучше передать как параметр в конструктор
    this._template = document.querySelector('#cardTpl');
    this.like = this.like.bind(this);
    this._magnify = this._magnify.bind(this);
    this.state = {
      isLiked: false
    };
  }

  render() {
    // Надо исправить
    // cardTpl это элемент типа Fragment, это как div без оболочки, если грубо, можно его сразу
    // добавлять в DOM, не нужен тут firstElementChild
    // ANSWER: мне нужно получить Element, который находится в темплейте, так как он участвует в деструкторе (Component.remove)
    // ANSWER: к сожалению appendChild при добавлении конкретно DocumentFragment возвращает не Element, а пустой DocumentFragment
    // ANSWER: я бы мог получить нужный мне dom через селектор, но зачем, если есть более дешевый способ
    // ANSWER: btw, в скринкасте, посвященном этому спринту использован именно такой прием выдергивания Element
    // ANSWER: https://yadi.sk/i/Tubh_dObPeJf6g 3:43, line 16

    // Я предпочитаю клонировать шаблон в Fragment и дальше его модифицировать, таким образом точно исходный шаблон не изменю
    if (!this.getDOM()) {
      const cardTpl = this._create();
      super.render(cardTpl.firstElementChild);
      this.props.parentDOM().appendChild(cardTpl);
      // тут можно return и без else
    } else {
      this.getDOM().querySelector('.place-card__like-icon').className = `place-card__like-icon ${this.state.isLiked ? ' place-card__like-icon_liked' : ''}`;
      super.render();
    }
  }

  _create() {
    const cardDOM = this._template.content.cloneNode(true);
    const { link, name } = this.props;
    cardDOM.querySelector('.place-card__image').style.backgroundImage = `url(${link})`;
    cardDOM.querySelector('.place-card__name').textContent = name;
    return cardDOM;
  }

  componentDidMount() {
    this.getDOM().querySelector('.place-card__like-icon').addEventListener('click', this.like);
    this.getDOM().querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
    this.getDOM().querySelector('.place-card__image').addEventListener('click', this._magnify);
  }

  like() {
    this.setState({ isLiked: !this.state.isLiked });
  }

  _magnify(event) {
    if (event.target.classList.contains('place-card__image')) this.props.magnify(this.props.link);
  }
}