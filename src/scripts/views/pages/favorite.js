import FavoriteRestaurantDB from '../../data/favorite-db';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
      <hunger-hero></hunger-hero>
      <div class="container">
        <h2 class="list-restaurant">Favorite Page</h2>
        <article>
          <div class="row">
              <div id="restaurant-list" class="restaurant-grid"></div>
          </div>
        </article>
      </div>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantDB.getAllRestaurants();
    const restaurantContainer = document.querySelector('#restaurant-list');

    if (restaurants.length === 0) {
      restaurantContainer.innerHTML = '<div id="resto-item__not__found">Tidak ada restaurant untuk ditampilkan</div>';
    } else {
      restaurants.forEach((restaurant) => {
        restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    }
  },
};

export default Favorite;
