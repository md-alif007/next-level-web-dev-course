import { application } from "express";
import { initializingDataBase } from "./database";
import { config } from "./config/config";

const main = () => {
  initializingDataBase();
  application.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
  });
};

main();
