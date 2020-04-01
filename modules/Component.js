class Component {
    constructor(props) {
        this.props = props || {};
        this.children = [];
        this.render = this.render.bind(this);
        this.remove = this.remove.bind(this);
    }

    render(el) {
        return this._dom = el;
    }

    remove() {
        this._dom.remove();
        this.children.forEach((el) => el.remove());
        if (typeof(this.props.onRemove) === 'function')  this.props.onRemove(this);
    }
}