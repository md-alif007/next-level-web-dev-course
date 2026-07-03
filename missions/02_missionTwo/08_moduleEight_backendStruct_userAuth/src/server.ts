import app from "./app";
import config from "./config";
import { initializeDataBase } from "./db";

const main = () => {
    initializeDataBase();
    app.listen(config.port, () => {
        console.log(`Example app listening on port ${config.port}`)
    });
}

main();