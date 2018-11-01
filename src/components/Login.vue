<template>
    <div>
        <form v-if="!verifying" class="login" @submit.prevent="login">
            <h1>Sign in</h1>
            <label>Phone number</label>
            <input required v-model="phoneNumber" type="tel" placeholder="352-555-1234" />
            <hr />
            <button type="submit">Login</button>
        </form>
        <form v-else class="login" @submit.prevent="loginVerify">
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
      verifying: false,
      countryCode: "1",
      phoneNumber: "",
      verificationCode: ""
    };
  },

  methods: {
    login: function() {
      this.$store
        .dispatch("login", {
          countryCode: this.countryCode,
          phoneNumber: this.phoneNumber
        })
        .then(resp => {
          this.verifying = true;
        })
        .catch(err => {
          this.verifying = false;
          alert(err);
        });
    },

    loginVerify: function() {
      this.$store
        .dispatch("loginVerify", {
          phoneNumber: this.phoneNumber,
          countryCode: this.countryCode,
          verificationCode: this.verificationCode
        })
        .then(() => this.$router.push("/"))
        .catch(err => console.error(err));
    }
  }
};
</script>