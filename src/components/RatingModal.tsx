"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import StarRating from "./StarRating";
import type { OrderItem } from "./OrderModal";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  onSubmitRatings: (ratings: { itemId: string; rating: number; review?: string }[]) => void;
}

export default function RatingModal({
  isOpen,
  onClose,
  items,
  onSubmitRatings,
}: RatingModalProps) {
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [reviews, setReviews] = useState<{ [key: string]: string }>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const uniqueItems = Array.from(
    new Map(items.map((item) => [item.id, item])).values()
  );

  const currentItem = uniqueItems[currentIndex];

  const handleRatingChange = (rating: number) => {
    if (currentItem) {
      setRatings((prev) => ({ ...prev, [currentItem.id]: rating }));
    }
  };

  const handleReviewChange = (review: string) => {
    if (currentItem) {
      setReviews((prev) => ({ ...prev, [currentItem.id]: review }));
    }
  };

  const handleNext = () => {
    if (currentIndex < uniqueItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSkip = () => {
    if (currentIndex < uniqueItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const ratingsData = Object.entries(ratings).map(([itemId, rating]) => ({
      itemId,
      rating,
      review: reviews[itemId],
    }));
    onSubmitRatings(ratingsData);
    // Reset state
    setRatings({});
    setReviews({});
    setCurrentIndex(0);
    onClose();
  };

  if (!currentItem) return null;

  const currentRating = ratings[currentItem.id] || 0;
  const currentReview = reviews[currentItem.id] || "";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            Rate Your Experience 🌟
          </DialogTitle>
          <DialogDescription>
            Item {currentIndex + 1} of {uniqueItems.length}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Item Display */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg">
            <img
              src={currentItem.image}
              alt={currentItem.name}
              className="w-20 h-20 object-cover rounded-lg shadow-md"
            />
            <div>
              <h3 className="font-bold text-lg text-gray-800">{currentItem.name}</h3>
              <p className="text-sm text-gray-600">{currentItem.description}</p>
            </div>
          </div>

          {/* Star Rating */}
          <div className="text-center space-y-3">
            <p className="text-lg font-semibold text-gray-700">How was it?</p>
            <div className="flex justify-center">
              <StarRating
                rating={currentRating}
                onRatingChange={handleRatingChange}
                size="lg"
              />
            </div>
            {currentRating > 0 && (
              <p className="text-sm text-gray-600 animate-fade-in-up">
                {currentRating === 5 && "🎉 Excellent!"}
                {currentRating === 4 && "😊 Great!"}
                {currentRating === 3 && "👍 Good!"}
                {currentRating === 2 && "😐 Okay"}
                {currentRating === 1 && "😞 Could be better"}
              </p>
            )}
          </div>

          {/* Optional Review */}
          {currentRating > 0 && (
            <div className="space-y-2 animate-fade-in-up">
              <label className="text-sm font-semibold text-gray-700">
                Share your thoughts (Optional)
              </label>
              <Textarea
                placeholder="What did you like or dislike about this dish?"
                value={currentReview}
                onChange={(e) => handleReviewChange(e.target.value)}
                rows={3}
                className="resize-none"
              />
            </div>
          )}

          {/* Progress Indicator */}
          <div className="flex gap-1">
            {uniqueItems.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                  index <= currentIndex
                    ? "bg-gradient-to-r from-orange-500 to-pink-500"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleSkip}
            className="flex-1"
          >
            Skip
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentRating === 0}
            className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white disabled:opacity-50"
          >
            {currentIndex < uniqueItems.length - 1 ? "Next" : "Submit"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
