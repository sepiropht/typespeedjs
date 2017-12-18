var request = require("request");
var cuid = require("cuid");

module.exports = store;

function store(state, emitter) {
  state.options = [];
  state.wScreen = [];
  state.text = "";
  state.times = 0;
  state.finish = false;
  state.score = 0;
  state.name = "";

  emitter.on("choose_lang", fetchLang);
  emitter.on("fetch_options", fetchOptions);
  emitter.on("add_word", addWord);
  emitter.on("update_game", update);
  emitter.on("isRemoved_word", isRemovedWord);
  emitter.on("finish", onEndGame);

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
    if (state.words && state.words.length && state.times % 25 === 0) {
      state.wScreen.push({
        text: state.words.pop(),
        id: cuid(),
        color: "",
        x: 0,
        y: getRandomInt(0, 90)
      });
      emitter.emit("render");
    }
    state.times++;
  }
  function update() {
    if (state.wScreen && state.wScreen.length) {
      state.wScreen.forEach(word => {
        word.x = word.x + 0.4;
      });
      if (state.wScreen.some(w => w.x > window.screenX)) {
        emitter.emit("finish");
      }
      emitter.emit("render");
    }
  }
  function isRemovedWord({ inputText, self }) {
    if (!inputText.length) return;
    state.wScreen.forEach((w, i, arr) => {
      if (w.text.startsWith(inputText)) {
        w.color = "green";
      } else {
        w.color = "";
      }
    });
    state.wScreen = state.wScreen.filter(w => {
      if ((inputText, w.text === inputText)) {
        state.score++;
        self.value = "";
      }
      return w.text !== inputText;
    });
    emitter.emit("render");
  }

  function setName(name) {
    state.name = name;
  }

  function onEndGame() {
    const { score, name } = state;
    state.finish = true;
    request.post("/score", { score, name }, function(err, resp) {
      if (resp) {
        console.log(resp);
      }
    });
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
