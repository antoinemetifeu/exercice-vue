<template>
  <q-page class="q-pa-lg">
    <q-pull-to-refresh @refresh="refresh">
      <div class="row q-gutter-lg">
        <dishe v-for="dishe in dishes" :key="dishe.id" :dishe="dishe" @delete="deleteDishe" />

        <add-button @click="showFormDishe = true" />

        <q-dialog v-model="showFormDishe">
          <form-dishe action="add" />
        </q-dialog>
      </div>
    </q-pull-to-refresh>
  </q-page>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters("tasks", ["dishes"]),
  },
  methods: {
    ...mapActions("tasks", ["deleteDishe"]),
    ...mapMutations("tasks", {
      resetDishes: "RESET_DISHES",
    }),
    refresh (done) {
      /* setTimeout is here to simulate a long refresh */
      setTimeout(() => {
        this.resetDishes()
        done()
      }, 1500)
    },
  },
  data() {
    return {
      showFormDishe: false
    };
  },
  components: {
    dishe: require("components/Dishe.vue").default,
    "add-button": require("components/AddButton.vue").default,
    "form-dishe": require("components/FormDishe.vue").default
  }
};
</script>
