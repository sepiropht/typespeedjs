var html = require("choo/html");
var init = 0;
var n = 0;
const wScreen = [];
module.exports = function(state, emit) {
  if (!init) emit("choose_lang", "words.fra");
  init++;
  if (state.words) {
    window.requestAnimationFrame(() => {
      console.log("refresh");
      emit("add_word");
      emit("update_game");
    });
  }
  return html`
          <body>
             ${(state.wScreen || []).map(
               (w, i) => html`<p style="top:${w.y}%;
                                        left:${w.x}px;
                                        position: absolute;
                                        transform: translateX(${w.x}%)"
                                        key=${w.id}> ${w.text} </p>`
             )}
             <input type=text onChange=${onChange}/>
          </body>
          `;
  function onChange(e) {
    e.eventPreventDefault();
    console.log(this.value);
    state.words(word => word === this.value);
  }
};
