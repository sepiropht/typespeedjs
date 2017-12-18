var html = require("choo/html");
var init = 0;
var n = 0;
var Input = require("./input");
let input = new Input();
let input2 = new Input();
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
             ${(state.wScreen || []).map(
               (w, i) => html`<p style="top:${w.y}%;
                                        left:${w.x}px;
                                        color: ${w.color};
                                        position: absolute;
                                        transform: translateX(${w.x}%)"
                                        key=${w.id}> ${w.text} </p>`
             )}
             ${input.render({
               onKeyup,
               value: state.text,
               placeholder: "type as much as you can"
             })}
          </body>`
    : html` <body>
                    <p> It 's over! you did great, your score is ${state.score}
                      <form onsubmit= ${postName}>
                          ${input2.render({
                            placeholder: "write your name",
                            onKeyup: onKeyup2
                          })}
                          <button type="submit"> post </button>
                      </form>
                   </body>`;
  function onKeyup(e) {
    emit("isRemoved_word", {
      inputText: e.target.value.trim(),
      domElementInput: this
    });
  }
  function onKeyup2(e) {
    emit("write_name", e.target.value.trim());
  }

  function postName(e) {
    e.preventDefault();
    console.log(e);
    emit("post_score");
  }
};
