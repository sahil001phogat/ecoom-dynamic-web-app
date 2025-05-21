
<template>
  <div class="card product-card h-100">
    <router-link :to="`/products/${product.id}`" class="position-relative">
      <img :src="product.image" :alt="product.name" class="card-img-top" style="height: 200px; object-fit: cover;">
      
      <!-- Stock indicator -->
      <div v-if="product.stock <= 5" class="position-absolute top-0 start-0 m-2 badge bg-danger">
        {{ product.stock === 0 ? 'Out of stock' : `Only ${product.stock} left!` }}
      </div>
      
      <!-- Category badge -->
      <div class="position-absolute top-0 end-0 m-2 badge bg-dark">
        {{ product.category }}
      </div>
    </router-link>
    
    <div class="card-body">
      <router-link :to="`/products/${product.id}`" class="text-decoration-none">
        <h5 class="card-title">{{ product.name }}</h5>
      </router-link>
      <p class="card-text text-truncate">{{ product.description }}</p>
      
      <div class="d-flex justify-content-between align-items-center mt-2">
        <span class="fw-bold">${{ formatPrice(product.price) }}</span>
        
        <button 
          @click="addToCart" 
          :disabled="product.stock === 0"
          class="btn" 
          :class="[product.stock === 0 ? 'btn-secondary' : 'btn-primary']"
        >
          <i class="bi bi-cart-plus"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['add-to-cart']);

const formatPrice = (price) => {
  return price.toFixed(2);
};

const addToCart = () => {
  if (props.product.stock > 0) {
    emit('add-to-cart', props.product);
  }
};
</script>

<style scoped>
.product-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
</style>
