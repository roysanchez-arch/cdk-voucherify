"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("../src/infrastructure/lambda/handler");
require("dotenv/config");
(async () => {
    try {
        await (0, handler_1.handler)();
        console.log("Lambda executed successfully");
    }
    catch (err) {
        console.error("Error executing Lambda:", err);
    }
})();
