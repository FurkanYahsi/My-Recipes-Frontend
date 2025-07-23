import { useEffect, useRef, useState } from 'react'
import { logout } from '../../services/AuthServices/AuthService.export';
import { getRecipeByCategory } from '../../services/RecipeServices/RecipeService.export';
import { useNavigate } from 'react-router-dom';

const useUpperMenuBar = () => {

    const navigate = useNavigate();

    const [isProfileVisible, setIsProfileVisible] = useState(false);
    const [hasBeenClickedToProfile, setHasBeenClickedToProfile] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

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

    const handleRecipesClick = () => {
        // If the user is already on the recipes page, do not navigate again
        if (window.location.pathname === "/recipes") {
            return; 
        }
        navigate("/recipes");
    }

    const handleBringTheChosens = () => {
        console.log("Selected Categories:", selectedCategories);
        console.log("Selected Types:", selectedTypes);

        // If no categories are selected, do not proceed
        if (selectedCategories.length === 0) {
            return;
        }

        getRecipeByCategory(selectedCategories.join(','), 1, 5)
        .then((response:any) => {
            if (response && response.success) {
                console.log("Recipes fetched successfully:", response.data);
                const categoriesParam = selectedCategories.join(',');
                navigate(`/recipes?categories=${encodeURIComponent(categoriesParam)}`);
            }
        })
        .catch((error) => {
            console.error("Error fetching recipes:", error);
        }
        );
        setSelectedCategories([]);
    }

    const handleTrendsClick = () => {
        // If the user is already on the trends page, do not navigate again
        if (window.location.pathname === "/trends") {
            return; 
        }
        navigate("/trends");
    }

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
        isProfileVisible,
        hasBeenClickedToProfile,
        profileMenuRef,
        mainMenuRef,
        menuContentRef,
        isMenuVisible,
        handleRecipesClick,
        handleTrendsClick,
        handleSendRecipeClick,
        handleProfileClick,
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
