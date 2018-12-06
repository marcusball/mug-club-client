<template>
  <div class="drink columns">
    <div class="column col-1 col-md-12 col-sm-12">
      <div class="show-md">
        <span class="label label-rounded label-primary">
          <font-awesome-icon icon="calendar-alt" size="sm" fixed-width/>
          {{drankOnDateLong}}
        </span>
      </div>

      <div class="hide-md">
        <span class="label label-rounded label-primary">
          <font-awesome-icon icon="calendar-alt" size="sm" fixed-width/>
          {{drankOnDateShort}}
        </span>
      </div>
    </div>
    <div class="column col-3 col-md-6 col-sm-12">
      <div class="float-left">
        <font-awesome-icon icon="beer" size="sm" fixed-width class="text-gray mx-2"/>
      </div>
      <div class="drink-text">{{drink.name}}</div>
    </div>
    <div class="column col-3 col-md-6 col-sm-12">
      <div class="float-left">
        <font-awesome-icon icon="industry" size="sm" fixed-width class="text-gray mx-2"/>
      </div>
      <div class="drink-text">{{drink.brewery}}</div>
    </div>
    <div class="column col-2 col-md-6 col-sm-12">
      <!-- Show larger icons when window width is <= 840px -->
      <div class="show-md">
        <star-rating
          :rating="drink.rating"
          :read-only="true"
          :show-rating="false"
          :border-width="5"
          :rounded-corners="true"
          :star-size="30"
        ></star-rating>
      </div>
      <!-- Hide larger icons when window width is > 840px -->
      <div class="hide-md">
        <star-rating
          :rating="drink.rating"
          :read-only="true"
          :show-rating="false"
          :border-width="5"
          :rounded-corners="true"
          :star-size="20"
        ></star-rating>
      </div>
    </div>
    <div class="column col-3 col-md-6 col-sm-12">
      <div class="float-left">
        <font-awesome-icon icon="quote-left" size="sm" fixed-width class="text-gray mx-2"/>
      </div>
      <div class="drink-text">
        <span v-if="drink.comment">{{drink.comment}}</span>
        <em v-else class="text-gray">No comment</em>
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

  get drankOnDateShort() {
    let date = new Date(this.drink.drank_on);
    return date.toLocaleString("en-US", { month: "short", day: "numeric" });
  }

  get drankOnDateLong() {
    let date = new Date(this.drink.drank_on);
    return date.toLocaleString("en-US", { month: "long", day: "numeric" });
  }
}
</script>

<style scoped>
.drink-text {
  /* width of fa-sm icons + 2 * mx-2 margin size */
  padding-left: calc(1.25em + 0.8rem);
}
</style>