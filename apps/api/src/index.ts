import express from "express";
import cors from "cors";
import { testMessage } from "@repo/schema";

const app = express();
const port = 3001;

app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.json({
    message: "Hello from Express Server!",
    sharedMessage: testMessage,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Shared message: ${testMessage}`);
});
