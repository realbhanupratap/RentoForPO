import express from "express";
import { viewComplaints, resolveComplaint } from "../controllers/landlordComplaint.controller";

const router = express.Router();

router.get("/", viewComplaints);
router.put("/:complaintId/resolve", resolveComplaint);

export default router;
