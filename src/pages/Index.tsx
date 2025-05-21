
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import NewsCard from '@/components/NewsCard';
import productsData from '@/data/products.json';
import newsData from '@/data/news.json';

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<typeof productsData>([]);
  const [latestNews, setLatestNews] = useState<typeof newsData>([]);

  useEffect(() => {
    // Get featured products (random selection)
    const randomProducts = [...productsData]
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
    setFeaturedProducts(randomProducts);

    // Get latest news (most recent)
    const sortedNews = [...newsData]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
    setLatestNews(sortedNews);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link 
              to="/products"
              className="text-primary hover:text-primary-hover font-medium flex items-center transition-colors"
            >
              View All Products
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="ml-2 w-5 h-5" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Shop by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Electronics Category */}
            <div className="relative rounded-lg overflow-hidden group h-64">
              <img 
                src="https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Electronics" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">Electronics</h3>
                <Link 
                  to="/products"
                  className="inline-block bg-white text-black px-4 py-2 rounded-full font-medium text-sm hover:bg-primary hover:text-white transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            
            {/* Clothing Category */}
            <div className="relative rounded-lg overflow-hidden group h-64">
              <img 
                src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80" 
                alt="Clothing" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">Clothing</h3>
                <Link 
                  to="/products"
                  className="inline-block bg-white text-black px-4 py-2 rounded-full font-medium text-sm hover:bg-primary hover:text-white transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            
            {/* Accessories Category */}
            <div className="relative rounded-lg overflow-hidden group h-64">
              <img 
                src="https://images.unsplash.com/photo-1575363287206-dd2c9c3709d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80" 
                alt="Accessories" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">Accessories</h3>
                <Link 
                  to="/products"
                  className="inline-block bg-white text-black px-4 py-2 rounded-full font-medium text-sm hover:bg-primary hover:text-white transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Promotional Banner */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:w-1/2">
              <span className="inline-block bg-white text-primary px-3 py-1 text-sm font-medium rounded-full mb-4">
                Limited Time Offer
              </span>
              <h2 className="text-3xl font-bold mb-4">Get 20% Off Your First Order</h2>
              <p className="mb-6">
                Sign up for our newsletter and receive a special discount code.
                Plus, get updates on new products and exclusive offers.
              </p>
              <Link 
                to="/register"
                className="inline-block bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors"
              >
                Sign Up Now
              </Link>
            </div>
            <div className="md:w-1/3">
              <img 
                src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Promotion" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Latest News Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Latest News</h2>
            <Link 
              to="/news"
              className="text-primary hover:text-primary-hover font-medium flex items-center transition-colors"
            >
              View All News
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="ml-2 w-5 h-5" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNews.map(news => (
              <NewsCard 
                key={news.id} 
                news={news} 
                onLikeToggle={(id, liked) => {
                  console.log(`News ${id} ${liked ? 'liked' : 'unliked'}`);
                }} 
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-white">
                    J
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">John Smith</h4>
                  <div className="flex text-yellow-400">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"The quality of products from ShopVue is exceptional. Fast shipping, great customer service, and the real-time stock tracker is a game changer!"</p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-white">
                    A
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Amy Johnson</h4>
                  <div className="flex text-yellow-400">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"I love how easy it is to navigate the website. The stock tracker feature is brilliant—I always know exactly what's available and can get notified when items are back in stock."</p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-white">
                    R
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Robert Zhang</h4>
                  <div className="flex text-yellow-400">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"This is the best online shopping experience I've had. The real-time inventory updates help me make quick decisions, and the product quality exceeds expectations every time."</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
