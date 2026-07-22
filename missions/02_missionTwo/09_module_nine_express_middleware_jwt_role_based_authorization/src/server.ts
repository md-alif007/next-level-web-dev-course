import app from "./app";
import { config } from "./config/config";
import { initializingDatabase } from "./database/db";

const main = () => {
  initializingDatabase();
  app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
  });
};

main();
