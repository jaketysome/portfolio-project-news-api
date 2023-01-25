const fs = require("fs/promises");

exports.readEndpoints = () => {
  return fs.readFile(
    `${__dirname}/../endpoints.json`,
    "utf-8",
    (endpoints) => {
      const parsedEndpoints = JSON.parse(endpoints)
      return parsedEndpoints;
    }
  );
};
