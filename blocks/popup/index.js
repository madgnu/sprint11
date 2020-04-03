class Popup extends Component {
  constructor(props) {
    super(props);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this._escHandler = this._escHandler.bind(this);
  }

  render() {
    super.render(this.props.container);
    // Надо исправить
    // render для отрисовки, а сулшатели надо в отдельном методе назначать
    this._dom.querySelector('.popup__close').addEventListener('click', this.close);
  }

  _escHandler(event) {
    if (event.key === 'Escape') this.close();
  }

  open() {
    this._dom.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._escHandler);
  }

  close() {
    document.removeEventListener('keydown', this._escHandler);
    this._dom.classList.remove('popup_is-opened');
  }
}