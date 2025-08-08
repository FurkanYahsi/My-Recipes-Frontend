import { categoryTypes } from "../../config/constants";

interface useDropdownMenuElementProps {
    selectedCategories?: string[];
    setSelectedCategories?: (options: string[]) => void;
    selectedTypes?: string[];
    setSelectedTypes?: (options: string[]) => void;
}

const useDropdownMenuElement = ({selectedCategories, setSelectedCategories, selectedTypes, setSelectedTypes}: useDropdownMenuElementProps) => {

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

  return {
    toggleCategory,
    toggleType,
  }
}

export default useDropdownMenuElement
