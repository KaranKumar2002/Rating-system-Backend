import { Router } from "express";
import { deleteRestaurant, getAllRestaurants, newRestaurant } from "../Controllers/adminController.js";
import upload from "../Middlewares/multer.middleware.js";
import { requireAuth } from "@clerk/express";
const router = Router();


router.route('/addnewRestaurant').post(upload.single('image'),requireAuth(), newRestaurant)
router.route('/deleteRestaurant/:id').delete(deleteRestaurant);
router.route('/getAllRestaurants').get(getAllRestaurants)


export default router;