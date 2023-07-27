import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import logger from "morgan";
import { StatusCodes } from "http-status-codes";

import cors from "cors";
import xss from "xss-clean";

// importing the connection settings to the entery point.
import sequelize from "./config/sequelize";

const port = process.env.PORT || 4040;
dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(logger("dev"));
app.use(xss());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "Welcome to the user Service" });
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("connected to the DB!");
    app.listen(port, () =>
      console.info(`Server listening on http:\//localhost:${port}`)
    );
  } catch (error) {
    console.error(error);
  }
};

startServer();
