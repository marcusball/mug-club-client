<template>
    <div>
        <h2>Drinks</h2>

        <template v-if="!loading">
            <ul v-if="drinks.length">
                <li v-for="drink in drinks" 
                    v-bind:key="drink.id">
                    {{drink.name}} - {{drink.brewery}} - {{drink.rating}}
                </li>
            </ul>
            <p v-else>You have not added any drinks!</p>
        </template>
        <p v-else>Loading...</p>
    </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      drinks: []
    };
  },

  created: function() {
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
};
</script>