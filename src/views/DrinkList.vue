<template>
  <div class="container">
    <h2>Drinks</h2>
    <div>
      <template v-if="!loading">
          <div v-if="drinks.length">
              <Drink v-for="drink in drinks" 
                  :key="drink.id"
                  class="columns bg-gray m-2 p-2"
                  :drink="drink">
              </Drink>
          </div>
          <p v-else>You have not added any drinks!</p>
      </template>
      <p v-else>Loading...</p>

      <hr />

      <div class="container column col-4 col-md-8 col-sm-12 col-mx-auto">
        <DrinkForm @new-drink="refreshDrinkList" />
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
        .then(drinks => {
          vm.drinks = drinks;
        })
        .catch(wtf => console.error(wtf));
    }
  }
};
</script>