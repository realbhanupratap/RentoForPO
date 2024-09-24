import express from "express";
import { addProperty, updateProperty, deleteProperty, listProperties, viewProperty } from "../controllers/property.controller.js";

const router = express.Router();

router.post("/", addProperty);
router.put("/:id", updateProperty);
router.delete("/:id", deleteProperty);
router.get("/", listProperties);
router.get("/:id", viewProperty);

export default router;
