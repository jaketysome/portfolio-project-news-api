const app = require("./app");

const { PORT = 9090 } = process.env;

app.list(PORT, () => console.log(`Listening on port: ${PORT}`));
