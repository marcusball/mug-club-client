<template>
  <div id="app" class="container">
    <header class="navbar">
      <section class="navbar-section">
        <router-link v-if="isLoggedIn" to="/" class="navbar-brand mr-2">Drinks</router-link>
        <router-link to="/about" class="btn btn-link">About</router-link>
      </section>
      <section class="navbar-section">
        <router-link v-if="!isLoggedIn" to="/auth" class="btn btn-link">Login</router-link>
        <a v-else @click="logout" class="btn btn-link">Logout</a>
      </section>
    </header>

    <router-view />

    <div class="divider"></div>

    <footer>
      <div class="m-2 text-center">
        <span class="text-secondary">Mug Club App</span>
      </div>
    </footer>
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
        this.$router.push("/auth");
      });
    }
  }
};
</script>