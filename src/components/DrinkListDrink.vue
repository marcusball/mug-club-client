<template>
  <div class="drink columns">
    <div class="column col-3">{{drink.name}}</div>
    <div class="column col-3">{{drink.brewery}}</div>
    <div class="column col-3">{{drink.rating}}</div>
    <div v-if="drink.comment" class="column col-3">{{drink.comment}}</div>
    <div v-else class="column col-3"><em>No comment</em></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import IDrink from "@/interfaces/IDrink";

@Component
export default class DrinkListDrink extends Vue {
  @Prop()
  private drink!: IDrink;
}
</script>

