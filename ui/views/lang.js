var html = require("choo/html");
var times = 0;
module.exports = function(state, emit) {
  if (!times) emit("fetch_options");
  times++;
  return html`
      <body>
        <h2> Choose your language </h2>
        <ul>
           ${(state.options || [])
             .map(
               (lang, i) =>
                 html`<li key= ${i}> <a href= /start_game> ${lang} /></li>`
             )}
        </ul>
     </body>`;
};
