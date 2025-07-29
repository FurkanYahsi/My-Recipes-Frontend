export const categoryTypes: Record<string, string[]> = {
    "Meat Dishes": ["Grilled Meatball", "Fish & Seafood", "Chicken", "Hamburgers", "Other Meat Dishes"],
    "Vegetable Dishes": ["Stir-fried Vegetables", "Roasted Vegetables", "Steamed Vegetables", "Other Vegetable Dishes"],
    "Pasta Recipes": ["Spaghetti Bolognese", "Penne Arrabbiata", "Fettuccine Alfredo", "Other Pasta Recipes"],
    "Pizza Recipes": ["Margherita Pizza", "Pepperoni Pizza", "Veggie Pizza", "Other Pizza Recipes"],
    "Soup Recipes": ["Chicken Soup", "Vegetable Soup", "Mushroom Soup", "Other Soups"],
    "Desserts": ["Cakes", "Milk Dessert", "Ice Cream", "Fruit Recipes", "Other Desserts"],
    "Salads": ["Caesar Salad", "Greek Salad", "Caprese Salad", "Other Salads"],
    "Beverages": ["Cold Beverages", "Hot Beverages"],
    "Other Recipes": ["Rice Dishes", "Snacks", "Egg Dishes", "Legume Dishes", "Bread Recipes", "Other Recipes"]
};

export const categoryImages: Record<string, string> = {
    "Meat Dishes": "https://cdn-icons-png.flaticon.com/512/1046/1046751.png",
    "Vegetable Dishes": "https://cdn-icons-png.flaticon.com/512/258/258566.png",
    "Pasta Recipes": "https://cdn-icons-png.flaticon.com/512/3823/3823096.png",
    "Pizza Recipes": "https://cdn-icons-png.flaticon.com/512/3595/3595458.png",
    "Soup Recipes": "https://cdn-icons-png.flaticon.com/512/2387/2387954.png",
    "Desserts": "https://cdn-icons-png.flaticon.com/512/8346/8346809.png",
    "Salads": "https://cdn-icons-png.flaticon.com/512/2515/2515183.png",
    "Beverages": "https://cdn-icons-png.flaticon.com/512/2405/2405451.png",
    "Other Recipes": "https://cdn-icons-png.flaticon.com/512/4252/4252424.png",
};

export const pageTypes: Record<string, string> = {
    TRENDS: 'trends',
    BOOKMARKS: 'saved',
    LIKES: 'liked',
    FILTEREDS: 'filter'
};