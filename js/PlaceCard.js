class PlaceCard extends Component {
  constructor(props) {
    super(props);
    this._template = document.querySelector('#cardTpl');
    this.like = this.like.bind(this);
    this._magnify = this._magnify.bind(this);
    this.state = {
      isLiked: false
    };
  }

  render() {
    if (!this.getDOM()) {
      const cardTpl = this._create();
      super.render(cardTpl.firstElementChild);
      this.props.parentDOM().appendChild(cardTpl);
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

  componentWillUnmount() {
    this.getDOM().querySelector('.place-card__like-icon').removeEventListener('click', this.like);
    this.getDOM().querySelector('.place-card__delete-icon').removeEventListener('click', this.remove);
    this.getDOM().querySelector('.place-card__image').removeEventListener('click', this._magnify);
  }

  like() {
    this.setState({ isLiked: !this.state.isLiked });
  }

  _magnify(event) {
    if (event.target.classList.contains('place-card__image')) this.props.magnify(this.props.link);
  }
}