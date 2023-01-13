//api entry
const server = require("./src/app");
const { conn } = require("./src/db");
const PORT = process.env.PORT;

// Syncing all the models at once.
// const port = process.env.PGPORT || 3001;

conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
  });
});
