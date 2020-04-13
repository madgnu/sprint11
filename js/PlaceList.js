class PlacesList extends Component {
  constructor(props) {
    super(props);
    this._removeCardCb = this._removeCardCb.bind(this);
    this.state = {
      children: [...this.children]
    };
  }

  render() {
    this.children = [...this.state.children];
    super.render(this.props.container);
  }

  _removeCardCb(cardEl) {
    const children = this.state.children.filter((el) => el !== cardEl);
    this.setState({ children });
  }

  componentDidMount() {
    this.addCard(this.props.cards);
  }

  addCard(data, ChildComponent = this.props.defaultChildClass) {
    if (Array.isArray(data)) {
      const newCards = data.map((cardData) => new ChildComponent({
        ...cardData,
        parentDOM: this.getDOM,
        onRemove: this._removeCardCb, 
        magnify: this.props.magnify
      }));
      this.setState({ children: [...this.state.children, ...newCards] });
    } else {
      const newCard = new ChildComponent({ ...data, parentDOM: this.getDOM, onRemove: this._removeCardCb, magnify: this.props.magnify });
      this.setState({ children: [...this.state.children, newCard] });
    }
  }
}