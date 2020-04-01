class Button extends Component {
    constructor(props) {
        super(props);
        this.render();
    }

    render() {
        super.render(this.props.container);
        this._dom.addEventListener('click', this.props.onClick);
    }
}