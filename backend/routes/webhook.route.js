import express from "express";
import bodyParser from "body-parser";
import * as webhookController from "../controllers/webhook.controller.js";
const router = express.Router();

router.post(
  "/clerk",
  bodyParser.raw({ type: "application/json" }),
  webhookController.clerkWebHook
);

export default router;
