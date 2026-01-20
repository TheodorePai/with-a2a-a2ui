import { Restaurant } from "@/types/restaurant";

export const mockRestaurants: Restaurant[] = [
  {
    id: "xian-famous-foods",
    name: "Xi'an Famous Foods",
    rating: 4,
    description: "Spicy and savory hand-pulled noodles.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
    address: "81 St Marks Pl, New York, NY 10003",
    cuisine: "Chinese"
  },
  {
    id: "han-dynasty",
    name: "Han Dynasty",
    rating: 4,
    description: "Authentic Szechuan cuisine.",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop",
    address: "90 Third Ave, New York, NY 10003",
    cuisine: "Chinese"
  },
  {
    id: "redfarm",
    name: "RedFarm",
    rating: 4,
    description: "Modern Chinese with a farm-to-table approach.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
    address: "529 Hudson St, New York, NY 10014",
    cuisine: "Chinese"
  },
  {
    id: "joes-shanghai",
    name: "Joe's Shanghai",
    rating: 4.5,
    description: "Famous for soup dumplings and Shanghai cuisine.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=300&fit=crop",
    address: "9 Pell St, New York, NY 10013",
    cuisine: "Chinese"
  },
  {
    id: "nom-wah",
    name: "Nom Wah Tea Parlor",
    rating: 4,
    description: "Classic dim sum in Chinatown since 1920.",
    image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop",
    address: "13 Doyers St, New York, NY 10013",
    cuisine: "Chinese"
  }
];

export const getRestaurantById = (id: string): Restaurant | undefined => {
  return mockRestaurants.find(r => r.id === id);
};
