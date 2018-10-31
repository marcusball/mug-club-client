<template>
    <div>
        <form class="login" @submit.prevent="login">
            <h1>Sign in</h1>
            <label>Phone number</label>
            <input required v-model="phone_number" type="tel" placeholder="352-555-1234" />
            <hr />
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      phone_number: ""
    };
  },

  methods: {
    login: function() {
      let phone_number = this.phone_number;

      this.$store
        .dispatch("login", { phone_number })
        .then(() => this.$router.push("/auth/verify"))
        .catch(err => console.error(err));
    }
  }
};
</script>