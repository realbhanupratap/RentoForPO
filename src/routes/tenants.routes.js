import express from "express";
import { listTenants, viewTenant } from "../controllers/tenantManagement.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.use(authMiddleware);


// List all tenants
router.get("/", listTenants);

// View tenant details
router.get("/:id", viewTenant);

export default router;
