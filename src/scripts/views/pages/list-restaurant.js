import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

import '../../components/hero/hero';

const listRestaurant = {
  async render() {
    return `
    <hunger-hero></hunger-hero>
      <div class="container">
      <h2 class="list-restaurant">Explore Restaurant</h2>
      <article>
        <div class="row">
            <div id="restaurant-list" class="restaurant-grid"></div>
        </div>
      </article>
     </div>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.getRestaurants();
    const restaurantsContainer = document.querySelector('#restaurant-list');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default listRestaurant;
