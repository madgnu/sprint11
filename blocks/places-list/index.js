class PlacesList extends Component {
    constructor(props) {
        super(props);
        this._removeCardCb = this._removeCardCb.bind(this);
        this.render();
    }

    render() {
        super.render(this.props.container);
        this.props.cards.forEach((el) => this.addCard(el));
    }

    _removeCardCb(cardEl) {
        this.children = this.children.filter((el) => el !== cardEl);
    }

    addCard(card) {
       this.children.push(new PlaceCard({...card, container: this._dom, onRemove: this._removeCardCb, magnify: this.props.magnify}));
    }
}