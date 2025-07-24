import './DropdownMenuElement.css';

import { IconBaseProps } from "react-icons";
import { MdDone } from "react-icons/md";

const IconDone = MdDone as React.FC<IconBaseProps>;

interface DropdownMenuElementProps {
    header: string;
    items: string[];
    img?: string;
    selectedCategories?: string[];
    setSelectedCategories?: (options: string[]) => void;
    selectedTypes?: string[];
    setSelectedTypes?: (options: string[]) => void;
}

const categoryTypes: Record<string, string[]> = {
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
const DropdownMenuElement: React.FC<DropdownMenuElementProps> = ({header, items, img, selectedCategories, setSelectedCategories, selectedTypes, setSelectedTypes}) => {

    const toggleCategory = (category: string) => {
        if (selectedCategories && setSelectedCategories && setSelectedTypes) {
            const typesForCategory = categoryTypes[category] || [];
            
            if (selectedCategories.includes(category)) {
                setSelectedCategories(selectedCategories.filter(cat => cat !== category));
                
                // Remove types associated with this category
                setSelectedTypes(selectedTypes?.filter(type => !typesForCategory.includes(type)) || []);
            } else {
                setSelectedCategories([...selectedCategories, category]);
                
                // Add types associated with this category
                setSelectedTypes([...(selectedTypes || []), ...typesForCategory]);
            }
        }
    };

    const toggleType = (type: string) => {
        if (selectedTypes && setSelectedTypes && selectedCategories && setSelectedCategories) {
            let updatedSelectedTypes: string[];

            if (selectedTypes.includes(type)) {
                // Remove this type from selected types
                updatedSelectedTypes = selectedTypes.filter(t => t !== type);
                setSelectedTypes(updatedSelectedTypes);

                // If this type is removed, check if its category should also be removed
                for (const [category, typesOfCategory] of Object.entries(categoryTypes)) {
                    if (typesOfCategory.includes(type) && selectedCategories.includes(category)) {
                        setSelectedCategories(selectedCategories.filter(c => c !== category));
                    }
                }
            } else {
                // Add this type to selected types
                updatedSelectedTypes = [...selectedTypes, type];
                setSelectedTypes(updatedSelectedTypes);

                // Control the category selection based on types
                for (const [category, typesOfCategory] of Object.entries(categoryTypes)) {
                    if (typesOfCategory.includes(type)) {
                        // Did we select all types of this category?
                        const allTypesSelected = typesOfCategory.every(t => 
                            t === type || updatedSelectedTypes.includes(t)
                        );

                        // If all types of this category are selected, add the category to selectedCategories
                        if (allTypesSelected && !selectedCategories.includes(category)) {
                            setSelectedCategories([...selectedCategories, category]);
                        }
                    }
                }
            }
        }
    };

    return (
        <>
            <div className='main-wrapper'>

                <div className='mini-img'>
                    <img src={img} alt="mini-img" />
                </div>

                <div className='content'>

                    <div className='header' onClick={() => toggleCategory(header)}>
                        {header}
                        {selectedCategories && selectedCategories.includes(header) ? <IconDone style={{color:'green'}}/> : ''}                       
                    </div>

                    <div className='items-wrapper'>
                        {items.map((item, index) => {
                            return (
                                <div key={index} className="items" onClick={() => toggleType(item)}>
                                    {item}
                                    <span className="check-icon">
                                        {selectedTypes && selectedTypes.includes(item) && 
                                            <IconDone style={{color:'green'}}/>
                                        }
                                    </span>     
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DropdownMenuElement
