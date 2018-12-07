<template>
  <div class="columns">
    <div class="drink columns col-11">
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

    <div class="column col-1">
      <div class="dropdown dropdown-right float-right">
        <a href="#" class="btn btn-link dropdown-toggle" tabindex="0">
          <font-awesome-icon icon="ellipsis-h"/>
        </a>
        <!-- menu component -->
        <ul class="menu">
          <!--
          <li class="menu-item">
            <a href="#">
              <font-awesome-icon icon="edit" fixed-width/>&nbsp;Edit
            </a>
          </li>
          -->
          <li class="menu-item">
            <a @click="showConfirmDelete = 'true'">
              <font-awesome-icon icon="trash-alt" fixed-width/>&nbsp;Delete
            </a>
          </li>
        </ul>
      </div>

      <ConfirmModal
        :active="showConfirmDelete"
        :title="'Delete this drink?'"
        :small="true"
        @close="showConfirmDelete = false"
      >Are you sure you want to delete this drink?
        <template slot="footer">
          <button @click="showConfirmDelete = false" class="btn mx-1">Cancel</button>
          <button @click="onDeleteConfirmed" class="btn btn-primary mx-1">Delete</button>
        </template>
      </ConfirmModal>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import IDrink from "@/interfaces/IDrink";
import ConfirmModal from "@/components/ConfirmModal.vue";
import StarRating from "vue-star-rating";

@Component({
  components: {
    StarRating,
    ConfirmModal
  }
})
export default class DrinkListDrink extends Vue {
  @Prop()
  private drink!: IDrink;

  private showConfirmDelete: boolean = false;

  get drankOnDateShort() {
    let date = new Date(this.drink.drank_on);
    return date.toLocaleString("en-US", { month: "short", day: "numeric" });
  }

  get drankOnDateLong() {
    let date = new Date(this.drink.drank_on);
    return date.toLocaleString("en-US", { month: "long", day: "numeric" });
  }

  onDeleteConfirmed() {
    // Hide the modal
    this.showConfirmDelete = false;

    const API_BASE = process.env.VUE_APP_API_URL;

    return fetch(`${API_BASE}/drink/${this.drink.id}`, {
      method: "DELETE",
      headers: {
        Authorization: this.$store.state.token,
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(response => {
        if (response.status === "success") {
          this.$emit("deleted");
        } else {
          console.error(response);
        }
      })
      .catch(err => {
        alert(err);
      });
  }
}
</script>

<style scoped>
.drink-text {
  /* width of fa-sm icons + 2 * mx-2 margin size */
  padding-left: calc(1.25em + 0.8rem);
}
</style>