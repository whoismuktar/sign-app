<template>
  <div class="login-view">
    <fullscreen>
      <div class="form-wrapper login-form">
        <h2 class="text-center mb-1">Welcome Back</h2>

        <v-form ref="loginForm">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="loginData.email"
                  :rules="[rules.required, rules.email]"
                  label="E-mail"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="loginData.password"
                  type="password"
                  label="Password"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <div class="text-center">
                  <v-btn
                    depressed
                    class="pryBtn"
                    :loading="submitLoading"
                    @click="submitLogin()"
                  >
                    Submit
                  </v-btn>
                </div>
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

      <v-snackbar v-model="toast.status" top centered :color="toast.color">
        {{ toast.message }}
      </v-snackbar>
    </fullscreen>
  </div>
</template>

<script>
import Fullscreen from "@/components/FullScreen";
import { login } from "@/services/auth";

export default {
  data() {
    return {
      toast: {
        status: false,
        message: "",
        color: "success",
      },
      submitLoading: false,
      loginData: {
        email: "",
        password: "",
        entry_point: "User",
      },
      rules: {
        required: (value) => !!value || "Required",
        email: (value) =>
          !value ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
          "Invalid E-mail",
      },
    };
  },
  methods: {
    validate() {
      this.$refs.loginForm.validate();
    },
    async submitLogin() {
      this.submitLoading = true;
      const isValid = this.$refs.loginForm.validate();

      if (isValid) {
        try {
          const res = await login(this.loginData);

          this.toast.status = true;
          this.toast.message = "Login successful";
          this.toast.color = "success";

          localStorage.setItem("auth_token", res.data.token);

          this.submitLoading = false;
          window.location.href = "/profile"
        } catch (error) {
          const message = error.response?.data?.message || "Invalid email or password";

          this.toast.status = true;
          this.toast.message = message;
          this.toast.color = "red";

          this.submitLoading = false;
        }
      }
    },
  },
  components: {
    Fullscreen,
  },
};
</script>

<style scoped></style>
