"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StarRating from "./StarRating";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: "snacks" | "meals" | "drinks" | "desserts";
  description: string;
  image: string;
  rating?: number;
  reviewCount?: number;
}

interface MenuDashboardProps {
  onOrderClick: (item: MenuItem) => void;
  itemRatings?: { [key: string]: { rating: number; count: number } };
}

const menuItems: MenuItem[] = [
  // Meals - Indian
  {
    id: "1",
    name: "Chicken Biryani",
    price: 120,
    category: "meals",
    description: "Fragrant basmati rice with tender chicken",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    name: "Veg Thali",
    price: 80,
    category: "meals",
    description: "Complete meal with rice, roti, dal & sabzi",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    name: "Paneer Butter Masala",
    price: 100,
    category: "meals",
    description: "Creamy paneer curry with naan",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop",
  },
  // Meals - Western
  {
    id: "14",
    name: "Classic Burger",
    price: 90,
    category: "meals",
    description: "Juicy beef patty with cheese, lettuce & tomato",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
  },
  {
    id: "15",
    name: "Margherita Pizza",
    price: 150,
    category: "meals",
    description: "Classic Italian pizza with mozzarella & basil",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
  },
  {
    id: "16",
    name: "Pasta Alfredo",
    price: 110,
    category: "meals",
    description: "Creamy white sauce pasta with parmesan",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
  },
  {
    id: "17",
    name: "Grilled Sandwich",
    price: 70,
    category: "meals",
    description: "Toasted sandwich with veggies & cheese",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop",
  },
  
  // Snacks - Indian
  {
    id: "4",
    name: "Samosa",
    price: 15,
    category: "snacks",
    description: "Crispy fried pastry with spiced potato filling",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
  },
  {
    id: "5",
    name: "Vada Pav",
    price: 20,
    category: "snacks",
    description: "Mumbai's favorite street food",
    image: "https://images.unsplash.com/photo-1626074353765-517a49fde54c?w=400&h=300&fit=crop",
  },
  {
    id: "6",
    name: "Pav Bhaji",
    price: 60,
    category: "snacks",
    description: "Spicy vegetable mash with buttered pav",
    image: "https://images.unsplash.com/photo-1606491048868-467d6f54e148?w=400&h=300&fit=crop",
  },
  // Snacks - Western
  {
    id: "18",
    name: "French Fries",
    price: 50,
    category: "snacks",
    description: "Crispy golden fries with ketchup",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop",
  },
  {
    id: "19",
    name: "Chicken Wings",
    price: 80,
    category: "snacks",
    description: "Spicy buffalo wings with ranch dip",
    image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400&h=300&fit=crop",
  },
  {
    id: "20",
    name: "Nachos",
    price: 70,
    category: "snacks",
    description: "Tortilla chips with cheese & salsa",
    image: "https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=400&h=300&fit=crop",
  },

  // Drinks - Indian/Asian
  {
    id: "7",
    name: "Mango Lassi",
    price: 40,
    category: "drinks",
    description: "Refreshing yogurt-based mango drink",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&h=300&fit=crop",
  },
  {
    id: "8",
    name: "Masala Chai",
    price: 15,
    category: "drinks",
    description: "Hot spiced Indian tea",
    image: "https://images.unsplash.com/photo-1597318281699-7019e3e7f6c8?w=400&h=300&fit=crop",
  },
  {
    id: "9",
    name: "Fresh Juice",
    price: 30,
    category: "drinks",
    description: "Orange, Apple, or Watermelon",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop",
  },
  {
    id: "13",
    name: "Milk",
    price: 20,
    category: "drinks",
    description: "Fresh cold milk",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop",
  },
  // Drinks - Western
  {
    id: "21",
    name: "Cappuccino",
    price: 45,
    category: "drinks",
    description: "Rich espresso with steamed milk foam",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop",
  },
  {
    id: "22",
    name: "Berry Smoothie",
    price: 60,
    category: "drinks",
    description: "Blended berries with yogurt & honey",
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop",
  },
  {
    id: "23",
    name: "Chocolate Milkshake",
    price: 55,
    category: "drinks",
    description: "Thick & creamy chocolate shake",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop",
  },

  // Desserts - Indian
  {
    id: "10",
    name: "Gulab Jamun",
    price: 30,
    category: "desserts",
    description: "Sweet milk dumplings in sugar syrup",
    image: "https://images.unsplash.com/photo-1589828703352-0c1b0e246b7b?w=400&h=300&fit=crop",
  },
  {
    id: "11",
    name: "Ice Cream",
    price: 35,
    category: "desserts",
    description: "Vanilla, Chocolate, or Strawberry",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
  },
  {
    id: "12",
    name: "Kheer",
    price: 40,
    category: "desserts",
    description: "Traditional rice pudding",
    image: "https://images.unsplash.com/photo-1631641199125-e492e5e1b9e0?w=400&h=300&fit=crop",
  },
  // Desserts - Western
  {
    id: "24",
    name: "Chocolate Brownie",
    price: 50,
    category: "desserts",
    description: "Fudgy brownie with chocolate chips",
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&h=300&fit=crop",
  },
  {
    id: "25",
    name: "Cheesecake",
    price: 65,
    category: "desserts",
    description: "Creamy New York style cheesecake",
    image: "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=400&h=300&fit=crop",
  },
  {
    id: "26",
    name: "Glazed Donuts",
    price: 40,
    category: "desserts",
    description: "Soft fluffy donuts with sweet glaze",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop",
  },
];

const categoryIcons = {
  meals: "🍽️",
  snacks: "🍿",
  drinks: "🥤",
  desserts: "🍰",
};

const categoryColors = {
  meals: "bg-gradient-to-r from-orange-500 to-red-500 text-white",
  snacks: "bg-gradient-to-r from-yellow-400 to-orange-400 text-white",
  drinks: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
  desserts: "bg-gradient-to-r from-pink-500 to-purple-500 text-white",
};

export default function MenuDashboard({ onOrderClick, itemRatings = {} }: MenuDashboardProps) {
  const categories = ["meals", "snacks", "drinks", "desserts"] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-20">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-3">
            Today's Menu
          </h2>
          <p className="text-gray-600 text-lg">Choose your favorite items & enjoy delicious food</p>
        </div>

        {categories.map((category) => {
          const items = menuItems.filter((item) => item.category === category);
          return (
            <div key={category} className="mb-12">
              <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-gray-200">
                <span className="text-4xl animate-bounce-slow">{categoryIcons[category]}</span>
                <h3 className="text-3xl font-bold capitalize bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {category}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => {
                  const ratingData = itemRatings[item.id];
                  const rating = ratingData?.rating || 0;
                  const reviewCount = ratingData?.count || 0;
                  
                  return (
                    <Card
                      key={item.id}
                      className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group bg-white/80 backdrop-blur-sm"
                    >
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <Badge
                          className={`absolute top-3 right-3 ${categoryColors[item.category]} border-0 shadow-lg px-3 py-1.5 font-semibold`}
                        >
                          {categoryIcons[item.category]} {item.category}
                        </Badge>
                      </div>

                      <div className="p-5">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-xl font-bold text-gray-800">
                            {item.name}
                          </h4>
                        </div>
                        
                        {/* Star Rating Display */}
                        {rating > 0 && (
                          <div className="flex items-center gap-2 mb-2">
                            <StarRating rating={rating} readonly size="sm" showNumber />
                            <span className="text-xs text-gray-500">
                              ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
                            </span>
                          </div>
                        )}
                        
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                            ₹{item.price}
                          </span>
                          <Button
                            onClick={() => onOrderClick(item)}
                            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                          >
                            Order Now
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}