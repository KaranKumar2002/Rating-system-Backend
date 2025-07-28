import  restaurant from '../Model/Restaurant.model.js';
import fileUpload from '../utils/cloudinary.js';
const newRestaurant = async (req, res) => {
  try {
    
    const { name, location, cuisine } = req.body;
    if (!name || !location || !cuisine || !req.file) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const imageUploadResult = await fileUpload(req.file.path);
    if (!imageUploadResult) {
      return res.status(500).json({ error: 'Failed to upload image' });
    }

   console.log(imageUploadResult);



    const restaurantData = {
      name,
      location,
      cuisine,
      image: imageUploadResult || '',
    };


    const createdRestaurant = await restaurant.create(restaurantData);
    return res.status(201).json({ message: 'Restaurant created successfully' , restaurant: restaurantData });
  } catch (error) {
    console.error('Error creating restaurant:', error);
    return res.status(500).json({ error: 'Failed to create restaurant' });
  }
}


const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRestaurant = await restaurant.findByIdAndDelete(id);

    if (!deletedRestaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    return res.status(200).json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    return res.status(500).json({ error: 'Failed to delete restaurant' });
  }
}

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await restaurant.find({});
    
    return res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
}


export { newRestaurant, deleteRestaurant , getAllRestaurants };