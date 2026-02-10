import { handler } from "../src/infrastructure/lambda/handler";
import 'dotenv/config';

(async () => {
  try {
    await handler();
    console.log("Lambda executed successfully");
  } catch (err) {
    console.error("Error executing Lambda:", err);
  }
})();
