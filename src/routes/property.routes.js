import express from "express";
import { addProperty, updateProperty, deleteProperty, listProperties, viewProperty } from "../controllers/property.controller.js";
import { upload } from "../middlewares/multer.middleware.js";  // Multer for file uploads
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validationMiddleware } from "../middlewares/validation.middleware.js";


const router = express.Router();

router.use(authMiddleware);

// Add property (multiple image uploads for profile pictures)
router.post("/", upload.array('propertyImages', 5), validationMiddleware, addProperty);

// Update property
router.put("/:id", upload.array('propertyImages', 5), validationMiddleware, updateProperty);

// Delete property
router.delete("/:id", validationMiddleware, deleteProperty);

// List properties for a landlord
router.get("/", validationMiddleware, listProperties);

// View property details
router.get("/:id", validationMiddleware, viewProperty);

export default router;
