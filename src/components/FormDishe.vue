<template>
  <q-card class="form-card">
    <q-card-section>
      <div class="text-h6 heading">{{ action }} Plat</div>
    </q-card-section>

    <q-card-section>
      <div class="row q-mb-md">
        <q-input
          ref="name"
          filled
          v-model="dishe.name"
          :rules="[
            val => !!val || 'Le nom est obligatoire',
            val => val.length <= 20 || 'Le nom ne doit pas dépasser 20 caractères'
          ]"
          lazy-rules="ondemand"
          label="Nom (Burger)"
          class="col"
        />
      </div>

      <div class="row q-mb-md">
        <q-input
          ref="description"
          filled
          v-model="dishe.description"
          :rules="[
            val => val.length <= 125 || 'La description ne doit pas dépasser 135 caractères'
          ]"
          lazy-rules="ondemand"
          label="Description"
          type="textarea"
          class="col"
        />
      </div>

      <div class="row q-mb-md">
        <q-input
          filled
          v-model="dishe.image"
          label="URL de l'image"
          class="col"
        />
        <q-img
          :src="dishe.image ? dishe.image : 'statics/image-placeholder.png'"
          class="q-ml-sm"
          contain
        />
      </div>

      <div class="q-mb-md">
        <div class="row">
          <p class="q-mb-none">Note:</p>
        </div>
        <div class="row">
          <q-rating v-model="dishe.note" size="2em" color="orange" />
        </div>
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn label="Annuler" color="grey" v-close-popup />
      <q-btn label="Sauver" color="primary" @click="save" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { ADD_DISHE, EDIT_DISHE } from "../store/tasks/mutation-types";

export default {
  props: ["action", "disheToEdit"],
  data() {
    return {
      dishe: {
        name: "",
        description: "",
        note: 1,
        image: ""
      }
    };
  },
  computed: {
    ...mapGetters("tasks", { disheById: "dishe" })
  },
  methods: {
    ...mapMutations("tasks", {
      addDishe: ADD_DISHE,
      editDishe: EDIT_DISHE,
    }),
    isValid() {
      /*
       * Probably a best choice to add a q-form component & call validate method on it
       * or even better to use a validation library like Vuelidate
       */
      this.$refs.name.validate()
      this.$refs.description.validate()

      if (this.$refs.name.hasError || this.$refs.description.hasError) {
        return false;
      }

      return true;
    },
    save() {
      if (!this.isValid()) {
        this.$q.notify({
          icon: 'error',
          color: 'negative',
          message: 'Erreur de saisie'
        })
        return
      }

      if (this.action === "add") {
        this.addDishe(this.dishe)
      } else {
        this.editDishe(this.dishe)
      }

      this.$q.notify({
        icon: 'done',
        color: 'positive',
        message: this.action === "add" ? "Plat ajouté !" : "Plat modifié !"
      })
    },
  },
  watch: {
    disheToEdit: {
      handler(newDishe) {
        this.dishe = {...this.dishe, ...newDishe}
      }, immediate: true
    }
  }
};
</script>

<style>
.form-card {
  min-width: 400px;
}
.form-card .heading {
  text-transform: capitalize;
}
.form-card .q-card-section {
  width: 100%;
}
.thumbnail {
  max-width: 50px;
  max-height: 50px;
}
.form-card .q-img {
  height: 56px;
  width: 56px;
  border-radius: 10px;
}
.form-card .q-img__image {
  background-size: cover !important;
}
.form-card .q-rating__icon {
  opacity: 0.2;
}
.form-card .q-rating__icon--active {
  opacity: 1;
}
</style>
