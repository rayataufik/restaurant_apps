import Detail from '../views/pages/detail';
import Favorite from '../views/pages/favorite';
import listRestaurant from '../views/pages/list-restaurant';

const routes = {
  '/': listRestaurant,
  '/list-restaurant': listRestaurant,
  '/favorite': Favorite,
  '/detail/:id': Detail,
};

export default routes;
