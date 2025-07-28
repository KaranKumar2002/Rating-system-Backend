import { requireAuth } from "@clerk/express";
import { Router } from "express";
import { getReview, newReview, newUser } from "../Controllers/userController.js";

const router = Router();

router.route('/newUser').post(requireAuth(),newUser);
router.route('/review/:id').post(requireAuth(),newReview);
router.route('/getreview/:id').get(requireAuth(),getReview);


export default router;
