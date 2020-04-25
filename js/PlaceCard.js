class PlaceCard extends Component {
  constructor(props) {
    super(props);
    this._template = document.querySelector('#cardTpl');
    this.like = this.like.bind(this);
    this._magnify = this._magnify.bind(this);
    this._isOwner = this.props.myId === this.props.owner._id;
    this.state = {
      isLiked: this.props.likes.filter((el) => el._id === this.props.myId).length > 0,
      likes: this.props.likes
    };
  }

  render() {
    if (!this.getDOM()) {
      const cardTpl = this._create();
      super.render(cardTpl.firstElementChild);
      this.props.parentDOM().appendChild(cardTpl);
    } else {
      super.render();
    }
    this.getDOM().querySelector('.place-card__like-icon').className = `place-card__like-icon ${this.state.isLiked ? ' place-card__like-icon_liked' : ''}`;
    this.getDOM().querySelector('.place-card__like-count').textContent = this.state.likes.length;
  }

  _create() {
    const cardDOM = this._template.content.cloneNode(true);
    const { link, name } = this.props;
    cardDOM.querySelector('.place-card__image').style.backgroundImage = `url(${link})`;
    cardDOM.querySelector('.place-card__name').textContent = name;
    if (!this._isOwner) cardDOM.querySelector('.place-card__delete-icon').remove();
    return cardDOM;
  }

  componentDidMount() {
    this.getDOM().querySelector('.place-card__like-icon').addEventListener('click', this.like);
    this.getDOM().querySelector('.place-card__image').addEventListener('click', this._magnify);
    if (this._isOwner) this.getDOM().querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
  }

  componentWillUnmount() {
    this.getDOM().querySelector('.place-card__like-icon').removeEventListener('click', this.like);
    this.getDOM().querySelector('.place-card__image').removeEventListener('click', this._magnify);
    if (this._isOwner) this.getDOM().querySelector('.place-card__delete-icon').removeEventListener('click', this.remove);
  }

  like() {
    if (this.props.onChangeLike) this.props.onChangeLike(this, !this.state.isLiked, (data) => {
      if (data) this.setState({ isLiked: !this.state.isLiked, likes: data.likes });
    });
  }

  get id() {
    return this.props._id;
  }

  _magnify(event) {
    if (event.target.classList.contains('place-card__image')) this.props.magnify(this.props.link);
  }
}