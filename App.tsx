
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './components/Footer';
import Home from './Home';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import CartView from './components/CartView';
import { Product, Category, CartItem, View } from './types';
import { products as mockProducts, categories as mockCategories } from './data/mockData';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    // Simulate fetching data
    setProducts(mockProducts);
    setCategories(mockCategories);
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView('productDetail');
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    setView('productList');
  };
  
  const handleNavigate = (targetView: View) => {
    setView(targetView);
  };
  
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    setView('cart');
  };

  const handleUpdateCartQuantity = (productId: number, quantity: number) => {
    setCart(prevCart => {
      if (quantity <= 0) {
        return prevCart.filter(item => item.id !== productId);
      }
      return prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };
  
  const renderContent = () => {
    switch (view) {
      case 'productList':
        if (selectedCategory) {
          const categoryProducts = products.filter(p => p.category === selectedCategory.name);
          return <ProductList category={selectedCategory} products={categoryProducts} onProductClick={handleProductClick} onBack={() => setView('home')} />;
        }
        return <Home categories={categories} products={products} onCategoryClick={handleCategoryClick} onProductClick={handleProductClick} />;
      case 'productDetail':
        if (selectedProduct) {
          const relatedProducts = products.filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id).slice(0, 5);
          return <ProductDetail product={selectedProduct} relatedProducts={relatedProducts} onAddToCart={handleAddToCart} onProductClick={handleProductClick} onBack={() => setView(selectedCategory ? 'productList' : 'home')} />;
        }
        return <Home categories={categories} products={products} onCategoryClick={handleCategoryClick} onProductClick={handleProductClick} />;
      case 'cart':
        return <CartView cartItems={cart} onUpdateQuantity={handleUpdateCartQuantity} onRemoveItem={handleRemoveFromCart} onContinueShopping={() => setView('home')} />;
      case 'home':
      default:
        return <Home categories={categories} products={products} onCategoryClick={handleCategoryClick} onProductClick={handleProductClick} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onNavigate={handleNavigate} cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
      <main className="flex-grow container mx-auto px-2 sm:px-4 py-4">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
