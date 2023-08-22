import { Request, Response } from 'express';
import { addRestaurantServices ,
         getAllResturantService,
         getRestaurantByIdService,
         getRestaurantByNameService,
         getRestaurantByCityNameService, 
         updateRestaurantByIdService,
         deleteRestaurantByIdService } from '../services/restaurantService';

// - - - - - - - - - - - - - - - Add Resturant Controller start - - - - - - - - - - - - - - - //
export async function addRestaurantController(req: Request, res: Response) {
    const newRestaurantData  = req.body;
    try {
        const newResturant = await addRestaurantServices(newRestaurantData);
        res.status(201).json({ success: true, message: 'Resturant Added successfully', resturant: newResturant });
    } 
    catch (error) {
        console.error('Resturant Add nahi hua :', error);
        res.status(500).json({ success: false, message: 'An error occurred while adding the restaurant' });
    }
}
// - - - - - - - - - - - - - - - Add Resturant Controller end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Get All Resturant Controller Start - - - - - - - - - - - - - - - //
export async function getAllResturantController(req: Request, res: Response) {
    const email = req.body.email;
    try {
        const restaurant = await getAllResturantService(email);
        res.send(restaurant);
    } 
    catch (error) {
        console.error('Error during fetching restaurant:', error);
        res.status(401).send(error);
    }
}
// - - - - - - - - - - - - - - - Get All Resturant Controller end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Get Resturant By id Controller Start - - - - - - - - - - - - - - - //
export async function getRestaurantByIdController(req: Request, res: Response) {
    const restaurantId = req.params.id;

    try {
        const restaurant = await getRestaurantByIdService(restaurantId);
        res.status(200).json({ success: true, restaurant });
    } catch (error) {
        console.error('Error fetching restaurant by ID:', error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching the restaurant' });
    }
}
// - - - - - - - - - - - - - - - Get Resturant By id Controller end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Get Resturant By Name Controller Start - - - - - - - - - - - - - - - //
export async function getRestaurantByNameController(req: Request, res: Response) {
    const restaurantName = req.body.restaurantName;

    try {
        const restaurants = await getRestaurantByNameService(restaurantName);
        res.status(200).json({ success: true, restaurants });
    } catch (error) {
        console.error('Error fetching restaurants by name:', error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching the restaurants' });
    }
}
// - - - - - - - - - - - - - - - Get Resturant By Name Controller end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Get Restaurant by City Name Controller Start - - - - - - - - - - - - - - - //
export async function getRestaurantByCityNameController(req: Request, res: Response) {
    const cityName = req.body.cityName;

    try {
        const restaurants = await getRestaurantByCityNameService(cityName);
        res.status(200).json({ success: true, restaurants });
    } catch (error) {
        console.error('Error fetching restaurants by city name:', error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching the restaurants' });
    }
}
// - - - - - - - - - - - - - - - Get Restaurant by City Name Controller end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Update Resturant Controller Start - - - - - - - - - - - - - - - //
export async function updateRestaurantByIdController(req: Request, res: Response) {
    const restaurantId = req.params.id;
    console.log("----",restaurantId)
    const updateData = req.body;

    try {
        const updatedRestaurant = await updateRestaurantByIdService(restaurantId, updateData);
        res.status(200).json({ success: true, message: 'Restaurant updated successfully', restaurant: updatedRestaurant });
    } 
    catch (error) {
        console.error('Error updating restaurant:', error);
        res.status(500).json({ success: false, message: 'An error occurred while updating the restaurant' });
    }
}
// - - - - - - - - - - - - - - - Update Resturant Controller end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Delete Restaurant by ID Controller Start - - - - - - - - - - - - - - - //
export async function deleteRestaurantByIdController(req: Request, res: Response) {
    const restaurantId = req.params.id;

    try {
        await deleteRestaurantByIdService(restaurantId);
        res.status(200).json({ success: true, message: 'Restaurant deleted successfully' });
    } catch (error) {
        console.error('Error deleting restaurant:', error);
        res.status(500).json({ success: false, message: 'An error occurred while deleting the restaurant' });
    }
}
// - - - - - - - - - - - - - - - Delete Resturant by ID Controller end - - - - - - - - - - - - - - - //

