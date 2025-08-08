import { useEffect, useRef, useState } from 'react'
import { logout } from '../../services/AuthServices/AuthService.export';
import { getRecipeByCategory, getRecipesByType } from '../../services/RecipeServices/RecipeService.export';
import { useNavigate } from 'react-router-dom';
import { ToastMessage } from '../../utils/ToastMessage/ToastMessage';

const useUpperMenuBar = () => {

    const navigate = useNavigate();
    const { contextHolder, showNotification } = ToastMessage();

    const [isProfileVisible, setIsProfileVisible] = useState(false);
    const [hasBeenClickedToProfile, setHasBeenClickedToProfile] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const [isRecipesVisible, setIsRecipesVisible] = useState(false);
    const [isTrendsVisible, setIsTrendsVisible] = useState(false);
    const [isBlogsVisible, setIsBlogsVisible] = useState(false);
    const [isMouseOnSendRecipe, setIsMouseOnSendRecipe] = useState(false);

    const profileMenuRef = useRef<HTMLDivElement>(null);
    const mainMenuRef = useRef<HTMLDivElement>(null);
    const menuContentRef = useRef<HTMLDivElement>(null);

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    useEffect(() => {
        if (isProfileVisible)
            setHasBeenClickedToProfile(true);
    }, [isProfileVisible])

    useEffect(() => {
      const handleScroll = () => {
        if (isRecipesVisible) {
          setIsRecipesVisible(false);
        }
        if (isTrendsVisible) {
          setIsTrendsVisible(false);
        }
        if (isBlogsVisible) {
          setIsBlogsVisible(false);
        }
      };
        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [isRecipesVisible, isTrendsVisible, isBlogsVisible]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if ((mainMenuRef.current && !mainMenuRef.current.contains(event.target as Node)) &&
                (menuContentRef.current && !menuContentRef.current.contains(event.target as Node))) {
                setIsMenuVisible(false);
            }
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setIsProfileVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return() => {
            document.removeEventListener('mousedown', handleClickOutside); // Component unmount
        }
    }, [])

    const handleLogoClick = () => {
        // If the user is already on the home page, do not navigate again
        if (window.location.pathname === "/home") {
            return; 
        }
        navigate("/home");
    }

    const handleRecipesClick = () => {
        handleBringTheChosens(); // Fetch recipes based on selected categories
    }

    const handleBringTheChosens = () => {

        // If no categories are selected, do not proceed
        if (selectedCategories.length === 0 && selectedTypes.length === 0) {
            showNotification("Please select at least one category to view recipes.", "warning");
            return;
        }

        if (selectedCategories.length > 0) {
            getRecipeByCategory(selectedCategories.join(','), 1, 5)
            .then((response:any) => {
                if (response && response.success) {
                    const categoriesParam = selectedCategories.join(',');
                    navigate(`/recipes?categories=${encodeURIComponent(categoriesParam)}`);
                }
            })
            .catch((error) => {
                console.error("Error fetching recipes:", error);
            }
            );
        }
        if (selectedTypes.length > 0) {
            getRecipesByType(selectedTypes.join(','), 1, 5)
            .then((response:any) => {  
                if (response && response.success) {
                    const typesParam = selectedTypes.join(',');
                    navigate(`/recipes?types=${encodeURIComponent(typesParam)}`);
                }
            })
            .catch((error) => {
                console.error("Error fetching recipes by type:", error);
            }
            );
        }
    }

const handleTrendsClick = (period: string) => {
    const currentParams = new URLSearchParams(window.location.search);
    const currentPeriod = currentParams.get("period");

    if (window.location.pathname === "/trends" && currentPeriod === period) {
        return;
    }

    navigate(`/trends?period=${period}`);
};

    // Send Recipe Button
    const handleSendRecipeClick = () => {
        // If the user is already on the send-recipe page, do not navigate again
        if (window.location.pathname === "/send-recipe") {
            return; 
        }
        navigate("/send-recipe");
    }

    // Profile Menu Button
    const handleProfileClick = () => {
        setIsProfileVisible(!isProfileVisible);
    }

    const handleMyProfileClick = () => {
        // If the user is already on the profile page, do not navigate again
        if (window.location.pathname === "/user-recipes") {
            return; 
        }
        navigate("/user-recipes");
    }

    // Saved Recipes Button
    const handleSavedRecipes = () => {
        // If the user is already on the saved-recipes page, do not navigate again
        if (window.location.pathname === "/saved-recipes") {
            return; 
        }
        navigate("/saved-recipes");
    }

    // Liked Recipes Button
    const handleLikedRecipes = () => {
        // If the user is already on the liked-recipes page, do not navigate again
        if (window.location.pathname === "/liked-recipes") {
            return; 
        }
        navigate("/liked-recipes");
    }

    // Logout Button
    const handleLogout =  async () => {
        logout().then((response:any) => {
            if (response && response.success){
                navigate("/login");
            }
        })
        .catch((error) => {
            console.error("Logout failed:", error);
        });   
    }

    // Main Menu Button (When the screen is narrow)
    const handleMenuClick = () => {
        setIsMenuVisible(!isMenuVisible);
    }

    return {
        contextHolder,
        isProfileVisible,
        hasBeenClickedToProfile,
        profileMenuRef,
        mainMenuRef,
        menuContentRef,
        isMenuVisible,
        isRecipesVisible,
        setIsRecipesVisible,
        isTrendsVisible,
        setIsTrendsVisible,
        isBlogsVisible,
        setIsBlogsVisible,
        isMouseOnSendRecipe,
        setIsMouseOnSendRecipe,
        handleLogoClick,
        handleRecipesClick,
        handleTrendsClick,
        handleSendRecipeClick,
        handleProfileClick,
        handleMyProfileClick,
        handleSavedRecipes,
        handleLikedRecipes,
        handleMenuClick,
        handleLogout,
        handleBringTheChosens,
        selectedCategories,
        setSelectedCategories,
        selectedTypes,
        setSelectedTypes,
    }  
}
export default useUpperMenuBar