class ElementConfig {

    constructor(id, classList, title, text) {
        this._id = id;
        this._classList = classList;
        this._title = title;
        this._text = text;
    }
}

class InputConfig extends ElementConfig {

    constructor(type, id, classList, title, text) {
        super(id, classList, title, text);
        this._type = type;
    }
}

class CarouselOption {
    constructor(src, href, name) {
        this._src = src,
            this._href = href,
            this._name = name
    }
}

module.exports = {
    ElementConfig,
    InputConfig,
    CarouselOption
};