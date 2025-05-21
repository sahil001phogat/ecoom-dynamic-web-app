
<template>
  <footer class="bg-dark text-white py-5 mt-auto">
    <div class="container">
      <div class="row">
        <div class="col-md-4 mb-4 mb-md-0">
          <h5 class="mb-3">ShopVue</h5>
          <p class="mb-0">Your one-stop destination for quality products and exceptional shopping experience.</p>
        </div>
        
        <div class="col-md-2 mb-4 mb-md-0">
          <h5 class="mb-3">Links</h5>
          <ul class="list-unstyled">
            <li><router-link to="/" class="text-decoration-none text-white-50">Home</router-link></li>
            <li><router-link to="/products" class="text-decoration-none text-white-50">Products</router-link></li>
            <li><router-link to="/news" class="text-decoration-none text-white-50">News</router-link></li>
            <li><router-link to="/about" class="text-decoration-none text-white-50">About</router-link></li>
          </ul>
        </div>
        
        <div class="col-md-3 mb-4 mb-md-0">
          <h5 class="mb-3">Customer Service</h5>
          <ul class="list-unstyled">
            <li><a href="#" class="text-decoration-none text-white-50">Contact Us</a></li>
            <li><a href="#" class="text-decoration-none text-white-50">FAQ</a></li>
            <li><a href="#" class="text-decoration-none text-white-50">Shipping & Returns</a></li>
            <li><a href="#" class="text-decoration-none text-white-50">Privacy Policy</a></li>
          </ul>
        </div>
        
        <div class="col-md-3">
          <h5 class="mb-3">Newsletter</h5>
          <p class="mb-2 text-white-50">Subscribe to receive updates and promotions</p>
          <div class="input-group">
            <input type="email" class="form-control" placeholder="Email address" v-model="email">
            <button class="btn btn-primary" type="button" @click="subscribe">Subscribe</button>
          </div>
        </div>
      </div>
      
      <div class="border-top border-secondary pt-3 mt-4 text-center text-white-50">
        <p class="mb-0">&copy; {{ currentYear }} ShopVue. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue';

const email = ref('');
const currentYear = computed(() => new Date().getFullYear());

const subscribe = () => {
  if (!email.value) return;
  alert(`Subscribed with email: ${email.value}`);
  email.value = '';
};
</script>
