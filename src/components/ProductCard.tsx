
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
    stock: number;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    
    // Reset the animation after a delay
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${product.id}`} className="block relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className={`w-full h-64 object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : ''}`}
        />
        
        {/* Stock indicator */}
        {product.stock <= 5 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            {product.stock === 0 ? 'Out of stock' : `Only ${product.stock} left!`}
          </div>
        )}
        
        {/* Category badge */}
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {product.category}
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
          
          <button 
            onClick={handleAddToCart} 
            disabled={product.stock === 0}
            className={`px-3 py-2 rounded-full flex items-center justify-center transition-all ${
              product.stock === 0 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-primary hover:bg-primary-hover text-white'
            } ${isAdding ? 'scale-90' : ''}`}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
