class Popup extends Component {
  constructor(props) {
    super(props);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this._escHandler = this._escHandler.bind(this);
    this.state = {
      isOpened: false
    };
  }

  render() {
    super.render(this.props.container);
    this.getDOM().className = `popup ${this.state.isOpened ? 'popup_is-opened' : ''}`;
  }

  componentDidMount() {
    this.getDOM().querySelector('.popup__close').addEventListener('click', this.close);
  }

  componentWillUnmount() {
    this.getDOM().querySelector('.popup__close').removeEventListener('click', this.close);
    if (this.state.isOpened) document.removeEventListener('keydown', this._escHandler);
  }

  _escHandler(event) {
    if (event.key === 'Escape') this.close();
  }

  shouldComponentUpdate(oldState, newState) {
    return oldState.isOpened != newState.isOpened;
  }

  componentWillUpdate(oldState, newState) {
    if (newState.isOpened) document.addEventListener('keydown', this._escHandler);
    else document.removeEventListener('keydown', this._escHandler);
  }

  open() {
    this.setState({ isOpened: true });
  }

  close() {
    this.setState({ isOpened: false });
  }
}