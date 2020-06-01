class UserInfo extends Component {
  constructor(props) {
    super(props);
    //https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg
    this.setUserInfo({ name: props.name, about: props.about, avatar: props.avatar });
    this.state = this._profile;
  }

  render() {
    super.render(this.props.container);
    const nameEl = this.getDOM().querySelector('.user-info__name');
    const jobEl = this.getDOM().querySelector('.user-info__job');
    const photoEl = this.getDOM().querySelector('.user-info__photo');
    if (nameEl.textContent !== this.state.name) nameEl.textContent = this.state.name;
    if (jobEl.textContent !== this.state.about) jobEl.textContent = this.state.about;
    if (photoEl.style.backgroundImage !== `url("${this.state.avatar}")`) photoEl.style.backgroundImage = `url("${this.state.avatar}")`;
  }

  setUserInfo(profile) {
    if (!this._profile) this._profile = {};
    this._profile = { ...this._profile, ...profile};
  }

  updateUserInfo() {
    this.setState(this._profile);
  }

  get id() {
    return this.props._id;
  }

  get profile() {
    return this._profile;
  }
}