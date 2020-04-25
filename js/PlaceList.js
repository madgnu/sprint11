class PlacesList extends Component {
  constructor(props) {
    super(props);
    this._removeCardCb = this._removeCardCb.bind(this);
    this.state = {
      children: [...this.children]
    };
    this.addCard = this.addCard.bind(this);
  }

  render() {
    this.children = [...this.state.children];
    super.render(this.props.container);
  }

  _removeCardCb(cardEl, cb) {
    const children = this.state.children.filter((el) => el !== cardEl);
    this.setState({ children });
    if (this.props.onChildRemove) this.props.onChildRemove(cardEl, cb);
  }

  componentDidMount() {
    if (this.props.cards) this.addCard(this.props.cards);
  }

  addCard(data, ChildComponent = this.props.defaultChildClass) {
    if (Array.isArray(data)) {
      const newCards = data.map((cardData) => new ChildComponent({
        ...cardData,
        parentDOM: this.getDOM,
        myId: this.props.myId,
        onRemove: this._removeCardCb,
        onChangeLike: this.props.onChangeCardLike,
        magnify: this.props.magnify
      }));
      this.setState({ children: [...this.state.children, ...newCards] });
    } else if (data) {
      const newCard = new ChildComponent({ ...data, parentDOM: this.getDOM, myId: this.props.myId, onRemove: this._removeCardCb, onChangeLike: this.props.onChangeCardLike, magnify: this.props.magnify });
      this.setState({ children: [...this.state.children, newCard] });
    }
  }
}