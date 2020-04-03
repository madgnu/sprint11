class PlacesList extends Component {
  constructor(props) {
    super(props);
    this._removeCardCb = this._removeCardCb.bind(this);
  }

  render() {
    super.render(this.props.container);
    this.props.cards.forEach((el) => this.addCard(el));
  }

  _removeCardCb(cardEl) {
    this.children = this.children.filter((el) => el !== cardEl);
  }

  addCard(card) {
    // Нельзя создавать новые сущности одного класса внутри другого класса
    // Класс -- объект самодостаточный, ему необходимо данные передавать в конструктор или в методы в конце концов.
    // Если этот класс будет включен в другой проект, то тогда придется тянуть за собой все глобальные объекты,
    // к которым он обращается.
    const cardInstance = new PlaceCard({ ...card, container: this._dom, onRemove: this._removeCardCb, magnify: this.props.magnify });
    this.children.push(cardInstance);
    cardInstance.render();
  }
}