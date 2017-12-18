var html = require("choo/html");
var Nanocomponent = require("nanocomponent");

module.exports = class Component extends Nanocomponent {
  constructor() {
    super();
    this.state = {};
  }
  createElement(state) {
    this.state = state;
    console.log(state);
    return html`
      <input onkeyup=${this.state.onKeyup} value=${this.state
      .value} onfocus=${state.onfocus} onblur=${state.onblur}
       autofocus
      class=form-control type=text placeholder='write as fast as you can' data-toggle=dropdown>
    `;
  }
  update() {
    this.element.innerText = this.state.value;
  }
};
