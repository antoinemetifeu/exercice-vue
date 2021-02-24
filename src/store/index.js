import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import tasks from "./tasks";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence();

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      tasks
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,
    plugins: [vuexLocal.plugin]
  });

  return Store;
}
