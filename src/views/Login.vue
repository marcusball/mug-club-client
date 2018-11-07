<template>
    <div class="container">
      <div class="columns">
        <div class="column col-4 col-sm-12 col-mx-auto">
          <h1>Sign in</h1>

          <form v-if="!verifying" class="login" @submit.prevent="login">
            <div class="form-group">
              <label class="form-label">Phone number</label>
              <vue-tel-input v-model="phoneNumber"
                    @onInput="onInput"
                    :required="true"
                    :preferredCountries="['us', 'ca', 'gb', 'au']">
              </vue-tel-input>
              <hr />
              <button type="submit" class="btn btn-primary">Login</button>
            </div>
          </form>
          <form v-else class="login" @submit.prevent="loginVerify">
            <div class="form-group">
              <label class="form-label">Verification code</label>
              <input required v-model="verificationCode" type="text" placeholder="000000" class="form-input input-lg" />
              <hr />
              <button type="submit" class="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
import VueTelInput from "vue-tel-input";

import "vue-tel-input/dist/vue-tel-input.css";

export default {
  data() {
    return {
      phone: "",
      phoneNumber: "",
      countryCode: "",
      isNumberValid: false,
      verifying: false,
      verificationCode: ""
    };
  },

  methods: {
    login: function() {
      this.$store
        .dispatch("login", {
          countryCode: this.countryCode,
          phoneNumber: this.cleanedPhoneNumber
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
          phoneNumber: this.cleanedPhoneNumber,
          countryCode: this.countryCode,
          verificationCode: this.verificationCode
        })
        .then(() => this.$router.push("/"))
        .catch(err => console.error(err));
    },

    /**
     * @param {string} number
     * the phone number inputted by user, will be formatted along with country code
     * // Ex: inputted: (AU) 0432 432 432
     * // number = '+61432421546'
     *
     * @param {Boolean} isValid
     * @param {string} country
     */
    onInput({ number, isValid, country }) {
      this.phoneNumber = number;
      this.countryCode = country.dialCode;
      this.isNumberValid = isValid;

      console.log(this.cleanedPhoneNumber, isValid, country.dialCode);
    }
  },

  components: {
    VueTelInput
  },

  computed: {
    cleanedPhoneNumber: function() {
      let num = this.phoneNumber.replace(/[^\d]/gi, "");

      // If the number is not valid, it will not have the country code added yet.
      return this.isNumberValid ? num.slice(this.countryCode.length) : num;
    }
  }
};
</script>