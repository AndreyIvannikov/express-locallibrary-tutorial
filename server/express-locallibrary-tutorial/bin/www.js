const app = require("../app");
const debug = require("debug")(
  "express-locallibrary-tutorial:server"
);

app.listen(5000, () => {
  console.log("Подключен к серверу 5000");
});
