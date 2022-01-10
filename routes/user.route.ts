import express from "express";
import {
  getUser,
  addUser,
  updateUser,
  getById,
  login,
} from "../controllers/user.controller";

const router = express.Router();
router.get("/get", getUser);
router.post("/getById", getById);
router.post("/add", addUser);
router.post("/update", updateUser);
router.post("/login", login);

export default router;
