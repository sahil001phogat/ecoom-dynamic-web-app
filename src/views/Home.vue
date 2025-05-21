
<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-primary text-white py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <h1 class="display-4 fw-bold mb-4">Welcome to ShopVue</h1>
            <p class="lead mb-4">Your premium e-commerce destination with real-time stock tracking</p>
            <router-link to="/products" class="btn btn-light btn-lg">
              Shop Now
            </router-link>
          </div>
          <div class="col-lg-6">
            <img 
              src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=1000" 
              alt="Shopping" 
              class="img-fluid rounded shadow"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-5">
      <div class="container">
        <h2 class="text-center mb-4">Featured Products</h2>
        
        <div class="row">
          <div v-for="product in featuredProducts" :key="product.id" class="col-12 col-sm-6 col-lg-3 mb-4">
            <product-card 
              :product="product"
              @add-to-cart="addToCart"
            ></product-card>
          </div>
        </div>
      </div>
    </section>

    <!-- Special Feature Section -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <h2>Real-Time Stock Tracker</h2>
            <p class="lead">Never miss out on your favorite products again</p>
            <p>Our real-time stock tracking system keeps you informed about product availability. Get notifications when items come back in stock and see live updates as inventory changes.</p>
            
            <div class="my-4">
              <div v-for="(item, index) in stockItems" :key="index" class="mb-3">
                <p class="mb-1">{{ item.name }} <span class="badge" :class="stockBadgeClass(item.stock)">{{ stockLabel(item.stock) }}</span></p>
                <div class="progress">
                  <div 
                    class="progress-bar" 
                    :class="stockBarClass(item.stock)" 
                    role="progressbar" 
                    :style="`width: ${Math.min(100, (item.stock / item.max) * 100)}%`" 
                    :aria-valuenow="item.stock" 
                    aria-valuemin="0" 
                    :aria-valuemax="item.max"
                  ></div>
                </div>
              </div>
            </div>
            
            <router-link to="/products" class="btn btn-primary" v-tooltip="'View all products with stock information'">
              Explore Products
            </router-link>
          </div>
          <div class="col-lg-6">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000" 
              alt="Inventory Management" 
              class="img-fluid rounded shadow"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Latest News -->
    <section class="py-5">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="mb-0">Latest News</h2>
          <router-link to="/news" class="btn btn-outline-primary">View All</router-link>
        </div>
        
        <div class="row">
          <div v-for="item in latestNews" :key="item.id" class="col-md-6 col-lg-4 mb-4">
            <div class="card h-100">
              <img :src="item.image" class="card-img-top" alt="News Image" style="height: 200px; object-fit: cover;">
              <div class="card-body">
                <div class="d-flex justify-content-between mb-2">
                  <small class="text-muted">{{ formatDate(item.date) }}</small>
                  <span class="badge bg-secondary">{{ item.category }}</span>
                </div>
                <h5 class="card-title">{{ item.title }}</h5>
                <p class="card-text">{{ truncateText(item.content) }}</p>
              </div>
              <div class="card-footer bg-white d-flex justify-content-between align-items-center">
                <button class="btn btn-sm btn-outline-danger" @click="toggleLike(item)">
                  <i class="bi" :class="[item.isLiked ? 'bi-heart-fill' : 'bi-heart']"></i>
                  {{ item.likes }}
                </button>
                <router-link :to="`/news/${item.id}`" class="text-primary">Read more</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ProductCard from '../components/ProductCard.vue';
import productsData from '../data/products.js';
import newsData from '../data/news.js';
import tooltip from '../directives/tooltip.js';

const router = useRouter();

// Create custom directive
const vTooltip = tooltip;

// State
const featuredProducts = ref([]);
const latestNews = ref([]);
const stockItems = ref([
  { name: 'Wireless Headphones', stock: 15, max: 50 },
  { name: 'Smart Watch', stock: 4, max: 20 },
  { name: 'Backpack', stock: 0, max: 30 },
]);

// Methods
const addToCart = (product) => {
  alert(`Added ${product.name} to cart!`);
};

const truncateText = (text, length = 100) => {
  return text.length > length ? text.substring(0, length) + '...' : text;
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const toggleLike = (item) => {
  item.isLiked = !item.isLiked;
  if (item.isLiked) {
    item.likes++;
  } else {
    item.likes--;
  }
};

const stockLabel = (stock) => {
  if (stock === 0) return 'Out of stock';
  if (stock <= 5) return 'Low stock';
  return 'In stock';
};

const stockBadgeClass = (stock) => {
  if (stock === 0) return 'bg-danger';
  if (stock <= 5) return 'bg-warning text-dark';
  return 'bg-success';
};

const stockBarClass = (stock) => {
  if (stock === 0) return 'bg-danger';
  if (stock <= 5) return 'bg-warning';
  return 'bg-success';
};

// Lifecycle hooks
onMounted(() => {
  // Get 4 random products for featured section
  const shuffled = [...productsData].sort(() => 0.5 - Math.random());
  featuredProducts.value = shuffled.slice(0, 4);
  
  // Get 3 most recent news items
  latestNews.value = [...newsData]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3)
    .map(item => ({ ...item, isLiked: false }));
});
</script>
