import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantSource {
  static async getRestaurants() {
    try {
      const response = await fetch(API_ENDPOINT.RESTO);
      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      return [];
    }
  }

  static async detailRestaurant(id) {
    try {
      const response = await fetch(API_ENDPOINT.RESTO_DETAIL(id));
      const responseJson = await response.json();
      return responseJson.restaurant;
    } catch (error) {
      console.error(`Error fetching restaurant with ID ${id}:`, error);
      return null;
    }
  }
}

export default RestaurantSource;
