<template>
  <div class="about">
    <h1>About</h1>
    <p>This is your virtual Mug Club drink sheet! Use this to keep track of your Mug Club progress without needing to pull out your sheet after every drink.</p>

    <p>
      Note: This is
      <em>not</em> an official Mug Club sheet substitute. You will still need to eventually update your physical paper sheet with the progress you log here.
    </p>

    <p>This is still being updated and improved. Any suggestions or comments to help improve this are greatly appreciated.</p>

    <p>
      <router-link
        v-if="!isLoggedIn"
        to="/auth"
        class="btn btn-primary"
      >Create an account to get started</router-link>
    </p>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  }
};
</script>