<template>
  <div class="not-found">
    <fullscreen>
      <div class="white--text text-center">
        <h1>Oopsy!</h1>
        <h2>You seem to be lost</h2>
        <div>
          <b>
            <router-link to="/" class="white--text">
              Go Home
            </router-link>
          </b>
        </div>
      </div>
    </fullscreen>
  </div>
</template>

<script>
import fullscreen from "@/components/FullScreen";
export default {
  components: {
    fullscreen,
  },
};
</script>

<style></style>
