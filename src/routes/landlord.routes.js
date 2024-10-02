import { Router } from "express";
import {
  registerLandlord,
  loginLandlord,
  refreshToken,
  logoutLandlord,
  changePassword
} from "../controllers/landlord.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.use(authMiddleware);

// Apply middleware to specific routes
router.post("/create", authMiddleware, upload.single('avatar'), createUser);  // Upload avatar image
router.get("/:id", authMiddleware, getUser);  // Fetch user details

// Register a new landlord
router.route("/register").post(registerLandlord);

// Login landlord
router.route("/login").post(loginLandlord);

// Refresh access token
router.route("/refresh-token").post(refreshToken);

// Logout landlord
router.route("/logout").post(logoutLandlord);

// Route for changing password
router.put('/change-password', authMiddleware, changePassword);


export default router;
