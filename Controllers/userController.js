import Rating from "../Model/Rating.model.js";
import User from "../Model/User.model.js";
import restaurant from "../Model/Restaurant.model.js";
import { clerkClient, getAuth } from '@clerk/express';
import mongoose from "mongoose";

// Create a new user
const newUser = async (req, res) => {
  try {
    const { userId } = getAuth(req);

    const currentUser = await clerkClient.users.getUser(userId);
    const name = currentUser.firstName + ' ' + currentUser.lastName;
    const email = currentUser.emailAddresses[0].emailAddress;
    const _id = currentUser.id;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const createdUser = await User.create({ name, email, _id });
    return res.status(201).json({ message: 'User created successfully', user: createdUser });
  } catch (error) {
    console.error('Error creating user:', error.message);
    return res.status(500).json({ error: 'Failed to create user' });
  }
};

// Create a new review
const newReview = async (req, res) => {
  try {
    const { id } = req.params; // restaurantId
    const { rating, comment } = req.body;
    const auth = getAuth(req);

    if (!auth.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!rating || !comment) {
      return res.status(400).json({ error: 'Rating and comment are required' });
    }

    // Optional: Prevent duplicate reviews
    // const existingReview = await Rating.findOne({ userId: auth.userId, restaurantId: id });
    // if (existingReview) {
    //   return res.status(409).json({ error: 'You have already reviewed this restaurant' });
    // }

    const reviewDoc = await Rating.create({
      userId: auth.userId,
      restaurantId: id,
      rating,
      review: comment,
    });

    const rest = await restaurant.findById(id);
    const totalRatings = await Rating.find({ restaurantId: id });

    const averageRating = totalRatings.reduce((acc, curr) => acc + curr.rating, 0) / totalRatings.length;

    rest.averageRating = Math.round(averageRating);
    rest.numReviews = totalRatings.length;
    await rest.save();

    return res.status(201).json({ message: 'Review created successfully', review: reviewDoc ,totalRatings: totalRatings.length, });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: 'You have already reviewed this restaurant' });
    }
    console.error('Error creating review:', error.message);
    return res.status(500).json({ error: 'Failed to create review' });
  }
};

const getReview = async (req, res) => {
  try {
    const { id } = req.params; // restaurantId
    
    const review = await Rating.find({ restaurantId: id });
    const restaurantDetails = await restaurant.findById(id)
    return res.status(200).json({ reviews: review, restaurant: restaurantDetails , message: 'Reviews fetched successfully' });
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
    return res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

export { newUser, newReview , getReview };
