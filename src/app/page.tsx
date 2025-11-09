"use client";

import { useState, useEffect } from "react";
import LoginPage from "@/components/LoginPage";
import MenuDashboard from "@/components/MenuDashboard";
import OrderModal from "@/components/OrderModal";
import CartSummary from "@/components/CartSummary";
import type { MenuItem } from "@/components/MenuDashboard";
import type { OrderItem } from "@/components/OrderModal";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("mecCanteenCart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("mecCanteenCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleOrderClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleConfirmOrder = (order: OrderItem) => {
    setCartItems([...cartItems, order]);
  };

  const handleRemoveItem = (id: string) => {
    const index = cartItems.findIndex((item) => item.id === id);
    if (index !== -1) {
      const newCart = [...cartItems];
      newCart.splice(index, 1);
      setCartItems(newCart);
    }
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-40 border-b-4 border-gradient-to-r from-orange-500 to-pink-500">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl animate-bounce-slow">🍽️</span>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              MEC Canteen
            </h1>
          </div>
          {isLoggedIn && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700 hidden sm:inline font-medium px-4 py-2 bg-gradient-to-r from-orange-100 to-pink-100 rounded-full">
                👋 Welcome, Student!
              </span>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="text-sm text-gray-700 hover:text-orange-600 font-semibold px-4 py-2 rounded-lg hover:bg-orange-50 transition-all duration-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <>
          <MenuDashboard onOrderClick={handleOrderClick} />
          <OrderModal
            item={selectedItem}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirmOrder}
          />
          <CartSummary
            items={cartItems}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
          />
        </>
      )}
    </div>
  );
}