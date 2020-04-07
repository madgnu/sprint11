class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.setUserInfo({ name: props.name, job: props.job });
    this.state = this._profile;
  }

  render() {
    super.render(this.props.container);
    this.getDOM().querySelector('.user-info__name').textContent = this.state.name;
    this.getDOM().querySelector('.user-info__job').textContent = this.state.job;
  }

  setUserInfo(profile) {
    this._profile = profile;
  }

  updateUserInfo() {
    this.setState(this._profile);
  }

  get profile() {
    return this._profile;
  }
}