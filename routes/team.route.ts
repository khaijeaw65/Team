import express from "express";
import {
  createTeam,
  getTeam,
  getTeamKey,
} from "../controllers/team.controller";

const router: express.Router = express.Router();
router.get("/get", getTeam);
router.get("/get/key", getTeamKey);
router.post("/create", createTeam);

export default router;
