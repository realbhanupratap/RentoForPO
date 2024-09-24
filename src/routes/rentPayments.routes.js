import express from "express";
import { collectRent, viewRentHistory } from "../controllers/rent.controller";

const router = express.Router();

router.post("/collect", collectRent);
router.get("/history", viewRentHistory);

export default router;
