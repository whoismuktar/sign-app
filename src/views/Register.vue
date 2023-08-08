<template>
  <div class="register-view">
    <fullscreen>
      <div class="form-wrapper register-form">
        <h2 class="text-center mb-1">Register</h2>

        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="firstname"
                  :rules="nameRules"
                  :counter="10"
                  label="First name"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="lastname"
                  :rules="nameRules"
                  :counter="10"
                  label="Last name"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>

        <div class="text-center">
          <br />
          <p>
            Already have an Account?
            <router-link to="/login">Login</router-link>
          </p>
        </div>
      </div>
    </fullscreen>
  </div>
</template>

<script>
import Fullscreen from "@/components/FullScreen";

export default {
  components: {
    Fullscreen,
  },
};
</script>

<style scoped></style>
