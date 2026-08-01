import app from "./app";
import { config } from "./config/config";
import { initializingDatabase } from "./database/database";

const main = async () => {
  await initializingDatabase();
  app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
  });
};

main();
