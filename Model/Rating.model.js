import mongoose from "mongoose";
const ratingSchema = new mongoose.Schema({
    _id : {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    userId: {
        type:String,
        required: true,
    },
    review: {
        type: String,
        required: true,
    }, 
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Rating = mongoose.model("Rating", ratingSchema);
export default Rating;