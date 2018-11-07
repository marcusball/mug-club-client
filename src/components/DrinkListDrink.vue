<template>
  <div class="drink columns">
    <div class="column col-3 col-md-6 col-sm-12">
        <div class="float-left">
            <font-awesome-icon icon="beer" size="sm" fixed-width class="text-gray mx-2" />
        </div>
        <div class="drink-text">{{drink.name}}</div>
    </div>
    <div class="column col-3 col-md-6 col-sm-12">
        <div class="float-left">
            <font-awesome-icon icon="industry" size="sm" fixed-width class="text-gray mx-2" />
        </div>
        <div class="drink-text">{{drink.brewery}}</div>
    </div>
    <div class="column col-3 col-md-6 col-sm-12">
        <star-rating
            :rating="drink.rating"
            :read-only="true"
            :show-rating="false"
            :border-width="5"
            :rounded-corners="true"
            :star-size="30">
        </star-rating>
    </div>
    <div class="column col-3 col-md-6 col-sm-12">
        <div class="float-left">
            <font-awesome-icon icon="quote-left" size="sm" fixed-width class="text-gray mx-2" />
        </div>
        <div class="drink-text">
            <span v-if="drink.comment">{{drink.comment}}</span>
            <em v-else class="text-gray">No comment</em></div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import IDrink from "@/interfaces/IDrink";
import StarRating from "vue-star-rating";

@Component({
  components: {
    StarRating
  }
})
export default class DrinkListDrink extends Vue {
  @Prop()
  private drink!: IDrink;

  get drankOnDate() {
    let date = new Date(this.drink.drank_on);
    return date.getDate() + " " + date.getMonth();
  }
}
</script>

<style scoped>
.drink-text {
  /* width of fa-sm icons + 2 * mx-2 margin size */
  padding-left: calc(1.25em + 0.8rem);
}
</style>