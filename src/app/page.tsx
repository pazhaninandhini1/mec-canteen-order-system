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
      <header className="bg-white shadow-md sticky top-0 z-40 border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-orange-600">
              🍽️ MEC Canteen
            </h1>
          </div>
          {isLoggedIn && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden sm:inline">
                Welcome, Student!
              </span>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="text-sm text-gray-600 hover:text-orange-600 font-medium"
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