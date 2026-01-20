import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
}

export function RatingStars({ rating, maxRating = 5 }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxRating }).map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${
            index < Math.floor(rating)
              ? "fill-rating-star text-rating-star"
              : index < rating
              ? "fill-rating-star/50 text-rating-star"
              : "fill-muted text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
}
