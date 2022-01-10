import express from "express";
import { createTopic, getTopic } from "../controllers/topic.controller";

const router = express.Router();

router.post("/get", getTopic);
router.post("/create", createTopic);

export default router;
