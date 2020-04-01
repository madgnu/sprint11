class PlaceCard extends Component {
    constructor(props) {
        super(props);
        this._template = document.querySelector('#cardTpl');
        this.like = this.like.bind(this);
        this._magnify = this._magnify.bind(this);
        this.render();
    };

    render() {
        const cardTpl = this._create();
        super.render(cardTpl.firstElementChild);
        this.props.container.appendChild(cardTpl);
    };

    _create() {
        const cardDOM = this._template.content.cloneNode(true);
        cardDOM.querySelector('.place-card__image').style.backgroundImage = `url(${this.props.link})`;
        cardDOM.querySelector('.place-card__name').textContent = this.props.name;
        cardDOM.querySelector('.place-card__like-icon').addEventListener('click', this.like);
        cardDOM.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
        cardDOM.querySelector('.place-card__image').addEventListener('click', this._magnify);

        return cardDOM;
    }

    like() {
        this._dom.querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked');
    }

    _magnify(event) {
        if (event.target.classList.contains('place-card__image')) this.props.magnify(this.props.link);
    }
}