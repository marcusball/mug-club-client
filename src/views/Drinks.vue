<template>
    <div>
        <h2>Drinks</h2>

        <template v-if="!loading">
            <ul v-if="drinks.length">
                <li v-for="drink in drinks" 
                    v-bind:key="drink.id">
                    <p>{{drink.name}} - {{drink.brewery}} - {{drink.rating}}</p>
                    <p v-if="drink.comment">{{drink.comment}}</p>
                    <p v-else><em>No comment</em></p>
                </li>
            </ul>
            <p v-else>You have not added any drinks!</p>
        </template>
        <p v-else>Loading...</p>

        <hr />

        <DrinkForm @new-drink="refreshDrinkList" />
    </div>
</template>

<script>
import DrinkForm from "@/components/DrinkForm";

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