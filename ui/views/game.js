var html = require("choo/html");
var init = 0;
var n = 0;
var Input = require("./input");
let input = new Input();
const wScreen = [];
const maxWidth = 100;

module.exports = function(state, emit) {
  if (!init) emit("choose_lang", "words.fra");
  init++;
  if (state.words) {
    window.requestAnimationFrame(() => {
      emit("add_word");
      emit("update_game");
    });
  }
  return !state.finish
    ? html`
          <body style="max-width: ${maxWidth}%;overflow-x: hidden;">
            <form submit= ${onsubmit}>
             ${(state.wScreen || []).map(
               (w, i) => html`<p style="top:${w.y}%;
                                        left:${w.x}px;
                                        color: ${w.color};
                                        position: absolute;
                                        transform: translateX(${w.x}%)"
                                        key=${w.id}> ${w.text} </p>`
             )}
             ${input.render({ onKeyup, value: state.text })}
             </form>
          </body>
          `
    : html` <body>
                     <p> It 's over! you did great, your score is ${state.score}
                   </body>`;
  function onKeyup(e) {
    emit("isRemoved_word", {
      inputText: e.target.value.trim(),
      domElementInput: this
    });
  }

  function onsubmit(e) {
    e.preventDefault();
    debugger;
  }
};
