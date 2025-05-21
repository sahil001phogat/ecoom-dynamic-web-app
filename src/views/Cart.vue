
<template>
  <div class="container py-5">
    <h1 class="mb-4">Shopping Cart</h1>

    <div v-if="cartItems.length === 0" class="text-center py-5">
      <i class="bi bi-cart-x fs-1 text-muted mb-3"></i>
      <h2>Your cart is empty</h2>
      <p class="mb-4">Looks like you haven't added any items to your cart yet.</p>
      <router-link to="/products" class="btn btn-primary">
        Start Shopping
      </router-link>
    </div>

    <div v-else>
      <div class="row">
        <div class="col-lg-8 mb-4 mb-lg-0">
          <div class="card">
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in cartItems" :key="index">
                      <td>
                        <div class="d-flex align-items-center">
                          <img :src="item.image" :alt="item.name" class="me-3" width="60">
                          <div>
                            <h6 class="mb-0">{{ item.name }}</h6>
                          </div>
                        </div>
                      </td>
                      <td>${{ formatPrice(item.price) }}</td>
                      <td>
                        <div class="input-group" style="width: 100px;">
                          <button 
                            @click="updateQuantity(index, item.quantity - 1)" 
                            class="btn btn-sm btn-outline-secondary" 
                            :disabled="item.quantity <= 1"
                          >−</button>
                          <input 
                            type="number" 
                            class="form-control form-control-sm text-center" 
                            v-model.number="item.quantity" 
                            min="1"
                          >
                          <button 
                            @click="updateQuantity(index, item.quantity + 1)" 
                            class="btn btn-sm btn-outline-secondary"
                          >+</button>
                        </div>
                      </td>
                      <td>${{ formatPrice(item.price * item.quantity) }}</td>
                      <td>
                        <button 
                          @click="removeItem(index)" 
                          class="btn btn-sm btn-outline-danger"
                        >
                          <i class="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="card-footer d-flex justify-content-between">
              <router-link to="/products" class="btn btn-outline-primary">
                <i class="bi bi-arrow-left me-1"></i> Continue Shopping
              </router-link>
              <button @click="clearCart" class="btn btn-outline-secondary">
                <i class="bi bi-x-circle me-1"></i> Clear Cart
              </button>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="card">
            <div class="card-header bg-white">
              <h5 class="mb-0">Order Summary</h5>
            </div>
            <div class="card-body">
              <div class="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${{ formatPrice(subtotal) }}</span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span>Tax (7%):</span>
                <span>${{ formatPrice(tax) }}</span>
              </div>
              <hr>
              <div class="d-flex justify-content-between mb-4">
                <span class="fw-bold">Total:</span>
                <span class="fw-bold">${{ formatPrice(total) }}</span>
              </div>
              <button 
                @click="checkout" 
                class="btn btn-primary w-100"
                :disabled="isCheckingOut"
              >
                <span v-if="isCheckingOut" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                {{ isCheckingOut ? 'Processing...' : 'Proceed to Checkout' }}
              </button>
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
const cartItems = ref([
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300',
    quantity: 1
  },
  {
    id: '3',
    name: 'Leather Wallet',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=300',
    quantity: 2
  }
]);
const isCheckingOut = ref(false);

// Computed properties
const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
});

const tax = computed(() => {
  return subtotal.value * 0.07;
});

const total = computed(() => {
  return subtotal.value + tax.value;
});

// Methods
const formatPrice = (price) => {
  return price.toFixed(2);
};

const updateQuantity = (index, newQuantity) => {
  if (newQuantity < 1) return;
  cartItems.value[index].quantity = newQuantity;
};

const removeItem = (index) => {
  cartItems.value.splice(index, 1);
};

const clearCart = () => {
  cartItems.value = [];
};

const checkout = () => {
  isCheckingOut.value = true;
  
  // Simulate checkout process
  setTimeout(() => {
    alert('Order placed successfully!');
    cartItems.value = [];
    isCheckingOut.value = false;
  }, 2000);
};
</script>
