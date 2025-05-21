
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const handleQuantityChange = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login or register to checkout",
        variant: "destructive",
      });
      return;
    }
    
    if (items.length === 0) {
      toast({
        title: "Empty cart",
        description: "Your cart is empty. Add items before checkout.",
        variant: "destructive",
      });
      return;
    }
    
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      toast({
        title: "Order placed",
        description: "Your order has been successfully placed!",
      });
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
        
        {items.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 text-left">
                      <tr>
                        <th className="py-3 px-4">Product</th>
                        <th className="py-3 px-4">Price</th>
                        <th className="py-3 px-4">Quantity</th>
                        <th className="py-3 px-4">Total</th>
                        <th className="py-3 px-4 sr-only">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {items.map(item => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="ml-4">
                                <Link to={`/products/${item.id}`} className="font-medium hover:text-primary">
                                  {item.name}
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            ${item.price.toFixed(2)}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <button 
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="border border-gray-300 rounded-l-md px-3 py-1 hover:bg-gray-100"
                              >
                                -
                              </button>
                              <span className="border-t border-b border-gray-300 px-3 py-1 min-w-[40px] text-center">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="border border-gray-300 rounded-r-md px-3 py-1 hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                          <td className="py-4 px-4">
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-5 w-5" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                              >
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={2} 
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <Link 
                  to="/products" 
                  className="flex items-center text-primary hover:text-primary-hover"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M11 17l-5-5m0 0l5-5m-5 5h12" 
                    />
                  </svg>
                  Continue Shopping
                </Link>
                
                <button 
                  onClick={clearCart}
                  className="text-gray-600 hover:text-gray-800 flex items-center"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                    />
                  </svg>
                  Clear Cart
                </button>
              </div>
            </div>
            
            {/* Order summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <div className="flex justify-between mb-3">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-3">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(totalPrice * 0.07).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between mb-6">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">${(totalPrice + (totalPrice * 0.07)).toFixed(2)}</span>
                </div>
                
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut || items.length === 0}
                  className={`w-full py-3 px-4 rounded-md font-medium text-center ${
                    isCheckingOut || items.length === 0
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                      : 'bg-primary hover:bg-primary-hover text-white transition-colors'
                  }`}
                >
                  {isCheckingOut ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </button>
                
                {!isAuthenticated && (
                  <div className="mt-4 text-red-500 text-sm">
                    Please <Link to="/login" className="underline">login</Link> or <Link to="/register" className="underline">register</Link> to checkout.
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-gray-400 mb-6">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-20 w-20 mx-auto" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1} 
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link 
              to="/products" 
              className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-md transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
