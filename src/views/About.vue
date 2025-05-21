
<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <h1 class="text-center mb-4">About ShopVue</h1>
        
        <p class="lead text-center mb-5">
          Your one-stop destination for quality products and exceptional shopping experience.
        </p>
        
        <div class="row mb-5">
          <div class="col-md-6">
            <img 
              src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1000" 
              alt="ShopVue team at work" 
              class="img-fluid rounded shadow mb-4"
            >
          </div>
          <div class="col-md-6">
            <h2 class="mb-3">Our Story</h2>
            <p>
              Founded in 2020, ShopVue was born out of a passion for delivering quality products with transparency and 
              exceptional customer service. What started as a small online store has grown into a thriving e-commerce 
              platform offering a diverse range of products to customers worldwide.
            </p>
            <p>
              Our mission is simple: to make online shopping enjoyable, reliable, and transparent. We achieve this by 
              focusing on product quality, customer satisfaction, and innovative features like our real-time stock tracker 
              that keeps you informed about product availability.
            </p>
          </div>
        </div>
        
        <!-- Interactive Form -->
        <div class="bg-light rounded p-4 mb-5">
          <h2 class="text-center mb-4">Welcome to ShopVue</h2>
          
          <div class="row">
            <div class="col-md-6 mb-4 mb-md-0">
              <form @submit.prevent="handleSubmit">
                <div class="mb-3">
                  <label for="firstName" class="form-label">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    class="form-control" 
                    v-model="firstName" 
                    required
                  >
                </div>
                
                <div class="mb-3">
                  <label for="lastName" class="form-label">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    class="form-control" 
                    v-model="lastName" 
                    required
                  >
                </div>
                
                <div class="mb-3">
                  <label class="form-label">Choose an Image</label>
                  <div class="form-check">
                    <input 
                      class="form-check-input" 
                      type="radio" 
                      id="mountain" 
                      value="mountain" 
                      v-model="imageType" 
                      name="imageType"
                    >
                    <label class="form-check-label" for="mountain">Mountain</label>
                  </div>
                  <div class="form-check">
                    <input 
                      class="form-check-input" 
                      type="radio" 
                      id="ocean" 
                      value="ocean" 
                      v-model="imageType" 
                      name="imageType"
                    >
                    <label class="form-check-label" for="ocean">Ocean</label>
                  </div>
                </div>
                
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
            </div>
            
            <div class="col-md-6">
              <div v-if="formSubmitted" class="card">
                <div class="card-body">
                  <h3 class="card-title">Welcome, {{ firstName }} {{ lastName }}!</h3>
                  <p class="card-text">Thank you for visiting ShopVue. We hope you enjoy your shopping experience.</p>
                </div>
                <img 
                  :src="selectedImage" 
                  class="card-img-bottom" 
                  alt="Selected image"
                  style="height: 200px; object-fit: cover;"
                >
              </div>
            </div>
          </div>
        </div>
        
        <!-- Our Values -->
        <h2 class="text-center mb-4">Our Values</h2>
        
        <div class="row mb-5">
          <div class="col-md-4 mb-3">
            <div class="card h-100 text-center p-3">
              <div class="d-flex justify-content-center mb-3">
                <div class="bg-primary bg-opacity-10 rounded-circle p-3">
                  <i class="bi bi-shield-check text-primary fs-3"></i>
                </div>
              </div>
              <h4>Quality</h4>
              <p>We meticulously select every product in our catalog to ensure it meets our high standards for quality, durability, and value.</p>
            </div>
          </div>
          
          <div class="col-md-4 mb-3">
            <div class="card h-100 text-center p-3">
              <div class="d-flex justify-content-center mb-3">
                <div class="bg-primary bg-opacity-10 rounded-circle p-3">
                  <i class="bi bi-chat-square-text text-primary fs-3"></i>
                </div>
              </div>
              <h4>Transparency</h4>
              <p>From real-time stock updates to clear pricing and shipping policies, we believe in keeping our customers informed at every step.</p>
            </div>
          </div>
          
          <div class="col-md-4 mb-3">
            <div class="card h-100 text-center p-3">
              <div class="d-flex justify-content-center mb-3">
                <div class="bg-primary bg-opacity-10 rounded-circle p-3">
                  <i class="bi bi-lightbulb text-primary fs-3"></i>
                </div>
              </div>
              <h4>Innovation</h4>
              <p>We continuously work to improve your shopping experience with features like our stock tracker and personalized recommendations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// State
const firstName = ref('');
const lastName = ref('');
const imageType = ref('mountain');
const formSubmitted = ref(false);

// Computed properties
const selectedImage = computed(() => {
  if (imageType.value === 'mountain') {
    return 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
  } else {
    return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80';
  }
});

// Methods
const handleSubmit = () => {
  formSubmitted.value = true;
};
</script>
