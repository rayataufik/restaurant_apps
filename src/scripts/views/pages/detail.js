import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import FavoriteButtonInitiator from '../../utils/favorite-btn-init';
import FavoriteRestaurantDB from '../../data/favorite-db';

const Detail = {
  async render() {
    return `
    <div class="container">
      <div id="restaurant-detail"></div>
    </div>
    <div id="favoriteButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const detail = await RestaurantSource.detailRestaurant(url.id);
    const restoContainer = document.querySelector('#restaurant-detail');
    restoContainer.innerHTML = createRestaurantDetailTemplate(detail);

    FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.querySelector('#favoriteButtonContainer'),
      favoriteRestaurants: FavoriteRestaurantDB,
      restaurant: {
        id: detail.id,
        name: detail.name,
        city: detail.city,
        description: detail.description,
        pictureId: detail.pictureId,
        rating: detail.rating,
      },
    });
  },
};

export default Detail;
