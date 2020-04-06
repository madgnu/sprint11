class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.setUserInfo({ name: props.name, job: props.job });
    this.state = this._profile;
  }

  render() {
    super.render(this.props.container);
    //if (!this._dom) {
      // Нельзя создавать новые сущности одного класса внутри другого класса
      // Класс -- объект самодостаточный, ему необходимо данные передавать в конструктор или в методы в конце концов.
      // Если этот класс будет включен в другой проект, то тогда придется тянуть за собой все глобальные объекты,
      // к которым он обращается.
    //}
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