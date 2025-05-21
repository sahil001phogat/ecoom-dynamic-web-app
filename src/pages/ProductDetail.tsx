
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import StockTracker from "@/components/StockTracker";
import ProductCard from "@/components/ProductCard";
import productsData from "@/data/products.json";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  // Simulate loading product from API
  useEffect(() => {
    // Simulate API call delay
    const fetchDelay = setTimeout(() => {
      const foundProduct = productsData.find(p => p.id === id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Get related products (same category)
        const related = productsData
          .filter(p => p.category === foundProduct.category && p.id !== id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
      
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(fetchDelay);
  }, [id]);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && product && value <= product.stock) {
      setQuantity(value);
    }
  };
  
  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    if (product && product.stock > 0) {
      // Add product to cart multiple times based on quantity
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image
        });
      }
      
      toast({
        title: "Added to cart",
        description: `${quantity} x ${product.name} added to your cart`,
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 pb-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen pt-20 pb-16 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
        <Link 
          to="/products" 
          className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-md transition-colors"
        >
          Back to Products
        </Link>
      </div>
    );
  }
  
  // Create fake image gallery (since we only have one image per product in our data)
  const productImages = [
    product.image,
    // Just using the same image multiple times for demo purposes
    product.image,
    product.image
  ];
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="flex mb-8 text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="text-gray-500 hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link to="/products" className="text-gray-500 hover:text-primary transition-colors">
                Products
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-700 font-medium truncate max-w-xs">
              {product.name}
            </li>
          </ol>
        </nav>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Product images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img 
                src={productImages[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex space-x-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product info */}
          <div>
            <span className="inline-block bg-gray-200 text-gray-700 px-3 py-1 text-sm font-medium rounded-full mb-4">
              {product.category}
            </span>
            
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            <div className="mb-6">
              <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
              {product.stock > 0 ? (
                <span className="ml-4 text-green-600">In Stock</span>
              ) : (
                <span className="ml-4 text-red-600">Out of Stock</span>
              )}
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600">{product.description}</p>
            </div>
            
            {/* Features */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Features</h3>
              <ul className="list-disc pl-5 space-y-1">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="text-gray-600">{feature}</li>
                ))}
              </ul>
            </div>
            
            {/* Add to cart section */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6">
                <div className="flex items-center border border-gray-300 rounded-md mr-0 sm:mr-4 mb-4 sm:mb-0">
                  <button 
                    onClick={decrementQuantity} 
                    className="px-3 py-2 border-r border-gray-300 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-16 text-center py-2 focus:outline-none"
                    disabled={product.stock === 0}
                  />
                  <button 
                    onClick={incrementQuantity} 
                    className="px-3 py-2 border-l border-gray-300 hover:bg-gray-100 transition-colors"
                    disabled={product.stock === 0 || quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
                
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`w-full sm:w-auto flex items-center justify-center px-6 py-3 rounded-md font-medium transition-colors ${
                    product.stock === 0 
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                      : 'bg-primary hover:bg-primary-hover text-white'
                  }`}
                >
                  <ShoppingCart className="mr-2 w-5 h-5" />
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
              
              {/* Real-time stock tracker - Special Feature */}
              <StockTracker productId={product.id} initialStock={product.stock} />
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
