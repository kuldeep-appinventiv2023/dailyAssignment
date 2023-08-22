import Restaurant from "../models/restaurantModel";

// - - - - - - - - - - - - - - - Add Restaurant Services start - - - - - - - - - - - - - - - //
export async function addRestaurantServices(newRestaurantData : any ) {
  const newRestaurant = new Restaurant(newRestaurantData);

  await newRestaurant.save();
  return newRestaurant;
}
// - - - - - - - - - - - - - - - Add Restaurant Services end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Get All Resturant Services Start - - - - - - - - - - - - - - - //
export async function getAllResturantService(email: string) {
    try {
        const allRestaurants = await Restaurant.find();
        if (!allRestaurants) {
            throw new Error('Restaurants not found');
        }
    return allRestaurants;
    }
    catch (error) {
        throw new Error('Invalid email');
    }
}
// - - - - - - - - - - - - - - - Get All Resturant Services end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Get Resturant By id Services Start - - - - - - - - - - - - - - - //
export async function getRestaurantByIdService(restaurantId: string) {
    try {
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            throw new Error('Restaurant not found');
        }
        return restaurant;
    } catch (error) {
        throw new Error('Invalid restaurant ID');
    }
}
// - - - - - - - - - - - - - - - Get Resturant By id Services end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Get Resturant By Name Services Start - - - - - - - - - - - - - - - //
export async function getRestaurantByNameService(restaurantName: string) {
    try {
        const restaurants = await Restaurant.find({ resturantName: { $regex: restaurantName, $options: 'i' } });
        return restaurants;
    } catch (error) {
        throw new Error('Error fetching restaurants by name');
    }
}
// - - - - - - - - - - - - - - - Get Resturant By Name Services end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Get Resturant By City Name Services Start - - - - - - - - - - - - - - - //
export async function getRestaurantByCityNameService(cityName: string) {
    try {
        const restaurants = await Restaurant.find({ 'resturantAddress.city': cityName });
        return restaurants;
    } catch (error) {
        throw new Error('Error fetching restaurants by city name');
    }
}
// - - - - - - - - - - - - - - - Get Resturant By City Name Services end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Update Resturant By id  Services Start - - - - - - - - - - - - - - - //
export async function updateRestaurantByIdService(restaurantId : any, updateData : any) {
    try {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(restaurantId, updateData, { new: true });
        return updatedRestaurant;
    } 
    catch (error) {
        throw new Error('Error updating restaurant: ' + error);
    }
}

// - - - - - - - - - - - - - - - Update Resturant By id Services end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Delete Restaurant by id Services Start - - - - - - - - - - - - - - - //
export async function deleteRestaurantByIdService(restaurantId: string) {
    try {
        const deletedRestaurant = await Restaurant.findByIdAndRemove(restaurantId);
        if (!deletedRestaurant) {
            throw new Error('Restaurant not found');
        }
    } catch (error) {
        throw new Error('Error deleting restaurant');
    }
}
// - - - - - - - - - - - - - - -Delete Restaurant by id Services end - - - - - - - - - - - - - - - //
