import express from "express";
import { listTenants, viewTenant } from "../controllers/tenantManagement.controller.js";

const router = express.Router();

router.get("/", listTenants);
router.get("/:id", viewTenant);

export default router;
