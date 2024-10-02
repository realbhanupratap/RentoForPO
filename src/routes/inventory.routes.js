import express from 'express';
import { addRoom, updateRoom, deleteRoom } from '../controllers/inventory.controller.js';
import { authMiddleware } from "../middlewares/auth.middleware.js";


const router = express.Router();

// Add a room to the inventory
router.post('/:propertyId/rooms', addRoom);

// Update room in the inventory
router.put('/:propertyId/rooms/:roomId', updateRoom);

// Delete a room from the inventory
router.delete('/:propertyId/rooms/:roomId', deleteRoom);

router.use(authMiddleware);

export default router;
