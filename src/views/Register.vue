
<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow">
          <div class="card-body p-4">
            <h1 class="text-center mb-4">Register</h1>
            
            <form @submit.prevent="handleRegister">
              <div v-if="error" class="alert alert-danger" role="alert">
                {{ error }}
              </div>
              
              <div class="row mb-3">
                <div class="col">
                  <label for="firstName" class="form-label">First Name</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="firstName" 
                    v-model="firstName" 
                    :class="{ 'is-invalid': firstNameError }"
                    required
                  >
                  <div v-if="firstNameError" class="invalid-feedback">
                    {{ firstNameError }}
                  </div>
                </div>
                
                <div class="col">
                  <label for="lastName" class="form-label">Last Name</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="lastName" 
                    v-model="lastName" 
                    :class="{ 'is-invalid': lastNameError }"
                    required
                  >
                  <div v-if="lastNameError" class="invalid-feedback">
                    {{ lastNameError }}
                  </div>
                </div>
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
              
              <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <input 
                  type="password" 
                  class="form-control" 
                  id="confirmPassword" 
                  v-model="confirmPassword" 
                  :class="{ 'is-invalid': confirmPasswordError }"
                  required
                >
                <div v-if="confirmPasswordError" class="invalid-feedback">
                  {{ confirmPasswordError }}
                </div>
              </div>
              
              <div class="mb-3 form-check">
                <input 
                  type="checkbox" 
                  class="form-check-input" 
                  id="termsAgreed" 
                  v-model="termsAgreed" 
                  :class="{ 'is-invalid': termsError }"
                  required
                >
                <label class="form-check-label" for="termsAgreed">
                  I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                </label>
                <div v-if="termsError" class="invalid-feedback">
                  {{ termsError }}
                </div>
              </div>
              
              <div class="d-grid">
                <button 
                  type="submit" 
                  class="btn btn-primary" 
                  :disabled="isLoading"
                >
                  <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {{ isLoading ? 'Creating account...' : 'Register' }}
                </button>
              </div>
            </form>
            
            <div class="text-center mt-3">
              <router-link to="/login" class="text-decoration-none">
                Already have an account? Login here
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// State
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const termsAgreed = ref(false);
const isLoading = ref(false);

const error = ref('');
const firstNameError = ref('');
const lastNameError = ref('');
const emailError = ref('');
const passwordError = ref('');
const confirmPasswordError = ref('');
const termsError = ref('');

// Methods
const validateForm = () => {
  let isValid = true;
  
  // Reset all errors
  firstNameError.value = '';
  lastNameError.value = '';
  emailError.value = '';
  passwordError.value = '';
  confirmPasswordError.value = '';
  termsError.value = '';
  
  // First name validation
  if (!firstName.value.trim()) {
    firstNameError.value = 'First name is required';
    isValid = false;
  }
  
  // Last name validation
  if (!lastName.value.trim()) {
    lastNameError.value = 'Last name is required';
    isValid = false;
  }
  
  // Email validation
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
  } else if (password.value.length < 8) {
    passwordError.value = 'Password must be at least 8 characters';
    isValid = false;
  }
  
  // Confirm password
  if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = 'Passwords do not match';
    isValid = false;
  }
  
  // Terms agreement
  if (!termsAgreed.value) {
    termsError.value = 'You must agree to the terms of service';
    isValid = false;
  }
  
  return isValid;
};

const handleRegister = () => {
  if (!validateForm()) return;
  
  isLoading.value = true;
  error.value = '';
  
  // Simulate API call with timeout
  setTimeout(() => {
    if (email.value === 'existing@example.com') {
      error.value = 'This email is already registered';
    } else {
      // Successful registration - in a real app, would store auth token, user data, etc.
      router.push('/login');
    }
    isLoading.value = false;
  }, 1500);
};
</script>
