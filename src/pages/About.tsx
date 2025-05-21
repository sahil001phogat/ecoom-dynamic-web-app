
import { useState } from "react";

const About = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [imageType, setImageType] = useState("mountain");
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Page header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">About ShopVue</h1>
            <p className="text-gray-600">
              Your one-stop destination for quality products and exceptional shopping experience.
            </p>
          </div>
          
          {/* Company Story */}
          <section className="mb-16">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-4">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  Founded in 2020, ShopVue was born out of a passion for delivering quality products with transparency and exceptional customer service. What started as a small online store has grown into a thriving e-commerce platform offering a diverse range of products to customers worldwide.
                </p>
                <p className="text-gray-600">
                  Our mission is simple: to make online shopping enjoyable, reliable, and transparent. We achieve this by focusing on product quality, customer satisfaction, and innovative features like our real-time stock tracker that keeps you informed about product availability.
                </p>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="ShopVue team at work" 
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </section>
          
          {/* Values */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality</h3>
                <p className="text-gray-600">
                  We meticulously select every product in our catalog to ensure it meets our high standards for quality, durability, and value.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Transparency</h3>
                <p className="text-gray-600">
                  From real-time stock updates to clear pricing and shipping policies, we believe in keeping our customers informed at every step.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-gray-600">
                  We continuously work to improve your shopping experience with features like our stock tracker and personalized recommendations.
                </p>
              </div>
            </div>
          </section>
          
          {/* Interactive Form */}
          <section className="mb-16 bg-gray-50 rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Welcome to ShopVue</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="firstName" className="block text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Choose an Image</label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="mountain"
                          name="imageType"
                          value="mountain"
                          checked={imageType === "mountain"}
                          onChange={(e) => setImageType(e.target.value)}
                          className="mr-2"
                        />
                        <label htmlFor="mountain">Mountain</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="ocean"
                          name="imageType"
                          value="ocean"
                          checked={imageType === "ocean"}
                          onChange={(e) => setImageType(e.target.value)}
                          className="mr-2"
                        />
                        <label htmlFor="ocean">Ocean</label>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-md transition-colors"
                  >
                    Submit
                  </button>
                </form>
              </div>
              
              <div>
                {formSubmitted && firstName && lastName && (
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">
                      Welcome, {firstName} {lastName}!
                    </h3>
                    <p className="mb-4">Thank you for visiting ShopVue. We hope you enjoy your shopping experience.</p>
                    
                    {imageType === "mountain" ? (
                      <img 
                        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                        alt="Mountain landscape" 
                        className="rounded-lg w-full h-48 object-cover"
                      />
                    ) : (
                      <img 
                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80" 
                        alt="Ocean landscape" 
                        className="rounded-lg w-full h-48 object-cover"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
          
          {/* Team */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-center">Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                  alt="CEO" 
                  className="w-full h-48 object-cover object-center"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">Alex Johnson</h3>
                  <p className="text-gray-600">CEO & Founder</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80" 
                  alt="COO" 
                  className="w-full h-48 object-cover object-center"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">Sarah Chen</h3>
                  <p className="text-gray-600">Chief Operations Officer</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                  alt="CTO" 
                  className="w-full h-48 object-cover object-center"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">Michael Rodriguez</h3>
                  <p className="text-gray-600">Chief Technology Officer</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
