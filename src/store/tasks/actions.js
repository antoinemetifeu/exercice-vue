import { DELETE_DISHE } from "./mutation-types";

export default {
  deleteDishe({ commit }, id) {
    commit(DELETE_DISHE, id);
  }
}
