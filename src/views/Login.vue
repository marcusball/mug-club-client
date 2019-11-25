<template>
  <div class="container">
    <div class="columns">
      <div class="column col-4 col-sm-12 col-mx-auto">
        <h1>Sign in or Register</h1>

        <div v-if="errorMessage" class="toast toast-error mb-2">{{ errorMessage }}</div>

        <form v-if="!verifying" class="login" @submit.prevent="login">
          <div class="form-group">
            <label class="form-label">Phone number</label>

            <div class="has-icon-right">
              <vue-tel-input
                v-model="phoneNumberInput"
                @input="onInput"
                :required="true"
                :preferredCountries="['us', 'ca', 'gb', 'au']"
                :placeholder="'Enter your phone number'"
              ></vue-tel-input>

              <!-- loading icon for the form input -->
              <i v-if="isRequestLoading" class="form-icon loading"></i>
            </div>
          </div>

          <div class="form-group">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </form>
        <form v-else class="login" @submit.prevent="loginVerify">
          <div class="form-group">
            <label class="form-label">Verification code</label>

            <div class="has-icon-right">
              <input
                required
                v-model="verificationCode"
                type="tel"
                placeholder="000000"
                class="form-input input-lg"
              />

              <!-- loading icon for the form input -->
              <i v-if="isRequestLoading" class="form-icon loading"></i>
            </div>
          </div>

          <div class="form-group">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { VueTelInput } from "vue-tel-input";

export default {
  data() {
    return {
      phone: "",
      phoneNumber: "",
      phoneNumberInput: "",
      countryCode: "",
      isNumberValid: false,
      verifying: false,
      verificationCode: "",

      /// True when a request to the API is running, and a loading icon should be displayed.
      isRequestLoading: false,

      errorMessage: ""
    };
  },

  created() {
    const API_BASE = process.env.VUE_APP_API_URL;

    // Ping the heroku instance to wake it up.
    fetch(`${API_BASE}/wakeup`);
  },

  methods: {
    login: function() {
      this.isRequestLoading = true;
      this.errorMessage = "";

      this.$store
        .dispatch("login", {
          countryCode: this.countryCode,
          phoneNumber: this.cleanedPhoneNumber
        })
        .then(response => {
          // If there were any errors
          if (response.status !== "success") {
            this.errorMessage = response.messages
              ? response.messages[0]
              : "There was an error while trying to log you in :(";

            return;
          }

          // Now display the input for entering verification code
          this.verifying = true;
        })
        .catch(err => {
          this.verifying = false;

          // Display the message contained in the error, or default text otherwise.
          this.errorMessage =
            err.message || "There was an error while trying to log you in :(";
        })
        .finally(() => {
          this.isRequestLoading = false;
        });
    },

    loginVerify: function() {
      this.errorMessage = "";
      this.isRequestLoading = true;

      this.$store
        .dispatch("loginVerify", {
          phoneNumber: this.cleanedPhoneNumber,
          countryCode: this.countryCode,
          verificationCode: this.verificationCode
        })
        .then(response => {
          this.isRequestLoading = false;

          if (response.status === "success") {
            this.$router.push("/");
          } else {
            this.errorMessage =
              response.messages[0] ||
              "There was an error while trying to log you in :(";
          }
        })
        .catch(err => {
          this.isRequestLoading = false;
          console.error(err);

          // Display the message contained in the error, or default text otherwise.
          this.errorMessage =
            (err.messages && err.messages[0]) ||
            err.message ||
            "There was an error while trying to log you in :(";
        });
    },

    onInput(formattedNumber, { number, valid, country }) {
      this.phoneNumber = number;
      this.countryCode = country && country.dialCode;
      this.isNumberValid = valid;
    }
  },

  components: {
    VueTelInput
  },

  computed: {
    cleanedPhoneNumber: function() {
      if (!this.phoneNumber) {
        return null;
      }

      // If the number is not valid, it will not have the country code added yet.
      return this.isNumberValid
        ? this.phoneNumber.significant
        : this.phoneNumber.input;
    }
  }
};
</script>