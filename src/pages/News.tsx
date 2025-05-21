
import { useState, useEffect } from "react";
import NewsCard from "@/components/NewsCard";
import newsData from "@/data/news.json";
import { Search } from "lucide-react";

const News = () => {
  const [news, setNews] = useState(newsData);
  const [filteredNews, setFilteredNews] = useState(newsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  const newsPerPage = 6;
  
  // Get unique categories
  const categories = [...new Set(newsData.map(item => item.category))];
  
  // Filter news when filters change
  useEffect(() => {
    let result = newsData;
    
    // Filter by search query (checks title and content)
    if (searchQuery) {
      result = result.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      result = result.filter(item => item.category === selectedCategory);
    }
    
    // Filter by date range
    if (startDate) {
      const start = new Date(startDate);
      result = result.filter(item => new Date(item.date) >= start);
    }
    
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // Set to end of day
      result = result.filter(item => new Date(item.date) <= end);
    }
    
    setFilteredNews(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, selectedCategory, startDate, endDate]);
  
  // Calculate pagination
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);
  
  const totalPages = Math.ceil(filteredNews.length / newsPerPage);
  
  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      // Scroll to top of news grid
      document.getElementById("news-grid")?.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the useEffect, this just prevents form submission
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setStartDate("");
    setEndDate("");
    setFilteredNews(newsData);
  };
  
  // Handle like toggle
  const handleLikeToggle = (id: string, liked: boolean) => {
    // In a real app, this would update the backend
    console.log(`News ${id} ${liked ? 'liked' : 'unliked'}`);
  };
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Page header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Latest News</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest news, announcements, and articles from ShopVue.
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
                    placeholder="Search news..."
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
              
              {/* Date Range */}
              <div className="mb-6">
                <h3 className="text-md font-medium mb-2">Date Range</h3>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="start-date" className="block text-sm text-gray-600 mb-1">
                      From
                    </label>
                    <input
                      type="date"
                      id="start-date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="end-date" className="block text-sm text-gray-600 mb-1">
                      To
                    </label>
                    <input
                      type="date"
                      id="end-date"
                      value={endDate}
                      min={startDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
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
          
          {/* News grid */}
          <div className="lg:w-3/4">
            {/* Results count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredNews.length} {filteredNews.length === 1 ? 'article' : 'articles'}
              </p>
            </div>
            
            {filteredNews.length > 0 ? (
              <>
                {/* News grid */}
                <div id="news-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentNews.map(newsItem => (
                    <NewsCard 
                      key={newsItem.id} 
                      news={newsItem} 
                      onLikeToggle={handleLikeToggle} 
                    />
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
                <h3 className="text-xl font-semibold mb-2">No news found</h3>
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

export default News;
