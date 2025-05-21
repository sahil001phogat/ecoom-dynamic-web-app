
<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-5">
        <div class="card shadow">
          <div class="card-body p-4">
            <h1 class="text-center mb-4">Login</h1>
            
            <form @submit.prevent="handleLogin">
              <div v-if="error" class="alert alert-danger" role="alert">
                {{ error }}
              </div>
              
              <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input 
                  type="email" 
                  class="form-control" 
                  id="email" 
                  v-model="email" 
                  :class="{ 'is-invalid': emailError }"
                  required
                >
                <div v-if="emailError" class="invalid-feedback">
                  {{ emailError }}
                </div>
              </div>
              
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input 
                  type="password" 
                  class="form-control" 
                  id="password" 
                  v-model="password" 
                  :class="{ 'is-invalid': passwordError }"
                  required
                >
                <div v-if="passwordError" class="invalid-feedback">
                  {{ passwordError }}
                </div>
              </div>
              
              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="remember" v-model="remember">
                <label class="form-check-label" for="remember">Remember me</label>
              </div>
              
              <div class="d-grid">
                <button 
                  type="submit" 
                  class="btn btn-primary" 
                  :disabled="isLoading"
                >
                  <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {{ isLoading ? 'Logging in...' : 'Login' }}
                </button>
              </div>
            </form>
            
            <div class="text-center mt-3">
              <router-link to="/register" class="text-decoration-none">
                Don't have an account? Register here
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// State
const email = ref('');
const password = ref('');
const remember = ref(false);
const isLoading = ref(false);
const error = ref('');
const emailError = ref('');
const passwordError = ref('');

// Methods
const validateForm = () => {
  let isValid = true;
  
  emailError.value = '';
  passwordError.value = '';
  
  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value) {
    emailError.value = 'Email is required';
    isValid = false;
  } else if (!emailRegex.test(email.value)) {
    emailError.value = 'Please enter a valid email address';
    isValid = false;
  }
  
  // Password validation
  if (!password.value) {
    passwordError.value = 'Password is required';
    isValid = false;
  } else if (password.value.length < 6) {
    passwordError.value = 'Password must be at least 6 characters';
    isValid = false;
  }
  
  return isValid;
};

const handleLogin = () => {
  if (!validateForm()) return;
  
  isLoading.value = true;
  error.value = '';
  
  // Simulate API call with timeout
  setTimeout(() => {
    if (email.value === 'user@example.com' && password.value === 'password') {
      // Successful login - in a real app, would store auth token, user data, etc.
      router.push('/');
    } else {
      error.value = 'Invalid email or password';
    }
    isLoading.value = false;
  }, 1500);
};
</script>
