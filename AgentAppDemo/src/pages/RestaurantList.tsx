import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RestaurantCard } from "@/components/RestaurantCard";
import { RestaurantListSkeleton } from "@/components/ui/skeleton-shimmer";
import { mockRestaurants } from "@/data/mockRestaurants";
import { Restaurant } from "@/types/restaurant";

const RestaurantList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = (location.state as { query?: string })?.query || "纽约排名前5的中餐馆";
  
  const [isLoading, setIsLoading] = useState(true);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRestaurants(mockRestaurants);
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="min-h-screen p-4 pb-8 max-w-lg mx-auto safe-area-bottom">
      <Button
        variant="ghost"
        size="sm"
        className="mb-3 -ml-2 text-muted-foreground hover:text-foreground hover:bg-transparent active:bg-transparent focus:bg-transparent"
        onClick={() => navigate("/")}
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        返回
      </Button>

      {isLoading ? (
        <div className="fade-in">
          <div className="mb-5">
            <p className="text-sm text-muted-foreground animate-pulse">
              智能助手正在查询餐馆信息...
            </p>
          </div>
          <RestaurantListSkeleton />
        </div>
      ) : (
        <div className="fade-in">
          <h1 className="text-xl font-semibold text-foreground mb-5 leading-relaxed">
            {query}
          </h1>
          
          <div className="space-y-3">
            {restaurants.map((restaurant, index) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
