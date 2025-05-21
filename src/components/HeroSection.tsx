
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative h-screen mb-12">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80')" 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
      </div>
      
      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-xl">
            <span className="inline-block bg-primary text-white px-3 py-1 text-sm font-medium rounded-full mb-4">
              New Collection
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Discover Your Perfect Style
            </h1>
            <p className="text-lg text-gray-200 mb-8">
              Explore our curated collection of premium products designed to elevate your lifestyle.
              Shop the latest trends and timeless classics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/products" 
                className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-md font-medium flex items-center justify-center transition-colors"
              >
                Shop Now <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                to="/about" 
                className="bg-transparent border border-white text-white px-6 py-3 rounded-md font-medium flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <button 
          onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})}
          className="flex flex-col items-center text-white animate-bounce"
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
