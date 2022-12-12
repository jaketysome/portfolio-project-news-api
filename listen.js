const app = require("./app");

const port = 9090;

app.listen(PORT).then(() => {
  console.log(`server is listening on port: ${PORT}`);
});