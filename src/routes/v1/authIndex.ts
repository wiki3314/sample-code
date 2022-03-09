import express from "express";
import userRoutes from "./authenticated/userRoutes";
import wikiRouter from "./authenticated/wikiRoutes";

const apiRouterV2 = express.Router();

apiRouterV2.use("/users", userRoutes);
apiRouterV2.use("/posts", wikiRouter);

export default apiRouterV2;
