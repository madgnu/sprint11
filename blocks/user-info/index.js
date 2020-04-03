class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { name: props.name, job: props.job };
  }

  render() {
    if (!this._dom) {
      super.render(this.props.container);
      // Нельзя создавать новые сущности одного класса внутри другого класса
      // Класс -- объект самодостаточный, ему необходимо данные передавать в конструктор или в методы в конце концов.
      // Если этот класс будет включен в другой проект, то тогда придется тянуть за собой все глобальные объекты,
      // к которым он обращается.
      const editProfieBtn = new Button({
        container: this._dom.querySelector('.user-info__edit-profile'),
        onClick: this.props.clickEditProfile
      });
      const newCardBtn = new Button({
        container: this._dom.querySelector('.user-info__add-card'),
        onClick: this.props.clickNewCard
      });
      this.children.push(editProfieBtn, newCardBtn);
    }
    this._dom.querySelector('.user-info__name').textContent = this.state.name;
    this._dom.querySelector('.user-info__job').textContent = this.state.job;
  }

  setUserInfo(newState) {
    this.state = { ...this.state, ...newState };
  }

  updateUserInfo() {
    this.render();
  }

  get profile() {
    return this.state;
  }
}