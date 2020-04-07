class Button extends Component {
    render() {
        super.render(this.props.container);
    }

    componentDidMount() {
        this.getDOM().addEventListener('click', this.props.onClick);
    }

    componentWillUnmount() {
        this.getDOM().removeEventListener('click', this.props.onClick);
    }
}