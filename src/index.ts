import * as dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import routes from "./routes/asset.routes";
import swaggerSpec from "./api-spec/swagger";
import { invalidRoute } from "./middleware/invalid-route";

dotenv.config();

const PORT = 3001;
const HOST = "0.0.0.0";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api", routes);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(invalidRoute);

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, HOST, () => {
      console.log(`Running on http://${HOST}:${PORT}`);
    });
  })
  .catch(console.error);
