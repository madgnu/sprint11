class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { name: props.name, job: props.job };
        this.render();
    }

    render() {
        if (!this._dom) {
            super.render(this.props.container);
            this._editProfieBtn = new Button({
                container: this._dom.querySelector('.user-info__edit-profile'),
                onClick: this.props.clickEditProfile
            });
            this._newCardBtn = new Button({
                container: this._dom.querySelector('.user-info__add-card'),
                onClick: this.props.clickNewCard
            });
            this.children = [...this.children, this._editProfieBtn, this._newCardBtn];
        }
        this._dom.querySelector('.user-info__name').textContent = this.state.name;
        this._dom.querySelector('.user-info__job').textContent = this.state.job;
    }

    setUserInfo(newState) {
        this.state = { ...this.state, ...newState};
    }

    updateUserInfo() {
        this.render();
    }

    get profile() {
        return this.state;
    }
}