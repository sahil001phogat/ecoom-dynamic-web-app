
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Menu, ShoppingCart, User, Search, X } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would navigate to search results
    console.log("Searching for:", searchQuery);
    setSearchQuery("");
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            ShopVue
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/products" className="hover:text-primary transition-colors">
              Products
            </Link>
            <Link to="/news" className="hover:text-primary transition-colors">
              News
            </Link>
            <Link to="/about" className="hover:text-primary transition-colors">
              About
            </Link>
          </div>

          {/* Search, Cart, Account */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-4 py-1 rounded-full border border-gray-200 focus:outline-none focus:border-primary transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </form>

            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-1">
                  <User className="w-6 h-6" />
                  <span className="text-sm">{user?.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="p-3 border-b text-sm text-gray-600">
                    Signed in as <span className="font-medium">{user?.email}</span>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="flex items-center space-x-1">
                <User className="w-6 h-6" />
                <span className="text-sm">Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Link>
            <button onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg mt-2 animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-8 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:border-primary transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </form>
              
              <Link to="/" className="py-2 hover:text-primary transition-colors" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/products" className="py-2 hover:text-primary transition-colors" onClick={toggleMenu}>
                Products
              </Link>
              <Link to="/news" className="py-2 hover:text-primary transition-colors" onClick={toggleMenu}>
                News
              </Link>
              <Link to="/about" className="py-2 hover:text-primary transition-colors" onClick={toggleMenu}>
                About
              </Link>
              
              {isAuthenticated ? (
                <div className="border-t pt-2">
                  <div className="py-2 text-gray-600">
                    Signed in as <span className="font-medium">{user?.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                    className="py-2 text-primary"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <Link to="/login" className="py-2 text-primary" onClick={toggleMenu}>
                  Sign In / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
