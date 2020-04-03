class Component {
  constructor(props) {
    this.props = props || {};
    // Это свойство кажется вообще нигде не используется
    this.children = [];
    this.render = this.render.bind(this);
    this.remove = this.remove.bind(this);
  }

  render(el) {
    return this._dom = el;
  }

  remove() {
    // А тут бы не помешало преверить существует ли this._dom, а то где гарантия что super.render вызовут?
    this._dom.remove();
    this.children.forEach((el) => el.remove());
    if (typeof (this.props.onRemove) === 'function') this.props.onRemove(this);
  }
}