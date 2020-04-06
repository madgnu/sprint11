class PlacesList extends Component {
  constructor(props) {
    super(props);
    this._removeCardCb = this._removeCardCb.bind(this);
    this.state = {
      cards: []
    };
  }

  render() {
    this.children = [...this.state.cards];
    super.render(this.props.container);
  }

  _removeCardCb(cardEl) {
    const cards = this.state.filter((el) => el !== cardEl);
    this.setState({cards});
  }

  componentDidMount() {
    this.addCard(this.props.cards);
  }

  addCard(data, childClass = this.props.defaultChildClass) {
    // Нельзя создавать новые сущности одного класса внутри другого класса
    // Класс -- объект самодостаточный, ему необходимо данные передавать в конструктор или в методы в конце концов.
    // Если этот класс будет включен в другой проект, то тогда придется тянуть за собой все глобальные объекты,
    // к которым он обращается.
    if (Array.isArray(data)) {
      const newCards = data.map((cardData) => new childClass({ ...cardData, parentDOM: this.getDOM, onRemove: this._removeCardCb, magnify: this.props.magnify }));
      this.setState({ cards: [...this.state.cards, ...newCards] });
    } else {
      const newCard = new childClass({ ...data, parentDOM: this.getDOM, onRemove: this._removeCardCb, magnify: this.props.magnify });
      this.setState({ cards: [...this.state.cards, newCard]});        
    }
  }
}