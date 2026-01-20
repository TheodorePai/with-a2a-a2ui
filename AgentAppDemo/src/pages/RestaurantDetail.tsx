import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RestaurantDetailSkeleton } from "@/components/ui/skeleton-shimmer";
import { getRestaurantById } from "@/data/mockRestaurants";
import { Restaurant, ReservationForm } from "@/types/restaurant";
import { toast } from "sonner";

const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [form, setForm] = useState<ReservationForm>({
    partySize: 2,
    dateTime: "",
    dietaryRequirements: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (id) {
        const data = getRestaurantById(id);
        setRestaurant(data || null);
      }
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("预订成功！", {
        description: `${restaurant?.name} - ${form.partySize}人 - ${form.dateTime}`,
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen p-4 pb-8 max-w-lg mx-auto safe-area-bottom">
      <Button
        variant="ghost"
        size="sm"
        className="mb-3 -ml-2 text-muted-foreground hover:text-foreground hover:bg-transparent active:bg-transparent focus:bg-transparent"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        返回
      </Button>

      {isLoading ? (
        <div className="fade-in">
          <div className="mb-5">
            <p className="text-sm text-muted-foreground animate-pulse">
              正在获取餐馆详情...
            </p>
          </div>
          <RestaurantDetailSkeleton />
        </div>
      ) : restaurant ? (
        <div className="fade-in">
          <h1 className="text-xl font-semibold text-foreground mb-4">
            预订 {restaurant.name}
          </h1>

          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-48 sm:h-56 object-cover rounded-xl shadow-card mb-4"
          />

          <p className="text-sm text-muted-foreground mb-6">{restaurant.address}</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="partySize" className="text-sm font-medium text-foreground">
                用餐人数
              </Label>
              <Input
                id="partySize"
                type="number"
                min={1}
                max={20}
                value={form.partySize}
                onChange={(e) => setForm({ ...form, partySize: parseInt(e.target.value) || 1 })}
                className="bg-white/80 border-primary/20 rounded-xl h-12 focus:border-primary/40 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateTime" className="text-sm font-medium text-foreground">
                预订时间
              </Label>
              <Input
                id="dateTime"
                type="datetime-local"
                value={form.dateTime}
                onChange={(e) => setForm({ ...form, dateTime: e.target.value })}
                className="bg-white/80 border-primary/20 rounded-xl h-12 focus:border-primary/40 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dietary" className="text-sm font-medium text-foreground">
                饮食要求
              </Label>
              <Input
                id="dietary"
                type="text"
                value={form.dietaryRequirements}
                onChange={(e) => setForm({ ...form, dietaryRequirements: e.target.value })}
                className="bg-white/80 border-primary/20 rounded-xl h-12 focus:border-primary/40 focus:ring-primary/20"
                placeholder="如：素食、无麸质等"
              />
            </div>

            <Button
              type="submit"
              className="w-full btn-primary-gradient rounded-xl h-12 text-base font-medium mt-6"
              disabled={isSubmitting || !form.dateTime}
            >
              {isSubmitting ? "提交中..." : "确认预订"}
            </Button>
          </form>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">未找到该餐馆</p>
          <Button
            variant="outline"
            className="mt-4 rounded-xl"
            onClick={() => navigate("/restaurants")}
          >
            返回列表
          </Button>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetail;
