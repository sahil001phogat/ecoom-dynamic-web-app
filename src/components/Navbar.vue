
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <span class="fw-bold text-primary">ShopVue</span>
      </router-link>
      
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products">Products</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/news">News</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
        </ul>
        
        <div class="d-flex">
          <router-link to="/cart" class="btn me-2 position-relative">
            <i class="bi bi-cart"></i>
            <span v-if="cartCount > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {{ cartCount }}
            </span>
          </router-link>
          
          <template v-if="isAuthenticated">
            <div class="dropdown">
              <button class="btn dropdown-toggle" type="button" id="userDropdown" 
                      data-bs-toggle="dropdown" aria-expanded="false">
                {{ username }}
              </button>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li><a class="dropdown-item" href="#" @click.prevent="logout">Logout</a></li>
              </ul>
            </div>
          </template>
          <template v-else>
            <router-link to="/login" class="btn btn-outline-primary me-2">Login</router-link>
            <router-link to="/register" class="btn btn-primary">Register</router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue';

// This would be replaced with actual auth state from a store or composable
const isAuthenticated = ref(false);
const username = ref('User');
const cartCount = ref(0);

const logout = () => {
  isAuthenticated.value = false;
};
</script>

<style scoped>
.navbar {
  padding: 10px 0;
}

.navbar-brand {
  font-size: 1.5rem;
}
</style>
