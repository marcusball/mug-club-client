<template>
  <div class="container">
    <h2>Drinks</h2>
    <div>
      <template v-if="!loading">
          <div v-if="drinks.length">
              <div v-for="drink in drinks" 
                  v-bind:key="drink.id"
                  class="columns">
                  <div class="column col-3">{{drink.name}}</div>
                  <div class="column col-3">{{drink.brewery}}</div>
                  <div class="column col-3">{{drink.rating}}</div>
                  <div v-if="drink.comment" class="column col-3">{{drink.comment}}</div>
                  <div v-else class="column col-3"><em>No comment</em></div>
              </div>
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

export default {
  data() {
    return {
      loading: true,
      drinks: []
    };
  },

  components: {
    DrinkForm
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