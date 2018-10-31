<template>
    <div>
        <form class="login" @submit.prevent="login_verify">
            <h1>Sign in</h1>
            <label>Verification code</label>
            <input required v-model="verificationCode" type="text" placeholder="000000" />
            <hr />
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      verificationCode: ""
    };
  },

  methods: {
    login_verify: function() {
      let verificationCode = this.verificationCode;

      this.$store
        .dispatch("login_verify", verificationCode)
        .then(() => this.$router.push("/"))
        .catch(err => console.error(err));
    }
  }
};
</script>