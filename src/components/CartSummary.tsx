"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { OrderItem } from "./OrderModal";

interface CartSummaryProps {
  items: OrderItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}

export default function CartSummary({
  items,
  onRemoveItem,
  onClearCart,
  onCheckout,
}: CartSummaryProps) {
  const [showThankYou, setShowThankYou] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (items.length > 0) {
      setShowThankYou(true);
      setTimeout(() => {
        setShowThankYou(false);
        onCheckout();
      }, 2000);
    }
  };

  return (
    <>
      {/* Floating Cart Button */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-2xl z-50 flex items-center justify-center"
            size="icon"
          >
            <div className="relative">
              <span className="text-2xl">🛒</span>
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white flex items-center justify-center p-0">
                  {totalItems}
                </Badge>
              )}
            </div>
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold text-orange-600">
              🛒 Your Cart
            </SheetTitle>
            <SheetDescription>
              {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
            </SheetDescription>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <span className="text-6xl mb-4">🍽️</span>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-500">
                Add some delicious items from the menu!
              </p>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <ScrollArea className="flex-1 pr-4 mt-6">
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <Card key={`${item.id}-${index}`} className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Qty: {item.quantity} × ₹{item.price}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          ✕
                        </Button>
                      </div>

                      {item.specialInstructions && (
                        <p className="text-xs text-gray-500 mb-1">
                          📝 {item.specialInstructions}
                        </p>
                      )}

                      {item.pickupTime && (
                        <p className="text-xs text-gray-500">
                          🕐 Pickup: {item.pickupTime}
                        </p>
                      )}

                      <p className="text-right font-semibold text-orange-600 mt-2">
                        ₹{item.price * item.quantity}
                      </p>
                    </Card>
                  ))}
                </div>
              </ScrollArea>

              <div className="border-t pt-4 mt-4 space-y-4">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-orange-600">
                      ₹{totalPrice}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full bg-green-500 hover:bg-green-600 text-white h-12 text-lg font-semibold"
                >
                  Checkout 🎉
                </Button>

                <Button
                  variant="outline"
                  onClick={onClearCart}
                  className="w-full"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Thank You Dialog */}
      <Dialog open={showThankYou} onOpenChange={setShowThankYou}>
        <DialogContent className="max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="text-center">
              <span className="text-6xl mb-4 block">🎉</span>
              <span className="text-3xl font-bold text-green-600">
                Thank You!
              </span>
            </DialogTitle>
            <DialogDescription className="text-lg pt-4">
              Your order has been placed successfully!
              <br />
              <br />
              Total: <span className="font-bold text-orange-600">₹{totalPrice}</span>
              <br />
              <br />
              We'll have it ready for you soon! 😊
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}