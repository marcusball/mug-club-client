<template>
  <div class="drink columns">
    <div class="column col-3 col-md-6 col-sm-12">{{drink.name}}</div>
    <div class="column col-3 col-md-6 col-sm-12">{{drink.brewery}}</div>
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
    <div v-if="drink.comment" class="column col-3 col-md-6 col-sm-12">{{drink.comment}}</div>
    <div v-else class="column col-3 col-md-6 col-sm-12"><em>No comment</em></div>
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

