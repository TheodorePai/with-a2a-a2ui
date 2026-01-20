import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchInput } from "@/components/SearchInput";
import { HomeSkeleton } from "@/components/ui/skeleton-shimmer";
import heroImage from "@/assets/restaurant-hero.png";

const Index = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (query: string) => {
    setIsSearching(true);
    setTimeout(() => {
      navigate("/restaurants", { state: { query } });
    }, 500);
  };

  if (isLoading) {
    return <HomeSkeleton />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 safe-area-bottom">
      <div className="flex flex-col items-center gap-6 w-full fade-in">
        <div className="relative">
          <img
            src={heroImage}
            alt="智能订餐助手"
            className={`w-72 h-48 sm:w-80 sm:h-56 object-cover rounded-2xl shadow-card transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 w-72 h-48 sm:w-80 sm:h-56 rounded-2xl bg-muted skeleton-shimmer" />
          )}
        </div>
        
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
            智能订餐助手
          </h1>
          <p className="text-sm text-muted-foreground">
            告诉我您想吃什么，为您推荐最佳餐厅
          </p>
        </div>

        <SearchInput onSearch={handleSearch} isLoading={isSearching} />

        {isSearching && (
          <p className="text-sm text-muted-foreground animate-pulse">
            正在为您搜索...
          </p>
        )}
      </div>
    </div>
  );
};

export default Index;
