<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand">Navbar</a>
      <ul class="navbar-nav ml-auto">
        <template v-if="!currentUser">
          <li>
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li>
            <router-link to="/register" class="nav-link">Register</router-link>
          </li>
        </template>
        <template v-else>
          <li>
            <router-link to="/customers" class="nav-link">Customers</router-link>
          </li>
          <li class="nav-item dropdown">
            <a href="#" id="navbarDropdown" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" aria-haspopup="true">
              {{ currentUser.name }} <span class="caret"></span>
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a href="#!" @click.prevent="logout" class="dropdown-item">Logout</a>
            </div>
          </li>
        </template>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'myheader',
  methods: {
    logout(){
      this.$store.commit('logout');
      this.$router.push({path: '/login'});
    }
  },
  computed: {
    currentUser(){
      return this.$store.getters.getCurrentUser;
    }
  }
};
</script>

<style>
</style>