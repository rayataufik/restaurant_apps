/* eslint-disable arrow-body-style */
/* eslint-disable no-undef */
import FavoriteButtonInitiator from '../src/scripts/utils/favorite-btn-init';
import FavoriteRestaurantDB from '../src/scripts/data/favorite-db';

document.body.innerHTML = `
  <div id="favoriteButtonContainer"></div>
`;

jest.mock('../src/scripts/data/favorite-db', () => {
  return {
    getRestaurant: jest.fn(),
    putRestaurant: jest.fn(),
    deleteRestaurant: jest.fn(),
  };
});

describe('Favorite Button Initiator', () => {
  beforeEach(() => {
    document.getElementById('favoriteButtonContainer').innerHTML = '';
  });

  it('harus menampilkan tombol favorit ketika restoran belum difavoritkan', async () => {
    FavoriteRestaurantDB.getRestaurant.mockResolvedValue(null);

    await FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.querySelector('#favoriteButtonContainer'),
      favoriteRestaurants: FavoriteRestaurantDB,
      restaurant: { id: 1 },
    });

    const favoriteButton = document.querySelector('#favoriteButton i');
    expect(favoriteButton.classList.contains('far')).toBeTruthy();
    expect(favoriteButton.classList.contains('fa-heart')).toBeTruthy();
  });

  it('harus menampilkan tombol tidak disukai ketika restoran telah difavoritkan', async () => {
    FavoriteRestaurantDB.getRestaurant.mockResolvedValue({ id: 1 });

    await FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.querySelector('#favoriteButtonContainer'),
      favoriteRestaurants: FavoriteRestaurantDB,
      restaurant: { id: 1 },
    });

    const favoriteButton = document.querySelector('#favoriteButton i');
    expect(favoriteButton.classList.contains('fas')).toBeTruthy();
    expect(favoriteButton.classList.contains('fa-heart')).toBeTruthy();
  });

  it('harus dapat memfavoritkan restoran tersebut', async () => {
    FavoriteRestaurantDB.getRestaurant.mockResolvedValue(null);
    FavoriteRestaurantDB.putRestaurant.mockResolvedValue(undefined);

    await FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.querySelector('#favoriteButtonContainer'),
      favoriteRestaurants: FavoriteRestaurantDB,
      restaurant: { id: 1 },
    });
    document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));

    expect(FavoriteRestaurantDB.putRestaurant).toHaveBeenCalledWith({ id: 1 });
  });

  it('harus dapat membatalkan favorit restoran', async () => {
    FavoriteRestaurantDB.getRestaurant.mockResolvedValue({ id: 1 });
    FavoriteRestaurantDB.deleteRestaurant.mockResolvedValue(undefined);

    await FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.querySelector('#favoriteButtonContainer'),
      favoriteRestaurants: FavoriteRestaurantDB,
      restaurant: { id: 1 },
    });
    document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));

    expect(FavoriteRestaurantDB.deleteRestaurant).toHaveBeenCalledWith(1);
  });
});
