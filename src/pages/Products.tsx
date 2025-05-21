
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import productsData from "@/data/products.json";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState(productsData);
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const { toast } = useToast();
  
  const productsPerPage = 8;
  
  // Get unique categories
  const categories = [...new Set(productsData.map(product => product.category))];
  
  // Filter products when filters change
  useEffect(() => {
    let result = productsData;
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter by price range
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Filter by stock
    if (inStockOnly) {
      result = result.filter(product => product.stock > 0);
    }
    
    // Sort products
    switch (sortOption) {
      case "priceLow":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "priceHigh":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "nameAZ":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameZA":
        result = [...result].sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Default sorting (newest)
        break;
    }
    
    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, selectedCategory, sortOption, priceRange, inStockOnly]);
  
  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      // Scroll to top of product grid
      document.getElementById("product-grid")?.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (filteredProducts.length === 0) {
      toast({
        title: "No results found",
        description: "Try adjusting your filters for better results",
      });
    } else if (filteredProducts.length < 3) {
      toast({
        title: "Limited results",
        description: `Found ${filteredProducts.length} products matching your criteria`,
      });
    }
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSortOption("default");
    setPriceRange([0, 1000]);
    setInStockOnly(false);
    setFilteredProducts(productsData);
  };
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Page header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our collection of high-quality products. Use the filters to find exactly what you're looking for.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter sidebar */}
          <div className="lg:w-1/4 space-y-6">
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              
              {/* Search */}
              <div className="mb-6">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </form>
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-md font-medium mb-2">Categories</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="all-categories"
                      name="category"
                      checked={selectedCategory === ""}
                      onChange={() => setSelectedCategory("")}
                      className="mr-2"
                    />
                    <label htmlFor="all-categories">All Categories</label>
                  </div>
                  
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <input
                        type="radio"
                        id={category}
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="mr-2"
                      />
                      <label htmlFor={category}>{category}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-md font-medium mb-2">Price Range</h3>
                <div className="flex justify-between mb-2 text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full"
                />
              </div>
              
              {/* In Stock Only */}
              <div className="mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="in-stock"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="in-stock">In Stock Only</label>
                </div>
              </div>
              
              {/* Reset Filters */}
              <button
                onClick={resetFilters}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
          
          {/* Product grid */}
          <div className="lg:w-3/4">
            {/* Sort and results count */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <p className="text-gray-600 mb-4 md:mb-0">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
              
              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2">Sort by:</label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="default">Featured</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="nameAZ">Name: A to Z</option>
                  <option value="nameZA">Name: Z to A</option>
                </select>
              </div>
            </div>
            
            {filteredProducts.length > 0 ? (
              <>
                {/* Product grid */}
                <div id="product-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-10">
                    <nav className="flex items-center space-x-1">
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === 1 
                            ? 'text-gray-400 cursor-not-allowed' 
                            : 'text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Previous
                      </button>
                      
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => paginate(i + 1)}
                          className={`px-3 py-1 rounded-md ${
                            currentPage === i + 1 
                              ? 'bg-primary text-white' 
                              : 'text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === totalPages 
                            ? 'text-gray-400 cursor-not-allowed' 
                            : 'text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search query to find what you're looking for.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-primary hover:bg-primary-hover text-white py-2 px-6 rounded-md transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
