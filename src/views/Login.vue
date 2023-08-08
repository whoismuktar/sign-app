<template>
  <div class="login-view">
    <fullscreen>
      <div class="form-wrapper login-form">
        <h2 class="text-center mb-1">Welcome Back</h2>

        <v-form v-model="isFormValid">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="registerData.email"
                  :rules="[rules.required, rules.email]"
                  label="E-mail"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="registerData.password"
                  :counter="10"
                  label="Password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>

        <div class="text-center">
          <br />
          <p>
            Don't have an Account?
            <router-link to="/register">Sign Up</router-link>
          </p>
        </div>
      </div>
    </fullscreen>
  </div>
</template>

<script>
import Fullscreen from "@/components/FullScreen";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isFormValid: false,
      registerData: {
        email: "",
        password: "",
      },
      rules: {
        required: (value) => !!value || "Required",
        number: (value) => !value || /^[0-9]*$/.test(value) || "Invalid value",
        string: (value) =>
          !value || /^[A-Za-z]+$/.test(value) || "Invalid value",
        email: (value) =>
          !value ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
          "Invalid E-mail",
      },
    };
  },
  components: {
    Fullscreen,
  },
  computed: {
    ...mapGetters({
      // rules: "app/rules",
      // getCurrencies: "app/getCurrencies",
    }),
  },
  mounted() {
    // console.log({rules: this.rules});
    // console.log({ rules: this.getCurrencies });
  },
};
</script>

<style scoped></style>
