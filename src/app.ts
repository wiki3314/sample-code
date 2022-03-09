import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import express, { Request, Response } from "express";
import passport from "passport";
import mainUnauthRouter from "./routes/v1/unauthIndex";
import mainAuthRouter from "./routes/v1/authIndex";
import passportConfig from "./middlewares/passport";
// import { errors } from "./constants/errorMessages.js";

const app = express();
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
let dbConnection = mongoose.connection;
const reconnectTimeout = 5000;
let retries = 1;
function connect() {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
  };

  mongoose
    .connect(`${process.env.MONGODB_URI}`, options)
    .then((x) => {})
    .catch((err) => {});
}

dbConnection.on("connecting", () => {
  console.info("Connecting to MongoDB...");
});

dbConnection.on("error", (error) => {
  console.error(`MongoDB connection error: ${error}`);
  mongoose.disconnect();
});

dbConnection.on("connected", () => {
  console.info("Connected to MongoDB!");
  retries = 1;
});

dbConnection.once("open", () => {
  console.info("MongoDB connection opened!");
});

dbConnection.on("reconnected", () => {
  console.info("MongoDB reconnected!");
  retries = 1;
});

dbConnection.on("disconnected", () => {
  retries += 1;
  console.error(
    `MongoDB disconnected! Reconnecting in ${
      (reconnectTimeout / 1000) * retries
    }s...`
  );
  setTimeout(() => connect(), reconnectTimeout * retries);
});
connect();

passportConfig();
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use("/", mainUnauthRouter);
app.use(
  "/api/v1",
  passport.authenticate("jwt", { session: false }),
  mainAuthRouter
);

app.all("*", (req: Request, res: Response) =>
  res.status(404).send({ error: "Route does not exist" })
);

app.listen(9009, () => console.log(`listening on port 9009`));
