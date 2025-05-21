
<template>
  <div class="container py-5">
    <h1 class="mb-4">Our Products</h1>

    <div class="row mb-4">
      <div class="col-12 col-md-4 mb-3 mb-md-0">
        <div class="input-group">
          <input 
            type="text" 
            class="form-control" 
            placeholder="Search products..." 
            v-model="searchQuery"
            @input="applyFilters"
          >
          <button class="btn btn-primary" type="button">
            <i class="bi bi-search"></i>
          </button>
        </div>
      </div>

      <div class="col-12 col-md-3 mb-3 mb-md-0">
        <select class="form-select" v-model="selectedCategory" @change="applyFilters">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <div class="col-12 col-md-3 mb-3 mb-md-0">
        <select class="form-select" v-model="sortOption" @change="applyFilters">
          <option value="default">Sort by: Featured</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="nameAZ">Name: A to Z</option>
          <option value="nameZA">Name: Z to A</option>
        </select>
      </div>

      <div class="col-12 col-md-2">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="inStockOnly" v-model="inStockOnly" @change="applyFilters">
          <label class="form-check-label" for="inStockOnly">
            In Stock Only
          </label>
        </div>
      </div>
    </div>

    <div v-if="filteredProducts.length === 0" class="text-center py-5">
      <p class="mb-3">No products found matching your criteria.</p>
      <button class="btn btn-outline-primary" @click="resetFilters">Reset Filters</button>
    </div>

    <div v-else>
      <div class="row">
        <div v-for="product in paginatedProducts" :key="product.id" class="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
          <product-card 
            :product="product" 
            @add-to-cart="addToCart"
          ></product-card>
        </div>
      </div>

      <!-- Pagination -->
      <nav v-if="totalPages > 1" class="mt-4">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Previous</a>
          </li>
          <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
            <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import productsData from '../data/products.js';

// State
const products = ref([]);
const filteredProducts = ref([]);
const searchQuery = ref('');
const selectedCategory = ref('');
const sortOption = ref('default');
const inStockOnly = ref(false);
const currentPage = ref(1);
const itemsPerPage = 8;

// Computed properties
const categories = computed(() => {
  return [...new Set(products.value.map(product => product.category))];
});

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage);
});

const paginatedProducts = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredProducts.value.slice(startIndex, endIndex);
});

// Methods
const applyFilters = () => {
  let result = [...products.value];
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query)
    );
  }
  
  // Filter by category
  if (selectedCategory.value) {
    result = result.filter(product => product.category === selectedCategory.value);
  }
  
  // Filter by stock
  if (inStockOnly.value) {
    result = result.filter(product => product.stock > 0);
  }
  
  // Sort products
  switch (sortOption.value) {
    case 'priceLow':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'priceHigh':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'nameAZ':
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'nameZA':
      result.sort((a, b) => b.name.localeCompare(a.name));
      break;
  }
  
  filteredProducts.value = result;
  currentPage.value = 1; // Reset to first page when filters change
};

const resetFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = '';
  sortOption.value = 'default';
  inStockOnly.value = false;
  applyFilters();
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    window.scrollTo(0, 0);
  }
};

const addToCart = (product) => {
  alert(`Added ${product.name} to cart!`);
  // This would normally update a cart store
};

// Lifecycle hooks
onMounted(() => {
  products.value = productsData;
  filteredProducts.value = productsData;
});
</script>
