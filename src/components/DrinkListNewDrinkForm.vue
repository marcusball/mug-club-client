<template>
    <form @submit.prevent="newDrink" class="form-horizontal">
      <div class="form-group">
        <div class="col-3 col-sm-12">
          <label class="form-label" for="drink-date">Drank on:</label>
        </div>
        <div class="col-9 col-sm-12">
          <datetime 
            v-model="drankOn" 
            input-id="drink-date"
            input-class="form-input"
            @close="focusDrinkName">
          </datetime>
        </div>
      </div>

      <div class="form-group">
        <div class="col-3 col-sm-12">
          <label class="form-label" for="drink-name">Beer:</label>
        </div>
        <div class="col-9 col-sm-12">
          <vue-simple-suggest 
            :list="getDrinkSuggestionList"
            :filter-by-query="true">
            <input id="drink-name" 
              v-model="name"
              ref="drinkName" 
              class="form-input" 
              type="text"
              autocomplete="off"
              @keydown.enter.prevent="$refs.drinkBrewery.focus" />
          </vue-simple-suggest>
        </div>
      </div>

      <div class="form-group">
        <div class="col-3 col-sm-12">
          <label class="form-label" for="drink-brewery">Brewery:</label>
        </div>
        <div class="col-9 col-sm-12">
          <input id="drink-brewery" 
            v-model="brewery" 
            ref="drinkBrewery" 
            class="form-input" 
            type="text" 
            @keydown.enter.prevent="scrollToRating" />
        </div>
      </div>

      <div id="rating-container" class="form-group">
        <div class="col-3 col-sm-12">
          <label class="form-label">Rating:</label>
        </div>
        <div class="col-9 col-sm-12">
          <!-- The star-rating doesn't currently support responsive layouts -->
          <!-- See: https://github.com/craigh411/vue-star-rating/issues/28 -->
          <!-- This first input will show only for screen sizes > 600px wide -->
          <div class="hide-sm">
            <star-rating v-model="rating"
              :show-rating="false"
              :border-width="5"
              :rounded-corners="true"
              :star-size="50"
              ref="drinkRating">
            </star-rating>
          </div>
          <!-- This input will show for screen sizes <= 600px wide -->
          <div class="show-sm">
            <star-rating v-model="rating"
              :show-rating="false"
              :border-width="5"
              :rounded-corners="true"
              :star-size="40"
              ref="drink-rating">
            </star-rating>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="col-3 col-sm-12">
          <label class="form-label" for="drink-comment">Comment:</label>
        </div>
        <div class="col-9 col-sm-12">
          <textarea id="drink-comment" 
            v-model="comment" 
            class="form-input">
          </textarea>
        </div>
      </div>

        <input type="submit" value="Add Drink" ref="drinkSubmit" class="btn btn-primary btn-lg" />
    </form>
</template>

<script>
import { Datetime } from "vue-datetime";
import StarRating from "vue-star-rating";
import VueSimpleSuggest from "vue-simple-suggest";

// You need a specific loader for CSS files
import "vue-datetime/dist/vue-datetime.css";
import "vue-simple-suggest/dist/styles.css";

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
          Authorization: this.$store.state.token,
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
      })
        .then(response => response.json())
        .then(response => {
          console.log(response.data.drink);
          this.$emit("new-drink"); // refresh the list
        })
        .catch(err => {
          alert(err);
        });
    },

    scrollToRating() {
      this.$scrollTo("#rating-container", 250, {
        cancelable: false
      });
    },

    focusDrinkName() {
      this.$refs.drinkName.focus();
    },

    getDrinkSuggestionList(drinkName) {
      const API_BASE = process.env.VUE_APP_API_URL;

      let query = `query=${encodeURIComponent(drinkName)}`;

      return fetch(`${API_BASE}/search/beer?${query}`)
        .then(response => response.json())
        .then(response => {
          return response.data.beers.map(beer => beer.name);
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
    StarRating,
    VueSimpleSuggest
  }
};
</script>