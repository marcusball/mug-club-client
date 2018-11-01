<template>
    <form @submit.prevent="newDrink">
        <label for="drink-name">Beer:</label>
        <input id="drink-name" v-model="name" type="text">
        <br />

        <label for="drink-brewery">Brewery:</label>
        <input id="drink-brewery" v-model="brewery" type="text"/>
        <br />

        <label for="drink-rating">Rating:</label>
        <input id="drink-rating" v-model="rating" type="number" placeholder="5" />
        <br />

        <label for="drink-comment">Comment:</label>
        <textarea id="drink-comment" v-model="comment"></textarea>
        <br />

        <input type="submit" value="Add Drink" />
    </form>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      brewery: "",
      rating: null,
      comment: ""
    };
  },

  methods: {
    newDrink() {
      const API_BASE = process.env.VUE_APP_API_URL;

      const form = new URLSearchParams();
      form.append("drank_on", "2018-10-29");
      form.append("beer", this.name);
      form.append("brewery", this.brewery);
      form.append("rating", this.rating);
      form.append("comment", this.comment);

      return fetch(`${API_BASE}/drink`, {
        method: "POST",
        body: form,
        headers: {
          Authorization: this.$store.state.token
        }
      })
        .then(response => response.json())
        .then(drink => {
          console.log(drink);
          this.$emit("new-drink"); // refresh the list
        });
    }
  }
};
</script>