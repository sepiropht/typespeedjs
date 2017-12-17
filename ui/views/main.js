var html = require("choo/html");

var TITLE = "🚂🚋🚋";

module.exports = view;

function view(state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE);
  return html`
    <body class="sans-serif">
      <h1 class="f-headline pa3 pa4-ns">
        Typespeed js
      </h1>
      <ul>
        <li><a href="#lang">1.Test Your Speed </a></li>
        <li>3 Story/Credits/RTFM!</li>
        <li>4. Show HighScores </li>
        <li> Games rules </li>
     </ul>
    </body>
  `;
}
