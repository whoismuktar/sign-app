<template>
  <div class="register-view">
    <fullscreen>
      <div class="form-wrapper register-form">
        <h2 class="text-center mb-1">Create An Account</h2>

        <v-form ref="registerForm">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model.trim="registerData.first_name"
                  :rules="[rules.required, rules.string]"
                  label="First Name"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model.trim="registerData.last_name"
                  :rules="[rules.required, rules.string]"
                  label="Last Name"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model.trim="registerData.email"
                  :rules="[rules.required, rules.email]"
                  label="E-mail"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="registerData.password"
                  :rules="[rules.required, rules.min6]"
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
                    @click="submitregister()"
                  >
                    CREATE ACCOUNT
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-form>

        <div class="text-center">
          <br />
          <p>
            Already have an Account?
            <router-link to="/">Login</router-link>
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
import { register } from "@/services/auth";

export default {
  data() {
    return {
      toast: {
        status: false,
        message: "",
        color: "success",
      },
      submitLoading: false,
      registerData: {
        first_name: "",
        last_name: "",
        role: "User",
        email: "",
        password: "",
      },
      rules: {
        required: (value) => !!value || "Required",
        min6: (value) => value.length >= 6 || "Min 6 characters",
        string: (value) =>
          !value || /^[A-Za-z]+$/.test(value) || "Invalid value",
        email: (value) =>
          !value ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
          "Invalid E-mail",
      },
    };
  },
  methods: {
    validate() {
      this.$refs.registerForm.validate();
    },
    async submitregister() {
      const isValid = this.$refs.registerForm.validate();

      if (isValid) {
        this.submitLoading = true;

        try {
          const res = await register(this.registerData);
          console.log({ res });
          const message = "Your accocunt has been created successfully!";

          this.toast.status = true;
          this.toast.message = message;
          this.toast.color = "success";

          localStorage.setItem("auth_token", res.data.token)

          window.location.href = "/profile"

          this.submitLoading = false;
        } catch (error) {
          const { message } = error.response.data;

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
