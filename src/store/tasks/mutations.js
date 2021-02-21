import { DELETE_DISHE } from "./mutation-types";

export default {
  [DELETE_DISHE](state, id) {
    state.dishes = state.dishes.filter(dish => dish.id !== id);
  }
};
