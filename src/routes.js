const express = require("express");
const DevController = require("./controllers/DevController");
const LikeController = require("./controllers/LikeController");
const DislikeController = require("./controllers/DislikeController");
const ProductController = require("./controllers/ProductController");
const NotificationController = require("./controllers/NotificationController");
const InviteController = require("./controllers/InviteController");

const routes = express.Router();

routes.get("/user",DevController.index)
routes.post("/user",DevController.store)
routes.post("/user/:devId/likes",LikeController.store)
routes.post("/user/:devId/dislikes",DislikeController.store)

routes.post("/product",ProductController.store);
routes.delete("/product/:id",ProductController.delete);
routes.get("/product/:id",ProductController.index);
routes.get("/myproduct/:id",ProductController.myIndex);
routes.get("/notification/:id",NotificationController.index);

routes.post("/invite",InviteController.store);

module.exports = routes;

