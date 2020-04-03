class Component {
  constructor(props) {
    this.props = props || {};
    // Это свойство кажется вообще нигде не используется
    // ANSWER: это не так
    this.children = [];
    this.render = this.render.bind(this);
    this.remove = this.remove.bind(this);
  }

  render(el) {
    if (!this._dom) this._dom = el;
    this.children.forEach((el) => el.render());
    return this._dom;
  }

  remove() {
    this.children.forEach((el) => el.remove());
    // А тут бы не помешало преверить существует ли this._dom, а то где гарантия что super.render вызовут?
    if (this._dom) this._dom.remove();
    if (typeof(this.props.onRemove) === 'function') this.props.onRemove(this);
  }
}