"use client";
import React, { useState, useMemo } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import { 
  Search, 
  ShoppingCart, 
  Star, 
  Plus, 
  Minus, 
  X, 
  User,
  ArrowLeft, CreditCard, Truck, CheckCircle,
  Grid3X3,
  List,
  SlidersHorizontal,
  Check,
  AlertCircle
} from 'lucide-react';


const mockProducts = [
  {
    id: 1,
    name: "Sapphire Eternity Necklace",
    price: 2500,
    originalPrice: 3000,
    image: "https://img.fantaskycdn.com/watermarkc9230d4013074fba79a993087b9a807b_750x.jpeg",
    category: "necklaces",
    material: "sapphire",
    rating: 4.8,
    reviews: 124,
    description: "Stunning sapphire necklace adorned with cut stones",
    inStock: true,
    discount: 17
  },
  {
    id: 2,
    name: "Vintage Zirkon Necklace",
    price: 1800,
    image: "https://img.fantaskycdn.com/b5023dc3049ac2c0cf7d33dacb730bc3_1080x.jpeg",
    category: "necklaces",
    material: "pearl",
    rating: 4.9,
    reviews: 87,
    description: "Cultured zirkon necklace with sterling pearl clasp",
    inStock: true
  },
  {
    id: 3,
    name: "Emerald Tennis Bracelet",
    price: 3200,
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
    category: "bracelets",
    material: "platinum",
    rating: 4.7,
    reviews: 56,
    description: "Premium emerald tennis bracelet in platinum setting",
    inStock: false
  },
  {
    id: 4,
    name: "Royal Blue Diamond Earrings",
    price: 950,
    originalPrice: 1200,
    image: "https://i.pinimg.com/736x/30/7b/45/307b45beff75ffbbf050e9fd17bffad8.jpg",
    material: "diamond",
    rating: 4.6,
    reviews: 203,
    description: "Delicate royal blue earrings with diamond accents",
    inStock: true,
    discount: 21
  },
  {
    id: 5,
    name: "Solid Gold Chevron Ring",
    price: 4500,
    image: "https://i.pinimg.com/1200x/60/24/86/60248641866ca378f1078ff18bfcbd99.jpg",
    category: "rings",
    material: "gold",
    rating: 4.9,
    reviews: 34,
    description: "Vintage-inspired elegant ring with intricate gold band",
    inStock: true
  },
  {
    id: 6,
    name: "Gold-Plated Cuff Bracelet",
    price: 2200,
    image: "https://i.pinimg.com/1200x/89/d7/9c/89d79c29064eb10e823403b9e322d39d.jpg",
    category: "bracelets",
    material: "gold",
    rating: 4.8,
    reviews: 91,
    description: "Elegant gold-plated cuff bracelet with modern design",
    inStock: true
  }
];

export default function JewelryCollectionPage() {
  const { user, isSignedIn } = useUser();
  const { redirectToSignIn } = useClerk();
  type Product = typeof mockProducts[number];
  type CartItem = Product & { quantity: number };
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Checkout states
  const [checkoutStep, setCheckoutStep] = useState('cart');
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [loading, setLoading] = useState(false);
  type Errors = {
    firstName?: string;
    lastName?: string;
    email?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
    cardName?: string;
    [key: string]: string | undefined;
  };
  const [errors, setErrors] = useState<Errors>({});

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZipCode: '',
    sameAsShipping: true
  });

  // Notification state
  const [notifications, setNotifications] = useState<{ id: number; message: string; type: 'success' | 'error' }[]>([]);

  
  const addNotification = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(notif => notif.id !== id));
    }, 3000);
  };
  
  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesMaterial = selectedMaterial === 'all' || product.material === selectedMaterial;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesMaterial && matchesPrice;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price);
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return filtered.sort((a, b) => b.id - a.id);
      default:
        return filtered;
    }
  }, [searchQuery, selectedCategory, selectedMaterial, priceRange, sortBy]);

  const handleAddToCart = (product: Product) => {
    if (!isSignedIn) {
      redirectToSignIn();
      return;
    }
    
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
      addNotification(`${product.name} quantity updated in cart`);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      addNotification(`${product.name} added to cart`);
    }
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart(cart.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const shippingCost = cartTotal > 5000 ? 0 : 50;
  const tax = cartTotal * 0.08;
  const finalTotal = cartTotal + shippingCost + tax;

  
  const isInCart = (productId: number) => cart.some(item => item.id === productId);

  // Checkout functions
  const validateShipping = () => {
    const newErrors: Errors = {};
    if (!shippingInfo.firstName) newErrors.firstName = 'First name is required';
    if (!shippingInfo.lastName) newErrors.lastName = 'Last name is required';
    if (!shippingInfo.email) newErrors.email = 'Email is required';
    if (!shippingInfo.address) newErrors.address = 'Address is required';
    if (!shippingInfo.city) newErrors.city = 'City is required';
    if (!shippingInfo.state) newErrors.state = 'State is required';
    if (!shippingInfo.zipCode) newErrors.zipCode = 'ZIP code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors: Errors = {};
    if (!paymentInfo.cardNumber || paymentInfo.cardNumber.length < 16) {
      newErrors.cardNumber = 'Valid card number is required';
    }
    if (!paymentInfo.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    if (!paymentInfo.cvv || paymentInfo.cvv.length < 3) newErrors.cvv = 'Valid CVV is required';
    if (!paymentInfo.cardName) newErrors.cardName = 'Cardholder name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToShipping = () => {
    if (cart.length === 0) return;
    setCheckoutStep('shipping');
  };

  const handleProceedToPayment = () => {
    if (validateShipping()) {
      setCheckoutStep('payment');
    }
  };

  const handleCompleteOrder = async () => {
    if (!validatePayment()) return;
    
    setLoading(true);
    
    
    setTimeout(() => {
      const newOrderNumber = 'ORD' + Date.now();
      setOrderNumber(newOrderNumber);
      setOrderComplete(true);
      setCheckoutStep('confirmation');
      setCart([]);
      setLoading(false);
      addNotification('Order placed successfully!', 'success');
    }, 2000);
  };

  const handleInputChange = (section: string, field: string, value: string) => {
    if (section === 'shipping') {
      setShippingInfo(prev => ({ ...prev, [field]: value }));
    } else if (section === 'payment') {
      setPaymentInfo(prev => ({ ...prev, [field]: value }));
    }
    
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value);
    if (formatted.replace(/\s/g, '').length <= 16) {
      handleInputChange('payment', 'cardNumber', formatted);
    }
  };

  return (
    <div className="collection-page">
    <div className="min-h-screen bg-gradient-to-br relative overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed" style={{backgroundImage: "url('https://i.pinimg.com/736x/67/ec/a1/67eca13d434e8c5717066ed70cd244a3.jpg')"}}>
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-[80] space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${
              notification.type === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}
          >
            {notification.type === 'success' ? (
              <Check className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">{notification.message}</span>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        {/* Search, Filters, and Cart */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search luxury jewelry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-transparent placeholder-white text-white bg-transparent"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-amber-800 transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5 text-white" />
              <span className="text-white">Filters</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setShowCart(true)}
              className="relative flex items-center space-x-2 px-6 py-3 bg-white hover:bg-amber-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
            
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="rings">Rings</option>
                    <option value="necklaces">Necklaces</option>
                    <option value="earrings">Earrings</option>
                    <option value="bracelets">Bracelets</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
                  <select
                    value={selectedMaterial}
                    onChange={(e) => setSelectedMaterial(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="all">All Materials</option>
                    <option value="gold">Gold</option>
                    <option value="sapphire">Sapphire</option>
                    <option value="diamond">Diamond</option>
                    <option value="platinum">Platinum</option>
                    <option value="pearl">Pearl</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-purple-100 text-amber-600' : 'text-gray-400'}`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-purple-100 text-amber-600' : 'text-gray-400'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}`}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={`bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden ${viewMode === 'list' ? 'flex' : ''}`}>
              <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.discount && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-medium">
                    -{product.discount}%
                  </div>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-medium">Out of Stock</span>
                  </div>
                )}
              </div>
              
              <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">{product.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">${product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{product.reviews} reviews</span>
                </div>
                
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className={`w-full py-2 px-4 rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2 ${
                    isInCart(product.id) 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-amber-600 hover:bg-amber-700 text-white'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>
                    {!product.inStock 
                      ? 'Out of Stock' 
                      : isInCart(product.id) 
                      ? 'Added to Cart' 
                      : 'Add to Cart'
                    }
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No products found</h3>
            <p className="text-gray-200">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Cart Modal with Complete Checkout */}
      {showCart && (
        <div className="fixed inset-0 bg-gradient-to-r from-black via-amber-800 to-gray-700 bg-opacity-80 flex items-center justify-end z-[60]">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto relative z-[70]">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {checkoutStep !== 'cart' && checkoutStep !== 'confirmation' && (
                    <button
                      onClick={() => {
                        if (checkoutStep === 'shipping') setCheckoutStep('cart');
                        if (checkoutStep === 'payment') setCheckoutStep('shipping');
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                  )}
                  <h2 className="text-xl font-bold text-gray-900">
                    {checkoutStep === 'cart' && 'Shopping Cart'}
                    {checkoutStep === 'shipping' && 'Shipping Information'}
                    {checkoutStep === 'payment' && 'Payment Details'}
                    {checkoutStep === 'confirmation' && 'Order Confirmed'}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setShowCart(false);
                    setCheckoutStep('cart');
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Cart Step */}
              {checkoutStep === 'cart' && (
                <>
                  {cart.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Your cart is empty</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4 mb-6">
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
                              <p className="text-amber-600 font-bold">${item.price.toLocaleString()}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <button
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                  className="p-1 text-gray-400 hover:text-gray-600"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="text-sm font-medium">{item.quantity}</span>
                                <button
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                  className="p-1 text-gray-400 hover:text-gray-600"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            <button
                              onClick={() => handleRemoveFromCart(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4 space-y-2">
                        <div className="flex justify-between text-gray-600">
                          <span>Subtotal:</span>
                          <span>${cartTotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Shipping:</span>
                          <span>{shippingCost === 0 ? 'Free' : `$${shippingCost}`}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Tax:</span>
                          <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                          <span>Total:</span>
                          <span>${finalTotal.toFixed(2)}</span>
                        </div>
                        <button
                          onClick={handleProceedToShipping}
                          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors mt-4"
                        >
                          Proceed to Checkout
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}

              {/* Shipping Step */}
              {checkoutStep === 'shipping' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        value={shippingInfo.firstName}
                        onChange={(e) => handleInputChange('shipping', 'firstName', e.target.value)}
                        className={`w-full p-3 border rounded-lg ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        value={shippingInfo.lastName}
                        onChange={(e) => handleInputChange('shipping', 'lastName', e.target.value)}
                        className={`w-full p-3 border rounded-lg ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                        />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={shippingInfo.email}
                  onChange={(e) => handleInputChange('shipping', 'email', e.target.value)}
                  className={`w-full p-3 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={shippingInfo.phone}
                  onChange={(e) => handleInputChange('shipping', 'phone', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={shippingInfo.address}
                  onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
                  className={`w-full p-3 border rounded-lg ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={shippingInfo.city}
                    onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                    className={`w-full p-3 border rounded-lg ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    value={shippingInfo.state}
                    onChange={(e) => handleInputChange('shipping', 'state', e.target.value)}
                    className={`w-full p-3 border rounded-lg ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                <input
                  type="text"
                  value={shippingInfo.zipCode}
                  onChange={(e) => handleInputChange('shipping', 'zipCode', e.target.value)}
                  className={`w-full p-3 border rounded-lg ${errors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
              </div>
              
              <button
                onClick={handleProceedToPayment}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors mt-6"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {/* Payment Step */}
          {checkoutStep === 'payment' && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Order Summary</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>{shippingCost === 0 ? 'Free' : `$${shippingCost}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base pt-2 border-t">
                    <span>Total:</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input
                  type="text"
                  value={paymentInfo.cardNumber}
                  onChange={(e) => handleCardNumberChange(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className={`w-full p-3 border rounded-lg ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    value={paymentInfo.expiryDate}
                    onChange={(e) => handleInputChange('payment', 'expiryDate', e.target.value)}
                    placeholder="MM/YY"
                    className={`w-full p-3 border rounded-lg ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input
                    type="text"
                    value={paymentInfo.cvv}
                    onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                    placeholder="123"
                    maxLength={4}
                    className={`w-full p-3 border rounded-lg ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                <input
                  type="text"
                  value={paymentInfo.cardName}
                  onChange={(e) => handleInputChange('payment', 'cardName', e.target.value)}
                  className={`w-full p-3 border rounded-lg ${errors.cardName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
              </div>
              
              <button
                onClick={handleCompleteOrder}
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Complete Order
                  </>
                )}
              </button>
            </div>
          )}

          {/* Confirmation Step */}
          {checkoutStep === 'confirmation' && (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h3>
              <p className="text-gray-600 mb-4">Thank you for your purchase</p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600">Order Number</p>
                <p className="text-lg font-bold text-gray-900">{orderNumber}</p>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-center">
                  <Truck className="w-4 h-4 mr-2" />
                  <span>Estimated delivery: 3-5 business days</span>
                </div>
                <p>A confirmation email has been sent to {shippingInfo.email}</p>
              </div>
              <button
                onClick={() => setShowCart(false)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors mt-6"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )}
  </div>
  </div>
  )}
