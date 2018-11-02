<template>
    <form @submit.prevent="newDrink">
        <datetime v-model="drankOn">
          <label for="startDate" slot="before">Drank on:</label>
        </datetime>

        <label for="drink-name">Beer:</label>
        <input id="drink-name" v-model="name" type="text">
        <br />

        <label for="drink-brewery">Brewery:</label>
        <input id="drink-brewery" v-model="brewery" type="text"/>
        <br />

        <star-rating v-model="rating"
          :show-rating="false"
          :border-width="5"
          :rounded-corners="true"></star-rating>
        <br />

        <label for="drink-comment">Comment:</label>
        <textarea id="drink-comment" v-model="comment"></textarea>
        <br />

        <input type="submit" value="Add Drink" />
    </form>
</template>

<script>
import { Datetime } from "vue-datetime";
import StarRating from "vue-star-rating";

// You need a specific loader for CSS files
import "vue-datetime/dist/vue-datetime.css";

export default {
  data() {
    return {
      drankOn: null,
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
      form.append("drank_on", this.drankOnDate);
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
  },

  computed: {
    /**
     * @return {String} The `drankOn` date formatted as `YYYY-MM-DD`.
     */
    drankOnDate: function() {
      return new Date(this.drankOn).toISOString().slice(0, 10);
    }
  },

  components: {
    Datetime,
    StarRating
  }
};
</script>