
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface StockTrackerProps {
  productId: string;
  initialStock: number;
}

// This is our special feature component that shows real-time stock updates
const StockTracker = ({ productId, initialStock }: StockTrackerProps) => {
  const [stock, setStock] = useState(initialStock);
  const [watching, setWatching] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const { toast } = useToast();

  // Simulate real-time stock updates
  useEffect(() => {
    if (initialStock <= 0) return;

    const interval = setInterval(() => {
      // Randomly decide if we should decrease stock (simulate purchases)
      if (Math.random() > 0.7 && stock > 0) {
        const decrease = Math.floor(Math.random() * 2) + 1; // Decrease by 1 or 2
        const newStock = Math.max(0, stock - decrease);
        setStock(newStock);
        
        // If stock becomes low or zero, show a toast notification
        if (newStock === 0) {
          toast({
            title: "Sold out!",
            description: "This item is now out of stock.",
            variant: "destructive",
          });
        } else if (newStock <= 5 && newStock > 0) {
          toast({
            title: "Hurry!",
            description: `Only ${newStock} units left in stock!`,
            variant: "default",
          });
        }
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [stock, initialStock, toast]);

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setEmailError('');
    setWatching(true);
    toast({
      title: "Stock Alert Set",
      description: "We'll notify you when this item is back in stock.",
    });
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
      <h3 className="text-lg font-semibold mb-2">Real-Time Stock Tracker</h3>
      
      <div className="flex items-center mb-3">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className={`h-3 rounded-full ${
              stock === 0 ? 'bg-red-500' :
              stock < 5 ? 'bg-orange-500' :
              stock < 10 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(100, (stock / initialStock) * 100)}%` }}
          ></div>
        </div>
        <span className="ml-3 font-medium">{stock}</span>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        {stock === 0 
          ? "Currently out of stock. Sign up for restock alerts." 
          : stock < 5 
            ? "Hurry! Only a few items left!" 
            : "In stock and ready to ship."}
      </p>
      
      {stock === 0 && !watching ? (
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Get notified when back in stock:
            </label>
            <input
              type="email"
              id="email"
              className={`mt-1 block w-full px-3 py-2 border ${
                emailError ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="mt-1 text-sm text-red-500">{emailError}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-hover text-white py-2 px-4 rounded-md transition-colors"
          >
            Notify Me
          </button>
        </form>
      ) : watching ? (
        <div className="text-sm text-green-600 font-medium">
          You'll be notified when this item is back in stock.
        </div>
      ) : null}
    </div>
  );
};

export default StockTracker;
