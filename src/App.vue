<template>
  <div id="app" class="container">
    <header class="navbar">
      <section class="navbar-section">
        <router-link to="/" class="navbar-brand mr-2">Home</router-link>
        <router-link v-if="isLoggedIn" to="/drinks" class="btn btn-link">Drinks</router-link>
        <router-link to="/about" class="btn btn-link">About</router-link>
       
      </section>
      <section class="navbar-section">
        <router-link v-if="!isLoggedIn" to="/auth" class="btn btn-link">Login</router-link>
        <a v-else @click="logout" class="btn btn-link">Logout</a>
      </section>
    </header>


    <router-view/>
  </div>
</template>

<style>
</style>

<script>
export default {
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>