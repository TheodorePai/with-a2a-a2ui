import { Restaurant } from "@/types/restaurant";
import { RatingStars } from "./RatingStars";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface RestaurantCardProps {
  restaurant: Restaurant;
  index: number;
}

export function RestaurantCard({ restaurant, index }: RestaurantCardProps) {
  const navigate = useNavigate();

  return (
    <div 
      className="card-elevated p-3 flex gap-3 slide-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="w-24 h-20 sm:w-28 sm:h-24 object-cover rounded-xl flex-shrink-0"
      />
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          <h3 className="font-medium text-base text-foreground truncate">
            {restaurant.name}
          </h3>
          <RatingStars rating={restaurant.rating} />
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {restaurant.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            更多信息
          </button>
          <Button
            size="sm"
            className="btn-primary-gradient rounded-full px-4 h-8 text-xs font-medium"
            onClick={() => navigate(`/restaurant/${restaurant.id}`)}
          >
            立即预订
            <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
