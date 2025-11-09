"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { MenuItem } from "./MenuDashboard";

export interface OrderItem extends MenuItem {
  quantity: number;
  specialInstructions?: string;
  pickupTime?: string;
}

interface OrderModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (order: OrderItem) => void;
}

export default function OrderModal({
  item,
  isOpen,
  onClose,
  onConfirm,
}: OrderModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [pickupTime, setPickupTime] = useState("");

  const handleConfirm = () => {
    if (item && quantity > 0) {
      onConfirm({
        ...item,
        quantity,
        specialInstructions,
        pickupTime,
      });
      // Reset form
      setQuantity(1);
      setSpecialInstructions("");
      setPickupTime("");
      onClose();
    }
  };

  const handleClose = () => {
    setQuantity(1);
    setSpecialInstructions("");
    setPickupTime("");
    onClose();
  };

  if (!item) return null;

  const totalPrice = item.price * quantity;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-orange-600">
            Customize Your Order
          </DialogTitle>
          <DialogDescription>
            {item.name} - ₹{item.price}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-base font-semibold">
              Quantity
            </Label>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-10 w-10"
              >
                -
              </Button>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="text-center text-lg font-semibold w-20"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                className="h-10 w-10"
              >
                +
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions" className="text-base font-semibold">
              Special Instructions (Optional)
            </Label>
            <Textarea
              id="instructions"
              placeholder="E.g., Less spicy, Extra sauce, No onions..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pickup-time" className="text-base font-semibold">
              Pickup/Delivery Time
            </Label>
            <Input
              id="pickup-time"
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="text-lg"
            />
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span className="text-2xl text-orange-600">₹{totalPrice}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
          >
            Add to Cart
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
