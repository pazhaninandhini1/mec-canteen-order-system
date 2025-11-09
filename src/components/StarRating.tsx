"use client";

import { useState } from "react";

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
}

export default function StarRating({
  rating,
  onRatingChange,
  readonly = false,
  size = "md",
  showNumber = false,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: "text-sm",
    md: "text-xl",
    lg: "text-3xl",
  };

  const handleClick = (index: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(index);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((index) => {
        const filled = index <= (hoverRating || rating);
        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(index)}
            onMouseEnter={() => !readonly && setHoverRating(index)}
            onMouseLeave={() => !readonly && setHoverRating(0)}
            className={`${sizeClasses[size]} ${
              readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
            } transition-transform duration-150`}
            disabled={readonly}
          >
            <span
              className={
                filled
                  ? "text-yellow-400 drop-shadow-sm"
                  : "text-gray-300"
              }
            >
              ★
            </span>
          </button>
        );
      })}
      {showNumber && (
        <span className="ml-1 text-sm font-semibold text-gray-600">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
