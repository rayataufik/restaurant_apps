import CONFIG from '../../globals/config';

const createRestaurantItemTemplate = (restaurant) => {
  const {
    id, name, rating, city, description,
  } = restaurant;
  const imageUrl = restaurant.pictureId ? CONFIG.BASE_IMAGE_URL + restaurant.pictureId : 'images/heros/hero-image_2.jpg';

  return `
    <div id="resto-item" class="card">
      <img class="card-img lazyload" data-src="${imageUrl}" alt="${name}">
      <div id="resto-title" class="card-body">
        <h3><a href="/#/detail/${id}">${name}</a></h3>
        <span>⭐️${rating} | ${city}</span>
        <p>${description}</p>
      </div>
    </div>
  `;
};

const createRestaurantDetailTemplate = (restaurant) => {
  const {
    name, pictureId, city, address, rating, menus, description, customerReviews,
  } = restaurant;

  const foodList = menus.foods.map((food) => food.name).join(', ');
  const drinkList = menus.drinks.map((drink) => drink.name).join(', ');

  const reviewSection = customerReviews.length > 0
    ? `<div class="reviews">
       <h2>Customer Reviews</h2>
       ${customerReviews.map((review) => `
         <hr>
         <div class="review">
           <p>
             <span class="name">${review.name}</span> &bull; <span class="date">${review.date}</span>
           </p>
           <p>${review.review}</p>
         </div>
       `).join('')}
     </div>`
    : '';

  return `
    <div class="detail">
      <h1 class="title" id="resto-title">${name}</h1>
      <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL + pictureId}" alt="${name}" />

      <div class="info">
        <h2>Information</h2>
        <ul>
          <li>
            <h3>Kota</h3>
            <p>${city}</p>
          </li>
          <li>
            <h3>Alamat</h3>
            <p>${address}</p>
          </li>
          <li>
            <h3>Rating</h3>
            <p>${rating}</p>
          </li>
          <li>
            <h3>Foods Menu</h3>
            <span id="food">
              <p>${foodList}</p>
            </span>
          </li>
          <li>
            <h3>Drinks Menu</h3>
            <span id="drink">
              <p>${drinkList}</p>
            </span>
          </li>
        </ul>
      </div>

      <div class="overview">
        <h2>Overview</h2>
        <p>${description}</p>
      </div>

      ${reviewSection}
    </div>
  `;
};

const createFavoriteButtonTemplate = () => `
  <button aria-label="favorite this restaurant" id="favoriteButton" class="favorite">
     <i class="far fa-heart" aria-hidden="true"></i>
  </button>
`;

const createFavoritedButtonTemplate = () => `
  <button aria-label="unfavorite this restaurant" id="favoriteButton" class="favorite">
    <i class="fas fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createFavoriteButtonTemplate,
  createFavoritedButtonTemplate,
};
