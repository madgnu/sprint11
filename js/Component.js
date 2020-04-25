class Component {
  constructor(props) {
    this.props = props || {};
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
    this._unmounting = true;
    if (typeof (this.props.onRemove) === 'function') this._unmounting = this.props.onRemove(this);
    if (!this._unmounting) {
      this._unmounting = false;
      return;
    }
    this.componentWillUnmount();
    this.children.forEach((el) => el.remove());
    if (this._dom) this._dom.remove();
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

  componentWillUnmount() {
    return undefined;
  }

  shouldComponentUpdate(newState) {
    return newState != this.state;
  }

  setState(nextState) {
    this.state = this.state || {};
    const newState = { ...this.state, ...nextState };
    const oldState = this.state;

    if (this.getDOM() && !this._unmounting && this.shouldComponentUpdate(newState, oldState)) {
      this.componentWillUpdate(oldState, newState);
      this.state = newState;
      this.render();
    }
  }
}