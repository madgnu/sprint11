class Component {
  constructor(props) {
    this.props = props || {};
    // Это свойство кажется вообще нигде не используется
    // ANSWER: это не так
    if (this.props.children) this.children = [...this.props.children];
    else this.children = [];
    this.render = this.render.bind(this);
    this.remove = this.remove.bind(this);
    this.getDOM = this.getDOM.bind(this);
    this.setState = this.setState.bind(this);
  }

  render(el) {
    if (!this._dom) {
      this._dom = el;
      this.componentDidMount();
    }
    this.children.forEach((el) => !el.getDOM() && el.render());
    return this._dom;
  }

  remove() {
    this.children.forEach((el) => el.remove());
    // А тут бы не помешало преверить существует ли this._dom, а то где гарантия что super.render вызовут?
    if (this._dom) this._dom.remove();
    if (typeof(this.props.onRemove) === 'function') this.props.onRemove(this);
  }

  getDOM() {
    return this._dom;
  }

  componentWillUpdate() {
    return undefined;
  }

  componentDidMount() {
    return undefined;
  }

  shouldComponentUpdate(newState) {
    return newState != this.state;
  }

  setState(nextState) {
    this.state = this.state || {};
    const newState = { ...this.state, ...nextState };
    const oldState = this.state;

    if (this.getDOM() && this.shouldComponentUpdate(newState, oldState)) {
      this.componentWillUpdate(oldState, newState);
      this.state = newState;
      this.render();  
    }
  }
}