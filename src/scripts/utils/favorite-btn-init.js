import { createFavoriteButtonTemplate, createFavoritedButtonTemplate } from '../views/templates/template-creator';

const FavoriteButtonInitiator = {
  async init({ favoriteButtonContainer, favoriteRestaurants, restaurant }) {
    this.favoriteButtonContainer = favoriteButtonContainer;
    this.restaurant = restaurant;
    this.favoriteRestaurants = favoriteRestaurants;
    this.favoriteButton = this.favoriteButtonContainer.querySelector('#favoriteButton');

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this.restaurant;

    if (await this._isRestaurantExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestaurantExist(id) {
    try {
      const restaurant = await this.favoriteRestaurants.getRestaurant(id);
      return !!restaurant;
    } catch (error) {
      console.error('Error checking if restaurant exists:', error);
      return false;
    }
  },

  _renderLike() {
    this.favoriteButtonContainer.innerHTML = createFavoriteButtonTemplate();
    this.favoriteButton = this.favoriteButtonContainer.querySelector('#favoriteButton');
    if (this.favoriteButton) {
      this._addButtonClickHandler(this._addToFavorites.bind(this));
    } else {
      console.error('Favorite button not found.');
    }
  },

  _renderLiked() {
    this.favoriteButtonContainer.innerHTML = createFavoritedButtonTemplate();
    this.favoriteButton = this.favoriteButtonContainer.querySelector('#favoriteButton');
    if (this.favoriteButton) {
      this._addButtonClickHandler(this._removeFromFavorites.bind(this));
    } else {
      console.error('Favorite button not found.');
    }
  },

  async _addToFavorites() {
    try {
      await this.favoriteRestaurants.putRestaurant(this.restaurant);
      this._renderButton();
    } catch (error) {
      console.error('Error adding restaurant to favorites:', error);
    }
  },

  async _removeFromFavorites() {
    try {
      await this.favoriteRestaurants.deleteRestaurant(this.restaurant.id);
      this._renderButton();
    } catch (error) {
      console.error('Error removing restaurant from favorites:', error);
    }
  },

  _addButtonClickHandler(handler) {
    this.favoriteButton.addEventListener('click', handler);
  },
};

export default FavoriteButtonInitiator;
