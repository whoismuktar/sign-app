<template>
  <div>
    <div class="topnav" id="myTopnav">
      <router-link to="/docs" class="active">Documents</router-link>
      <router-link to="/profile" class="">Upload</router-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    initMenu() {
      var x = document.getElementById("myTopnav");
      if (x.className === "topnav") {
        x.className += " responsive";
      } else {
        x.className = "topnav";
      }
    },
  },

  mounted() {
    this.initMenu();
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  margin-right: 5px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04aa6d;
  color: white;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {
    position: relative;
  }
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav a:not(:last-child) {
    margin-bottom: 5px;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
    margin-right: 0;
  }
}
</style>
