var request = require("request");
var cuid = require("cuid");

module.exports = store;

function store(state, emitter) {
  state.options = [];
  state.wScreen = [];
  state.times = 0;
  emitter.on("choose_lang", fetchLang);
  emitter.on("fetch_options", fetchOptions);
  emitter.on("add_word", addWord);
  emitter.on("update_game", update);

  function fetchLang(lang) {
    request(`/langue/${lang}`, function(err, resp) {
      if (resp) {
        state.words = JSON.parse(resp.body).data;
      }
      emitter.emit("render");
    });
  }
  function fetchOptions() {
    request("/options", function(err, resp) {
      if (resp) {
        state.options = JSON.parse(resp.body).data;
      }
      emitter.emit("render");
    });
  }

  function addWord() {
    console.log("addWords", state.times);
    if (state.words && state.words.length && state.times % 25 === 0) {
      state.wScreen.push({
        text: state.words.pop(),
        id: cuid(),
        x: 0,
        y: getRandomInt(0, 90)
      });
      emitter.emit("render");
    }
    state.times++;
  }
  function update() {
    if (state.wScreen && state.wScreen.length) {
      console.log(state.times);
      state.wScreen.forEach(word => {
        word.x = word.x + 0.4;
      });
      emitter.emit("render");
    }
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
