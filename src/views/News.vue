
<template>
  <div class="container py-5">
    <h1 class="mb-4">Latest News & Updates</h1>

    <!-- Search and filters -->
    <div class="row mb-4">
      <div class="col-md-6 mb-3 mb-md-0">
        <div class="input-group">
          <input 
            type="text" 
            class="form-control" 
            placeholder="Search news..." 
            v-model="searchQuery"
            @input="applyFilters"
          >
          <button class="btn btn-primary" type="button">
            <i class="bi bi-search"></i>
          </button>
        </div>
      </div>

      <div class="col-md-3 mb-3 mb-md-0">
        <select class="form-select" v-model="selectedCategory" @change="applyFilters">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <div class="col-md-3">
        <input 
          type="date" 
          class="form-control" 
          v-model="dateFilter"
          @change="applyFilters"
        >
      </div>
    </div>

    <div v-if="filteredNews.length === 0" class="text-center py-5">
      <p class="mb-3">No news articles found matching your criteria.</p>
      <button class="btn btn-outline-primary" @click="resetFilters">Reset Filters</button>
    </div>

    <div v-else class="row">
      <div v-for="item in paginatedNews" :key="item.id" class="col-md-6 col-lg-4 mb-4">
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
            <a href="#" class="text-primary" @click.prevent="readMore(item)">Read more</a>
          </div>
        </div>
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

    <!-- Article Modal -->
    <div class="modal fade" id="newsModal" tabindex="-1" aria-labelledby="newsModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content" v-if="selectedArticle">
          <div class="modal-header">
            <h5 class="modal-title" id="newsModalLabel">{{ selectedArticle.title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <img :src="selectedArticle.image" class="img-fluid rounded mb-3" alt="Article image">
            <div class="d-flex justify-content-between mb-3">
              <span class="text-muted">{{ formatDate(selectedArticle.date) }}</span>
              <span class="badge bg-secondary">{{ selectedArticle.category }}</span>
            </div>
            <p>{{ selectedArticle.content }}</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline-danger me-auto" @click="toggleLike(selectedArticle)">
              <i class="bi" :class="[selectedArticle.isLiked ? 'bi-heart-fill' : 'bi-heart']"></i>
              {{ selectedArticle.likes }}
            </button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import newsData from '../data/news.js';

// State
const news = ref([]);
const filteredNews = ref([]);
const searchQuery = ref('');
const selectedCategory = ref('');
const dateFilter = ref('');
const currentPage = ref(1);
const itemsPerPage = 6;
const selectedArticle = ref(null);
let modalInstance = null;

// Computed properties
const categories = computed(() => {
  return [...new Set(news.value.map(item => item.category))];
});

const totalPages = computed(() => {
  return Math.ceil(filteredNews.value.length / itemsPerPage);
});

const paginatedNews = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredNews.value.slice(startIndex, endIndex);
});

// Methods
const applyFilters = () => {
  let result = [...news.value];
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.content.toLowerCase().includes(query)
    );
  }
  
  // Filter by category
  if (selectedCategory.value) {
    result = result.filter(item => item.category === selectedCategory.value);
  }
  
  // Filter by date
  if (dateFilter.value) {
    const filterDate = new Date(dateFilter.value).setHours(0, 0, 0, 0);
    result = result.filter(item => {
      const itemDate = new Date(item.date).setHours(0, 0, 0, 0);
      return itemDate === filterDate;
    });
  }
  
  filteredNews.value = result;
  currentPage.value = 1; // Reset to first page when filters change
};

const resetFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = '';
  dateFilter.value = '';
  applyFilters();
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    window.scrollTo(0, 0);
  }
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

const readMore = (item) => {
  selectedArticle.value = item;
  
  // Use Bootstrap's modal API to show the modal
  if (modalInstance) {
    modalInstance.show();
  } else {
    // Initialize modal if it doesn't exist yet
    const modalElement = document.getElementById('newsModal');
    if (modalElement) {
      // Assuming Bootstrap is loaded
      modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }
};

// Lifecycle hooks
onMounted(() => {
  // Add isLiked property to each news item
  news.value = newsData.map(item => ({
    ...item,
    isLiked: false
  }));
  
  filteredNews.value = news.value;
});
</script>
