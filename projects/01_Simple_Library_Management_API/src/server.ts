import { initializingDataBase } from "./database";
import { config } from "./config/config";
import app from "./app";

const main = () => {
  initializingDataBase();
  app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
  });
};

main();
