<template>
  <div class="container">
    <div class="columns">
      <div class="col-6">
        <h2>Drinks</h2>
      </div>

      <div class="col-6">
        <button
          v-scroll-to="'#drink-form-container'"
          class="btn btn-primary float-right"
        >Add a drink</button>
      </div>
    </div>
    <div>
      <template v-if="!loading">
        <div v-if="drinks.length">
          <Drink
            v-for="(drink, index) in drinks"
            :key="drink.id"
            class="columns bg-gray m-2 p-2"
            :drink="drink"
            @deleted="removeDeletedDrink(index)"
          ></Drink>
        </div>

        <div v-else class="empty">
          <div class="empty-icon">
            <font-awesome-icon icon="beer" size="7x" fixed-width class="text-gray mx-2"/>
          </div>
          <p class="empty-title h5">You have not added any drinks yet.</p>
          <p
            class="empty-subtitle"
          >After you've bought a drink, add it to your Mug Club list using the form below.</p>
          <div class="empty-action">
            <button v-scroll-to="'#drink-form-container'" class="btn btn-primary">Record a drink</button>
          </div>
        </div>
      </template>

      <div v-else>
        <div class="loading loading-lg"></div>
        <div class="flex-centered h4 text-gray">Loading...</div>
      </div>

      <div class="divider text-center" data-content="Record a new drink"></div>

      <div id="drink-form-container" class="container column col-4 col-md-8 col-sm-12 col-mx-auto">
        <DrinkForm @new-drink="refreshDrinkList"/>
      </div>
    </div>
  </div>
</template>

<script>
import DrinkForm from "@/components/DrinkListNewDrinkForm";
import Drink from "@/components/DrinkListDrink";

export default {
  data() {
    return {
      loading: true,
      drinks: []
    };
  },

  components: {
    DrinkForm,
    Drink
  },

  created: function() {
    this.loading = true;

    this.refreshDrinkList();
  },

  methods: {
    refreshDrinkList: function() {
      const vm = this;
      const API_BASE = process.env.VUE_APP_API_URL;

      this.loading = true;

      fetch(`${API_BASE}/drink`, {
        headers: {
          Authorization: this.$store.state.token
        }
      })
        .then(resp => {
          vm.loading = false;
          return resp.json();
        })
        .then(result => {
          if (result.status != "success") {
            throw new Error(result.messages[0]);
          }

          vm.drinks = result.data.drinks;
        })
        .catch(wtf => {
          console.error(wtf);
          alert(wtf);
        });
    },

    removeDeletedDrink: function(index) {
      this.drinks.splice(index, 1);
    }
  }
};
</script>