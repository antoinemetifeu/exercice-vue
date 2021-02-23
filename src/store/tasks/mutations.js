import Vue from "vue";
import { ADD_DISHE, DELETE_DISHE, EDIT_DISHE } from "./mutation-types";

export default {
  [ADD_DISHE](state, dishe) {
    state.lastDisheId = state.lastDisheId + 1;
    state.dishes = [...state.dishes, { ...dishe, id: state.lastDisheId }];
  },
  [EDIT_DISHE](state, editedDishe) {
    const disheIndex = state.dishes.findIndex(dishe => dishe.id === editedDishe.id);
    Vue.set(state.dishes, disheIndex, editedDishe);
  },
  [DELETE_DISHE](state, id) {
    state.dishes = state.dishes.filter(dishe => dishe.id !== id);
  }
};
