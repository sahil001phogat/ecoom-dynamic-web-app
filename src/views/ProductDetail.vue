
<template>
  <div class="container py-5" v-if="product">
    <div class="row">
      <div class="col-md-6 mb-4 mb-md-0">
        <img :src="product.image" :alt="product.name" class="img-fluid rounded">
      </div>
      
      <div class="col-md-6">
        <nav aria-label="breadcrumb" class="mb-3">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
            <li class="breadcrumb-item"><router-link to="/products">Products</router-link></li>
            <li class="breadcrumb-item active" aria-current="page">{{ product.name }}</li>
          </ol>
        </nav>
        
        <h1 class="mb-2">{{ product.name }}</h1>
        <div class="mb-3">
          <span class="badge bg-secondary me-2">{{ product.category }}</span>
          <span class="badge" :class="stockBadgeClass">{{ stockLabel }}</span>
        </div>
        
        <h2 class="text-primary mb-3">${{ formatPrice(product.price) }}</h2>
        
        <p class="mb-4">{{ product.description }}</p>
        
        <div class="mb-4">
          <div class="d-flex align-items-center">
            <label for="quantity" class="me-3">Quantity:</label>
            <div class="input-group" style="width: 150px;">
              <button 
                @click="decreaseQuantity" 
                class="btn btn-outline-secondary" 
                type="button"
                :disabled="quantity <= 1"
              >−</button>
              <input 
                type="number" 
                class="form-control text-center" 
                id="quantity" 
                v-model.number="quantity" 
                min="1" 
                :max="product.stock"
                :disabled="product.stock === 0"
              >
              <button 
                @click="increaseQuantity" 
                class="btn btn-outline-secondary" 
                type="button"
                :disabled="quantity >= product.stock"
              >+</button>
            </div>
          </div>
        </div>
        
        <div class="d-grid gap-2">
          <button 
            @click="addToCart" 
            class="btn btn-primary btn-lg" 
            :disabled="product.stock === 0"
          >
            <i class="bi bi-cart-plus me-2"></i>
            {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
          </button>
        </div>
        
        <!-- Real-time Stock Tracker -->
        <div class="card mt-4">
          <div class="card-body">
            <h3 class="h5 mb-3">Real-Time Stock Tracker</h3>
            
            <div class="mb-3">
              <div class="progress">
                <div 
                  class="progress-bar" 
                  :class="stockBarClass" 
                  role="progressbar" 
                  :style="`width: ${stockPercentage}%`" 
                  :aria-valuenow="product.stock" 
                  aria-valuemin="0" 
                  aria-valuemax="50"
                ></div>
              </div>
            </div>
            
            <p class="mb-0" v-if="product.stock === 0">
              Currently out of stock. Sign up for restock alerts.
            </p>
            <p class="mb-0" v-else-if="product.stock <= 5">
              <i class="bi bi-exclamation-triangle text-warning me-1"></i>
              Hurry! Only {{ product.stock }} items left in stock!
            </p>
            <p class="mb-0" v-else>
              <i class="bi bi-check-circle text-success me-1"></i>
              In stock and ready to ship.
            </p>
            
            <div v-if="product.stock === 0" class="mt-3">
              <input 
                type="email" 
                class="form-control mb-2" 
                v-model="email" 
                placeholder="Enter email for restock alerts"
              >
              <button @click="subscribeToRestock" class="btn btn-outline-primary w-100">
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div v-else class="container py-5 text-center">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import productsData from '../data/products.js';

const route = useRoute();
const product = ref(null);
const quantity = ref(1);
const email = ref('');

// Computed properties
const stockBadgeClass = computed(() => {
  if (!product.value) return '';
  
  if (product.value.stock === 0) return 'bg-danger';
  if (product.value.stock <= 5) return 'bg-warning text-dark';
  return 'bg-success';
});

const stockLabel = computed(() => {
  if (!product.value) return '';
  
  if (product.value.stock === 0) return 'Out of stock';
  if (product.value.stock <= 5) return `Only ${product.value.stock} left`;
  return 'In stock';
});

const stockBarClass = computed(() => {
  if (!product.value) return '';
  
  if (product.value.stock === 0) return 'bg-danger';
  if (product.value.stock <= 5) return 'bg-warning';
  return 'bg-success';
});

const stockPercentage = computed(() => {
  if (!product.value) return 0;
  return Math.min(100, (product.value.stock / 50) * 100);
});

// Methods
const formatPrice = (price) => {
  return price.toFixed(2);
};

const increaseQuantity = () => {
  if (product.value && quantity.value < product.value.stock) {
    quantity.value++;
  }
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const addToCart = () => {
  if (!product.value || product.value.stock === 0) return;
  
  alert(`Added ${quantity.value} ${product.value.name}(s) to your cart!`);
  // This would normally update a cart store
};

const subscribeToRestock = () => {
  if (!email.value || !product.value) return;
  
  alert(`You'll be notified when ${product.value.name} is back in stock.`);
  email.value = '';
};

// Lifecycle hooks
onMounted(() => {
  const id = route.params.id;
  const foundProduct = productsData.find(p => p.id === id);
  
  if (foundProduct) {
    product.value = foundProduct;
  } else {
    // Handle product not found
    product.value = null;
  }
});
</script>
