import env from "dotenv";
import cors from "cors";
import express from "express";
import triagecareRoutes from "./routes/triagecareRoutes.js"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { getPgVersion, initDBTables } from "./config/dbConfig.js";

env.config();
const app = express();
const PORT = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

getPgVersion();
initDBTables();

app.use("/api/triage/checkin", triagecareRoutes);

app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
