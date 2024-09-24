import express from "express";
import { addInventory, updateInventory, deleteInventory, listInventory } from "../controllers/inventory.controller";

const router = express.Router();

router.post("/", addInventory);
router.put("/:inventoryId", updateInventory);
router.delete("/:inventoryId", deleteInventory);
router.get("/:propertyId", listInventory);

export default router;
